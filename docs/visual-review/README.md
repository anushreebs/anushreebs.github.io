# Phase 2 visual review

The Interactive Engineering Edition: dark editorial foundation, restrained apricot, DM Sans with Georgia display emphasis, responsive navigation, and a synthetic ResearchFlow study. This phase changes the header/hero and shared visual tokens. Case-study content and the review simulation retain their existing implementations.

## Inspect the rendered result

- [Desktop screenshot](./phase-2-desktop.png), 1440 CSS px wide.
- [Mobile screenshot](./phase-2-mobile.png), 390 CSS px wide.
- [Browser check results](./phase-2-checks.txt).

Screenshots include the entire opening section, so they are taller than the viewport. Reduced motion is enabled for deterministic captures. Review the live site to judge timing and hover behavior. These images are a review deliverable, not a claim of visual approval.

## Run locally

From the repository directory, with Node/npm available:

```sh
npm ci
npm run dev -- --port 5173
```

Open http://127.0.0.1:5173. If dependencies are already installed, skip `npm ci`.

```sh
npm test
npx tsc --project tsconfig.app.json --noEmit
npm run build
```

With the dev server running in another terminal:

```sh
npm run test:browser
```

The browser smoke script uses installed Chrome and Node's built-in WebSocket support. It creates and removes a temporary Chrome profile; it does not install packages or use your normal profile. Default Chrome path is the macOS application path. Set `CHROME_PATH` to a different executable or `PORTFOLIO_URL` to a different server address if needed. The test regenerates the screenshots and check-results file.

## Coverage and limitations

Final local checks passed on Node 24.21.0: 11 reducer tests, explicit TypeScript check, production build, browser smoke checks, and Git whitespace checks. All 15 pre-existing extracted component/helper bodies match the preserved original source. No changes to project content, reducer logic, original stylesheets, existing unit tests, public assets, or dependency lockfile.

Production assets: JavaScript 282.66 kB / 84.04 kB gzip; CSS 83.36 kB / 15.84 kB gzip. Compared with Phase 1, gzip growth is approximately 1.23 kB JavaScript and 3.18 kB CSS. This is an asset-size comparison, not a measured loading-speed result.

- Real headless Chrome: desktop, tablet, and mobile widths from 320 to 1920 CSS px.
- Header/hero control visibility and 44px minimum height, menu keyboard entry/Escape/focus restoration, hidden-link exclusion, section focus, and skip-link activation.
- Overview/finding selection, pressed state, and stable panel height.
- Existing review simulation: approval, undo, rejection, reset.
- Reduced-motion CSS, selected text/focus contrast pairs, uncaught runtime exceptions.
- 720 CSS px reflow approximates the layout width of a 1440px window at 200% zoom; native browser zoom UI and OS screen-reader testing were not performed.
- No Safari/Firefox or physical-device test, comprehensive WCAG audit, Lighthouse score, or production Core Web Vitals measurement.
- Existing Google Fonts loading remains. No new runtime dependencies or image assets were added to the website.
- Existing case-study layout rules remain in the legacy stylesheets; consolidation belongs to the later project/simulation phases. Shared palette aliases apply the new colors without changing those components' structure.

The first browser pass identified a roughly 2px study-height change; the shared minimum height was adjusted and the assertion now passes. A keyboard assertion was generalized after the experience link was added, so it checks hidden navigation exclusion rather than assuming a particular hero link is first.

No commit, push, or deployment was performed. Phase 3 remains pending user feedback.
