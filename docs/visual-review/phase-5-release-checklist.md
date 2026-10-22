# Portfolio release checklist — plan only

**No staging, commit, push, deployment or configuration change has been executed.** Phase 4B and visual compositions are approved. Phase 5 is a verified release candidate, pending approval for the first commit and deployment.

## Packaging gate

The local site works, but important imported source is untracked. A tracked-files-only commit would omit required components. Do not use `git commit -am` as the release procedure. Do not run `git clean`, reset, checkout, stash, or broad cleanup on this working tree.

Required code/test/handoff paths are listed individually in [phase-5-required-staging.txt](phase-5-required-staging.txt). Existing unchanged tracked files (package files, public assets, base styles, other components and tests) are already versioned and must remain in the checkout.

The currently untracked implementation files that must be included are:

- `src/BloomCase.tsx`
- `src/BloomEvidence.tsx`
- `src/BloomWorkbench.tsx`
- `src/CollaboratorEvidence.tsx`
- `src/SelectedWorkPreview.tsx`
- `src/bloom-workbench.css`
- `src/bloom.css`
- `src/collaborator.css`
- `src/phase4b.css`
- `tests/bloom.browser.mjs`
- `tests/phase4b.browser.mjs`
- `tests/phase5.browser.mjs`

## Documentation and generated artifacts

These are deliberate review artifacts, not runtime dependencies:

- Keep `docs/CODEX_HANDOFF.md`, the Phase 4B implementation plan, Bloom/Portal/Phase 4B/Phase 5 review reports, and this release checklist as project documentation.
- Screenshots under `docs/visual-review/` are generated visual evidence. Prefer keeping the captures referenced by retained reviews, including the six Phase 4B captures and the two Phase 5 contact captures. They do not belong in `public/` or `dist/`.
- Small check/verification logs and `phase-5-local-lab.json` support the reports. Raw Git-status snapshots are historical local-state evidence, not instructions to reproduce a future stage. They are optional repository documentation; if omitted, remove or revise corresponding report links before publishing those docs.
- Preserve previously modified ResearchFlow captures; they predate Phase 5. Phase 5 restored all older generated captures/check reports to their exact pre-task bytes rather than replacing approved historical evidence.

**Do not commit:** `node_modules/`, `dist/`, `.DS_Store`, `*.tsbuildinfo`, `.env`, `.env.*`, `*.local`, browser profiles, crash logs, temporary servers, or this chat’s `work/` snapshots/probes. Existing `.gitignore` covers repository-local dependencies/build output/environment files/OS clutter. No `.gitignore` edit was needed. No such temporary profiles or probe scripts were added to this repository.

## Approval and safe staging sequence — do not execute yet

- [ ] Obtain explicit approval for the first commit, after the user reviews Phase 5 findings and screenshots.
- [ ] Re-read `git status --short`, branch and HEAD; preserve any changes made after this audit. Baseline is main / `3224214658b841ff0baff6f269c70100f220e4bf`.
- [ ] Inspect the explicit required manifest and the chosen documentation/capture set. Review factual claims and the existing public résumé/contact details.
- [ ] Stage only reviewed paths, including all required untracked source and tests. A possible future command is `git add --pathspec-from-file=docs/visual-review/phase-5-required-staging.txt`; it was not run. Add selected documentation/captures explicitly afterward, never force-add ignored artifacts.
- [ ] Review `git diff --cached --stat`, `git diff --cached`, and `git diff --cached --check`; confirm no missing imports, secrets, or unintended generated output. Confirm package-lock, metadata and workflow are unchanged unless separately approved.
- [ ] Run the documented tests/build/browser checks on the intended release contents. After an approved commit, verify a separate clean checkout includes every import and referenced asset; avoid untracked-file masking. Do not use destructive checkout/reset operations in the current dirty workspace.
- [ ] Commit only after approval. A commit is not permission to push or deploy.

## Deployment readiness — separate approval required

- [ ] Confirm the approved commit and intended root URL `https://anushreebs.github.io/`.
- [ ] Confirm GitHub Pages settings use the existing Actions workflow, deployment permissions/environment approvals are correct, and the current workflow run will build the intended commit. Repository settings/current CI state were not inspected or changed here.
- [ ] The user-site remote is `anushreebs/anushreebs.github.io`; `base: '/'`, canonical URL and root asset links match that layout. A future move to a project subpath would require a separately approved configuration change.
- [ ] Obtain explicit push/deployment approval. **Pushing main triggers `.github/workflows/deploy.yml` automatically.** No push is authorized by this checklist.
- [ ] Observe the Actions result rather than treating a local build as proof of deployment success.
- [ ] After the approved deployment, check root page, built JS/CSS, favicon, résumé, internal hash/evidence links, mobile menu, copy-email success/failure, all three case-study controls, and independent simulations on the actual public origin.
- [ ] Recheck ResearchFlow cold-start/loaded behavior, GitHub and LinkedIn in a normal user browser. Do not classify anti-bot responses as dead links.
- [ ] Check actual social-platform preview rendering. The existing SVG and older artwork remain an optional compatibility/branding task; no platform-specific failure was reproduced here.

## Rollback plan — prepare, do not execute

- Record the previous successful Pages deployment/commit before any approved push.
- Stop the release if CI/build fails, required code/assets are missing, résumé/contact actions fail, critical navigation or keyboard flows break, or the public page renders blank.
- With approval, restore a previously successful Pages deployment or create a reviewed revert commit; do not force-push/reset the shared branch or discard this working tree. A revert pushed to main also deploys automatically.
- No fabricated production error/latency thresholds are used: this portfolio has no established field-monitoring baseline.

## Scan scope and limitations

A bounded scan of 93 tracked/nonignored pre-change files found no private-key blocks or common GitHub/AWS/OpenAI token patterns. No root environment files were present. The existing one-page résumé is a valid readable PDF and contains intentional professional contact information. This is not an exhaustive data-loss-prevention or Git-history secret audit. Review the candidate staging diff before the first commit.
