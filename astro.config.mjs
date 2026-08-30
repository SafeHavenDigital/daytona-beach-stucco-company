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
  adapter: cloudflare(),

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
