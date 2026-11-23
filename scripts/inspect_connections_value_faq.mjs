import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://autodealer.io', { waitUntil: 'networkidle' });

  // Scroll to sections
  await page.evaluate(async () => {
    for (const id of ['#connections', '#value', '#faq']) {
      const el = document.querySelector(id);
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'center' });
        await new Promise(r => setTimeout(r, 600));
      }
    }
  });

  const details = await page.evaluate(() => {
    function getDetails(id) {
      const el = document.querySelector(id);
      if (!el) return null;
      const comp = window.getComputedStyle(el);
      const h2 = el.querySelector('h2');
      const h3s = Array.from(el.querySelectorAll('h3')).map(h => h.innerText.trim()).filter(Boolean);
      const badges = Array.from(el.querySelectorAll('[class*="badge"], [class*="tag"], [class*="eyebrow"], span.uppercase, p.uppercase')).map(b => b.innerText.trim()).filter(Boolean);
      const paragraphs = Array.from(el.querySelectorAll('p')).map(p => p.innerText.trim()).filter(Boolean);
      
      const cards = Array.from(el.querySelectorAll('[class*="card"], [class*="item"], [class*="grid"] > div, [class*="grid"] > li, article, details')).map(c => ({
        tag: c.tagName.toLowerCase(),
        classes: String(c.className).slice(0, 80),
        text: c.innerText.replace(/\s+/g, ' ').slice(0, 200),
        bg: window.getComputedStyle(c).backgroundColor,
        border: window.getComputedStyle(c).border,
        borderRadius: window.getComputedStyle(c).borderRadius
      }));

      const buttons = Array.from(el.querySelectorAll('button, a')).map(b => ({
        tag: b.tagName.toLowerCase(),
        text: b.innerText.trim(),
        href: b.getAttribute('href'),
        classes: b.className
      })).filter(b => b.text.length > 0 && b.text.length < 80);

      const imgs = Array.from(el.querySelectorAll('img')).map(i => ({
        src: i.src,
        alt: i.alt,
        width: i.width,
        height: i.height
      }));

      return {
        id: el.id,
        className: el.className,
        bg: comp.backgroundColor,
        color: comp.color,
        padding: comp.padding,
        h2: h2 ? h2.innerText.trim() : null,
        h3s,
        badges: Array.from(new Set(badges)),
        paragraphs: paragraphs.slice(0, 10),
        buttons,
        cardsCount: cards.length,
        cardsSample: cards.slice(0, 12),
        imgs,
        rawHTML: el.innerHTML.slice(0, 3000)
      };
    }

    // Also get FAQ questions and answers
    const faqDetails = [];
    const faqItems = document.querySelectorAll('#faq details, #faq [class*="accordion"], #faq li');
    faqItems.forEach(item => {
      const q = item.querySelector('summary, h3, button, [class*="question"]');
      const a = item.querySelector('[class*="answer"], p, [class*="content"]');
      if (q) {
        faqDetails.push({
          q: q.innerText.trim(),
          a: a ? a.innerText.trim() : ''
        });
      }
    });

    return {
      connections: getDetails('#connections'),
      value: getDetails('#value'),
      faq: getDetails('#faq'),
      faqList: faqDetails.slice(0, 20)
    };
  });

  console.log('=== CONNECTIONS SECTION ===');
  console.log(JSON.stringify(details.connections, null, 2));

  console.log('\n=== VALUE SECTION ===');
  console.log(JSON.stringify({
    id: details.value?.id,
    h2: details.value?.h2,
    badges: details.value?.badges,
    paragraphs: details.value?.paragraphs,
    h3s: details.value?.h3s,
    buttons: details.value?.buttons,
    cardsSample: details.value?.cardsSample
  }, null, 2));

  console.log('\n=== FAQ SECTION ===');
  console.log(JSON.stringify({
    id: details.faq?.id,
    h2: details.faq?.h2,
    badges: details.faq?.badges,
    buttons: details.faq?.buttons,
    faqCount: details.faqList.length,
    faqSample: details.faqList.slice(0, 8)
  }, null, 2));

  console.log('\n=== FAQ HTML SAMPLE ===\n', details.faq?.rawHTML.slice(0, 1200));

  await browser.close();
}

run().catch(console.error);

