import { chromium } from 'playwright';

async function inspectSections() {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://autodealer.io', { waitUntil: 'networkidle' });

  const data = await page.evaluate(() => {
    function getDetails(sel) {
      const el = document.querySelector(sel);
      if (!el) return null;
      return {
        id: el.id,
        tagName: el.tagName,
        className: el.className,
        rect: el.getBoundingClientRect(),
        h2: el.querySelector('h2')?.innerText,
        innerHtmlPreview: el.innerHTML.slice(0, 400)
      };
    }

    return {
      studio: getDetails('#studio'),
      platform: getDetails('#platform'),
      value: getDetails('#value'),
      faq: getDetails('#faq'),
      tools: getDetails('#free-tools'),
      footer: getDetails('footer')
    };
  });

  console.log('Detailed Section Analysis:');
  console.log(JSON.stringify(data, null, 2));

  await browser.close();
}

inspectSections().catch(console.error);

