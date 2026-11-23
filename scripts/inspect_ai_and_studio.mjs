import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://autodealer.io', { waitUntil: 'networkidle' });

  // Scroll to #ai and #studio to trigger all animations
  await page.evaluate(async () => {
    const ai = document.querySelector('#ai');
    if (ai) {
      ai.scrollIntoView({ behavior: 'instant', block: 'center' });
      await new Promise(r => setTimeout(r, 600));
    }
    const studio = document.querySelector('#studio');
    if (studio) {
      studio.scrollIntoView({ behavior: 'instant', block: 'center' });
      await new Promise(r => setTimeout(r, 600));
    }
  });

  const details = await page.evaluate(() => {
    const aiEl = document.querySelector('#ai');
    const studioEl = document.querySelector('#studio');

    function inspect(el) {
      if (!el) return null;
      const comp = window.getComputedStyle(el);
      const h2 = el.querySelector('h2');
      const h3s = Array.from(el.querySelectorAll('h3')).map(h => h.innerText.trim());
      const badges = Array.from(el.querySelectorAll('[class*="badge"], [class*="tag"], [class*="eyebrow"], span.uppercase')).map(b => b.innerText.trim()).filter(Boolean);
      const buttons = Array.from(el.querySelectorAll('button, a')).map(b => ({
        tag: b.tagName.toLowerCase(),
        text: b.innerText.trim(),
        href: b.getAttribute('href'),
        classes: b.className,
        color: window.getComputedStyle(b).color,
        bg: window.getComputedStyle(b).backgroundColor,
        border: window.getComputedStyle(b).border,
        borderRadius: window.getComputedStyle(b).borderRadius
      })).filter(b => b.text.length > 0 && b.text.length < 80);

      const cards = Array.from(el.querySelectorAll('[class*="card"], [class*="bento"], [class*="grid"] > div, [class*="rounded-xl"], [class*="rounded-2xl"], article')).map(c => ({
        classes: String(c.className).slice(0, 80),
        text: c.innerText.replace(/\s+/g, ' ').slice(0, 200),
        bg: window.getComputedStyle(c).backgroundColor,
        border: window.getComputedStyle(c).border,
        borderRadius: window.getComputedStyle(c).borderRadius
      }));

      const imgs = Array.from(el.querySelectorAll('img')).map(i => ({
        src: i.src,
        alt: i.alt,
        width: i.width,
        height: i.height,
        className: i.className
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
        buttons,
        cardsCount: cards.length,
        cardsSample: cards.slice(0, 10),
        imgs,
        rawHTML: el.innerHTML.slice(0, 3500)
      };
    }

    return {
      ai: inspect(aiEl),
      studio: inspect(studioEl)
    };
  });

  console.log('=== AI SECTION ===');
  console.log(JSON.stringify({
    id: details.ai?.id,
    className: details.ai?.className,
    bg: details.ai?.bg,
    color: details.ai?.color,
    h2: details.ai?.h2,
    h3s: details.ai?.h3s,
    badges: details.ai?.badges,
    buttons: details.ai?.buttons,
    cardsSample: details.ai?.cardsSample,
    imgs: details.ai?.imgs
  }, null, 2));

  console.log('\n=== STUDIO SECTION ===');
  console.log(JSON.stringify({
    id: details.studio?.id,
    className: details.studio?.className,
    bg: details.studio?.bg,
    color: details.studio?.color,
    h2: details.studio?.h2,
    h3s: details.studio?.h3s,
    badges: details.studio?.badges,
    buttons: details.studio?.buttons,
    cardsSample: details.studio?.cardsSample,
    imgs: details.studio?.imgs
  }, null, 2));

  console.log('\n=== AI HTML SAMPLE ===\n', details.ai?.rawHTML.slice(0, 1200));
  console.log('\n=== STUDIO HTML SAMPLE ===\n', details.studio?.rawHTML.slice(0, 1200));

  await browser.close();
}

run().catch(console.error);

