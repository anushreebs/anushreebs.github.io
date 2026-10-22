# Phase 3 — Collaborator Portal review

Scope: Collaborator Portal only. ResearchFlow is now user-approved. Portal awaits approval before Bloom Rescue work begins. No commits, pushes, deployments, dependency installations, or machine settings changes.

## Presentation and evidence

The new composition uses a slate-blue dossier, two simultaneous requester/administrator perspectives, and a separate delivery boundary. It differs from ResearchFlow's stage-based record trace. Pending, Approved, and Rejected controls select explanatory examples and update the ledger and announced consequence. They do not submit requests, change roles, authorize access, call the project API, or download files. Synthetic/reconstruction labels remain visible in every state.

The full discovery → inspection → request → administrator review → approval/rejection → authorized download workflow remains visible. Inspectable decisions cover operation-level authorization, pending/duplicate request handling, and the distinction between access outcomes and asynchronous failures. Frontend, GraphQL operations, GraphQL Yoga, and PGlite responsibilities are separated. Implementation claims remain attributed to existing project notes; no new production or security guarantees are asserted.

The original Portal evidence markup, technical details, limitations, and anchor IDs were extracted verbatim. Original workflow, authorization, architecture, and limitations links remain reachable. A snapshot comparison confirms the approved homepage, ResearchFlow, standalone review simulation/reducer, and Bloom component were unchanged.

## Exact source and test changes

- [CollaboratorCase.tsx](../../src/CollaboratorCase.tsx): new presentation, explanatory outcomes, decisions, responsibility map, and focused evidence navigation.
- [CollaboratorEvidence.tsx](../../src/CollaboratorEvidence.tsx): original nested evidence extracted intact.
- [collaborator.css](../../src/collaborator.css): scoped palette, dossier layout, typography, responsive states, controls, and reduced-motion rules.
- [ProjectShowcases.tsx](../../src/ProjectShowcases.tsx): re-export new Portal component; remove superseded Portal gallery/workflow helper and unused imports. Bloom and its retained helpers remain unchanged.
- [collaborator.browser.mjs](../../tests/collaborator.browser.mjs): rendered interaction, navigation, responsive, contrast, reduced-motion, no-request assertions, and screenshot capture.
- [browser-foundation.smoke.mjs](../../tests/browser-foundation.smoke.mjs): invoke Portal checks after existing checks.
- [CODEX_HANDOFF.md](../CODEX_HANDOFF.md): record ResearchFlow approval and Portal review boundary.
- This review, [check output](./collaborator-checks.txt), and the six PNGs below are new review outputs. The shared browser suite also regenerated existing Phase 2.1/ResearchFlow screenshots and check outputs.

## Inspect locally

Run `npm run dev -- --port 5173` from the repository and open [Collaborator Portal](http://127.0.0.1:5173/#collaborator). Select each outcome, use Tab/Enter, open engineering decisions, and follow the evidence links.

| View | Desktop | Mobile |
| --- | --- | --- |
| Full showcase / pending | [Desktop](./collaborator-desktop.png) | [Mobile](./collaborator-mobile.png) |
| Approved example | [Desktop](./collaborator-desktop-approved.png) | [Mobile](./collaborator-mobile-approved.png) |
| Rejected example | [Desktop](./collaborator-desktop-rejected.png) | [Mobile](./collaborator-mobile-rejected.png) |

Captures use 1440px and 390px widths with reduced motion. The harness temporarily hides the sticky header for isolated section captures and restores it afterward. Full mobile captures are tall; inspect at actual size for text. Rendered screenshot review caught a wrapping dossier number and cramped delivery labeling; both were corrected and captures regenerated.

## Verification

- `npm test`: **11 passed, 0 failed** (existing reducer/date-validation tests).
- `npx tsc --project tsconfig.app.json --noEmit`: **passed**.
- `npm run build`: **passed**, 33 modules; JavaScript **86.95kB gzip**, CSS **20.08kB gzip**. No dependency added. These are build sizes, not performance scores.
- `npm run test:browser`: **passed** in installed Chrome. Existing homepage, ResearchFlow, menu, and standalone review checks pass. No uncaught browser exceptions.
- Portal states and controls fit **1440, 1024, 768, 390, and 320px**. Expanded evidence also fits down to 320px. Visible interactive controls meet the 44px height check.
- Keyboard activation, selected state, visible focus, polite live outcome, disclosure opening, and architecture/authorization focus handoffs pass. The first navigation test exposed competing focus from the global hash handler; Portal navigation now handles its own unmodified in-page link activation while preserving native modified clicks and hash history.
- Reconstruction selections make **no fetch/XHR requests** and expose **no download link**.
- Reduced motion disables selector transitions. Measured rendered text contrast pairs range **5.52:1–10.67:1** on the light ledger and **8.53:1–11.66:1** for tested selected/dark-panel content. See check output for individual pairs.
- `git diff --check`: **passed**. Existing unrelated working-tree changes were preserved.

## Limits and approval boundary

Chrome checks do not establish Safari/Firefox, physical-device, OS screen-reader, or production performance behavior. The private Portal source, its described API tests, and backend authorization were not independently verified. This portfolio interaction explains existing notes; it is not a backend security test. No institutional adoption, identity integration, production security, or measured user outcome is claimed.

Visual inspection covered the rendered desktop/mobile showcase and outcome views. Passing checks does not establish visual approval. Await user feedback on this Portal redesign; do not start Bloom Rescue yet.
