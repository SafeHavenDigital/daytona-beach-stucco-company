/**
 * Central business facts for Daytona Beach Stucco Company.
 *
 * VERIFICATION RULE (from brand/positioning.md):
 * Nothing in this file may be invented, estimated, or filled with a plausible
 * stand-in. Every field is either VERIFIED by the client or `null`.
 *
 * A `null` field is not a bug. Components read these values and omit the
 * corresponding UI entirely when a value is null. Never replace a null with a
 * placeholder string — placeholder credentials and fake phone numbers have a
 * habit of shipping to production.
 */

export interface UnverifiedFact {
  /** What the client still needs to supply. */
  readonly needed: string;
  /** What renders once it is supplied. */
  readonly unlocks: string;
}

// ---------------------------------------------------------------------------
// VERIFIED — confirmed by the client 2026-08-28. Safe to display.
// ---------------------------------------------------------------------------

export const business = {
  name: 'Daytona Beach Stucco Company',
  founded: 2018,
  licensedAndInsured: true,
} as const;

/**
 * VERIFIED contact email, confirmed by the client 2026-08-28.
 *
 * This is the company's real inbox and the destination for contact-form
 * submissions. It is the ONLY contact channel currently authorized to
 * publish — `phone` below is still null and must stay that way until a real
 * number is supplied.
 */
export const email: string | null = 'daytonabeachstucco@gmail.com';

/**
 * Contact form POST endpoint.
 *
 * Points at this site's own API route, `src/pages/api/contact.ts`, which
 * sends each submission to `email` above via Resend. No third-party form
 * vendor is involved and no visitor data passes through one: the request goes
 * to our own server, which holds the Resend key in RESEND_API_KEY and is the
 * only place that key exists.
 *
 * Because this is a same-origin endpoint rather than a hosted form service,
 * the form posts in the background and reports success or failure inline —
 * the visitor is never bounced to a vendor's thank-you page.
 *
 * Setting this to null reverts the form to the original mailto: composer,
 * which still works with no key and no account.
 */
export const formEndpoint: string | null = '/api/contact';

/**
 * The named diagnostic service. Client's own words, verified 2026-08-28.
 * Supersedes an earlier retracted draft sequence.
 */
export const moistureCheck = {
  name: 'Stucco Moisture Check',
  priceLow: 300,
  priceHigh: 500,
  priceNote: 'depending on the size and scope of the evaluation',
  steps: [
    {
      title: 'We look at the wall',
      body: 'A visual examination for stains, cracks, deterioration, and other signs of possible water intrusion.',
    },
    {
      title: 'We test for moisture',
      body: 'Pin-type/probe or pinless moisture meters, used to investigate possible hidden moisture behind the stucco.',
    },
    {
      title: 'We scan when it helps',
      body: 'We own a thermal camera and use it when the wall calls for it, to identify suspicious areas worth testing further. It does not confirm moisture on its own.',
    },
  ],
  deliverable: [
    'Documented findings',
    'Moisture readings from the areas we tested',
    'Relevant photos',
    'An explanation of what the results mean',
    'Recommended next steps',
  ],
} as const;

/**
 * RESEARCHED MARKET PRICE RANGES — Daytona Beach / Central Florida, 2026.
 * Supplied 2026-08-28.
 *
 * PROVENANCE — read before touching this data:
 * These are *researched market ranges for the area*, NOT this company's
 * quoted prices and NOT a guaranteed quote. That distinction is a hard copy
 * constraint, not a nicety: presenting a market survey as "our prices" would
 * be an overclaim on a site whose entire position is not overclaiming, and
 * would misrepresent a number the company has not committed to.
 *
 * Any UI rendering these MUST carry the market-range framing nearby.
 * See `pricingDisclaimer` and `pricingVariables` below — render them together.
 *
 * Repair pricing stays financially separate from `moistureCheck` above:
 * estimates for repair work are free, the Stucco Moisture Check is a separate
 * paid $300-$500 service, and the Check is never credited toward repair work.
 */
export interface PriceRange {
  readonly job: string;
  /** Low end in USD. */
  readonly low: number;
  /** High end in USD. */
  readonly high: number;
  /** True when the high end is open-ended ("$7,000+"). */
  readonly openEnded?: boolean;
  /** Plain-language note on what this job actually is. */
  readonly note: string;
}

export const repairPriceRanges: readonly PriceRange[] = [
  {
    job: 'Minor crack repair',
    low: 250,
    high: 600,
    note: 'A limited run of cracking in sound wall, cut out, filled, and textured back in.',
  },
  {
    job: 'Small patch or hole repair',
    low: 300,
    high: 900,
    note: 'A single damaged spot — impact damage, an old penetration, a failed previous patch.',
  },
  {
    job: 'Multiple cracks or a medium repair area',
    low: 600,
    high: 1500,
    note: 'Several separate areas on the same visit, or one larger stretch of cracking.',
  },
  {
    job: 'Larger localized repair',
    low: 900,
    high: 2500,
    note: 'A substantial area of one wall, still short of taking the whole elevation.',
  },
  {
    job: 'Water-damaged stucco repair',
    low: 1000,
    high: 3500,
    note: 'Where moisture got behind the wall and the material underneath needs attention too.',
  },
  {
    job: 'Bulging, delaminated, or buckling stucco',
    low: 800,
    high: 2500,
    note: 'Stucco that has come loose from the wall behind it and no longer has a solid bond.',
  },
  {
    job: 'Large wall section or partial replacement',
    low: 2500,
    high: 6000,
    note: 'Taking a full elevation or a major portion of one back and rebuilding it.',
  },
  {
    job: 'Major moisture and substrate restoration',
    low: 4000,
    high: 7000,
    openEnded: true,
    note: 'Extensive damage behind the stucco, where the lath and sheathing are the real job.',
  },
  {
    job: 'Full resurfacing or extensive re-stucco',
    low: 3000,
    high: 8000,
    openEnded: true,
    note: 'Whole-house or near-whole-house work, priced by the size of the house.',
  },
] as const;

/** Per-square-foot framing for the same market data. */
export const repairPerSquareFoot = {
  low: 8,
  high: 50,
  note: 'depending on scope',
} as const;

/**
 * MANDATORY wherever a range renders. Wording matters — it must not read as
 * a quote, a promise, or this company's price list.
 */
export const pricingDisclaimer =
  'These are researched market ranges for the Daytona Beach and Central Florida area, not guaranteed quotes from us. What your job actually costs depends on the size of the damage, whether water got in behind the wall, how hard the area is to reach, matching the finish that is already there, the condition of the material underneath, and how complicated the repair turns out to be.';

/** The six variables named in the disclaimer, broken out for list rendering. */
export const pricingVariables: readonly { readonly name: string; readonly body: string }[] = [
  {
    name: 'How big the damaged area is',
    body: 'The single biggest driver. Repair pricing does not scale in a straight line — mobilizing for a job is much of the cost on a small one.',
  },
  {
    name: 'Whether water got in behind it',
    body: 'The one that moves the number most. A dry-wall patch and a wet-wall repair are different jobs at different prices.',
  },
  {
    name: 'How hard the area is to reach',
    body: 'Ground-floor and open is one price. Second story, over a roofline, or anywhere needing staging is another.',
  },
  {
    name: 'Matching the finish already on the house',
    body: 'Knockdown, lace, dash, sand, and smooth are not equally difficult, and matching a weathered finish is harder than matching a new one.',
  },
  {
    name: 'The condition of what is underneath',
    body: 'Sound sheathing and lath keep the job simple. Deteriorated material behind the stucco becomes the real scope.',
  },
  {
    name: 'How complicated the repair is',
    body: 'Openings, control joints, rooflines, and transitions between materials all take longer than an open field of wall.',
  },
];

// ---------------------------------------------------------------------------
// UNVERIFIED — null until the client supplies them. DO NOT INVENT.
// ---------------------------------------------------------------------------

/** Real number pending. Contact UI omits call links entirely while null. */
export const phone: string | null = null;

/** Client explicitly declined to provide. Never render a fabricated number. */
export const licenseNumber: string | null = null;
export const insuranceCarrier: string | null = null;

/** No years-of-experience claim is authorized. Founding year only. */
export const yearsExperience: null = null;

/** Municipalities actually served — not yet confirmed. */
export const serviceArea: readonly string[] | null = null;

export const warrantyTerms: string | null = null;
export const reviewCount: number | null = null;
export const rating: number | null = null;

/** Open-wall photo set — the highest-value missing proof asset. */
export const openWallPhotos: readonly string[] | null = null;

/** What moves the price within the Moisture Check range. */
export const whatMovesThePrice: string | null = null;

/** Tracks outstanding facts so the gaps stay visible during the build. */
export const OUTSTANDING: readonly UnverifiedFact[] = [
  { needed: 'Phone number', unlocks: 'Call buttons, header/footer tel: links, sticky mobile call bar' },
  { needed: 'Form service endpoint (optional)', unlocks: 'Background form POST with photo upload on /contact/, replacing the mailto: composer' },
  { needed: 'Business hours', unlocks: 'Hours block on /contact/, openingHours schema' },
  { needed: 'Typical response time (only if measured)', unlocks: 'Response-time line on /contact/ — never publish an unmeasured guess' },
  { needed: 'Service area municipalities', unlocks: 'Service-area section, location page rollout' },
  { needed: 'License number', unlocks: 'Footer credential line alongside "licensed and insured"' },
  { needed: 'Open-wall photo set', unlocks: 'Visual proof block — the strongest available evidence' },
  { needed: 'What moves the Moisture Check price', unlocks: 'Range explanation, preempts the price objection' },
  { needed: 'Warranty terms + duration', unlocks: 'Guarantee module' },
  { needed: 'Review count, rating, platform', unlocks: 'Social proof bar' },
  { needed: 'Sample line-item quote (client details removed)', unlocks: 'Quote-anatomy section on /stucco-repair/' },
  { needed: 'Typical timeline by job size', unlocks: 'How-long-it-takes section on /stucco-repair/' },
];
