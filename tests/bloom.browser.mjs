import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';

export async function checkBloom({ page, evaluate, click, key, settle, viewport }) {
  assert.equal(await evaluate("!!document.querySelector('.br-workbench')"), true, 'Bloom companion workbench exists');
  const input = async (selector, value) => {
    await evaluate(`(() => {const el=document.querySelector(${JSON.stringify(selector)});Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,${JSON.stringify(value)});el.dispatchEvent(new Event('input',{bubbles:true}));})()`);
    await settle();
  };
  const record = () => evaluate("document.querySelector('[data-bloom-record]').textContent");
  const requestCount = () => evaluate("performance.getEntriesByType('resource').filter(e=>['fetch','xmlhttprequest'].includes(e.initiatorType)).length");
  const before = await requestCount();
  await click('[data-bloom-source]');
  assert.equal(await evaluate("document.querySelector('[data-bloom-source]').getAttribute('aria-expanded')"), 'true');
  assert.equal(await evaluate("document.querySelector('#br-source').hidden"), false);
  await input('#br-deadline', '');
  await click('[data-bloom-approve]');
  await settle();
  assert.equal(await evaluate("document.querySelector('#br-deadline').getAttribute('aria-invalid')"), 'true');
  assert.equal(await evaluate('document.activeElement.id'), 'br-deadline');
  assert.equal(await record(), 'No deadline');
  await input('#br-deadline', '2027-10-01');
  await click('[data-bloom-approve]');
  await settle();
  assert.equal(await evaluate('document.activeElement.id'), 'br-reason');
  assert.equal(await evaluate("document.querySelector('#br-reason').getAttribute('aria-invalid')"), 'true');
  assert.equal(await record(), 'No deadline');
  await input('#br-reason', 'Reviewer override for this fictional example');
  await click('[data-bloom-approve]');
  await settle();
  assert.equal(await record(), '2027-10-01');
  assert.equal(await evaluate("document.querySelector('.bw-check').textContent.includes('Approved by you')"), true, 'Checks acknowledge the completed human decision');
  assert.equal(await evaluate("document.querySelector('[data-bloom-approve]').disabled"), true);
  assert.equal(await evaluate("document.activeElement.hasAttribute('data-bloom-undo')"), true, 'Decision hands focus to available recovery');
  assert.equal(await evaluate("document.querySelector('[data-bloom-activity]').textContent.includes('Reviewer override')"), true);
  await click('[data-bloom-undo]');
  await settle();
  assert.equal(await record(), 'No deadline');
  assert.equal(await evaluate("document.activeElement.hasAttribute('data-bloom-approve')"), true);
  await click('[data-bloom-reset]');
  await evaluate("document.querySelector('[data-bloom-approve]').focus()");
  await key('Enter', 'Enter', { windowsVirtualKeyCode: 13, text: '\r' });
  await settle();
  assert.equal(await record(), '2027-09-30');
  await input('#br-deadline', '2027-10-02');
  assert.equal(await record(), 'No deadline', 'Editing invalidates the prior approval');
  assert.equal(await evaluate("document.querySelector('[data-bloom-approve]').disabled"), false);
  await click('[data-bloom-reset]');
  await click('[data-bloom-reject]');
  await settle();
  assert.equal(await record(), 'No deadline');
  assert.equal(await evaluate("document.querySelector('[data-bloom-status]').textContent"), 'Rejected');
  assert.equal(await evaluate("document.querySelector('.bw-check').textContent.includes('do not override your rejection')"), true);
  await click('[data-bloom-undo]');
  await settle();
  assert.equal(await evaluate("document.querySelector('[data-bloom-status]').textContent"), 'Needs review');
  assert.equal(await requestCount(), before, 'Companion actions never call an API');
  assert.equal(await evaluate("document.querySelector('.record-line strong').textContent"), 'No deadline', 'Standalone simulation remains independent');

  for (const width of [1440, 1024, 768, 390, 320]) {
    await viewport(width);
    await click('[data-bloom-reset]');
    await input('#br-deadline', '2027-10-01');
    await click('[data-bloom-approve]');
    await settle();
    assert.equal(await evaluate("document.documentElement.scrollWidth <= innerWidth"), true, `Bloom validation fits ${width}`);
    assert.equal(await evaluate("[...document.querySelectorAll('#bloom-rescue button,#bloom-rescue a,#bloom-rescue input,#bloom-rescue summary')].filter(el=>el.getClientRects().length).every(el=>{const r=el.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth+1&&r.height>=44})"), true, `Bloom controls fit and meet target heights at ${width}`);
  }
  await click('[data-bloom-reset]');
  await click(".br-local-nav a[href='#bloom-ai-boundary']");
  await settle();
  assert.equal(await evaluate("document.querySelector('#bloom-ai-boundary').open"), true);
  assert.equal(await evaluate('document.activeElement.id'), 'bloom-ai-boundary');
  await click('.br-decision summary');
  assert.equal(await evaluate("document.querySelector('.br-decision').open"), true);
  await evaluate("document.querySelectorAll('#bloom-rescue details').forEach(el=>el.open=true)");
  await viewport(320);
  assert.equal(await evaluate("document.documentElement.scrollWidth <= innerWidth"), true, 'Expanded Bloom evidence fits 320px');
  await evaluate("document.querySelectorAll('#bloom-rescue details').forEach(el=>el.open=false)");
  assert.equal(await evaluate("getComputedStyle(document.querySelector('[data-bloom-approve]')).transitionDuration"), '0s', 'Reduced motion disables transitions');
  await evaluate("document.querySelector('[data-bloom-source]').focus()");
  assert.equal(await evaluate("getComputedStyle(document.activeElement).outlineStyle"), 'solid');
  const contrast = await evaluate(`(() => {
    const lum = value => {const c=value.match(/[\\d.]+/g).slice(0,3).map(Number).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;};
    return [['.bw-evidence .bw-label','.bw-evidence'],['.bw-source-note p','.bw-evidence'],['.bw-evidence blockquote','.bw-evidence'],['.bw-help','.br-workbench'],['.bw-feedback','.br-workbench'],['.bw-approve','.bw-approve'],['.bw-history li','.bw-history']].map(([fg,bg])=>{const f=lum(getComputedStyle(document.querySelector(fg)).color),b=lum(getComputedStyle(document.querySelector(bg)).backgroundColor);return {label:fg,ratio:(Math.max(f,b)+.05)/(Math.min(f,b)+.05)};});
  })()`);
  for (const pair of contrast) assert.ok(pair.ratio >= 4.5, `${pair.label} contrast ${pair.ratio}`);

  for (const [name,width] of [['desktop',1440],['mobile',390]]) {
    for (const state of ['showcase','validation','approved','undo']) {
      await viewport(width,1000);
      await click('[data-bloom-reset]');
      await click('[data-bloom-source]');
      if (state === 'validation') { await input('#br-deadline','2027-10-01'); await click('[data-bloom-approve]'); }
      if (state === 'approved' || state === 'undo') await click('[data-bloom-approve]');
      if (state === 'undo') await click('[data-bloom-undo]');
      await settle();
      await evaluate('document.activeElement.blur()');
      const selector = state === 'showcase' ? '#bloom-rescue' : '.br-workbench';
      const height = await evaluate(`Math.ceil(document.querySelector('${selector}').getBoundingClientRect().height)`);
      await viewport(width,height);
      await evaluate(`document.querySelector('.edition-header').style.visibility='hidden';window.scrollTo({top:document.querySelector('${selector}').getBoundingClientRect().top+scrollY,behavior:'instant'})`);
      await settle();
      const {data}=await page('Page.captureScreenshot',{format:'png'});
      await writeFile(`docs/visual-review/bloom-${name}-${state}.png`,Buffer.from(data,'base64'));
      await evaluate("document.querySelector('.edition-header').style.visibility=''");
    }
  }
  await writeFile('docs/visual-review/bloom-checks.txt','PASS: Source disclosure, invalid date and override validation, error focus, approval, rejection, undo, reset, edit invalidation, activity feedback, independent original simulation, and no API requests.\nPASS: Keyboard approval, decision/recovery focus, evidence deep link, reduced motion, responsive widths 1440/1024/768/390/320 and 44px controls. Expanded evidence fits 320px.\n' + contrast.map(pair=>`${pair.label} rendered contrast: ${pair.ratio.toFixed(2)}:1`).join('\n') + '\nEight desktop/mobile showcase, validation, approved, and undo screenshots captured.\n');
  console.log('Bloom browser checks passed; eight screenshots captured.');
}
