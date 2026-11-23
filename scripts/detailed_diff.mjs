import { chromium } from 'playwright';

async function check() {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://autodealer.io', { waitUntil: 'networkidle' });

  const prodDetails = await page.evaluate(() => {
    function getSectionSummary(id) {
      const el = document.getElementById(id) || document.querySelector(id);
      if (!el) return null;
      return {
        id,
        tag: el.tagName,
        classes: el.className,
        headings: Array.from(el.querySelectorAll('h1, h2, h3')).map(h => h.innerText.replace(/\s+/g, ' ').trim()),
        subheadings: Array.from(el.querySelectorAll('p')).map(p => p.innerText.replace(/\s+/g, ' ').trim()).filter(t => t.length > 20 && t.length < 150).slice(0, 3)
      };
    }

    const footer = document.querySelector('footer, #site-footer');
    const footerLinks = footer ? Array.from(footer.querySelectorAll('a')).map(a => a.innerText.trim()).filter(Boolean) : [];
    const footerHeadings = footer ? Array.from(footer.querySelectorAll('h3, h4, h5, [class*="font-semibold"], [class*="font-bold"]')).map(h => h.innerText.trim()).filter(Boolean) : [];

    return {
      title: document.title,
      sections: ['whole-sale', 'platform', 'ai', 'studio', 'connections', 'value', 'faq', 'free-tools'].map(getSectionSummary),
      footer: {
        headings: [...new Set(footerHeadings)],
        linksCount: footerLinks.length,
        sampleLinks: footerLinks.slice(0, 15)
      }
    };
  });

  console.log(JSON.stringify(prodDetails, null, 2));
  await browser.close();
}

check().catch(console.error);

