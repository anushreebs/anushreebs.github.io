// Dependency-free Chrome smoke test. Run against an already-running Vite server.
// CHROME_PATH overrides the macOS default; PORTFOLIO_URL defaults to localhost:5173.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { checkResearchFlow } from "./researchflow.browser.mjs";
import { checkCollaborator } from "./collaborator.browser.mjs";
import { checkBloom } from "./bloom.browser.mjs";
import { checkStandaloneFocus, checkPhase4B } from "./phase4b.browser.mjs";
import { checkPhase5 } from "./phase5.browser.mjs";

const profile = await mkdtemp(join(tmpdir(), "portfolio-browser-"));
const chrome = spawn(process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
  ...(process.env.PORTFOLIO_SINGLE_PROCESS === "1" ? ["--single-process"] : []),
  "--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profile}`,
  "--no-first-run", "--no-default-browser-check", "about:blank",
], { stdio: "ignore" });
let launchError;
chrome.on("error", error => { launchError = error; });
let socket;
let sequence = 0;
const pending = new Map();
const errors = [];
const results = [];

async function until(fn, message) {
  for (let attempt = 0; attempt < 200; attempt++) {
    if (launchError) throw launchError;
    if (chrome.exitCode !== null || chrome.signalCode !== null) throw new Error(`Browser exited before readiness: code=${chrome.exitCode}, signal=${chrome.signalCode}`);
    const result = await fn();
    if (result) return result;
    await delay(50);
  }
  throw new Error(message);
}

try {
  const port = await until(async () => {
    try { return (await readFile(join(profile, "DevToolsActivePort"), "utf8")).split("\n")[0]; } catch { return null; }
  }, "Chrome did not expose a debugging port");
  const version = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();
  socket = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  socket.onmessage = event => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const call = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) call?.reject(new Error(JSON.stringify(message.error)));
      else call?.resolve(message.result);
    }
    if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails.text);
  };
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  const page = (method, params) => send(method, params, sessionId);
  const evaluate = async expression => {
    const value = await page("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (value.exceptionDetails) throw new Error(value.exceptionDetails.text + ": " + value.result?.description);
    return value.result.value;
  };
  const click = selector => evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
  const key = async (key, code = key, extra = {}) => {
    await page("Input.dispatchKeyEvent", { type: "keyDown", key, code, ...extra });
    await page("Input.dispatchKeyEvent", { type: "keyUp", key, code, ...extra });
  };
  const settle = () => evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))");
  const viewport = async (width, height = 1000) => {
    await page("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
    await settle();
    assert.equal(await evaluate("innerWidth"), width);
  };
  await page("Runtime.enable");
  await page("Page.enable");
  await viewport(1440, 1100);
  await page("Page.navigate", { url: process.env.PORTFOLIO_URL ?? "http://127.0.0.1:5173" });
  await until(() => evaluate("document.readyState === 'complete' && !!document.querySelector('.edition-hero')"), "Portfolio did not load");
  await evaluate("document.fonts.ready.then(() => true)");
  await delay(450);

  for (const width of [1920, 1440, 1024, 800, 768, 720, 390, 320]) {
    await viewport(width);
    assert.equal(await evaluate("document.documentElement.scrollWidth <= innerWidth"), true, `Overflow at ${width}`);
    assert.equal(await evaluate("[...document.querySelectorAll('.edition-header a, .edition-header button, .edition-hero a, .edition-hero button')].filter(el => el.getClientRects().length).every(el => { const r = el.getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth + 1 && r.height >= 44; })"), true, `Control clipping/target size at ${width}`);
    results.push(`Responsive width ${width}: no page overflow; all visible header/hero controls at least 44px high and inside viewport.`);
  }

  results.push("720 CSS px reflow checked (equivalent layout width to 1440px at 200% zoom; not a browser-zoom UI test).");

  await viewport(390, 844);
  assert.equal(await evaluate("document.querySelector('.edition-proof').getBoundingClientRect().bottom < innerHeight"), true, "Professional credibility should be in the opening mobile viewport");
  await evaluate("window.scrollTo(0,0); document.activeElement.blur()");
  await click(".edition-menu");
  assert.equal(await evaluate("document.querySelector('.edition-menu').getAttribute('aria-expanded')"), "true");
  await evaluate("document.querySelector('.edition-menu').focus()");
  await key("Tab");
  assert.equal(await evaluate("document.activeElement.textContent"), "Selected work");
  assert.equal(await evaluate("getComputedStyle(document.activeElement).outlineStyle"), "solid");
  await key("Escape");
  assert.equal(await evaluate("document.activeElement.className"), "edition-menu");
  assert.equal(await evaluate("document.querySelector('.edition-menu').getAttribute('aria-expanded')"), "false");
  await key("Tab");
  assert.equal(await evaluate("document.querySelector('main').contains(document.activeElement)"), true, "Tab from the closed menu should reach main content, skipping hidden navigation links");
  await click(".edition-menu");
  await click(".edition-navigation a[href='#experience']");
  await settle();
  assert.equal(await evaluate("document.activeElement.id"), "experience");
  assert.equal(await evaluate("document.querySelector('.edition-menu').getAttribute('aria-expanded')"), "false");
  results.push("Mobile menu: keyboard entry, visible focus, Escape return, closed-link exclusion, and section-focus handoff passed.");

  const studyHeight = await evaluate("document.querySelector('.study-paper').getBoundingClientRect().height");
  await click(".study-switch button:nth-child(2)");
  await settle();
  assert.equal(await evaluate("document.querySelector('.study-paper').getBoundingClientRect().height"), studyHeight, "Study view switching should not shift surrounding content");
  assert.equal(await evaluate("document.querySelector('.study-switch button:nth-child(2)').getAttribute('aria-pressed')"), "true");
  assert.equal(await evaluate("document.querySelector('.study-content').textContent.includes('travel-costs.csv · row 24')"), true);
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.study-finding-title em')).color"), "rgb(117, 73, 44)", "Finding emphasis must use the high-contrast paper color, not the global apricot");
  assert.equal(await evaluate("document.querySelector('.study-paper-footer strong').textContent"), "$6,171.25");
  assert.equal(await evaluate("document.querySelector('.study-rule').textContent.includes('no record has been edited')"), true);
  await evaluate("document.querySelector('.study-switch button:first-child').focus()");
  await settle();
  assert.equal(await evaluate("document.activeElement === document.querySelector('.study-switch button:first-child')"), true, "Overview control receives focus");
  await key("Enter", "Enter", { windowsVirtualKeyCode: 13, text: "\r" });
  await until(() => evaluate("document.querySelector('.study-switch button:first-child').getAttribute('aria-pressed') === 'true'"), "Keyboard activation should select overview");
  await click(".study-switch button:first-child");
  assert.equal(await evaluate("document.querySelector('.study-amount').textContent"), "$6,171.25");
  results.push("ResearchFlow study: keyboard selection, pressed states, unchanged total, live feedback, stable panel height, and rendered finding-emphasis color passed.");

  await checkStandaloneFocus({ page, evaluate, click, key, settle, viewport });

  await click(".review-actions button:first-child");
  assert.equal(await evaluate("document.querySelector('.record-line strong').textContent"), "2027-09-30");
  await click(".undo-button");
  assert.equal(await evaluate("document.querySelector('.record-line strong').textContent"), "No deadline");
  await click(".review-actions button:nth-child(2)");
  assert.equal(await evaluate("document.querySelector('.review-feedback').textContent"), "Suggestion rejected. The original record is unchanged.");
  await click(".reset-button");
  results.push("Existing review simulation: approve, undo, reject, reset passed in Chrome.");

  await page("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.edition-intro')).animationName"), "none");
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.edition-button')).transitionDuration"), "0s");
  assert.equal(await evaluate("getComputedStyle(document.documentElement).scrollBehavior"), "auto");
  results.push("Reduced motion: entrance animation, button transitions, and smooth scroll disabled.");

  await evaluate("document.activeElement.blur(); window.scrollTo(0,0)");
  await key("Tab");
  // Explicitly focus the skip link, then exercise its native keyboard activation.
  await evaluate("document.querySelector('.skip-link').focus()");
  await key("Enter");
  assert.equal(await evaluate("location.hash"), "#main-content");
  assert.equal(await evaluate("document.activeElement.id"), "main-content");
  results.push("Skip link keyboard activation passed.");

  const contrast = await evaluate(`(() => {
    const lum = hex => { const rgb = hex.match(/../g).map(v => parseInt(v,16)/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4); return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722; };
    return [['body','f2efe8','111315'],['secondary','adb2b8','111315'],['accent','e9b99a','111315'],['primary button','191411','e9b99a'],['paper secondary','595c5a','eee9df'],['paper text','272a2b','eee9df'],['focus on dark','b9d9ff','111315'],['focus on paper','75492c','eee9df']].map(([label,fg,bg]) => ({label,ratio:(Math.max(lum(fg),lum(bg))+.05)/(Math.min(lum(fg),lum(bg))+.05)}));
  })()`);
  for (const pair of contrast) assert.ok(pair.ratio >= 4.5, `${pair.label}: contrast ${pair.ratio}`);
  results.push(...contrast.map(pair => `${pair.label} contrast: ${pair.ratio.toFixed(2)}:1`));

  await mkdir("docs/visual-review", { recursive: true });
  for (const [name, width, height, finding] of [["desktop",1440,1100,false],["mobile",390,844,false],["desktop-finding",1440,1100,true],["mobile-finding",390,844,true]]) {
    await viewport(width, height);
    await click(finding ? '.study-switch button:nth-child(2)' : '.study-switch button:first-child');
    await evaluate("history.replaceState(null,'',location.pathname); document.activeElement.blur(); window.scrollTo(0,0)");
    await settle();
    const heroBottom = await evaluate("document.querySelector('.edition-hero').getBoundingClientRect().bottom");
    const { data } = await page("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: Math.ceil(heroBottom), scale: 1 } });
    await writeFile(`docs/visual-review/phase-2-1-${name}.png`, Buffer.from(data, "base64"));
  }
  await checkResearchFlow({ page, evaluate, click, key, settle, viewport });
  await checkCollaborator({ page, evaluate, click, key, settle, viewport });
  await checkBloom({ page, evaluate, click, key, settle, viewport });
  await checkPhase4B({ page, evaluate, click, key, settle, viewport });
  await checkPhase5({ page, evaluate, click, key, settle, viewport });
  assert.deepEqual(errors, [], "Browser runtime errors");
  results.push("No uncaught browser runtime errors. Desktop/mobile screenshots captured with reduced motion enabled.");
  console.log(results.join("\n"));
  await writeFile("docs/visual-review/phase-2-1-checks.txt", results.join("\n") + "\n");
} finally {
  socket?.close();
  chrome.kill();
  await new Promise(resolve => { if (chrome.exitCode !== null || chrome.signalCode !== null) resolve(); else chrome.once("exit", resolve); });
  await rm(profile, { recursive: true, force: true, maxRetries: 3 });
}
