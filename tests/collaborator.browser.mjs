import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";

// Exercise rendered explanations, focus handoffs, and layout instead of mocking authorization.
export async function checkCollaborator({ page, evaluate, click, key, settle, viewport }) {
  assert.equal(await evaluate("!!document.querySelector('.cp-showcase')"), true, 'Portal showcase is present');
  for (const width of [1440, 1024, 768, 390, 320]) {
    await viewport(width);
    await evaluate("document.querySelector('#collaborator').scrollIntoView()");
    await settle();
    for (const state of ['pending', 'approved', 'rejected']) {
      await click(`[data-portal-state='${state}']`);
      await settle();
      assert.equal(await evaluate(`document.querySelector('[data-portal-state="${state}"]').getAttribute('aria-pressed')`), 'true');
      assert.equal(await evaluate("document.querySelectorAll('[data-portal-state][aria-pressed=true]').length"), 1);
      assert.equal(await evaluate("document.documentElement.scrollWidth <= innerWidth"), true, `Page fits ${state} at ${width}`);
      assert.equal(await evaluate("[...document.querySelectorAll('#collaborator button, #collaborator a, #collaborator summary')].filter(el=>el.getClientRects().length).every(el=>{const r=el.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth+1&&r.height>=44})"), true, `Portal controls fit ${state} at ${width}`);
    }
  }
  await click('[data-portal-state=pending]');
  const pending = await evaluate("document.querySelector('.cp-outcome').textContent");
  await evaluate("document.querySelector('[data-portal-state=approved]').focus()");
  await key('Enter', 'Enter', { windowsVirtualKeyCode: 13, text: '\r' });
  await settle();
  const approved = await evaluate("document.querySelector('.cp-outcome').textContent");
  assert.notEqual(approved, pending, 'Approval must explain a different requester outcome');
  assert.equal(await evaluate("document.querySelector('[data-portal-state=approved]').getAttribute('aria-pressed')"), 'true');
  assert.equal(await evaluate("getComputedStyle(document.activeElement).outlineStyle"), 'solid', 'Keyboard selection retains visible focus');
  await key('Tab');
  assert.equal(await evaluate("document.activeElement.dataset.portalState"), 'rejected');
  await key('Enter', 'Enter', { windowsVirtualKeyCode: 13, text: '\r' });
  await settle();
  const rejected = await evaluate("document.querySelector('.cp-outcome').textContent");
  assert.notEqual(rejected, approved, 'Rejection must change the requester outcome');
  assert.notEqual(rejected, pending, 'Pending and rejected must remain distinct');
  assert.equal(await evaluate("!!document.querySelector('.cp-outcome[aria-live=polite], .cp-outcome [aria-live=polite]')"), true, 'Outcome is announced');
  assert.equal(await evaluate("document.querySelectorAll('#collaborator a[download]').length"), 0, 'Reconstruction does not offer a real file');
  await click(".cp-local-nav a[href='#portal-architecture']");
  await settle();
  assert.equal(await evaluate("document.querySelector('#portal-evidence').open && document.querySelector('#portal-architecture').open"), true);
  assert.equal(await evaluate("document.activeElement.id"), 'portal-architecture');
  await click(".cp-local-nav a[href='#portal-role-boundary']");
  await settle();
  assert.equal(await evaluate("document.querySelector('#portal-architecture').open"), true);
  assert.equal(await evaluate("document.activeElement.id"), 'portal-role-boundary');
  await click('.cp-decision summary');
  assert.equal(await evaluate("document.querySelector('.cp-decision').open"), true);
  await evaluate("document.querySelectorAll('#collaborator details').forEach(el=>el.open=false)");

  for (const [name, width] of [['desktop', 1440], ['mobile', 390]]) {
    for (const state of ['pending', 'approved', 'rejected']) {
      await viewport(width, 1000);
      await click(`[data-portal-state='${state}']`);
      await evaluate("document.activeElement.blur()");
      await settle();
      const selector = state === 'pending' ? '#collaborator' : '.cp-interaction';
      const height = await evaluate(`Math.ceil(document.querySelector('${selector}').getBoundingClientRect().height)`);
      await viewport(width, height);
      await evaluate(`document.querySelector('.edition-header').style.visibility='hidden';window.scrollTo({top:document.querySelector('${selector}').getBoundingClientRect().top+scrollY,behavior:'instant'})`);
      await settle();
      const { data } = await page('Page.captureScreenshot', { format: 'png' });
      await writeFile(`docs/visual-review/collaborator-${name}${state === 'pending' ? '' : '-' + state}.png`, Buffer.from(data, 'base64'));
      await evaluate("document.querySelector('.edition-header').style.visibility=''");
    }
  }
  await writeFile('docs/visual-review/collaborator-checks.txt', 'PASS: Portal states and controls fit 1440, 1024, 768, 390, 320px.\nPASS: Distinct pending, approved, rejected explanations; keyboard activation, selected state, visible focus and live outcome.\nPASS: Architecture and role-boundary links open evidence and move focus; decision disclosure works.\nPASS: No actual download link in reconstruction.\nCaptured desktop/mobile showcase, approved and rejected states.\n');
  console.log('Collaborator Portal checks passed; six screenshots captured.');
}
