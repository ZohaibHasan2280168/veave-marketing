import { chromium } from 'playwright';

async function capture() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to #platform section
  await page.evaluate(() => {
    const el = document.getElementById('platform');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'instant' });
    }
  });
  await page.waitForTimeout(800);

  await page.screenshot({
    path: '/home/harry/Devops/Projects/veave-marketing/scripts/platform_cards_verified.png',
    fullPage: false
  });

  console.log('✅ Screenshot captured at scripts/platform_cards_verified.png');
  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});

