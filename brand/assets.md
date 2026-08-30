# Asset Registry

Append-only. Every skill that produces an asset logs it here.

## Active

| Asset | Type | Created | Campaign | Status | Notes |
|-------|------|---------|----------|--------|-------|
| voice-profile | brand-profile | 2026-08-28 | foundation | draft | 8 placeholders need real values before any copy ships |
| positioning | brand-profile | 2026-08-28 | foundation | draft | 5 angles; "Find the Water First" starred; needs moisture-tool confirmation |
| keyword-plan | brand-profile | 2026-08-28 | foundation | draft | 7 pillars, doubles as site architecture; ~180 keywords, 8 live SERPs. **Updated 2026-08-29:** Phase 9 merges owner master set (~430 kw, 22 groups, 10 PAA) — 4 new pages, 9 groups merged, 3 held, 12 rejected |
| brief: stucco-repair-cost-volusia-county | content-brief | 2026-08-28 | content-plan | shipped | CONSOLIDATED into /stucco-repair/ 2026-08-28; ranges supplied as researched market ranges, not company quotes |
| brief: why-stucco-cracks-come-back | content-brief | 2026-08-28 | content-plan | blocked | DO FIRST; blocked on diagnostic tools + open-wall photos |
| brief: milestone-inspection-stucco-repairs | content-brief | 2026-08-28 | content-plan | blocked | DO FIRST, time-boxed to SIRS 2026-12-31; blocked on commercial credentials |
| brief: stucco-4-point-inspection | content-brief | 2026-08-28 | content-plan | planning | DO SECOND; blue ocean, lightly blocked |
| brief: stucco-water-damage-repair | content-brief | 2026-08-28 | content-plan | blocked | DO SECOND; flagship positioning page, hard gate on diagnostic tools |
| brief: cracks-in-stucco-when-to-worry | content-brief | 2026-08-28 | content-plan | planning | QUICK WIN traffic magnet; needs crack-type photos |
| brief: stucco-repair-daytona-beach | content-brief | 2026-08-28 | content-plan | consolidated | **CONSOLIDATED into /stucco-repair/ 2026-08-30.** No longer a location template; the 9 other city pages are un-approved. Carries a preservation manifest naming 4 sections to migrate |
| brief: stucco-moisture-testing | content-brief | 2026-08-29 | content-plan | drafted | DO FIRST — best next page. Promoted from a section on /stucco-repair/. Core facts verified in site.ts. **Thermal-camera gate CLEARED 2026-08-30** — owner confirms camera owned and used, does not confirm moisture on its own |
| brief: stucco-repair-around-windows | content-brief | 2026-08-29 | content-plan | planning | DO SECOND; windows + doors merged into one page. No business facts blocking |
| article: stucco-moisture-testing | content | 2026-08-30 | content | **built** | Live at `/stucco-moisture-testing/` (src/pages/stucco-moisture-testing/index.astro). 1,657 words, 7 PAA, Service+FAQ schema validated in built HTML. Thermal camera owner-confirmed. **De-dup done 2026-08-30:** full block now renders on this page only; /stucco-repair/#moisture-check and /blog/why-stucco-cracks-come-back/ reduced to step titles + link; homepage, contact, header nav, footer repointed |
| keyword-plan Phase 10 (architecture reconciliation) | brand-profile | 2026-08-30 | foundation | draft | Refresh Mode Option ③. Homepage → entity page; /stucco-repair/ → single authoritative repair page (repair + cost + geo + contractor/company + crack); /stucco-repair-daytona-beach/ consolidated; /stucco-crack-repair/ rejected 0/4 on fresh splitting test (3 new SERPs); Pillar 4 demoted, 9 city pages un-approved. Migration plan recorded, no pages modified |
| audience | brand-profile | 2026-08-30 | foundation | draft | **Manually created** by /lead-magnet Step 3 (/audience-research is a v2.1 placeholder, ARCHITECTURE.md:431). Q1 + caller mix OWNER-confirmed (all 5 segments, do not narrow); Q3 SERP/PAA-derived; **Q2 and Q4 are explicit open gaps — not invented**. 5 open gaps logged; Gap 3 (the "exactly what I needed" moment) blocks the lead magnet hook |
| lead-magnet: stucco-triage-guide | lead-magnet | 2026-08-30 | stucco-triage-guide | draft | **BUILT** — 4-pattern triage guide, ~2,000 words, hybrid delivery (guide ungated; Wall Record + 90-day reminder email-gated). Bridges to Stucco Moisture Check $300–$500. All 6 positioning constraints observed (paid/separate, not-an-inspection, not-third-party, thermal conditional + screening-aid only, fee not credited, no license claim). **Hook is Q4-hypothesis, not verified customer fact.** Pattern 3 deliberately routes to structural engineer, not to the paid service |
| brief: stucco-triage-guide | campaign-brief | 2026-08-30 | stucco-triage-guide | draft | Carries 4 open gaps (Q2, Q4, photography, license number) and binding AI-imagery constraints |
| **GAP: real project photography** | asset-gap | 2026-08-30 | foundation | **missing** | **No real crack/project photos exist.** Blocks strongest version of triage guide + Concept ③ ("What $300 Buys You") entirely. Interim visuals may be AI-generated **illustration only, visibly labeled, never presented as real customer work or project documentation**. Real photos are the substitution target — Pattern 4 (staining, efflorescence) is hard to illustrate credibly. Guide written to work with zero images, so substitution needs no rewrite |
| sequence: stucco-triage-guide (welcome) | email-sequence | 2026-08-30 | stucco-triage-guide | approved-blocked | **8 emails written** (7 core days 0–18 + day-90 reminder), 3 subject variants each with recommended A/B test. Bridges to Moisture Check $300–$500; first pitch day 14 per skill's medium-price rule. **NO ESP — not deployable.** `.env` has only RESEND_API_KEY (transactional). Emails 1 + 8 make binding promises requiring list mgmt + scheduled sends. Pattern 3 routing preserved. 2 subject variants flagged DO-NOT-USE pending real case data |
| **GAP: Wall Record PDF** | asset-gap | 2026-08-30 | stucco-triage-guide | **missing** | Email 01-delivery links to it and the guide's gate promises it. **Must be built before any send.** One-page printable: location, width, date, photo, follow-up measurement. → /creative |
| **GAP: ESP / email list system** | asset-gap | 2026-08-30 | foundation | **missing** | Blocks /email-sequences deployment and /newsletter entirely. Resend is transactional-only — no lists, broadcasts, sequences, or unsubscribe handling. Sending marketing mail through it risks CAN-SPAM exposure and would damage the domain reputation the contact form depends on. stack.md priority #2. ConvertKit suggested for a single-magnet local-service funnel |

## Retired

| Asset | Type | Created | Retired | Reason |
|-------|------|---------|---------|--------|
