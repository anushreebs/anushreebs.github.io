# Phase 3 — Bloom Rescue review

Bloom-only implementation; awaiting visual approval before final portfolio polish. Homepage, ResearchFlow, and Collaborator Portal were already approved. No commits, pushes, deployments, dependency installations, or machine settings changes were performed by the agent.

## Evidence audit before implementation

The original portfolio describes Bloom as an independent local simulation for application workflows: evidence-supported answers, explicit human decisions, and reconciliation before retrying an uncertain submission. Its private source is not present here. Existing project notes describe retrieval, structured suggestions, source-ID/quotation checks, local simulated submissions, and reconciliation. Those are reported implementation details, not independently verified backend behavior.

An optional model/API path is described, but no live model call or independent evaluation is established. Neither deterministic nor optional API mode is described as authorizing approval or submission on a person's behalf. Provenance checks do not establish source truth or general semantic entailment. All these limitations and the original evidence text remain intact.

The actual testable implementation in this portfolio is the separate [review reducer](../../src/reviewWorkflow.ts) and [standalone interface study](../../src/InterfaceStudy.tsx). It uses a fictional research record and predefined date. It validates calendar dates and override reasons, supports approval/rejection, invalidates decisions when edited, and provides undo/reset and local activity feedback. It does not demonstrate Bloom's application-recovery workflow, retrieval, model inference, or external submissions.

## Design and behavior

A restrained rose editorial case study frames a working decision workbench: light source evidence beside a dark editable proposal, followed by the actual local record and activity trail. There is no stage selector or requester/admin dossier. Source inspection, deterministic checks, explicit decisions, and recovery each have a clear role.

The companion reuses the **unchanged reducer and validation function**, with its own independent state. The original standalone simulation is unchanged. Permanent labels explain that this is a working companion simulation, not a reconstruction of Bloom's private application. It calls no API and creates no external action.

Empty dates and unjustified overrides block approval and focus the affected field. Successful approval changes only the local record. Rejection preserves it. Decisions move focus to undo; undo restores the prior local snapshot and returns focus to approval. Editing clears the prior decision according to the existing reducer. Activity is local memory and resets with the example; it is not a persistent audit log.

Engineering sections distinguish documented Bloom architecture from the testable portfolio exercise, explain contribution and trade-offs, and retain native disclosures for original evidence. Source inspection is available but is not an enforced prerequisite in the reducer. An override reason records intent; it does not prove factual support.

## Exact changes

- [BloomCase.tsx](../../src/BloomCase.tsx): editorial presentation, problem/contribution, decisions, architecture boundaries, evidence navigation.
- [BloomEvidence.tsx](../../src/BloomEvidence.tsx): original evidence markup and IDs extracted verbatim.
- [BloomWorkbench.tsx](../../src/BloomWorkbench.tsx): companion UI using the existing reducer, field validation/focus, local result, recovery, and activity.
- [bloom.css](../../src/bloom.css) and [bloom-workbench.css](../../src/bloom-workbench.css): scoped presentation, responsive workbench, controls, and reduced-motion treatment.
- [ProjectShowcases.tsx](../../src/ProjectShowcases.tsx): now re-exports the three individual showcases; removes superseded Bloom markup/helpers.
- [bloom.browser.mjs](../../tests/bloom.browser.mjs): rendered behavior, layout, focus, contrast, and screenshot checks.
- [browser-foundation.smoke.mjs](../../tests/browser-foundation.smoke.mjs): invokes Bloom checks after existing suites.
- [CODEX_HANDOFF.md](../CODEX_HANDOFF.md): current approval boundary and Bloom implementation context.
- This report, [check results](./bloom-checks.txt), and eight screenshots below. The shared browser suite also regenerated previous Phase 2.1, ResearchFlow, and Portal captures/check outputs.

## Review locally and screenshots

From the repository, run `npm run dev -- --port 5173`, then open [Bloom Rescue](http://127.0.0.1:5173/#bloom-rescue).

| State | Desktop | Mobile |
| --- | --- | --- |
| Full showcase, source open | [Desktop](./bloom-desktop-showcase.png) | [Mobile](./bloom-mobile-showcase.png) |
| Override blocked | [Desktop](./bloom-desktop-validation.png) | [Mobile](./bloom-mobile-validation.png) |
| Approved locally | [Desktop](./bloom-desktop-approved.png) | [Mobile](./bloom-mobile-approved.png) |
| Undo restores record | [Desktop](./bloom-desktop-undo.png) | [Mobile](./bloom-mobile-undo.png) |

Captures use 1440px and 390px widths, reduced motion, and temporarily hide the sticky header for isolated framing. The header is restored afterward. Full mobile captures are tall; view at actual size to inspect typography. Screenshot/code inspection identified and corrected a mobile text-spacing issue and validation copy that initially failed to acknowledge completed decisions.

## Verification

- `npm test`: **11 passed, 0 failed**; existing calendar/override/reducer tests.
- `npx tsc --project tsconfig.app.json --noEmit`: **passed**.
- `npm run build`: **passed**, 38 modules. JavaScript **89.01kB gzip**, CSS **22.14kB gzip**. Build sizes are not runtime performance scores.
- `npm run test:browser`: **passed** in installed Chrome, including all existing homepage, ResearchFlow, Portal, and standalone simulation checks. No uncaught browser exceptions.
- Bloom checks: source disclosure, empty-date rejection, required override reason, valid override approval, keyboard approval, rejection, undo/reset, editing invalidates approval, activity feedback, independent original simulation, and no fetch/XHR requests.
- Widths **1440/1024/768/390/320px** fit without horizontal overflow; visible controls meet 44px height checks. Expanded evidence fits 320px. Evidence deep links and error/decision/recovery focus behavior pass.
- Reduced-motion button transitions are disabled. Tested rendered text contrast pairs range **5.31:1–11.18:1**; individual results are recorded in the check output.
- Source snapshot comparisons: approved homepage, ResearchFlow, Portal, standalone simulation, reducer, professional content, and global styles are unchanged. Original Bloom evidence retained verbatim.
- `git diff --check`: **passed**.

The first browser attempt could not load the stopped local server; it was restarted using the existing dev command. Subsequent verification completed successfully. No dependency or system-tool installation was needed.

## Limits and next step

Chrome-only automated/rendered review; no physical-device, Safari/Firefox, OS screen-reader, or production performance audit. Private Bloom source and model integration remain unverified. The companion does not establish application-recovery correctness or AI performance. Undo restores a local snapshot; it does not reverse external actions.

The captures have been visually inspected, but user visual approval remains pending. Stop here. Final portfolio polish and deployment require subsequent authorization.
