# Phase 2.1 refinement

## Changes

- `src/Hero.tsx`: concrete React/TypeScript and production-interface positioning; component architecture, APIs, validation, accessibility, and user workflows. AI wording is limited to independent project exploration. Employer descriptions now name actual engineering work from existing portfolio content.
- `src/foundation.css`: selected preview buttons, hover/focus states, feedback transitions, high-contrast finding text, compact mobile introduction, and readable employer rows on narrow screens. No new dependencies.
- `tests/browser-foundation.smoke.mjs`: keyboard preview activation, persistent total/feedback checks, rendered finding-color check, and four state-specific screenshots.

The preview changes only its view. Its synthetic figures remain unchanged, and it does not edit data or call an API/model. Other case studies and the review simulation are untouched.

## Review

- [Desktop overview](./phase-2-1-desktop.png)
- [Mobile overview](./phase-2-1-mobile.png)
- [Desktop finding](./phase-2-1-desktop-finding.png)
- [Mobile finding](./phase-2-1-mobile-finding.png)
- [Browser check output](./phase-2-1-checks.txt)

Live preview: http://127.0.0.1:5173. To restart: `npm run dev -- --port 5173` from the repository. Switch Overview / Review a finding using mouse, touch, or Tab and Enter. The total stays visible and unchanged; the explanatory status updates.

## Verification and limitations

Run `npm test`, `npx tsc --project tsconfig.app.json --noEmit`, `npm run build`, `npm run test:browser`, and `git diff --check`.

Final results: all five commands passed; 11 unit tests passed. Production output is 84.23 kB gzip JavaScript and 16.20 kB gzip CSS. No new dependencies. Browser test output is linked above. All four captures were inspected; the corrected mobile finding capture was re-inspected after the contrast fix.

Chrome checks cover eight widths from 320 to 1920 CSS px, focus and menu behavior, preview selection, the existing simulation, reduced motion, and selected contrast pairs. Captures include both preview states and use reduced motion for stability. Manual inspection caught an inherited low-contrast emphasis color on the light panel; it was corrected and pinned by a rendered-style check. The keyboard harness needed a complete Enter event payload; application keyboard handlers were not changed.

Remaining limits: no OS screen-reader, Safari/Firefox, physical-device, or production Core Web Vitals verification. The 720px reflow check is a zoom-equivalent layout check, not native browser zoom. Existing external fonts and legacy case-study styles remain. No commit, push, deployment, or Phase 3 work.
