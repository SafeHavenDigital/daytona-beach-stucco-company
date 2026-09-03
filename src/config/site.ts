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
  /**
   * Founding year. RE-VERIFIED 2026-09-01 by the owner ("in business since
   * 2018"). This establishes a START DATE and nothing more: it does not
   * authorize a years-of-experience claim, and `yearsExperience` stays null
   * below. Render the year, never a computed duration.
   */
  founded: 2018,
  /**
   * RE-VERIFIED 2026-09-01 by the owner. True as a plain statement; it
   * carries NO number and NO carrier — `licenseNumber` and
   * `insuranceCarrier` remain null and the owner has declined to supply
   * them. Never append, infer, or stub a number onto this flag.
   */
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
// VERIFIED SERVICES
// ---------------------------------------------------------------------------

/**
 * Services CONFIRMED by the client as work the company actually performs.
 *
 * A service belongs here only after the client has said, in their own words,
 * that they do it. This list gates service pages: no page may claim a service
 * that is not recorded here. Do not add a service because the keyword data
 * supports one, because a competitor offers it, or because it is adjacent to
 * work already done. Ask, then record.
 */
export const verifiedServices = {
  /**
   * VERIFIED 2026-08-31, client direction: "The company DOES perform
   * EIFS/synthetic stucco repair."
   *
   * Unblocks /eifs-repair/. Note this confirms the service only — it does not
   * authorize any claim about method, certification, manufacturer approval, or
   * project history. Those remain unverified and must not be implied.
   */
  eifsRepair: true,

  /**
   * The following seven were put to the client as yes/no questions on
   * 2026-08-31 and answered the same day. A `false` is as much a verified
   * fact as a `true` — it records that the question was asked and answered,
   * so it does not get re-litigated, and it blocks any page that would claim
   * the service. As with EIFS, a `true` confirms the SERVICE ONLY. It does
   * not authorize any claim about method, credentials, materials,
   * manufacturer approval, or project history.
   */

  /** VERIFIED 2026-08-31. Unblocks a stucco chimney repair page. */
  chimneyRepair: true,

  /** VERIFIED 2026-08-31. Unblocks a stucco painting page. */
  painting: true,

  /**
   * VERIFIED 2026-08-31. Whole-wall or whole-elevation recoating, as opposed
   * to patching. Unblocks a stucco resurfacing page.
   */
  resurfacing: true,

  /**
   * VERIFIED 2026-08-31 as NOT offered. The company does not sell
   * waterproofing or sealing as a standalone job. This does not mean
   * waterproofing never happens — it may be part of a repair — but no page
   * may offer it as a service a customer can buy on its own, and no
   * standalone waterproofing/sealing page may be built.
   */
  standaloneWaterproofing: false,

  /**
   * VERIFIED 2026-08-31. Foam trim, decorative bands, and stucco soffits.
   * Unblocks a trim/band/soffit repair page.
   */
  trimBandSoffitRepair: true,

  /**
   * VERIFIED 2026-08-31 as NOT offered. No concrete spalling repair. Do not
   * build a spalling page, and do not imply the company handles rusting
   * rebar or balcony/stair-landing concrete failure. Spalling inquiries are
   * outside the company's work.
   */
  concreteSpallingRepair: false,

  /**
   * VERIFIED 2026-08-31. New stucco on new construction and additions, as
   * distinct from repair. Confirms the previously UNVERIFIED assumption
   * behind the planned /new-stucco-installation/ page.
   */
  newInstallation: true,

  /**
   * VERIFIED 2026-09-01, supplied directly by the owner in answer to the
   * three capability questions that had blocked the commercial pillar since
   * 2026-08-28 (keyword-plan.md:469).
   *
   * "Yes, we perform commercial and condo stucco work and are licensed and
   * insured for it."
   *
   * Unblocks the /commercial-stucco/ funnel. As with every other flag here,
   * this confirms the SERVICE and the fact of licensing/insurance ONLY. It
   * does NOT authorize any claim about method, credentials, certification,
   * project history, or client references.
   *
   * SPECIFICALLY NOT VERIFIED BY THIS: insurance LIMITS. The owner stated
   * limits are not yet verified. "Licensed and insured for commercial and
   * condo work" may be said; no dollar figure, aggregate, per-occurrence
   * amount, or certificate detail may be rendered or implied. A board WILL
   * ask for limits — that is a conversation, not a page element.
   */
  commercialAndCondoWork: true,

  /**
   * VERIFIED 2026-09-01, owner: "Yes, we can work on occupied buildings and
   * coordinate access around residents."
   *
   * Unblocks the occupied-building section the milestone brief requires.
   * Confirms the CAPABILITY only. No staging method, resident-notice
   * procedure, scheduling window, elevator protocol, noise plan, or
   * documentation package is authorized — none were asked. Say that we work
   * occupied buildings and coordinate access; do not describe how.
   */
  occupiedBuildingWork: true,

  /**
   * VERIFIED 2026-09-01, owner: "Yes, we can perform multi-story stucco
   * work." This answers a question left open across five consecutive builds.
   *
   * Unblocks pages addressing buildings three habitable stories and up —
   * which is the statutory definition of a milestone-inspection building, so
   * without this the commercial pillar could not honestly exist.
   *
   * SPECIFICALLY NOT VERIFIED BY THIS, and stated explicitly by the owner:
   * ACCESS EQUIPMENT AND METHODS. No lift, boom, scissor, swing stage,
   * scaffold, rope access, or storey ceiling may be named, claimed, or
   * implied. "Multi-story" is the whole of the verified fact. Do not invent
   * the how, and do not state a maximum height — an unstated ceiling is
   * honest, a guessed one is not.
   */
  multiStoryWork: true,
} as const;

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

/**
 * VERIFIED 2026-09-01, supplied directly by the owner: the company serves
 * ALL of Volusia County, Florida, and Orange County, Florida, including the
 * Greater Orlando area.
 *
 * RECORDED AS COUNTIES, DELIBERATELY. The owner verified county-level
 * coverage, not a municipality roster. Expanding these two entries into a
 * list of cities would be inventing verified-looking detail out of a broader
 * statement — the exact failure this file exists to prevent — and would also
 * under-state the fact, since "all of Volusia County" covers municipalities
 * no such list would be guaranteed to name. If a city-by-city roster is ever
 * wanted (for location pages, say), it must be asked and answered separately.
 *
 * NOTE ON BLAST RADIUS: 20 pages null-gate on this constant. Setting it
 * lights up `areaServed` in schema across the site and renders a service-area
 * line in the footer on every page. That is the intended behaviour — the
 * gates were written to wait for exactly this — but it means any future edit
 * here changes every page at once.
 *
 * Still NOT verified, and not implied by this: any municipality list, any
 * travel-radius claim, any statement about where the company will or will not
 * take a job within these counties.
 */
export const serviceArea: readonly string[] = [
  'Volusia County, FL',
  'Orange County, FL',
];

/**
 * Human-readable service-area sentence, VERIFIED 2026-09-01 alongside
 * `serviceArea` above. Kept beside it so prose and schema cannot drift apart.
 * Greater Orlando is named because the owner named it; it is a region within
 * Orange County, not an additional area.
 */
export const serviceAreaProse =
  'All of Volusia County and Orange County, Florida, including Daytona Beach and the Greater Orlando area.';

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
  { needed: 'License number', unlocks: 'Footer credential line alongside "licensed and insured"' },
  { needed: 'Open-wall photo set', unlocks: 'Visual proof block — the strongest available evidence' },
  { needed: 'What moves the Moisture Check price', unlocks: 'Range explanation, preempts the price objection' },
  { needed: 'Warranty terms + duration', unlocks: 'Guarantee module' },
  { needed: 'Review count, rating, platform', unlocks: 'Social proof bar' },
  { needed: 'Sample line-item quote (client details removed)', unlocks: 'Quote-anatomy section on /stucco-repair/' },
  { needed: 'Typical timeline by job size', unlocks: 'How-long-it-takes section on /stucco-repair/' },
];
