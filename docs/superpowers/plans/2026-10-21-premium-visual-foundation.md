# Phase 2: Premium Visual Foundation

Approved direction: The Interactive Engineering Edition, 70% editorial and 30% purposeful product interaction. Scope is the global visual foundation, navigation, and hero only. Preserve existing case studies, review simulation, factual claims, and evidence boundaries. Do not commit, push, deploy, or start Phase 3.

## Implementation

- Add shared color, typography, spacing, surface, radius, focus, and motion tokens in `src/foundation.css`, imported after the existing styles. Bridge legacy palette variables; do not restructure later sections yet.
- Use existing DM Sans / DM Mono with Georgia editorial emphasis; no new font or animation dependencies.
- Extract a responsive `SiteHeader` with a mobile disclosure, Escape/focus handling, outside-click dismissal, and resize cleanup.
- Add an editorial `Hero` with role, internship availability, current study, and ZEE/Straumann/Virtusa professional experience.
- Compose a new synthetic ResearchFlow interface study using only existing portfolio figures and examples. Overview/finding buttons change the explanatory view, not project data. Keep the local review simulation separate.
- Limit movement to short CSS entrance, state, and hover transitions; fully disable under reduced motion.

## Verification

- Existing reducer tests, explicit TypeScript check, production build, Git whitespace checks.
- Browser checks: 1440px desktop, tablet, 390px and 320px mobile, wide desktop, keyboard navigation, closed-menu focus exclusion, Escape focus return, section navigation, study state toggles, reduced motion, contrast, and preserved review simulation.
- Capture desktop and mobile screenshots for user review. Passing checks are not a substitute for visual approval.
- Keep the local development server available and provide run instructions.

## Limits

The existing case-study layouts and simulation are intentionally not redesigned. The legacy stylesheets remain until their owning phases; the new foundation is a separate readable file. No production performance or screen-reader certification claims.

## Completed

Implementation and local verification completed. A real Chrome smoke script is available through `npm run test:browser`. All 11 unit tests, TypeScript, production build, and Git whitespace checks passed. Browser checks cover eight widths, keyboard/focus behavior, the preview, existing simulation, reduced motion, and selected contrast pairs. The first screenshot review led to an earlier employer line; a browser assertion exposed and verified a fix for a small preview-height shift.

See [visual-review handoff](../../visual-review/README.md) for screenshots, exact results, run instructions, and remaining limits. No commit, push, deployment, or Phase 3 work performed. Await visual feedback.
