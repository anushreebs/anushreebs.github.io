# Codex handoff — developer portfolio

Updated 2026-10-21. Workspace: `/Users/anu/developer-portfolio`.

## Start here: scope and approval

This is an existing portfolio, not a greenfield rebuild. Preserve the current working tree. Homepage, ResearchFlow, and Collaborator Portal are approved. **Bloom Rescue is implemented and verified, awaiting visual approval before final portfolio polish.** See the [Bloom review](./visual-review/bloom-review.md) for the evidence audit, exact changes, screenshots, and checks. No commit, push, deployment, dependency installation, or machine configuration changes are authorized.

## Purpose, audience, and stack

Anushree B S is a frontend-heavy full-stack software engineer targeting engineering internships and teams that value React/TypeScript depth, complex production interfaces, product judgment, APIs, accessibility, validation, and practical AI integration. Readers are engineering hiring managers, founders, and product teams. Preserve the exact education, employment dates, availability, contact information, and project qualifications in the source.

React + strict TypeScript + Vite; plain CSS, hooks, native disclosures, and a separate review-workflow reducer. This portfolio is a client-only single-page application with hash navigation. It has no portfolio backend or live model calls. No Motion or GSAP dependency was introduced. Package versions are governed by the existing lockfile; the manifest uses `latest` ranges. See [package.json](../package.json), [package-lock.json](../package-lock.json), and [tsconfig.app.json](../tsconfig.app.json).

## Completed work

- **Baseline/structure:** extracted maintainable components and navigation helpers while preserving existing presentation and behavior; established tests/build and CI test execution. See [baseline plan](./superpowers/plans/2026-10-21-baseline-and-structure.md).
- **Phase 2:** established editorial tokens, responsive navigation, “Clarity, engineered.” hero, immediate professional credibility, and an interactive ResearchFlow hero composition. See [foundation plan](./superpowers/plans/2026-10-21-premium-visual-foundation.md) and [visual review](./visual-review/README.md).
- **Phase 2.1 — approved:** sharpened concrete React/TypeScript positioning, added verified employer responsibilities, clarified preview controls/feedback, tightened mobile spacing, and polished accessible interaction states. See [review](./visual-review/phase-2-1-review.md).
- **Phase 3, ResearchFlow — approved:** distinct sage product-led showcase with source → validation → report explanation, inspectable decisions, architecture links, visible evidence boundaries, and original detailed evidence retained. See [ResearchFlow review and screenshots](./visual-review/researchflow-review.md).
- **Phase 3, Collaborator Portal — approved:** slate-blue access dossier with requester/admin perspectives and pending/approved/rejected explanatory outcomes; original evidence extracted intact. See [Portal review](./visual-review/collaborator-review.md).
- **Phase 3, Bloom Rescue — awaiting approval:** rose editorial case study and working companion review workbench. It reuses the unchanged review reducer with independent state; it does not run Bloom's private recovery workflow or model integration. See [Bloom review](./visual-review/bloom-review.md).

## Approved visual direction

“The Interactive Engineering Edition”: 70% premium editorial design, 30% meaningful interactive product experience. Dark surfaces, restrained apricot, confident typography, asymmetric composition, and evidence-based storytelling. Preserve the approved homepage and ResearchFlow hero composition. Avoid neon gradients, excessive glass, meaningless 3D, typing effects, repetitive dashboard mockups, and decorative motion.

Canonical tokens live in [foundation.css](../src/foundation.css):

| Role | Value |
| --- | --- |
| Canvas / surface / raised | `#111315` / `#191c20` / `#22262b` |
| Text / secondary | `#f2efe8` / `#adb2b8` |
| Border / control border | `#343a42` / `#7d858f` |
| Apricot / text on accent | `#e9b99a` / `#191411` |
| Focus | `#b9d9ff` |
| Success / warning / error | `#b9d8c1` / `#e6c58d` / `#f1b0a9` |

DM Sans for interface/body, Georgia/Times for editorial contrast, DM Mono for technical labels. Base type scale: .75, .875, 1, 1.125, 1.5, 2rem plus fluid display sizes. Spacing: 4/8/12/16/24/32/48/64/96/128px; radii: 4/8/12px. Motion: 140/220/320ms, `cubic-bezier(.2,.7,.2,1)`; respect reduced motion. Maintain visible focus and 44px minimum interaction targets. Fonts currently include external Google Fonts loading.

ResearchFlow's scoped sage/light-paper palette is in [researchflow.css](../src/researchflow.css), including sage `#bdd2bb`, dark panel `#1b221f`, light paper `#e8ece4`, and ink `#26342a`. Keep project-specific styles scoped.

## Source map

- [main.tsx](../src/main.tsx): React entry and stylesheet ordering.
- [App.tsx](../src/App.tsx): section orchestration, reveals, contact/copy behavior, hash handling.
- [content.ts](../src/content.ts): professional experience and toolkit; primary content reference.
- [SiteHeader.tsx](../src/SiteHeader.tsx), [Hero.tsx](../src/Hero.tsx), [PortfolioPrimitives.tsx](../src/PortfolioPrimitives.tsx): approved homepage/navigation and shared primitives.
- [ProjectShowcases.tsx](../src/ProjectShowcases.tsx): re-exports the three showcases. [CollaboratorCase.tsx](../src/CollaboratorCase.tsx), [CollaboratorEvidence.tsx](../src/CollaboratorEvidence.tsx), and [collaborator.css](../src/collaborator.css) own Portal. [BloomCase.tsx](../src/BloomCase.tsx), [BloomEvidence.tsx](../src/BloomEvidence.tsx), and [BloomWorkbench.tsx](../src/BloomWorkbench.tsx) own Bloom's presentation, preserved evidence, and companion; styling lives in [bloom.css](../src/bloom.css) and [bloom-workbench.css](../src/bloom-workbench.css).
- [ResearchFlowCase.tsx](../src/ResearchFlowCase.tsx): new showcase and explanatory states; [ResearchFlowEvidence.tsx](../src/ResearchFlowEvidence.tsx): original detailed evidence extracted intact.
- [ProjectEvidence.tsx](../src/ProjectEvidence.tsx): existing diagrams/disclosure helpers.
- [InterfaceStudy.tsx](../src/InterfaceStudy.tsx), [reviewWorkflow.ts](../src/reviewWorkflow.ts): working standalone review simulation and reducer.
- [hashNavigation.ts](../src/hashNavigation.ts): hash target discovery and opening containing disclosures.
- [styles.css](../src/styles.css), [overrides.css](../src/overrides.css): legacy styling retained alongside the foundation; avoid broad rewrites.
- [public](../public): existing résumé and visual assets. [index.html](../index.html): metadata/social/structured data.
- [tests](../tests): unit and browser checks. [visual-review](./visual-review): reports, checks, and screenshots.

## Actual interactive behavior and evidence boundaries

**Hero ResearchFlow preview:** Overview / Review a Finding changes the selected explanation and feedback. Synthetic rows and the $6,171.25 total remain fixed. It does not edit records, call an API, or recalculate reports.

**ResearchFlow case study:** Source record / Validation / Report & audit are three explanatory views of a clearly labeled, view-only reconstruction. Existing synthetic evidence includes rows 018/024, `travel-costs.csv · row 24`, five validated rows, two open findings, and exclusion from reporting. Native disclosures expose decisions. Architecture links open and focus preserved nested evidence. Inactive panels are inert and hidden from assistive technology; overlapping grid panels reserve height to prevent selection-induced layout shifts. Technical claims are attributed to project notes, not independently verified production behavior.

**Standalone review simulation:** predefined fictional deadline suggestion, source inspection, editing, override justification, date validation, approve/reject, undo/reset, activity feedback. Edits invalidate prior approval. This is local deterministic state, not live AI, persistence, or an external submission. It must remain functional.

**Navigation/contact:** responsive menu supports Escape/focus return, dismissal, and section focus; skip link, hash/deep links, résumé/social links, and copy-email behavior remain available.

**Portal/Bloom:** Portal's dossier selects explanations without changing permissions, issuing requests, or downloading files. Bloom's working companion uses the original reducer with independent state: source disclosure, edits, required override reasons, approval/rejection, undo/reset, and activity. Error fields and recovery controls receive focus appropriately. It does not demonstrate Bloom's documented reconciliation workflow, and no live model path is verified. Preserve all evidence boundaries.

## Non-negotiable preservation rules

Keep the approved hero, navigation, responsive foundation, professional content, project links, existing evidence, review reducer behavior, keyboard access, focus visibility, contrast, and reduced-motion support. ZEE, Straumann, and Virtusa responsibilities must remain grounded in [content.ts](../src/content.ts).

Never invent metrics, achievements, production deployment, technologies, backend behavior, AI integrations, evaluation results, or professional experience. Do not turn a reconstruction into an alleged screenshot, a documented API into a live service, or a deterministic simulation into AI. No unsupported measured outcomes. Preserve prior uncommitted work; do not reset or overwrite it.

## Run and verify locally

Dependencies were already installed. Run from the workspace:

```sh
npm run dev -- --port 5173
```

Open `http://127.0.0.1:5173/` and `http://127.0.0.1:5173/#researchflow`. Do not assume a previous dev server survives session transfer.

```sh
npm test
npx tsc --project tsconfig.app.json --noEmit
npm run build
npm run test:browser
git diff --check
```

Browser checks require the dev server. [browser-foundation.smoke.mjs](../tests/browser-foundation.smoke.mjs) launches installed Chrome through CDP using Node's WebSocket support and invokes [researchflow.browser.mjs](../tests/researchflow.browser.mjs). Defaults to `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`; supports `CHROME_PATH` and `PORTFOLIO_URL`. No Playwright installation is needed. The suite regenerates review screenshots/check outputs.

Local verified tools: Node 24.21.0, npm 11.19.0, Git 2.46.2; CI uses Node 22. Sandbox access previously made installed tools appear missing, including an `xcrun` error for Git. Use approved execution escalation when needed; do not install system tools or change machine settings to resolve sandbox visibility.

## Verification evidence and remaining limits

The latest verification is recorded in the [Bloom review](./visual-review/bloom-review.md): 11 unit tests, explicit TypeScript check, build, full browser suite, and Git whitespace checks passed. Built gzip sizes: JS 89.01kB, CSS 22.14kB; not performance scores. Bloom tests cover validation, decisions, undo/reset, edit invalidation, independent simulation state, no API requests, focus, reduced motion, contrast, and responsive layout down to 320px.

Foundation checks covered 320–1920px; ResearchFlow checked 320/390/768/1024/1440px, all three states, keyboard activation, selected state, stable height, control bounds, nested links/focus, disclosures, reduced motion, and contrast. No uncaught browser exceptions. Desktop/mobile screenshots and report-state captures are linked from the review. Captures use reduced motion and temporarily hide the sticky header for isolated section framing.

Limits: Chrome only; no Safari/Firefox, physical-device, OS screen-reader, or production performance audit. External demo/private implementation not independently verified. Screenshot review is still required; passing tests does not establish visual success.

## Next work, in order

1. Obtain user approval or feedback on Bloom Rescue; address feedback within scope.
2. Preserve the approved homepage, ResearchFlow, and Portal, plus original standalone simulation and reducer rules.
3. Keep the distinction between Bloom's documented recovery design and the working deadline companion explicit; do not imply verified model behavior.
4. Final visual/responsive/accessibility/performance polish and independent adversarial review across design, engineering, accessibility, performance, and hiring perspectives.
5. Deployment only with explicit approval. [deploy.yml](../.github/workflows/deploy.yml) runs GitHub Pages deployment on main pushes; pushing is consequential.

## Repository state at handoff

Latest observed HEAD is `3224214` (`phase 3 changes`), advanced externally during this work; this agent did not commit, push, or deploy. Nothing is staged. Portal changes, new evidence/styles, review outputs, and handoff updates remain in the working tree; the browser run also regenerated four tracked ResearchFlow screenshots. Re-read `git status --short` before continuing and preserve this working tree. Earlier handoff Git status is historical, not the current baseline.


## Phase 4B — implemented, pending visual approval (2026-10-21)

This entry supersedes the earlier next-work and Bloom approval boundary; the previous handoff history above is retained. The user approved all three case studies and explicitly authorized Phase 4B hiring-impact refinement. Implementation and verification are complete. **STOP for the user’s visual approval. Do not begin final polish, CSS consolidation, SEO/social-preview work, or deployment.**

Current order: Hero → compact Selected-Work Preview (#work) → Professional Experience (#experience) → detailed case studies (#case-studies) → existing How I Work / Skills / Initiative / About → Contact. The original Interface Study (#interface-study) is retained inside the optional native #additional-interface-study disclosure after Bloom, with independent state and unchanged reducer semantics. Deep links open it. Standalone decision, undo/reset and validation focus are now handled explicitly.

New source: `src/SelectedWorkPreview.tsx`, `src/phase4b.css` (loaded after foundation.css in main.tsx). App.tsx orchestrates the approved order. Employment wording uses only existing content.ts experience/toolkit facts; unknown ownership, outcomes and constraints are listed for confirmation in the review. Showcase copy is shorter, original evidence is intact, and ResearchFlow now also links to local implementation evidence. Its public application and /about engineering notes loaded during the recheck; a loading screen alone must not be called a persistent failure.

Full details, file changes, factual mapping, red/green regressions, limitations and Git state: `/Users/anu/developer-portfolio/docs/visual-review/phase-4b-review.md`.

All checks passed: 11 unit tests; explicit TypeScript; production build; full foundation/ResearchFlow/Portal/Bloom/Phase 4B browser suite; Git whitespace check. Browser verification uses the already-installed Chromium headless shell with `PORTFOLIO_SINGLE_PROCESS=1` and `CHROME_PATH=/Users/anu/Library/Caches/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-mac-arm64/chrome-headless-shell` because this execution environment denies default Chrome registration ports. No software was installed or machine setting changed. `tests/phase4b.browser.mjs` adds focus, reading-order, preview link, optional deep-link, closed-study keyboard, contrast, spacing and screenshot checks. Standard Chrome remains the runner default when no overrides are supplied. Logs: `docs/visual-review/phase-4b-checks.txt`, `phase-4b-verification.txt`, `phase-4b-git-status.txt`.

Exact review captures:
- `/Users/anu/developer-portfolio/docs/visual-review/phase-4b-desktop-hero-preview.png`
- `/Users/anu/developer-portfolio/docs/visual-review/phase-4b-mobile-hero-preview.png`
- `/Users/anu/developer-portfolio/docs/visual-review/phase-4b-desktop-experience.png`
- `/Users/anu/developer-portfolio/docs/visual-review/phase-4b-mobile-experience.png`
- `/Users/anu/developer-portfolio/docs/visual-review/phase-4b-desktop-experience-to-cases.png`
- `/Users/anu/developer-portfolio/docs/visual-review/phase-4b-mobile-experience-to-cases.png`

Final captures were inspected after resolving a reviewed CSS load-order issue; a failing rendered-padding test now guards it. The standalone focus test failed on the saved pre-task source and passes after the fix. Legacy review screenshots/check reports regenerated by the suite were restored to their pre-task bytes so historical review evidence is preserved. No reducer, hero, navigation component, original evidence component, dependency, metadata or deployment workflow changes were made.

Branch and HEAD remain `main` / `3224214658b841ff0baff6f269c70100f220e4bf`. Prior working-tree changes and important untracked source files remain. Nothing staged, committed, pushed or deployed. Read current status before any later authorized work.


## Phase 5 — final audit and release candidate (2026-10-21)

The user visually approved Phase 4B, the homepage and all three case studies. This entry supersedes the earlier pending-Phase-4B boundary while retaining its history. Phase 5 audit, permitted small fix, verification and release checklist are complete. **STOP for explicit approval before the first commit or any push/deployment.** No staging, commit, push, deployment, dependency installation, machine-setting change, unapproved redesign or workflow change was performed.

Pre-change audit: `docs/visual-review/phase-5-audit.md`. Final findings/actual changes/results/limits: `docs/visual-review/phase-5-review.md`. Staging/deployment/rollback plan: `docs/visual-review/phase-5-release-checklist.md`; exact required code/test/handoff paths: `phase-5-required-staging.txt` in the same directory. Essential untracked imports/styles/tests must accompany the approved tracked changes; do not make a tracked-only release.

Only application edit: App.tsx shows “Copy unavailable” after clipboard rejection while preserving normal/success labels, SR feedback, mailto fallback and approved layout. New `tests/phase5.browser.mjs` reproduces the old missing-visible-feedback bug, tests failure/success plus responsive layout and assets, and is invoked by `tests/browser-foundation.smoke.mjs`. No employment, hero, case study, reducer, evidence, CSS, metadata, public asset, dependency, ignore or deployment configuration change was made.

All checks passed: 11 unit tests, TypeScript, production build, all browser suites, Git whitespace. Browser suites also passed against the actual production build via preview on port 5181. Continue using the documented installed-headless-shell/single-process environment fallback when needed. Logs: `docs/visual-review/phase-5-verification.txt`, `phase-5-production-browser.txt`, `phase-5-checks.txt`.

Local lab observations (not Lighthouse or field Core Web Vitals): desktop FCP 288ms / observed LCP 388ms / raw load-window CLS 0.00326; mobile 390px with 4x CPU and requested network throttling FCP 972ms / observed LCP 1236ms / CLS 0.00105. See `phase-5-local-lab.json` and the final report for methodology/limits. No Lighthouse was installed; no INP/production percentile claim is made.

ResearchFlow app and /about notes loaded in connected Chrome despite shell HTTP timeouts. GitHub/public root returned 200; LinkedIn’s automated 999 is not a verified dead link. Actual PDF signature/readability and favicon/social SVG responses were checked. Social art/format compatibility, stronger ownership evidence and further shortening remain optional, approval-requiring tasks; they are not manufactured release blockers.

Modified-area captures (both visually inspected):
- `/Users/anu/developer-portfolio/docs/visual-review/phase-5-desktop-contact.png`
- `/Users/anu/developer-portfolio/docs/visual-review/phase-5-mobile-contact.png`

Earlier review artifacts regenerated by browser tests were restored to their exact pre-Phase-5 bytes. Existing important working-tree changes/untracked files were preserved. Current main/HEAD remain `3224214658b841ff0baff6f269c70100f220e4bf`; nothing staged. A future main push triggers Pages automatically, so commit approval is not push/deployment approval. Re-read current Git status before later authorized work.
