import { chromium } from 'playwright';

async function capture() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Viewport screenshot (exactly 1440x900 above the fold)
  await page.screenshot({
    path: '/home/harry/Devops/Projects/veave-marketing/scripts/hero_above_fold_verified.png',
    fullPage: false
  });

  console.log('✅ Screenshot captured at scripts/hero_above_fold_verified.png');
  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
