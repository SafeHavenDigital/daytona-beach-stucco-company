// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // PRODUCTION ORIGIN. Set 2026-09-03.
  //
  // Not a guess: this domain is already load-bearing in shipped code — it is
  // the verified Resend sending domain in src/pages/api/contact.ts, which
  // sends from leads@daytonabeachstuccocompany.com. Confirming it here is
  // what turns the root-relative canonicals in Layout.astro into absolute
  // ones and gives @astrojs/sitemap an origin to write.
  //
  // No trailing path. Changing it changes every canonical and every sitemap
  // entry, so it must match the domain actually served, exactly, including
  // the https scheme and the www-less host.
  site: 'https://daytonabeachstuccocompany.com',

  // Astro emits directory-style URLs (/stucco-repair/), so this keeps the
  // sitemap, the canonicals and the served addresses agreeing on the
  // trailing slash. Disagreement here is how duplicate-URL problems start.
  trailingSlash: 'always',

  // The site stays static: every page is prerendered at build time exactly as
  // before. The adapter exists for the one on-demand route —
  // src/pages/api/contact.ts — which needs a server to hold the Resend key.
  // That route opts in with `export const prerender = false`.
  output: 'static',

  // DEPLOY TARGET: Cloudflare WORKERS, not Cloudflare Pages.
  //
  // @astrojs/cloudflare v14 removed Pages support. The build is Workers-shaped
  // and `dist` is not a publishable web root:
  //
  //   dist/server/entry.mjs   the Worker — serves /api/contact AND, via the
  //                           ASSETS binding, every static page
  //   dist/client/            those static assets; an INPUT to the Worker,
  //                           not a site root
  //
  // A Pages project pointed at `dist` serves `client/` as a subdirectory and
  // 404s every route. Pointed at `dist/client` it appears fixed but drops the
  // Worker, so the contact form POSTs into a 404 — a silent failure on the
  // site's only conversion point, which is worse than the visible one.
  //
  // Deploy with `npm run deploy`. Worker name and compatibility date come from
  // the root wrangler.jsonc; see that file for the RESEND_API_KEY secret
  // requirement.
  // IMAGE OPTIMIZATION MUST BE PREBUILT, NOT ON-DEMAND.
  //
  // Left to itself this adapter installs its workerd image service, which
  // rewrites every <Image> to a /_image?href=... endpoint and transforms on
  // request. This site is output: 'static', so that route is never emitted -
  // `grep -c _image dist/server/entry.mjs` returns 0 - and every image 404s
  // in production while the built HTML looks perfectly correct. Verified
  // 2026-09-02, and it is a silent failure, so do not remove this option.
  //
  // 'compile' runs sharp at BUILD time instead: real .webp variants land in
  // dist/client/_astro/ and the srcset points at files. Setting Astro's
  // top-level `image.service` does NOT work - the adapter overrides it.
  adapter: cloudflare({ imageService: 'compile' }),

  integrations: [
    sitemap({
      /**
       * INDEXABLE PRODUCTION PAGES ONLY.
       *
       * The integration's default page set is "every route Astro emitted",
       * which is wrong here in three separate ways. Each exclusion below is
       * load-bearing; read the reason before removing one.
       *
       * Redirects (/stucco-repair-cost/, /stucco-repair-daytona-beach/) are
       * NOT filtered here — they are declared in `redirects` above and Astro's
       * sitemap integration already omits redirect routes. Verified against
       * the emitted sitemap after the build.
       */
      filter: (page) => {
        // /404/ — an error page. Layout.astro already sends it
        // `noindex, follow`; a noindex URL inside a sitemap is a direct
        // contradiction, and Google reports it as one.
        if (page.includes('/404')) return false;

        // /style-reference/ — internal scaffolding, noindex, unlinked from
        // any navigation. NOTE: the header comment in that file claims an
        // "underscore directory keeps it out of the sitemap generator's page
        // set". That is not true — the directory is src/pages/style-reference/
        // with no underscore, so it IS a routed, emitted page. This line is
        // what actually keeps it out.
        if (page.includes('/style-reference')) return false;

        // /api/* — the contact endpoint. A POST-only JSON route, not a
        // document. It is `prerender = false` so it should not appear here
        // anyway; this is belt and braces against that changing.
        if (page.includes('/api/')) return false;

        return true;
      },

      // One <urlset>, not an index: this site is ~29 pages against a 50,000
      // limit. Raising this does nothing until the page count grows by three
      // orders of magnitude.
      entryLimit: 45000,

      // No <lastmod>, <changefreq> or <priority>. Google ignores changefreq
      // and priority outright, and a lastmod stamped with "whenever the build
      // ran" is actively misleading — every page would claim to have changed
      // on every deploy, which trains crawlers to distrust the signal. Omitted
      // deliberately; do not add them without real per-page modification data.
    }),
  ],

  redirects: {
    // Consolidated into /stucco-repair/ on 2026-08-28 by client direction.
    // /stucco-repair/ is the single authoritative page for stucco repair
    // services AND stucco repair cost. Keep this redirect: the old URL was
    // built and internally linked before the consolidation.
    '/stucco-repair-cost': {
      status: 301,
      destination: '/stucco-repair/',
    },

    // Consolidated into /stucco-repair/ on 2026-08-30 by owner direction
    // (brand/keyword-plan.md Phase 10). A geographic modifier alone does not
    // justify a separate URL: this page targeted the same service and the same
    // search intent as /stucco-repair/, differing only by the city name.
    // Its genuinely local content — the Daytona-specific failure patterns —
    // was merged into /stucco-repair/ rather than lost. The page was built and
    // internally linked before the consolidation, so this redirect is
    // permanent.
    '/stucco-repair-daytona-beach': {
      status: 301,
      destination: '/stucco-repair/',
    },
  },
});
