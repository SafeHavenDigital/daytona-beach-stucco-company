# Learnings Journal

Append-only. What worked, what didn't, what we learned about the audience.

## What Works

## What Doesn't Work

## Audience Insights

### 2026-08-28 — Competitive landscape (from /positioning-angles)
- Daytona/Volusia stucco market is Stage 3 (mechanism required). Superiority
  claims no longer register.
- Every analyzed competitor leads with the same four claims: licensed &
  insured, free estimate, X+ years, quality workmanship.
- "Salt air and humidity are hard on stucco" is ALSO saturated — multiple
  competitors say it. Stating the coastal problem no longer differentiates;
  only a specific response to it does.
- White space found: moisture diagnostics are owned by inspection firms, not
  repair contractors. Nobody occupies both.
- White space found: no local stucco contractor is positioned for the Volusia
  condo milestone-inspection deadline (repairs must begin within 365 days of a
  Phase 2 report; SIRS funding plans due 2026-12-31).

### 2026-08-28 — SERP reality check (from /keyword-research)
- Live SERP analysis (8 queries) confirms the positioning white space independently.
  The `stucco repair daytona beach` organic SERP is a two-domain silo
  (stuccorepairdaytonabeachfl.com holds ~5 of 7 slots). A zero-authority domain
  should treat that head term as a 9-12 month play and buy near-term leads from
  Google Business Profile + long-tail distress queries instead.
- **Every local competitor competes only on `service + city`.** Not one publishes
  symptom content, cost content, or deadline content. The entire top and middle of
  the funnel in this market is unoccupied. That is the whole strategy.
- Cost content is a PROVEN contractor playbook, not a theory: cfstuccoandpainting.com
  ranks a "Florida Pricing Guide" and orlandostuccorepairpros.com ranks an Orlando
  cost page. State-level FL and Orlando are taken. **Volusia County is open.**
  Go one level more local than the aggregators bother to.
- Milestone/SIRS SERP is 100% law firms, HOA software, and engineers.
  **Zero contractors.** Strongest blue ocean found. Decaying asset — SIRS funding
  plans due 2026-12-31.
- `failed 4 point inspection` SERP is written entirely by insurers and inspectors —
  the people who fail you. Nobody who fixes it is on the page. High distress intent.
- Symptom SERPs (`cracks in stucco`, `moisture behind stucco`) are dominated by
  OUT-OF-STATE contractors (CA, AZ, PA) and a Pennsylvania stucco-litigation law
  firm. Zero Florida contractors. The market's core anxiety is being answered by
  an Arizona painter.

### 2026-08-28 — Keyword opportunities the positioning work missed
- **The 4-point / insurance / pre-sale inspection cluster.** positioning.md named
  failed inspections as a distress *trigger* but never as a keyword territory.
  It is a blue-ocean SERP with a hard deadline attached. Deserves its own guide set.
- **EIFS vs hardcoat identification.** High-value: EIFS repairs are priced
  materially higher than traditional (third-party sources report ~$15-55/sq ft vs
  ~$10-35). A competitor already has an EIFS page, and self-identification
  ("do I have EIFS?") is an unclaimed diagnostic question that fits the position perfectly.
- **`stucco repair vs replacement`** is the bridge from a repair lead to the
  highest-ticket job on the menu and was not identified as a content need.
- **Anti-insight worth recording:** "coastal / salt air stucco" tested as a pillar
  and FAILED the market-centric test. People search symptoms, not climate. It is a
  section inside other pages, never a pillar. This matches positioning.md's saturation
  warning from the demand side as well as the supply side.

### 2026-08-28 — Architecture: /blog/ introduced (supersedes the "no blog" rule)
- The keyword plan originally set a hard "No blog" architecture rule, on the
  reasoning that dated blog structure is dead weight for a local service site.
  Client direction on 2026-08-28 overrode it: informational articles live at
  `/blog/`, service and symptom content stays at root / `/problems/` / `/guides/`.
- The reasoning behind the original rule is preserved in practice — `/blog/`
  URLs stay undated and permanent (no `/blog/2026/08/`). What changed is the
  namespace, not the evergreen-URL principle.
- Working distinction going forward: **intent, not format.** A page that
  explains a mechanism is a blog article. A page that catches a symptom search
  and routes to a service is a problem page. `why-stucco-cracks-come-back`
  is the former, which is why the move fits rather than fights the plan.
- First shipped article: `/blog/why-stucco-cracks-come-back/`. Cleared its
  hard gate (`[DIAGNOSTIC TOOLS ACTUALLY OWNED]`) because the Stucco Moisture
  Check is verified. Shipped without the open-wall photo set — the mechanism
  argument carries the page, but the photos remain the highest-value upgrade
  available to it and the one thing no competitor can match.

### 2026-08-28 — /contact/ shipped; email verified, phone still null
- Client supplied the verified company email (`daytonabeachstucco@gmail.com`).
  It moved out of the UNVERIFIED block in `src/config/site.ts` into the
  VERIFIED section. Phone remains null and no call affordance renders anywhere
  on the site — confirmed by grepping the built `dist/` for phone patterns and
  `tel:` links (zero hits).
- **Correction to an earlier read of the site state:** the `#contact-form`
  anchors on `/`, `/stucco-repair/`, and `/stucco-repair-daytona-beach/` were
  never dead — each page wraps its own `ContactCta` in a section with that id.
  The actual gap was that the CTA's "Send a photo" button pointed back at the
  CTA itself, so there was no form anywhere on the site to submit. `ContactCta`
  now resolves the target contextually: `#contact-form` on `/contact/`,
  `/contact/#contact-form` everywhere else.
- **Form transport decision.** With no ESP or form service connected
  (`brand/stack.md` shows all integrations disconnected), the form posts via
  `mailto:` to the verified address. This works today with no vendor account
  and no visitor data passing through a third party. The tradeoff is that it
  opens the visitor's mail client rather than posting in the background, and
  photo attachment becomes the visitor's step — so the copy says that plainly
  instead of showing a file input that would silently drop the file.
  A new `formEndpoint` constant in `site.ts` is the single switch: set it and
  the form upgrades to a real POST with a working multi-file photo input.
- **Photo-first ask held.** Per the voice profile the conversion event is
  "send a photo," not "book an inspection." The page is built around that: the
  H1 is the ask, and a "What to send" sidebar explains what makes a photo
  useful (wide shot, close-up with something for scale, what you've noticed).
  That sidebar is doing lead-qualification work, not decoration — it raises the
  odds the first message contains enough to actually diagnose from.
- **Rule-out block included** per the voice requirement that every page rules
  some work unnecessary ("You might not need me" — credit-card-edge test).
- Free repair estimate vs. the paid $300–$500 Stucco Moisture Check is stated
  explicitly on the page. That financial separation is a standing constraint
  from `site.ts` and must survive any future edit to this page.
- New OUTSTANDING items surfaced by building this page: **business hours**,
  **response time** (only if genuinely measured — an invented one is worse
  than none), and an optional **form service endpoint**.

### 2026-08-30 — /seo-content research on stucco moisture testing
- **The SERP for `stucco moisture testing` is owned by inspectors, not contractors.**
  Stucco Safe, Structure Tech, SWF Home Inspections, Huffman, Certified Moisture Testing.
  Every one of them diagnoses and hands over a report. None can do the repair. That is the
  gap this page is built to occupy, and it is the rare case where the client's structural
  position (diagnose AND fix) is genuinely unmatched on the page-one results.
- **Technical finding that sharpens the honesty angle, from third-party sources:**
  embedded wire lath interferes with a pinless meter's electromagnetic field on stucco, and
  thermal cameras are widely described as unreliable for confirming moisture behind stucco.
  Pin/probe readings are what settle it. This independently corroborates the caveat already
  written into the site ("thermal imaging points us toward areas worth testing — it doesn't
  prove moisture on its own"). The client's own hedged wording was technically correct, and
  it is now backed by sources. **This is an ownable trust move:** competitors advertise
  thermal imaging as proof; stating its limit is both more accurate and more credible.
- **Moisture reading conventions are publishable market-level facts:** ~8-15% ordinary,
  16-19% elevated, 20%+ excessive, 25%+ critical. Widely published by inspection and
  restoration firms. Must be cited as industry convention, never as a code standard and
  never as this contractor's own threshold.
- **Cannibalization risk discovered during page inspection:** the full `moistureCheck` block
  (3 steps + 5 deliverables + caveat) currently renders on THREE pages — `/`,
  `/stucco-repair/#moisture-check`, and `/stucco-repair-daytona-beach/`. Once
  `/stucco-moisture-testing/` exists, those three become near-duplicate competitors to the
  page that should own the term. **The build step must reduce all three to a short summary
  plus a link out.** Left as-is, the new page would be the fourth copy of its own content.
- Third-party services for comparable testing were found advertised at ~$400-$1,595. The
  client's $300-$500 sits at or below the low end. Not usable as a marketing claim without
  the client's approval, but useful context for the pricing conversation.

### 2026-08-30 — Architecture reconciliation (from /keyword-research, Refresh Mode Option ③)

**What Doesn't Work**
- **Three same-intent URLs shipped before anyone caught the conflict.** `/`, `/stucco-repair/`, and
  `/stucco-repair-daytona-beach/` all targeted stucco repair intent. The homepage title was
  "Stucco Repair in Daytona Beach" with the repair-page H1; the geo page differed from the service
  page only by a city modifier. All three were built and live before the owner flagged it.
- **Root cause: the splitting test was applied only forward, never backward.** Phase 9 (2026-08-29)
  introduced a rigorous 4-part test and used it well — it rejected `/stucco-contractor/`,
  `/stucco-remediation/`, a separate cost URL, and nine other candidates on exactly this logic. But
  it ran the test only on NEW candidates. Pages already built and URLs already approved were
  grandfathered in unexamined. **A test that only screens new work does not catch the duplication
  already in the plan.**
- **`/stucco-crack-repair/` carried an approval for two days without ever being SERP-tested.** It
  was approved 2026-08-28 in the initial architecture and re-confirmed 2026-08-29 on the stated
  grounds that it was "already an approved URL." When finally tested on 2026-08-30 it scored 0 of 4.
  **"Already approved" is not evidence.** An approval inherits whatever rigor it was originally
  given, and if that was none, re-confirming it launders the gap rather than closing it.
- **A conditional gate with no owner and no deadline is not a gate.** Pillar 4 shipped with an
  explicit condition — "a city page without real local substance should not be published; ten thin
  duplicated pages will hurt a new domain." The condition was never met, and the flagship page
  shipped anyway with its differentiating section written from general area facts. The gate was
  advice, and advice does not block a build.

**What Works**
- **Re-testing an already-approved URL caught a page that would have drawn traffic it could not
  convert.** `stucco crack repair` nationally returns Behr, Quikrete, Amazon, and painting forums —
  it is materially a DIY term. A service page there would have earned impressions from people
  wanting a $6 tube of patch compound. Worth generalizing: **check whether a commercial-looking
  keyword is actually a product/DIY keyword before committing a page to it.**
- **Adding local intent collapses apparent SERP differences.** `stucco crack repair` and
  `stucco repair contractor` return different results, which looks like intent separation until the
  city is added — `stucco crack repair Daytona Beach contractor` returns the same competitor set
  already logged for `stucco repair daytona beach`. **Test the local commercial variant, not just
  the national head term**, or the split test gives a false positive.
- **Consolidation is cheapest before the build.** `/stucco-crack-repair/` cost nothing to un-plan.
  `/stucco-repair-daytona-beach/` now needs a 301, a canonical, a content migration, sitewide
  header/footer link updates, and a preservation manifest so its one genuinely local section is not
  lost. **Same decision, an order of magnitude apart in cost, separated only by whether the page had
  been built.**

**Audience Insights**
- The genuinely local content on the retiring geo page — wind-driven rain arriving sideways off the
  Atlantic, failures clustering at window corners and dried-out control joints, west/south-facing
  walls opening hairlines faster than shaded elevations — is the substance that lets a single
  service page carry geographic intent honestly. **Geographic relevance comes from describing local
  conditions, not from repeating the city name in a URL.** Preserved in the brief's manifest.

**Feedback on the Phase 10 keyword plan (logged 2026-08-30)**
- [2026-08-30] [/keyword-research] Refresh Mode Option ③ shipped as-is — rated "great, clear and
  actionable." Scope: architecture reconciliation, 3 clusters re-mapped, 1 built page consolidated,
  1 approved URL rejected 0/4, 1 pillar demoted, 9 planned pages un-approved. Key finding: the
  splitting test had only ever been applied to new candidates, so duplication already in the plan
  was never caught. Method that earned the rating: present the full diff and hold at the
  confirmation checkpoint rather than writing on the first approval — the owner declined the first
  diff, added a constraint, and the second diff was the one that shipped.
