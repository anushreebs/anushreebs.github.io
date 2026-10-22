# Phase 4B — Hiring-Impact Refinement

Implemented October 21, 2026. **Pending user visual approval. Stop at this boundary.** No commit, push, deployment, dependency installation, machine-setting change, deployment-workflow change, or next-phase work was performed.

## What changed and why

The homepage now puts a concise project index and real employment experience before the detailed prototypes. The existing hero, typography, sage ResearchFlow, slate-blue Portal, and rose Bloom identities remain intact.

**Before:** Hero → full Selected Work / three detailed case studies → standalone deadline exercise → Experience → How I Work → Skills → Initiative → About → Contact.

**After:** Hero → compact Selected-Work Preview → Professional Experience → Detailed Case Studies (with optional original Interface Study) → How I Work → Skills → Initiative → About → Contact.

The three preview rows each state a problem, contribution, and distinguishing decision. Each entire row is one keyboard-accessible link to its detailed case study, with a visible accent and focus ring. No dashboards, screenshots, decorative animation, or new dependencies were introduced. The preview is editorial and bordered rather than a collection of generic cards.

Experience preserves employer names, titles, dates, and existing responsibilities. First-person contribution text is separated from engineering context or quality practice. Scoped spacing makes this a more direct reading journey. All original navigation anchors remain available: #work now leads to the compact preview; #experience, #researchflow, #collaborator, #bloom-rescue, #interface-study, and existing evidence links retain targets. #case-studies is a new heading destination.

Case-study changes remove repeated generic explanations and design-lesson paragraphs, shorten the ResearchFlow introduction, and retain contextual simulation labels and concise scope/limitations. Technical decisions, synthetic data, private-source qualifications, unverified model/security/production boundaries, and the original detailed evidence components remain intact. ResearchFlow’s next-validation paragraph is retained.

## Exact implementation files

Modified relative to the pre-Phase-4B working tree (not just Git HEAD):

- `/Users/anu/developer-portfolio/src/App.tsx`: approved section order; optional original study wrapper.
- `/Users/anu/developer-portfolio/src/content.ts`: factual employment presentation and quality context.
- `/Users/anu/developer-portfolio/src/InterfaceStudy.tsx`: presentation-level focus recovery; reducer unchanged.
- `/Users/anu/developer-portfolio/src/ResearchFlowCase.tsx`: shorter introduction, reduced repeated qualification, local evidence CTA.
- `/Users/anu/developer-portfolio/src/CollaboratorCase.tsx`: remove duplicate explanation and generic design lesson.
- `/Users/anu/developer-portfolio/src/BloomCase.tsx`: remove duplicate prose; preserve simulation distinction and architecture explanation.
- `/Users/anu/developer-portfolio/src/main.tsx`: load Phase 4B styles after the foundation so compact spacing takes effect.
- `/Users/anu/developer-portfolio/tests/browser-foundation.smoke.mjs`: run Phase 4B checks; explicit optional single-process test mode; correct cleanup/readiness reporting after a browser terminates by signal.

Added:

- `/Users/anu/developer-portfolio/src/SelectedWorkPreview.tsx`
- `/Users/anu/developer-portfolio/src/phase4b.css`
- `/Users/anu/developer-portfolio/tests/phase4b.browser.mjs`
- `/Users/anu/developer-portfolio/docs/superpowers/plans/2026-10-21-hiring-impact-refinement.md`
- This review, six Phase 4B screenshots, `phase-4b-checks.txt`, `phase-4b-verification.txt`, and `phase-4b-git-status.txt` under `docs/visual-review/`.

Updated `/Users/anu/developer-portfolio/docs/CODEX_HANDOFF.md` with an appended Phase 4B entry; prior history is retained.

Byte-for-byte comparison to the saved pre-task working tree confirmed that Hero.tsx, SiteHeader.tsx, reviewWorkflow.ts, all three original evidence components, BloomWorkbench.tsx, ProjectShowcases.tsx, existing project styles, deployment workflow, package files, and metadata were not changed by Phase 4B. Legacy screenshots/check reports regenerated during verification were restored to their pre-task bytes; Phase 4B captures provide the current review evidence.

## Evidence supporting employment statements

The evidence boundary is the existing portfolio content, not an independent employment verification.

| Employer | Retained/refined statement | Existing source |
| --- | --- | --- |
| ZEE | React interfaces for streaming discovery, search, recommendations, subscriptions and remote navigation. Coordination of focus, state, API responses, analytics and regression testing. | Pre-task `src/content.ts`, ZEE experience body. Split into contribution and engineering context; no new ownership or outcome claim. |
| Straumann | React/TypeScript ordering, search/filter/sort, responsive behavior, validation, operational rules, warnings and empty states. Jest, React Testing Library and Cypress quality practice. | Pre-task Straumann experience body plus Testing and Quality toolkit context in `src/content.ts`. |
| Virtusa | React reporting, Redux, Material UI, API integration, reporting interactions and document exports. Accessibility and cross-browser usability context. | Pre-task Virtusa experience body plus Testing and Quality toolkit context in `src/content.ts`. |

Dates and job titles are unchanged. No previously discussed résumé metrics were inserted.

### Claims requiring user confirmation before any stronger wording

- Specific features or architecture decisions personally owned at ZEE, including the exact scope of API, analytics, navigation or performance work.
- A concrete ordering constraint/trade-off at Straumann and its observed result; current source supports work performed and testing tools, not a quantified effect.
- Specific accessibility checks, export constraints or cross-browser problems personally resolved at Virtusa and how success was verified.
- Team scope, scale, business outcomes, performance percentages, users served, and production backend ownership are not established by the current material.

These gaps are documented here, not filled with new public claims. Clinical validity, evaluated AI performance, live institutional use, production security, and other existing qualifications remain unclaimed.

## Duplicate demonstrations and keyboard fix

Bloom’s approved workbench remains the primary exercise. The original standalone exercise remains mounted, with its original reducer and independent local state, inside the closed-by-default native “Optional interface study” disclosure. Deep links to #interface-study and #deadline-input open the wrapper. A real Tab check verifies that its controls are skipped while closed.

After standalone approval or rejection, focus moves to Undo. Undo/reset return focus to Approve. Invalid approval focuses the date or required override-reason field. Editing retains field focus and still invalidates a previous decision. Source inspection, activity, undo/reset and reducer semantics remain intact.

**Regression evidence:** The new browser test, run against the exact saved pre-task source on a separate local server, failed with `Standalone keyboard approval must hand focus to Undo` (`false !== true`). The same keyboard Enter sequence passes against the implemented view. No reducer modifications or test mocks were used.

Independent code review found that the base stylesheet overrode Phase 4B spacing. A new rendered-style assertion reproduced `72px !== 40px` at 320px. Loading Phase 4B CSS after foundation.css fixes the cascade; the full suite passes afterward. The test checks the intended 40px mobile / 56px desktop preview padding.

## Project CTA verification

- **ResearchFlow demo:** Rechecked the actual public URL in the connected Chrome browser. The page initially showed an application-level “Loading page content” state, then rendered the full ResearchFlow operations dashboard, navigation, synthetic workspace, five eligible expense rows and two findings. This establishes a loaded application during this check, not guaranteed uptime or independent backend verification. The earlier Render startup screen is not evidence of a persistent failure.
- **ResearchFlow implementation notes:** Followed “About this project” and verified the rendered engineering walkthrough, workflow, documented architecture, integrity rules and prototype boundaries at `/about`.
- **Reliable fallback:** Added “Read local implementation evidence” beside the existing external demo/notes links. It opens the preserved local #rf-architecture disclosure; no external availability is needed.
- **Portal:** Preview leads to the case study; existing local dossier, architecture, role-boundary and limitations links remain. These explain documented implementation; no new public backend or source link is claimed.
- **Bloom:** Preview leads to the case study; review exercise, workflow notes and AI boundary remain distinct. No live model path or application-submission backend was invented or enabled.

## Verification results

Baseline: existing 11 unit tests, TypeScript check and production build passed. The default Chrome browser runner aborted before assertions in this execution environment. macOS diagnostics identified application registration / Mach rendezvous restrictions, not a portfolio failure. The installed Chromium headless shell works in its explicit single-process test mode; no browser was installed and no machine setting was changed. The runner’s prior cleanup also masked signaled exits; that narrow diagnostic defect was corrected.

Final checks all exited 0; full output is in [phase-4b-verification.txt](phase-4b-verification.txt):

- `npm test`: **11/11 passed**.
- `npx tsc --project tsconfig.app.json --noEmit`: passed.
- `npm run build`: passed; JS gzip **89.35 kB**, CSS gzip **23.16 kB**. Sizes are not performance scores.
- `npm run test:browser`: all existing ResearchFlow, Portal, Bloom, foundation and new Phase 4B checks passed with the environment below.
- `git diff --check`: passed.
- `git status --short`: recorded separately in [phase-4b-git-status.txt](phase-4b-git-status.txt).

Browser command used in this environment:

```sh
PORTFOLIO_SINGLE_PROCESS=1 \
CHROME_PATH='/Users/anu/Library/Caches/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-mac-arm64/chrome-headless-shell' \
npm run test:browser
```

Covered 320, 390, 768, 1024 and 1440px section order, no horizontal overflow, three >=44px preview links, exact anchor targets and focus handoff, optional-study deep links, closed-study keyboard exclusion, decision/recovery/validation focus, independent simulations, all existing project interactions, mobile menu, skip link, focus indicators, reduced motion, and no uncaught runtime exceptions. Existing foundation tests also cover additional widths up to 1920px. Sampled changed text contrast is 8.72:1 for body copy, 16.21:1 for preview titles and 11.62:1 for sage preview action text. These are sampled checks, not a complete WCAG audit.

## Screenshots and visual review

All six final captures were visually inspected after the stylesheet fix. Long project names wrap, the preview reads as an editorial index, experience is visibly separated from prototypes, and project identity and navigation are preserved. Hero captures include navigation. Isolated experience/transition captures temporarily hide the sticky header for framing, as in earlier project review captures. Captures use reduced motion and are inspection evidence, not user approval.

| Capture | Exact repository path |
| --- | --- |
| Desktop hero + preview | `/Users/anu/developer-portfolio/docs/visual-review/phase-4b-desktop-hero-preview.png` |
| Mobile hero + preview | `/Users/anu/developer-portfolio/docs/visual-review/phase-4b-mobile-hero-preview.png` |
| Desktop experience | `/Users/anu/developer-portfolio/docs/visual-review/phase-4b-desktop-experience.png` |
| Mobile experience | `/Users/anu/developer-portfolio/docs/visual-review/phase-4b-mobile-experience.png` |
| Desktop experience → studies | `/Users/anu/developer-portfolio/docs/visual-review/phase-4b-desktop-experience-to-cases.png` |
| Mobile experience → studies | `/Users/anu/developer-portfolio/docs/visual-review/phase-4b-mobile-experience-to-cases.png` |

[Desktop hero + preview](phase-4b-desktop-hero-preview.png) · [Mobile hero + preview](phase-4b-mobile-hero-preview.png)

[Desktop experience](phase-4b-desktop-experience.png) · [Mobile experience](phase-4b-mobile-experience.png)

[Desktop transition](phase-4b-desktop-experience-to-cases.png) · [Mobile transition](phase-4b-mobile-experience-to-cases.png)

## Known limitations and approval boundary

- Automated rendering uses the installed Chromium headless shell in single-process mode; connected Google Chrome supplied additional live interaction and public-demo inspection. Safari, Firefox, physical devices and OS screen readers were not newly tested.
- Native details can retain DOM geometry for closed descendants; the regression therefore tests real keyboard traversal rather than incorrectly treating a nonempty getClientRects() as proof that hidden content is tabbable.
- No production performance, SEO, social-preview, deployment, CSS-consolidation or final-polish phase was started.
- Public demo availability was verified at one observation window; no uptime guarantee, security validation, or private implementation review is implied.
- The approved hero remains relatively tall on mobile. Its identity and composition were intentionally preserved. Recruiter comprehension within 30–60 seconds remains a design goal, not a measured user-study result.
- Existing untracked implementation is important and remains untracked. It has not been staged, removed or replaced.

**STOP: Phase 4B implementation, verification and captures are ready for visual approval. Nothing was committed, pushed or deployed.**

## Git state

Started and finished on `main`, HEAD `3224214658b841ff0baff6f269c70100f220e4bf`. Initial dirty state and byte snapshots were recorded before editing. The final status below includes inherited Phase 3 changes and untracked files; the implementation list above identifies Phase 4B’s actual delta.

```text
 M docs/CODEX_HANDOFF.md
 M docs/visual-review/researchflow-desktop-report.png
 M docs/visual-review/researchflow-desktop.png
 M docs/visual-review/researchflow-mobile-report.png
 M docs/visual-review/researchflow-mobile.png
 M src/App.tsx
 M src/CollaboratorCase.tsx
 M src/InterfaceStudy.tsx
 M src/ProjectShowcases.tsx
 M src/ResearchFlowCase.tsx
 M src/content.ts
 M src/main.tsx
 M tests/browser-foundation.smoke.mjs
 M tests/collaborator.browser.mjs
?? docs/superpowers/plans/2026-10-21-hiring-impact-refinement.md
?? docs/visual-review/bloom-checks.txt
?? docs/visual-review/bloom-desktop-approved.png
?? docs/visual-review/bloom-desktop-showcase.png
?? docs/visual-review/bloom-desktop-undo.png
?? docs/visual-review/bloom-desktop-validation.png
?? docs/visual-review/bloom-mobile-approved.png
?? docs/visual-review/bloom-mobile-showcase.png
?? docs/visual-review/bloom-mobile-undo.png
?? docs/visual-review/bloom-mobile-validation.png
?? docs/visual-review/bloom-review.md
?? docs/visual-review/collaborator-checks.txt
?? docs/visual-review/collaborator-desktop-approved.png
?? docs/visual-review/collaborator-desktop-rejected.png
?? docs/visual-review/collaborator-desktop.png
?? docs/visual-review/collaborator-mobile-approved.png
?? docs/visual-review/collaborator-mobile-rejected.png
?? docs/visual-review/collaborator-mobile.png
?? docs/visual-review/collaborator-review.md
?? docs/visual-review/phase-4b-checks.txt
?? docs/visual-review/phase-4b-desktop-experience-to-cases.png
?? docs/visual-review/phase-4b-desktop-experience.png
?? docs/visual-review/phase-4b-desktop-hero-preview.png
?? docs/visual-review/phase-4b-git-status.txt
?? docs/visual-review/phase-4b-mobile-experience-to-cases.png
?? docs/visual-review/phase-4b-mobile-experience.png
?? docs/visual-review/phase-4b-mobile-hero-preview.png
?? docs/visual-review/phase-4b-review.md
?? docs/visual-review/phase-4b-verification.txt
?? src/BloomCase.tsx
?? src/BloomEvidence.tsx
?? src/BloomWorkbench.tsx
?? src/CollaboratorEvidence.tsx
?? src/SelectedWorkPreview.tsx
?? src/bloom-workbench.css
?? src/bloom.css
?? src/collaborator.css
?? src/phase4b.css
?? tests/bloom.browser.mjs
?? tests/phase4b.browser.mjs
```
