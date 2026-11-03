// npm i playwright && npx playwright install chromium
// node export.js
const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  fs.mkdirSync('assets', { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 900, height: 800 }, deviceScaleFactor: 2 });
  await page.goto('file://' + __dirname + '/profile.html');
  await page.waitForLoadState('networkidle').catch(() => {});
  const ids = await page.$$eval('section[id]', s => s.map(e => e.id));
  for (const [i, id] of ids.entries()) {
    const n = String(i + 1).padStart(2, '0');
    await page.locator('#' + id).screenshot({ path: `assets/${n}-${id}.png` });
    console.log('saved', `assets/${n}-${id}.png`);
  }
  await browser.close();
})();
