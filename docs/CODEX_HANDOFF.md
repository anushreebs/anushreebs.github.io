# Codex handoff — developer portfolio

Updated 2026-10-21. Workspace: `/Users/anu/developer-portfolio`.

## Start here: scope and approval

This is an existing portfolio, not a greenfield rebuild. Preserve the current working tree. Phase 2.1 is approved. **ResearchFlow's Phase 3 redesign is implemented and verified, but awaits user approval.** Do not begin Collaborator Portal or Bloom Rescue until that approval arrives. The handoff request authorizes documentation only. No commit, push, deployment, dependency installation, or machine configuration changes are authorized.

## Purpose, audience, and stack

Anushree B S is a frontend-heavy full-stack software engineer targeting engineering internships and teams that value React/TypeScript depth, complex production interfaces, product judgment, APIs, accessibility, validation, and practical AI integration. Readers are engineering hiring managers, founders, and product teams. Preserve the exact education, employment dates, availability, contact information, and project qualifications in the source.

React + strict TypeScript + Vite; plain CSS, hooks, native disclosures, and a separate review-workflow reducer. This portfolio is a client-only single-page application with hash navigation. It has no portfolio backend or live model calls. No Motion or GSAP dependency was introduced. Package versions are governed by the existing lockfile; the manifest uses `latest` ranges. See [package.json](../package.json), [package-lock.json](../package-lock.json), and [tsconfig.app.json](../tsconfig.app.json).

## Completed work

- **Baseline/structure:** extracted maintainable components and navigation helpers while preserving existing presentation and behavior; established tests/build and CI test execution. See [baseline plan](./superpowers/plans/2026-10-21-baseline-and-structure.md).
- **Phase 2:** established editorial tokens, responsive navigation, “Clarity, engineered.” hero, immediate professional credibility, and an interactive ResearchFlow hero composition. See [foundation plan](./superpowers/plans/2026-10-21-premium-visual-foundation.md) and [visual review](./visual-review/README.md).
- **Phase 2.1 — approved:** sharpened concrete React/TypeScript positioning, added verified employer responsibilities, clarified preview controls/feedback, tightened mobile spacing, and polished accessible interaction states. See [review](./visual-review/phase-2-1-review.md).
- **Phase 3, ResearchFlow only — awaiting approval:** distinct sage product-led showcase with source → validation → report explanation, inspectable decisions, architecture links, visible evidence boundaries, and original detailed evidence retained. Portal and Bloom remain unchanged. See [ResearchFlow review and screenshots](./visual-review/researchflow-review.md).

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
- [ProjectShowcases.tsx](../src/ProjectShowcases.tsx): existing Portal/Bloom presentations and shared helpers; re-exports ResearchFlow.
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

**Portal/Bloom:** currently older presentations and documented workflows. Portal's documented GraphQL/PGlite workflow is not a live institutional authorization backend in this portfolio. Bloom's optional model path is unverified; the portfolio does not demonstrate live model inference. Preserve every existing qualification about implementation, prototypes, simulations, conceptual work, human authority, and limitations.

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

The last implementation verification, recorded in [ResearchFlow review](./visual-review/researchflow-review.md), passed all 11 unit tests, explicit TypeScript check, production build, browser suite, and Git whitespace checks. Built gzip sizes: JS 85.48kB, CSS 18.43kB; these are not performance scores. Tests were not rerun for this documentation-only handoff.

Foundation checks covered 320–1920px; ResearchFlow checked 320/390/768/1024/1440px, all three states, keyboard activation, selected state, stable height, control bounds, nested links/focus, disclosures, reduced motion, and contrast. No uncaught browser exceptions. Desktop/mobile screenshots and report-state captures are linked from the review. Captures use reduced motion and temporarily hide the sticky header for isolated section framing.

Limits: Chrome only; no Safari/Firefox, physical-device, OS screen-reader, or production performance audit. External demo/private implementation not independently verified. Screenshot review is still required; passing tests does not establish visual success.

## Next work, in order

1. Obtain user approval or feedback on ResearchFlow; address feedback within scope.
2. Collaborator Portal: distinct discovery → request → approval → download presentation, explicit authorization/state boundaries, existing evidence only. Inspect/reuse first; verify and capture desktop/mobile.
3. Bloom Rescue: evidence provenance, deterministic validation, human approval, recovery; clearly distinguish optional AI and implemented behavior. Verify and capture separately.
4. Final visual/responsive/accessibility/performance polish and independent adversarial review across design, engineering, accessibility, performance, and hiring perspectives.
5. Deployment only with explicit approval. [deploy.yml](../.github/workflows/deploy.yml) runs GitHub Pages deployment on main pushes; pushing is consequential.

## Repository state at handoff

Branch `main`, HEAD `d5971a7`. Nothing staged. Five tracked files are modified: deployment workflow, HTML entry, package manifest, App, and React entry (linked above). Documentation, extracted/new presentation modules, foundation/ResearchFlow styles, navigation helper, and browser tests are untracked. This includes approved work from prior phases, not only ResearchFlow. No commit, push, or deployment was performed. Re-read `git status --short` before continuing and preserve this working tree.
