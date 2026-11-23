import { chromium } from 'playwright';

async function capture() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll slightly down to see the transition between Hero and UnifiedWorkflow
  await page.evaluate(() => {
    window.scrollTo({ top: 650, behavior: 'instant' });
  });
  await page.waitForTimeout(800);

  await page.screenshot({
    path: '/home/harry/Devops/Projects/veave-marketing/scripts/hero_to_workflow_transition.png',
    fullPage: false
  });

  console.log('✅ Screenshot captured at scripts/hero_to_workflow_transition.png');
  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});

