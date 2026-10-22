# Phase 5 — Pre-change audit

October 21, 2026. Written before application edits. Phase 4B and all visual compositions are approved. Review is based on current source, rendered production build, prior Phase 4B evidence, and a fresh local browser probe.

## Overall hiring assessment

**8/10, editorial judgment:** Interview-worthy for frontend-heavy software engineering internships. Production React work across three employers, inspectable state/validation decisions and deliberate interaction design support that recommendation. The portfolio demonstrates frontend implementation and product judgment more directly than production backend ownership or live model integration. Current qualifications correctly state that boundary.

- **10 seconds:** name, frontend-heavy full-stack identity, React/TypeScript and ZEE/Straumann/Virtusa are visible in the hero.
- **30 seconds:** compact project index makes the three distinct engineering problems and contributions scannable; résumé and experience shortcuts are available.
- **60 seconds:** professional responsibilities/testing context and the case-study decision paths are discoverable. Mobile requires more scrolling because the approved hero is tall.

These are reviewer impressions, not a timed user study.

## Five highest-impact weaknesses

| Priority | Observation | Decision |
| --- | --- | --- |
| P1 release gate | Nine implementation/style files and two browser suites are untracked, including components imported by tracked source. A selective commit could omit required work. | Prepare explicit source/test/docs staging checklist; do not stage, commit or deploy. No current local build failure is implied. |
| P1 small bug | Clipboard failure is announced only in `.sr-status`; the visible Copy email button remains unchanged. Reproduced by rejecting the browser clipboard operation; button remained `Copy email` while status said unavailable. | Safely change only the failure-state button label to `Copy unavailable`; preserve normal label, layout, email link, and screen-reader explanation. Add real UI regression coverage. |
| P2 evidence | Employment descriptions identify relevant work but do not establish specific architecture ownership, project scale, or measured outcomes. | Preserve approved copy. Ask for verified examples in a future content task if needed; no invented outcomes. |
| P2 evidence | Bloom’s live portfolio exercise is deterministic and separate from the documented application-recovery/model path. Public source/backend evidence for Portal and Bloom remains unavailable. | Preserve truthful labels and original evidence. Do not imply evaluated AI or production security; no new project or integration. |
| P2 polish | The page remains long; recurring limitations and the old lime-accented social SVG contrast with the current apricot editorial identity. | Approved reading order and scope labels remain. Further shortening/social-art redesign is optional and requires approval; do not manufacture a redesign task. |

## Critical bugs and blockers

No verified P0 runtime, missing internal anchor, duplicate DOM ID or horizontal-overflow blocker was found in the fresh production-build probe. Final full regression verification is still required. The completeness of a future commit is a release gate. A push to main triggers Pages and is not authorized.

## Before deployment versus optional

**Worth doing now:** visible clipboard-failure feedback; fresh tests/build/browser verification; public-link and asset checks; targeted credential-pattern scan; explicit staging and rollback checklist.

**Optional / approval required:** stronger employment claims, live AI demonstrations, shorter or redesigned approved sections, new social artwork, CSS consolidation, dependency-range changes, deployment/CI changes. SVG social-image compatibility is a risk to validate on target platforms, not a reproduced platform-specific failure: the old X documentation URL redirects to the current API overview and did not establish a current primary-source rule.

**Leave untouched:** hero headline and positioning, typography, section architecture, all three project identities and interactions, professional dates/titles/accomplishments, reducer semantics, original evidence, navigation destinations, dependencies and deployment configuration.

## Initial technical evidence

- Local production-build desktop: FCP 288ms, observed LCP 388ms, raw 7-second load-window CLS 0.00326.
- Local production-build mobile lab (390px; 4x CPU, 150ms requested network latency, 1.6Mbps down / 750kbps up): FCP 972ms, observed LCP 1236ms, raw load-window CLS 0.00105.
- Single synthetic observations in installed Chromium headless single-process mode, not Lighthouse, production Core Web Vitals, percentile measurements or INP. Browser caches disabled; font/network/process effects can differ from a real device. Local navigation TTFB remained very low; the requested network conditions are not proof of an effective production network profile.
- No Lighthouse executable/package is installed in the repository or available on PATH; none will be installed.
- No duplicate IDs, missing hash targets, page overflow at sampled desktop/mobile widths, or uncaught exceptions in this probe.
- Credential-pattern scan of 93 tracked/nonignored candidate files found no private-key blocks or common GitHub/AWS/OpenAI token patterns. No root `.env*` files were present. This is a bounded pattern scan, not a guarantee or Git-history secret audit.

Final results, actual changes, screenshots and staging checklist will be recorded in `phase-5-review.md` after verification.
