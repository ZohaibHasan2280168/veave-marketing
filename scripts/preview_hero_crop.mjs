import { chromium } from 'playwright';

async function testCropVisual() {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            margin: 0;
            background: #122a38;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            overflow: hidden;
          }
          .dashboard-wrapper {
            position: relative;
            filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.45)) drop-shadow(0 10px 20px rgba(14, 107, 253, 0.15));
            transition: transform 0.3s ease;
          }
          .dashboard-img {
            display: block;
            max-width: 680px;
            height: auto;
          }
        </style>
      </head>
      <body>
        <div class="dashboard-wrapper">
          <img class="dashboard-img" src="http://localhost:3000/assets/veave/veave_tilted_dashboard.png" />
        </div>
      </body>
    </html>
  `);

  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/harry/Devops/Projects/veave-marketing/scripts/preview_crop.png' });
  console.log("Screenshot saved to scripts/preview_crop.png");
  await browser.close();
}

testCropVisual().catch(console.error);

