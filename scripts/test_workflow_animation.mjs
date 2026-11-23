import { chromium } from 'playwright';

async function capture() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll so that #workflow starts right below the sticky navbar
  await page.evaluate(() => {
    const el = document.getElementById('workflow');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: y, behavior: 'instant' });
    }
  });
  await page.waitForTimeout(800);

  // Capture Step 1 (Order Intake)
  await page.screenshot({
    path: '/home/harry/Devops/Projects/veave-marketing/scripts/workflow_step_1_verified.png',
    fullPage: false
  });
  console.log('✅ Captured Step 1 screenshot');

  // Wait 5.2 seconds for auto-rotation to Step 2
  await page.waitForTimeout(5200);

  // Capture Step 2 (Design & Cutting)
  await page.screenshot({
    path: '/home/harry/Devops/Projects/veave-marketing/scripts/workflow_step_2_verified.png',
    fullPage: false
  });
  console.log('✅ Captured Step 2 screenshot (auto-shifted)');

  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});

