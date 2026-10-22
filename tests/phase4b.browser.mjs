import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';

// The old view disables the focused decision button without focusing Undo.
// Keyboard activation, not a synthetic mouse click, reproduces that regression.
export async function checkStandaloneFocus({ evaluate, click, key, settle }) {
  await evaluate("document.querySelector('.optional-study')?.setAttribute('open','')");
  await click('.review-card .reset-button');
  await evaluate("document.querySelector('.review-actions button:first-child').focus()");
  await key('Enter', 'Enter', { windowsVirtualKeyCode: 13, text: '\r' });
  await settle();
  assert.equal(await evaluate("document.querySelector('.record-line strong').textContent"), '2027-09-30');
  assert.equal(await evaluate("document.activeElement === document.querySelector('.review-card .undo-button')"), true, 'Standalone keyboard approval must hand focus to Undo');
  await key('Enter', 'Enter', { windowsVirtualKeyCode: 13, text: '\r' });
  await settle();
  assert.equal(await evaluate("document.activeElement === document.querySelector('.review-actions button:first-child')"), true, 'Undo returns focus to approval');
  await evaluate("document.querySelector('.review-actions button:nth-child(2)').focus()");
  await key('Enter', 'Enter', { windowsVirtualKeyCode: 13, text: '\r' });
  await settle();
  assert.equal(await evaluate("document.activeElement === document.querySelector('.review-card .undo-button')"), true, 'Rejection hands focus to Undo');
  await click('.review-card .reset-button');
  await settle();
  assert.equal(await evaluate("document.activeElement === document.querySelector('.review-actions button:first-child')"), true, 'Reset returns focus to approval');
  const input = async (selector, value) => {
    await evaluate(`(() => {const el=document.querySelector(${JSON.stringify(selector)});Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,${JSON.stringify(value)});el.dispatchEvent(new Event('input',{bubbles:true}));})()`);
    await settle();
  };
  await input('#deadline-input', '');
  await click('.review-actions button:first-child');
  await settle();
  assert.equal(await evaluate('document.activeElement.id'), 'deadline-input', 'Invalid approval focuses the date');
  await input('#deadline-input', '2027-10-01');
  await click('.review-actions button:first-child');
  await settle();
  assert.equal(await evaluate('document.activeElement.id'), 'override-reason', 'Missing override reason receives focus');
  await input('#override-reason', 'Fictional reviewer override');
  await click('.review-actions button:first-child');
  await settle();
  await evaluate("document.querySelector('#deadline-input').focus()");
  await input('#deadline-input', '2027-10-02');
  assert.equal(await evaluate('document.activeElement.id'), 'deadline-input', 'Editing retains field focus');
  assert.equal(await evaluate("document.querySelector('.record-line strong').textContent"), 'No deadline', 'Editing still invalidates approval');
  await click('.review-card .reset-button');
  await settle();
}

export async function checkPhase4B({ page, evaluate, click, key, settle, viewport }) {
  const results = [];
  await evaluate("document.querySelector('.optional-study').open=false");
  for (const width of [320,390,768,1024,1440]) {
    await viewport(width,1000);
    const positions = await evaluate("['top','work','experience','case-studies','toolkit','about','contact'].map(id=>document.getElementById(id).getBoundingClientRect().top+scrollY)");
    assert.equal(positions.every((p,i)=>i===0||p>positions[i-1]),true, `Approved reading order at ${width}`);
    assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'),true, `No horizontal overflow at ${width}`);
    assert.equal(await evaluate("[...document.querySelectorAll('.work-preview a')].length"),3);
    assert.equal(await evaluate("[...document.querySelectorAll('.work-preview a')].every(el=>{const r=el.getBoundingClientRect();return r.height>=44&&r.left>=0&&r.right<=innerWidth+1})"),true, `Preview targets fit ${width}`);
    assert.equal(await evaluate("getComputedStyle(document.querySelector('.work-preview')).paddingTop"), width <= 760 ? '40px' : '56px', `Compact preview spacing survives base styles at ${width}`);
    results.push(`PASS ${width}px: approved section order, no overflow, three preview links within viewport and >=44px.`);
  }
  assert.equal(await evaluate("[...document.querySelectorAll('a[href^=\"#\"]')].every(a=>document.getElementById(a.getAttribute('href').slice(1)))"),true,'Every internal anchor exists');
  for (const id of ['researchflow','collaborator','bloom-rescue']) {
    await click(`.work-preview a[href='#${id}']`);
    await settle();
    assert.equal(await evaluate('location.hash'),`#${id}`);
    assert.equal(await evaluate('document.activeElement.id'),id,'Preview hands focus to the chosen case study');
  }
  await evaluate("document.querySelector('.work-preview a').focus()");
  await key('Tab');
  assert.equal(await evaluate('getComputedStyle(document.activeElement).outlineStyle'),'solid');
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.work-preview a')).transitionDuration"),'0s','Reduced motion on preview links');
  // Reloaded hash entry must open the optional exercise, including an inner-field link.
  for (const id of ['interface-study','deadline-input']) {
    await page('Page.navigate',{url:`${process.env.PORTFOLIO_URL ?? 'http://127.0.0.1:5173/'}#${id}`});
    await settle();
    assert.equal(await evaluate("document.querySelector('.optional-study').open"),true,`Deep link #${id} opens optional study`);
  }
  await evaluate("document.querySelector('.optional-study').open=false");
  await evaluate("document.querySelector('.optional-study > summary').focus()");
  await key('Tab');
  assert.equal(await evaluate("document.querySelector('.optional-study').contains(document.activeElement)"),false,'Tab from the closed study skips its form controls');
  const contrast=await evaluate(`(() => {
    const lum=c=>{const a=c.match(/[\\d.]+/g).slice(0,3).map(Number).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return a[0]*.2126+a[1]*.7152+a[2]*.0722;};
    return ['.work-preview h3','.preview-problem','.preview-contribution','.preview-decision','.preview-link','.experience-evidence p'].map(s=>{const el=document.querySelector(s);const f=lum(getComputedStyle(el).color),b=lum(getComputedStyle(document.body).backgroundColor);return {selector:s,ratio:(Math.max(f,b)+.05)/(Math.min(f,b)+.05)};});
  })()`);
  for (const c of contrast) assert.ok(c.ratio>=4.5,`${c.selector}: ${c.ratio}`);
  results.push(...contrast.map(c=>`PASS rendered contrast ${c.selector}: ${c.ratio.toFixed(2)}:1`));
  await click(".study-switch button:first-child");
  // Reveal scrolled content before capturing; screenshot framing does not alter app state.
  await evaluate("document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'));document.activeElement.blur()");
  for (const [label,width] of [['desktop',1440],['mobile',390]]) {
    for (const framing of ['hero-preview','experience','experience-to-cases']) {
      await viewport(width,1000);
      const bounds=await evaluate(`(() => {const exp=document.getElementById('experience'),cases=document.getElementById('case-studies');const top=${framing==='hero-preview'?'0':framing==='experience'?'exp.offsetTop':'exp.offsetTop+exp.offsetHeight-320'};const bottom=${framing==='hero-preview'?"document.getElementById('work').offsetTop+document.getElementById('work').offsetHeight":framing==='experience'?'exp.offsetTop+exp.offsetHeight':'cases.offsetTop+700'};return {top:Math.floor(top),height:Math.ceil(bottom-top)};})()`);
      await evaluate(`document.querySelector('.edition-header').style.visibility=${framing==='hero-preview'?"''":"'hidden'"};window.scrollTo({top:${bounds.top},behavior:'instant'})`);
      await settle();
      const {data}=await page('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:bounds.top,width,height:bounds.height,scale:1}});
      await writeFile(`docs/visual-review/phase-4b-${label}-${framing}.png`,Buffer.from(data,'base64'));
      await evaluate("document.querySelector('.edition-header').style.visibility=''");
    }
  }
  results.push('PASS: preview links/focus, existing anchor targets, optional exercise deep links, and reduced motion. Six Phase 4B screenshots captured.');
  await writeFile('docs/visual-review/phase-4b-checks.txt',results.join('\n')+'\n');
  console.log(results.join('\n'));
}
