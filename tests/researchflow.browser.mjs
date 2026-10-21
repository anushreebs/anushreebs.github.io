import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";

export async function checkResearchFlow({ page, evaluate, click, key, settle, viewport }) {
  assert.equal(await evaluate("!!document.querySelector('.rf-showcase')"), true, "ResearchFlow showcase is present");
  for (const width of [1440, 1024, 768, 390, 320]) {
    await viewport(width);
    await evaluate("document.querySelector('#researchflow').scrollIntoView();");
    await settle();
    assert.equal(await evaluate("[...document.querySelectorAll('#researchflow button, #researchflow a, #researchflow summary')].filter(el => el.getClientRects().length).every(el => {const r=el.getBoundingClientRect(); return r.left>=0 && r.right<=innerWidth+1 && r.height>=44;})"), true, `ResearchFlow controls fit at ${width}`);
    assert.equal(await evaluate("document.querySelector('#researchflow').scrollWidth <= document.querySelector('#researchflow').clientWidth"), true, `ResearchFlow content fits at ${width}`);
    const heights = [];
    for (const step of ['source','validation','report']) {
      await click(`[data-rf-step='${step}']`);
      await settle();
      assert.equal(await evaluate(`document.querySelector('[data-rf-step="${step}"]').getAttribute('aria-pressed')`), 'true');
      assert.equal(await evaluate("document.querySelectorAll('.rf-view-content[aria-hidden=false]').length"),1,'Exactly one explanatory view is exposed');
      heights.push(await evaluate("document.querySelector('.rf-stage').getBoundingClientRect().height"));
      assert.equal(await evaluate("document.querySelector('.rf-stage').scrollWidth <= document.querySelector('.rf-stage').clientWidth"), true, `Stage fits ${step} at ${width}`);
    }
    assert.ok(Math.max(...heights)-Math.min(...heights)<1, `Stage selection should not shift content at ${width}: ${heights}`);
  }
  await evaluate("document.querySelector('[data-rf-step=source]').focus()");
  await key('Enter','Enter',{windowsVirtualKeyCode:13,text:'\r'});
  await settle();
  assert.equal(await evaluate("document.querySelector('[data-rf-step=source]').getAttribute('aria-pressed')"),'true');
  assert.equal(await evaluate("document.querySelector('.rf-view-content[aria-hidden=false]').textContent.includes('travel-costs.csv')"),true);
  await click('[data-rf-step=validation]');
  assert.equal(await evaluate("document.querySelector('.rf-view-content[aria-hidden=false]').textContent.includes('Excluded from totals')"),true);
  await click('[data-rf-step=report]');
  assert.equal(await evaluate("document.querySelector('.rf-view-content[aria-hidden=false]').textContent.includes('$6,171.25')"),true);
  assert.equal(await evaluate("document.querySelector('.rf-reconstruction-note').textContent.includes('No records are changed')"),true);

  await click(".rf-local-nav a[href='#rf-architecture']");
  await settle();
  assert.equal(await evaluate("document.querySelector('#rf-evidence').open && document.querySelector('#rf-architecture').open"),true,'Architecture link opens nested evidence');
  assert.equal(await evaluate("document.activeElement.id"),'rf-architecture');
  await click(".rf-decision summary");
  assert.equal(await evaluate("document.querySelector('.rf-decision').open"),true);
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.rf-stage-view')).animationName"),'none','Reduced-motion stage has no animation');
  await evaluate("document.querySelectorAll('#researchflow details').forEach(el => el.open=false)");

  const contrast = await evaluate(`(() => {
    const lum = hex => {const c=hex.match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;};
    return [['paper secondary','455448','e8ece4'],['warning','744a25','d8dfd1'],['sage on dark','bdd2bb','1b221f'],['body on sage','26342a','e8ece4']].map(([label,fg,bg])=>({label,ratio:(Math.max(lum(fg),lum(bg))+.05)/(Math.min(lum(fg),lum(bg))+.05)}));
  })()`);
  for (const pair of contrast) assert.ok(pair.ratio>=4.5, `${pair.label} contrast ${pair.ratio}`);

  for (const [name,width,height] of [['desktop',1440,1100],['mobile',390,844]]) {
    await viewport(width,height);
    await click('[data-rf-step=validation]');
    await evaluate("document.activeElement.blur(); window.scrollTo(0,0)");
    await settle();
    const articleHeight=await evaluate("Math.ceil(document.querySelector('#researchflow').getBoundingClientRect().height)");
    await viewport(width,articleHeight);
    await evaluate("document.querySelector('.edition-header').style.visibility='hidden'; window.scrollTo({top:document.querySelector('#researchflow').getBoundingClientRect().top+scrollY,behavior:'instant'})");
    await settle();
    const {data}=await page('Page.captureScreenshot',{format:'png'});
    await writeFile(`docs/visual-review/researchflow-${name}.png`,Buffer.from(data,'base64'));
    await click('[data-rf-step=report]');
    await settle();
    const productHeight=await evaluate("Math.ceil(document.querySelector('.rf-product').getBoundingClientRect().height)");
    await viewport(width,productHeight);
    await evaluate("window.scrollTo({top:document.querySelector('.rf-product').getBoundingClientRect().top+scrollY,behavior:'instant'})");
    await settle();
    const report=await page('Page.captureScreenshot',{format:'png'});
    await writeFile(`docs/visual-review/researchflow-${name}-report.png`,Buffer.from(report.data,'base64'));
    await evaluate("document.querySelector('.edition-header').style.visibility=''");
  }
  await writeFile('docs/visual-review/researchflow-checks.txt','PASS: ResearchFlow controls and content fit 1440, 1024, 768, 390, 320px.\nPASS: Three explanatory states, stable stage height, keyboard selection, source reference, exclusion rule, synthetic reporting total.\nPASS: Architecture deep link opens nested evidence and moves focus.\nPASS: Decision disclosure and reduced-motion stage.\nCaptured desktop/mobile showcase and report-state screenshots.\n');
  console.log('ResearchFlow browser checks passed; four screenshots captured.');
}
