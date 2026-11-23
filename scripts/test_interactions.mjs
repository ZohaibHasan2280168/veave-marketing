import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const pageErrors = [];
  page.on('pageerror', err => pageErrors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') pageErrors.push(msg.text());
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  console.log('Testing interactive widgets on local...');

  // 1. Hero tabs
  const heroTab2 = page.locator('button:has-text("02 Inventory & Gross")');
  await heroTab2.click();
  console.log('✓ Clicked Hero Tab 2');
  await page.waitForTimeout(200);

  // 2. Workflow steps
  const wfStep3 = page.locator('ol button:has-text("03")');
  await wfStep3.click();
  console.log('✓ Clicked Workflow Step 3');
  await page.waitForTimeout(200);

  // 3. AI Assistant scenario tabs
  const aiTabWebsite = page.locator('#ai button:has-text("Website")');
  await aiTabWebsite.click();
  console.log('✓ Clicked AI Tab: Website');
  await page.waitForTimeout(200);

  // 4. Studio angle selection
  const studioAngle2 = page.locator('#studio button:has-text("315°")');
  await studioAngle2.click();
  console.log('✓ Clicked Studio Angle 2 (315°)');
  await page.waitForTimeout(200);

  // 5. FAQ topic filter & accordion toggle
  const faqFilterAi = page.getByRole('button', { name: 'The AI', exact: true });
  await faqFilterAi.click();
  console.log('✓ Clicked FAQ Filter: The AI');
  await page.waitForTimeout(200);

  const faqAccordion = page.locator('#faq button[aria-expanded]').first();
  await faqAccordion.click();
  console.log('✓ Toggled FAQ Accordion');
  await page.waitForTimeout(200);

  // 6. Mobile testing (390px)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);

  const menuBtn = page.locator('button[aria-label="Toggle navigation menu"]');
  await menuBtn.click();
  console.log('✓ Toggled mobile navigation menu drawer');
  await page.waitForTimeout(300);

  if (pageErrors.length > 0) {
    console.error('❌ Found page errors:', pageErrors);
    process.exit(1);
  } else {
    console.log('✅ ALL INTERACTIVE CONTROLS, ACCORDIONS, TABS, AND MOBILE NAVIGATION TESTED WITH 0 ERRORS!');
  }

  await browser.close();
}

run().catch(err => {
  console.error('Interaction test failed:', err);
  process.exit(1);
});
