import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';

export async function checkPhase5({ page, evaluate, click, settle, viewport }) {
  const results = [];
  // Control the browser permission boundary; keep the real application handler/state/rendering.
  await evaluate("window.__phase5ClipboardDescriptor=Object.getOwnPropertyDescriptor(navigator,'clipboard');Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(new Error('Test clipboard rejection'))}})");
  try {
    await click('.copy-button');
    await settle();
    assert.equal(await evaluate("document.querySelector('.copy-button').textContent"),'Copy unavailable','Clipboard rejection must produce visible failure feedback');
    assert.equal(await evaluate("document.querySelector('.contact-actions [role=status]').textContent"),'Copy is unavailable. Use the email link instead.');
    assert.equal(await evaluate("document.querySelector('.email-link').getAttribute('href')"),'mailto:anushreebs6@gmail.com','Email fallback remains available');
    for (const width of [320,390,768,1024,1440]) {
      await viewport(width,1000);
      await click('.copy-button');
      await settle();
      assert.equal(await evaluate('document.documentElement.scrollWidth<=innerWidth'),true,`Clipboard failure layout at ${width}`);
      assert.equal(await evaluate("document.querySelector('.copy-button').getBoundingClientRect().height>=44"),true);
    }
    for (const [name,width] of [['desktop',1440],['mobile',390]]) {
      await viewport(width,1000);
      await click('.copy-button');
      await settle();
      const bounds=await evaluate("(() => {const el=document.getElementById('contact'),r=el.getBoundingClientRect();return {top:Math.floor(r.top+scrollY),height:Math.ceil(r.height)};})()");
      await evaluate(`document.querySelector('.edition-header').style.visibility='hidden';window.scrollTo({top:${bounds.top},behavior:'instant'})`);
      const {data}=await page('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:bounds.top,width,height:bounds.height,scale:1}});
      await writeFile(`docs/visual-review/phase-5-${name}-contact.png`,Buffer.from(data,'base64'));
      await evaluate("document.querySelector('.edition-header').style.visibility=''");
    }
    await evaluate("Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:value=>{window.__phase5Copied=value;return Promise.resolve()}}})");
    await click('.copy-button');
    await settle();
    assert.equal(await evaluate("document.querySelector('.copy-button').textContent"),'Copied');
    assert.equal(await evaluate('window.__phase5Copied'),'anushreebs6@gmail.com');
    results.push('PASS: clipboard failure visible to sighted and screen-reader users; mailto fallback preserved; success copies expected email. Failure-state layout checked at 320/390/768/1024/1440px.');
    const localAssets=await evaluate("[...new Set([...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(h=>h.startsWith('/')&&!h.startsWith('//')))]");
    for (const path of [...localAssets,'/favicon.svg','/social-preview.svg']) {
      const response=await fetch(new URL(path,process.env.PORTFOLIO_URL??'http://127.0.0.1:5173/'));
      assert.equal(response.ok,true,`Asset ${path} loads`);
      const bytes=new Uint8Array(await response.arrayBuffer());
      if(path.endsWith('.pdf'))assert.equal(new TextDecoder().decode(bytes.slice(0,5)),'%PDF-','Résumé response is an actual PDF');
      if(path.endsWith('.svg'))assert.equal(new TextDecoder().decode(bytes).includes('<svg'),true,`${path} response is SVG`);
      results.push(`PASS asset ${path}: HTTP ${response.status}, ${bytes.length} bytes.`);
    }
    await writeFile('docs/visual-review/phase-5-checks.txt',results.join('\n')+'\n');
    console.log(results.join('\n'));
  } finally {
    await evaluate("if(window.__phase5ClipboardDescriptor)Object.defineProperty(navigator,'clipboard',window.__phase5ClipboardDescriptor);else delete navigator.clipboard;delete window.__phase5ClipboardDescriptor;delete window.__phase5Copied");
  }
}
