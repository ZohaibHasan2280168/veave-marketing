const sharp = require('/home/harry/Devops/Projects/veave-marketing/node_modules/sharp');

async function createCleanDashboard() {
  const inputPath = '/home/harry/Devops/Projects/veave-marketing/public/assets/veave/tilted_dashboard_raw.jpg';
  const outputPath = '/home/harry/Devops/Projects/veave-marketing/public/assets/veave/veave_tilted_dashboard.png';

  // The 4 corners of the rounded card in the 1024x572 image:
  // TL: (290, 11)
  // TR: (873, 103)
  // BR: (729, 551)
  // BL: (152, 460)
  
  // Let us refine the corner points slightly inward (by 1-2px) so not a single pixel of the grey outer canvas is included!
  // Vector TL -> TR: (583, 92), unit vector: u_top = (0.9878, 0.1559)
  // Vector TL -> BL: (-138, 449), unit vector: u_left = (-0.2938, 0.9559)
  // Inward offset of 2px along both directions ensures crisp, razor-sharp white edges without any grey border.

  // Let's create an SVG mask with rounded corners!
  // Using an SVG polygon or path with rounded corners (e.g. cubic bezier or arc):
  // Let's create a high-resolution SVG mask.
  const r = 24; // corner radius in pixels

  // We can construct the 4 rounded corners:
  // Corner TL: near (290, 12)
  // Corner TR: near (872, 104)
  // Corner BR: near (728, 550)
  // Corner BL: near (153, 459)

  // Inward shift:
  // p1 = TL, p2 = TR, p3 = BR, p4 = BL
  // Let's compute exact polygon with rounded corners.
  const svgMask = `
    <svg width="1024" height="572" viewBox="0 0 1024 572" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="smooth">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
      </defs>
      <path d="
        M 314 16
        L 852 101
        Q 872 104 869 124
        L 733 534
        Q 730 550 710 547
        L 172 462
        Q 152 459 155 439
        L 287 31
        Q 290 12 314 16
        Z
      " fill="#ffffff" />
    </svg>
  `;

  // Let's apply this mask using sharp composite with 'dest-in'
  const maskBuffer = Buffer.from(svgMask);

  // Apply mask to create transparent PNG
  const maskedImage = await sharp(inputPath)
    .ensureAlpha()
    .composite([
      {
        input: maskBuffer,
        blend: 'dest-in'
      }
    ])
    .png()
    .toBuffer();

  // Now let's trim the transparent pixels around the card
  await sharp(maskedImage)
    .trim()
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(outputPath);

  const trimmedMeta = await sharp(outputPath).metadata();
  console.log("Successfully generated veave_tilted_dashboard.png!");
  console.log("Trimmed dimensions:", trimmedMeta.width, "x", trimmedMeta.height);
}

createCleanDashboard().catch(console.error);

