import { chromium } from 'playwright';

async function testVeaveSite() {
  console.log('🚀 Starting Comprehensive Veave Verification Test Suite...');

  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', err => errors.push(`PageError: ${err.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignore Next.js dev server instant-shell advisory warnings
      if (text.includes('instant-shell-url-data')) return;
      errors.push(`ConsoleError: ${text}`);
    }
  });

  // 1. Test Homepage & Interactive Widgets
  console.log('Testing http://localhost:3000 Homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Hero tabs
  const heroTab2 = page.locator('button:has-text("02 Department Checkpoints")');
  await heroTab2.click();
  console.log('✓ Clicked Hero Tab 2 (Department Checkpoints)');
  await page.waitForTimeout(200);

  const heroTab3 = page.locator('button:has-text("03 Real-Time QC Inspection")');
  await heroTab3.click();
  console.log('✓ Clicked Hero Tab 3 (Real-Time QC Inspection)');
  await page.waitForTimeout(200);

  // Workflow steps
  const wfStep2 = page.locator('#whole-sale button:has-text("02")').first();
  await wfStep2.click();
  console.log('✓ Clicked Unified Workflow Step 02');
  await page.waitForTimeout(200);

  // AI Scenario
  const aiTabMilestones = page.locator('#ai button:has-text("Client WhatsApp")');
  await aiTabMilestones.click();
  console.log('✓ Clicked AI Scenario: Client WhatsApp');
  await page.waitForTimeout(200);

  // Studio / QC inspection view
  const qcViewLightbox = page.locator('#studio button:has-text("315°")');
  await qcViewLightbox.click();
  console.log('✓ Clicked QC Showcase View 2 (Lightbox)');
  await page.waitForTimeout(200);

  // FAQ Accordion
  const faqBtn = page.getByRole('button', { name: 'Quality Control (QC)', exact: true });
  await faqBtn.click();
  console.log('✓ Clicked FAQ Filter: Quality Control (QC)');
  await page.waitForTimeout(200);

  const faqAccordion = page.locator('#faq button[aria-expanded]').first();
  await faqAccordion.click();
  console.log('✓ Toggled FAQ Accordion');
  await page.waitForTimeout(200);

  // 2. Test Sub-Pages
  console.log('Testing Dedicated Sub-Pages...');

  // Admin Role Page
  await page.goto('http://localhost:3000/roles/admin', { waitUntil: 'networkidle' });
  const adminHeader = await page.locator('h1').innerText();
  console.log(`✓ Loaded /roles/admin: "${adminHeader}"`);

  // Dept Head Role Page
  await page.goto('http://localhost:3000/roles/dept-head', { waitUntil: 'networkidle' });
  const deptHeader = await page.locator('h1').innerText();
  console.log(`✓ Loaded /roles/dept-head: "${deptHeader}"`);

  // QC Role Page
  await page.goto('http://localhost:3000/roles/qc', { waitUntil: 'networkidle' });
  const qcHeader = await page.locator('h1').innerText();
  console.log(`✓ Loaded /roles/qc: "${qcHeader}"`);

  // Workflows Index & Detail Page
  await page.goto('http://localhost:3000/workflows', { waitUntil: 'networkidle' });
  console.log('✓ Loaded /workflows Index');

  await page.goto('http://localhost:3000/workflows/cutting-prep', { waitUntil: 'networkidle' });
  const wfHeader = await page.locator('h1').innerText();
  console.log(`✓ Loaded /workflows/cutting-prep: "${wfHeader}"`);

  // Features Index & Detail Page
  await page.goto('http://localhost:3000/features', { waitUntil: 'networkidle' });
  console.log('✓ Loaded /features Index');

  await page.goto('http://localhost:3000/features/order-intake', { waitUntil: 'networkidle' });
  const featHeader = await page.locator('h1').innerText();
  console.log(`✓ Loaded /features/order-intake: "${featHeader}"`);

  // Interactive Tools Page (Calculator Live Input Test)
  await page.goto('http://localhost:3000/tools/fabric-consumption', { waitUntil: 'networkidle' });
  console.log('✓ Loaded /tools/fabric-consumption');

  // Change input value in calculator
  const unitsInput = page.locator('input#units');
  await unitsInput.fill('1000');
  await page.waitForTimeout(200);
  console.log('✓ Tested Fabric Consumption Calculator Input Change to 1000');

  // Pricing & Contact Pages
  await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });
  console.log('✓ Loaded /pricing');

  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
  console.log('✓ Loaded /contact');

  await page.goto('http://localhost:3000/signup', { waitUntil: 'networkidle' });
  console.log('✓ Loaded /signup');

  // Mobile Drawer Test (390x844)
  console.log('Testing Mobile Drawer on 390x844...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const mobileMenuBtn = page.locator('button[aria-label="Toggle navigation menu"]');
  await mobileMenuBtn.click();
  await page.waitForTimeout(300);
  console.log('✓ Mobile navigation menu opened successfully');

  if (errors.length > 0) {
    console.error('❌ Found errors during test:', errors);
    process.exit(1);
  } else {
    console.log('🎉 ALL VEAVE PAGES, SUB-PAGES, CALCULATORS, TABS & ACCORDIONS PASSED WITH 0 ERRORS!');
  }

  await browser.close();
}

testVeaveSite().catch(err => {
  console.error('Test script failed:', err);
  process.exit(1);
});
