const sharp = require('/home/harry/Devops/Projects/veave-marketing/node_modules/sharp');

async function findBoundingBox() {
  const image = sharp('/home/harry/Devops/Projects/veave-marketing/public/assets/veave/tilted_dashboard_raw.jpg');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Let's find minX, maxX, minY, maxY of all non-background pixels.
  // How to distinguish card pixel vs background pixel?
  // Background pixels have:
  // - very low standard deviation locally, smooth gradient
  // - around R=220-245, G=230-250, B=238-255
  // But the card has:
  // - Pure white: R>252, G>252, B>252
  // - Text / Icons: R < 200
  // - Borders: R,G,B around 230-245 with strong edges
  // Let's do edge detection (Sobel or gradient magnitude)!

  let minX = width, maxX = 0, minY = height, maxY = 0;
  
  // Let's check for strong edges or non-background pixels:
  // If a pixel is pure white (R>250, G>250, B>250) or dark (R<210):
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      const isCard = (r > 251 && g > 251 && b > 251) || (r < 200 || g < 200 || b < 200);
      if (isCard) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Bounding box of card: x=[${minX}, ${maxX}], y=[${minY}, ${maxY}]`);
}
findBoundingBox();

