import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const reportsDir = '/home/harry/Devops/Projects/veave-marketing/scripts/comparison_reports';
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

async function run() {
  console.log('🚀 Launching Chrome for Section-by-Section Comparison...');
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  // Verify localhost is up
  const checkContext = await browser.newContext();
  const checkPage = await checkContext.newPage();
  let serverReady = false;
  for (let i = 0; i < 15; i++) {
    try {
      const res = await checkPage.goto('http://localhost:3000', { timeout: 3000 });
      if (res && res.ok()) {
        serverReady = true;
        console.log('✅ Localhost:3000 is ready!');
        break;
      }
    } catch (e) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  await checkContext.close();

  if (!serverReady) {
    console.error('❌ Localhost:3000 failed to respond.');
    await browser.close();
    process.exit(1);
  }

  // 1. Desktop Comparison (1440x900)
  console.log('🖥️ Running Desktop Comparison (1440x900)...');
  const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const prodPage = await desktopCtx.newPage();
  const localPage = await desktopCtx.newPage();

  await Promise.all([
    prodPage.goto('https://autodealer.io', { waitUntil: 'networkidle', timeout: 60000 }),
    localPage.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 })
  ]);

  // Scroll both pages down slowly to load all animations
  for (const p of [prodPage, localPage]) {
    await p.evaluate(async () => {
      await new Promise(r => {
        let y = 0;
        const interval = setInterval(() => {
          window.scrollBy({ top: 350, behavior: 'instant' });
          y += 350;
          if (y >= document.body.scrollHeight) {
            clearInterval(interval);
            r();
          }
        }, 50);
      });
    });
    await p.waitForTimeout(800);
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.waitForTimeout(500);
  }

  // Extract section layout metrics from both
  const sectionIds = ['header', 'hero', '#whole-sale', '#platform', '#ai', '#studio', '#connections', '#value', '#faq', '#free-tools', 'footer'];

  const metrics = await Promise.all([
    extractMetrics(prodPage, 'Production (https://autodealer.io)'),
    extractMetrics(localPage, 'Local (http://localhost:3000)')
  ]);

  // Screenshots of sections
  await prodPage.screenshot({ path: path.join(reportsDir, 'desktop_prod_full.png'), fullPage: true });
  await localPage.screenshot({ path: path.join(reportsDir, 'desktop_local_full.png'), fullPage: true });

  // 2. Mobile Comparison (390x844 - iPhone 14 / modern smartphone)
  console.log('📱 Running Mobile Comparison (390x844)...');
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  });
  const mProdPage = await mobileCtx.newPage();
  const mLocalPage = await mobileCtx.newPage();

  await Promise.all([
    mProdPage.goto('https://autodealer.io', { waitUntil: 'networkidle', timeout: 60000 }),
    mLocalPage.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 })
  ]);

  await mProdPage.screenshot({ path: path.join(reportsDir, 'mobile_prod_full.png'), fullPage: true });
  await mLocalPage.screenshot({ path: path.join(reportsDir, 'mobile_local_full.png'), fullPage: true });

  // Mobile drawer test on local
  const mobileMenuBtn = await mLocalPage.$('button[aria-label="Toggle navigation menu"]');
  if (mobileMenuBtn) {
    await mobileMenuBtn.click();
    await mLocalPage.waitForTimeout(400);
    await mLocalPage.screenshot({ path: path.join(reportsDir, 'mobile_local_menu_open.png') });
  }

  const comparisonReport = {
    desktopMetrics: {
      production: metrics[0],
      local: metrics[1]
    }
  };

  fs.writeFileSync(path.join(reportsDir, 'comparison_summary.json'), JSON.stringify(comparisonReport, null, 2));
  console.log('🎉 Comparison script completed successfully!');

  await browser.close();
}

async function extractMetrics(page, label) {
  return await page.evaluate((lbl) => {
    function getSectionInfo(selector, name) {
      const el = document.querySelector(selector);
      if (!el) return null;
      const comp = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const h1 = el.querySelector('h1')?.innerText.replace(/\s+/g, ' ').trim();
      const h2 = el.querySelector('h2')?.innerText.replace(/\s+/g, ' ').trim();
      const buttons = Array.from(el.querySelectorAll('button, a[class*="button"], a[class*="btn"], a[class*="rounded"]')).map(b => b.innerText.trim()).filter(Boolean);
      return {
        name,
        selector,
        height: Math.round(rect.height),
        width: Math.round(rect.width),
        bg: comp.backgroundColor,
        color: comp.color,
        padding: comp.padding,
        heading: h1 || h2 || '',
        buttonsCount: buttons.length,
        buttons: buttons.slice(0, 4)
      };
    }

    return {
      label: lbl,
      header: getSectionInfo('header', 'Header / Navigation'),
      hero: getSectionInfo('section:first-of-type, .story', 'Hero Section'),
      marquee: getSectionInfo('section:nth-of-type(2), #connections', 'Ecosystem Marquee'),
      workflow: getSectionInfo('#whole-sale', 'Unified Workflow'),
      platform: getSectionInfo('#platform', 'Platform Scope'),
      ai: getSectionInfo('#ai', 'AI Assistant Showcase'),
      studio: getSectionInfo('#studio', 'Photo Studio Showcase'),
      connections: getSectionInfo('#connections', 'Connections Showcase'),
      value: getSectionInfo('#value', 'Pricing & Value Checklist'),
      faq: getSectionInfo('#faq', 'FAQ Section'),
      freeTools: getSectionInfo('#free-tools', 'Free Tools'),
      footer: getSectionInfo('footer, #site-footer', 'Footer')
    };
  }, label);
}

run().catch(err => {
  console.error('Comparison script failed:', err);
  process.exit(1);
});

