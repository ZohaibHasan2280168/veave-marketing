import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://autodealer.io', { waitUntil: 'networkidle' });

  // Scroll smoothly down to allow all animations to settle
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 400;
      const interval = setInterval(() => {
        window.scrollBy({ top: step, behavior: 'instant' });
        total += step;
        if (total >= 4000) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  });

  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    // 1. Social Proof section
    // It's the section right after the hero (section 1 or between hero and #whole-sale)
    const sections = Array.from(document.querySelectorAll('section'));
    const hero = sections[0];
    const marqueeSec = sections[1];
    const wholeSaleSec = document.querySelector('#whole-sale') || sections[2];
    const platformSec = document.querySelector('#platform') || sections[3];

    function extractSecInfo(el) {
      if (!el) return null;
      const computed = window.getComputedStyle(el);
      const h2 = el.querySelector('h2');
      const badges = Array.from(el.querySelectorAll('[class*="badge"], [class*="tag"], [class*="eyebrow"], span.uppercase, p.uppercase')).map(b => b.innerText.trim()).filter(Boolean);
      const paragraphs = Array.from(el.querySelectorAll('p')).map(p => p.innerText.trim()).filter(Boolean);
      const cards = Array.from(el.querySelectorAll('[class*="card"], [class*="grid"] > div, [class*="flex"] > div, article')).map(c => ({
        classes: c.className,
        text: c.innerText.replace(/\s+/g, ' ').slice(0, 120),
        bg: window.getComputedStyle(c).backgroundColor,
        border: window.getComputedStyle(c).border,
        borderRadius: window.getComputedStyle(c).borderRadius
      }));
      const images = Array.from(el.querySelectorAll('img')).map(img => ({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt') || '',
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        className: img.className
      }));
      const svgs = el.querySelectorAll('svg').length;
      const buttons = Array.from(el.querySelectorAll('a, button')).map(b => ({
        text: b.innerText.trim(),
        href: b.getAttribute('href'),
        classes: b.className
      })).filter(b => b.text.length > 0 && b.text.length < 50);

      return {
        id: el.id,
        className: el.className,
        bg: computed.backgroundColor,
        padding: computed.padding,
        h2: h2 ? h2.innerText.trim() : null,
        badges,
        paragraphs: paragraphs.slice(0, 5),
        cardsCount: cards.length,
        cardsSample: cards.slice(0, 8),
        images,
        svgsCount: svgs,
        buttons,
        rawHTMLSample: el.innerHTML.slice(0, 1500)
      };
    }

    return {
      marquee: extractSecInfo(marqueeSec),
      wholeSale: extractSecInfo(wholeSaleSec),
      platform: extractSecInfo(platformSec)
    };
  });

  console.log('=== MARQUEE SECTION ===');
  console.log(JSON.stringify(data.marquee, null, 2));

  console.log('\n=== WHOLE-SALE SECTION ===');
  console.log(JSON.stringify(data.wholeSale, null, 2));

  console.log('\n=== PLATFORM SECTION ===');
  console.log(JSON.stringify({
    id: data.platform?.id,
    className: data.platform?.className,
    h2: data.platform?.h2,
    badges: data.platform?.badges,
    paragraphs: data.platform?.paragraphs,
    cardsCount: data.platform?.cardsCount,
    cardsSample: data.platform?.cardsSample,
    buttons: data.platform?.buttons,
    images: data.platform?.images
  }, null, 2));

  await browser.close();
}

run().catch(console.error);

