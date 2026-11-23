import { chromium } from 'playwright';

async function verifyAllVeaveImages() {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const brokenImages = [];
  page.on('response', res => {
    if (res.request().resourceType() === 'image' && res.status() >= 400) {
      brokenImages.push({ url: res.url(), status: res.status() });
    }
  });

  const routes = [
    '/',
    '/roles/admin',
    '/roles/dept-head',
    '/roles/qc',
    '/workflows',
    '/workflows/cutting-prep',
    '/features',
    '/features/order-intake',
    '/tools',
    '/tools/fabric-consumption',
    '/pricing',
    '/contact',
    '/signup',
    '/integrations'
  ];

  console.log(`Checking images across ${routes.length} routes...`);

  let totalImagesChecked = 0;

  for (const route of routes) {
    await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle' });
    const count = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.filter(i => i.naturalWidth > 0).length;
    });
    totalImagesChecked += count;
  }

  console.log(`Total valid images verified across all routes: ${totalImagesChecked}`);
  console.log(`Broken images (status >= 400): ${brokenImages.length}`);

  if (brokenImages.length > 0) {
    console.error('Broken images:', brokenImages);
    process.exit(1);
  } else {
    console.log('✅ ALL IMAGES ACROSS ALL 14 TESTED ROUTES LOADED PERFECTLY WITH ZERO BROKEN LINKS!');
  }

  await browser.close();
}

verifyAllVeaveImages().catch(err => {
  console.error(err);
  process.exit(1);
});

