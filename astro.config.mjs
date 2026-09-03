// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
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
