const playwright = require('playwright');
(async () => {
  const browser = await playwright.chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('[console]', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('[pageerror]', err.message));
  await page.goto(process.env.APP_URL || 'http://localhost:8081');
  await page.waitForTimeout(3000);
  await browser.close();
})();
