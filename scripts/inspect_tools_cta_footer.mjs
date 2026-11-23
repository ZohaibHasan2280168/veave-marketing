import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://autodealer.io', { waitUntil: 'networkidle' });

  // Scroll to bottom
  await page.evaluate(async () => {
    const freeTools = document.querySelector('#free-tools');
    if (freeTools) {
      freeTools.scrollIntoView({ behavior: 'instant', block: 'center' });
      await new Promise(r => setTimeout(r, 600));
    }
    const footer = document.querySelector('#site-footer') || document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'instant', block: 'center' });
      await new Promise(r => setTimeout(r, 600));
    }
  });

  const details = await page.evaluate(() => {
    // 1. Free Tools
    const toolsEl = document.querySelector('#free-tools');
    let freeToolsInfo = null;
    if (toolsEl) {
      const comp = window.getComputedStyle(toolsEl);
      const h2 = toolsEl.querySelector('h2');
      const cards = Array.from(toolsEl.querySelectorAll('[class*="card"], [class*="grid"] > a, [class*="grid"] > div')).map(c => ({
        tag: c.tagName.toLowerCase(),
        classes: c.className,
        href: c.getAttribute('href'),
        text: c.innerText.replace(/\s+/g, ' ').trim(),
        title: c.querySelector('h3, [class*="title"], strong')?.innerText.trim(),
        desc: c.querySelector('p, [class*="desc"], span:not([class*="title"])')?.innerText.trim()
      }));
      freeToolsInfo = {
        id: toolsEl.id,
        className: toolsEl.className,
        bg: comp.backgroundColor,
        padding: comp.padding,
        h2: h2 ? h2.innerText.trim() : null,
        cardsCount: cards.length,
        cards,
        rawHTML: toolsEl.innerHTML.slice(0, 2000)
      };
    }

    // 2. Final CTA Banner
    // Usually right before footer
    const footer = document.querySelector('#site-footer') || document.querySelector('footer');
    let finalCtaEl = null;
    if (footer) {
      // Find the section immediately preceding the footer
      let prev = footer.previousElementSibling;
      while (prev && prev.tagName.toLowerCase() !== 'section') {
        prev = prev.previousElementSibling;
      }
      finalCtaEl = prev;
    }
    let finalCtaInfo = null;
    if (finalCtaEl) {
      const comp = window.getComputedStyle(finalCtaEl);
      const h2 = finalCtaEl.querySelector('h2');
      const badges = Array.from(finalCtaEl.querySelectorAll('[class*="badge"], [class*="tag"], [class*="eyebrow"], span.uppercase')).map(b => b.innerText.trim());
      const buttons = Array.from(finalCtaEl.querySelectorAll('button, a')).map(b => ({
        text: b.innerText.trim(),
        href: b.getAttribute('href'),
        classes: b.className
      }));
      finalCtaInfo = {
        className: finalCtaEl.className,
        bg: comp.backgroundColor,
        color: comp.color,
        h2: h2 ? h2.innerText.trim() : null,
        badges,
        buttons,
        rawHTML: finalCtaEl.innerHTML.slice(0, 1500)
      };
    }

    // 3. Footer
    let footerInfo = null;
    if (footer) {
      const comp = window.getComputedStyle(footer);
      const columns = Array.from(footer.querySelectorAll('nav, [class*="col"], dl, ul')).map(c => ({
        classes: String(c.className).slice(0, 60),
        title: c.querySelector('h2, h3, h4, span.font-bold, span.uppercase')?.innerText.trim(),
        links: Array.from(c.querySelectorAll('a')).map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') }))
      })).filter(c => c.links.length > 0);

      const allLinks = Array.from(footer.querySelectorAll('a')).map(a => ({
        text: a.innerText.trim(),
        href: a.getAttribute('href')
      })).filter(a => a.text.length > 0);

      footerInfo = {
        id: footer.id,
        className: footer.className,
        bg: comp.backgroundColor,
        color: comp.color,
        columnsCount: columns.length,
        columns: columns.slice(0, 10),
        allLinksCount: allLinks.length,
        allLinksSample: allLinks.slice(0, 25),
        rawHTML: footer.innerHTML.slice(0, 2500)
      };
    }

    return { freeToolsInfo, finalCtaInfo, footerInfo };
  });

  console.log('=== FREE TOOLS INFO ===');
  console.log(JSON.stringify(details.freeToolsInfo, null, 2));

  console.log('\n=== FINAL CTA INFO ===');
  console.log(JSON.stringify(details.finalCtaInfo, null, 2));

  console.log('\n=== FOOTER INFO ===');
  console.log(JSON.stringify({
    id: details.footerInfo?.id,
    className: details.footerInfo?.className,
    bg: details.footerInfo?.bg,
    color: details.footerInfo?.color,
    columnsCount: details.footerInfo?.columnsCount,
    columns: details.footerInfo?.columns,
    allLinksCount: details.footerInfo?.allLinksCount
  }, null, 2));

  console.log('\n=== FOOTER HTML SAMPLE ===\n', details.footerInfo?.rawHTML.slice(0, 1500));

  await browser.close();
}

run().catch(console.error);

