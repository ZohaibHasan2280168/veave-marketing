import { chromium } from 'playwright';

async function checkAllImages() {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const brokenImages = [];
  page.on('response', response => {
    if (response.request().resourceType() === 'image' && response.status() >= 400) {
      brokenImages.push({ url: response.url(), status: response.status() });
    }
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Scroll to bottom to trigger lazy loaded images
  await page.evaluate(async () => {
    await new Promise(r => {
      let y = 0;
      const interval = setInterval(() => {
        window.scrollBy({ top: 400, behavior: 'instant' });
        y += 400;
        if (y >= document.body.scrollHeight) {
          clearInterval(interval);
          r();
        }
      }, 50);
    });
  });

  await page.waitForTimeout(500);

  const imagesOnPage = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => ({
      src: img.src,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      displayed: img.offsetWidth > 0 && img.offsetHeight > 0
    }));
  });

  const failedToRender = imagesOnPage.filter(img => img.naturalWidth === 0);

  console.log(`Total images on page: ${imagesOnPage.length}`);
  console.log(`Broken HTTP images (>=400): ${brokenImages.length}`);
  if (brokenImages.length > 0) {
    console.error('Broken images:', brokenImages);
  }
  console.log(`Images with 0 naturalWidth: ${failedToRender.length}`);
  if (failedToRender.length > 0) {
    console.error('Failed to render:', failedToRender);
  }

  if (brokenImages.length === 0 && failedToRender.length === 0) {
    console.log('✅ ALL IMAGES LOADED AND RENDERED SUCCESSFULLY WITH 0 FAILURES!');
  }

  await browser.close();
}

checkAllImages().catch(console.error);

