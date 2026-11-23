const sharp = require('/home/harry/Devops/Projects/veave-marketing/node_modules/sharp');

async function detectEdges() {
  const image = sharp('/home/harry/Devops/Projects/veave-marketing/public/assets/veave/tilted_dashboard_raw.jpg');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  function isBackground(x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height) return true;
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    
    // The background is a gradient between [220, 230, 240] and [245, 248, 252] with slight geometric triangle accents
    // The card itself is pure white [255, 255, 255] or dark text/borders/sidebar.
    // The shadow around the card is darker grey [190-220].
    // But the card interior is mostly white [255, 255, 255] or light blue elements.
    // Let's check if pixel is part of the card:
    // Notice the card border has a distinct outline.
    return { r, g, b };
  }

  // Let's sample along horizontal lines to find left & right edges of the card
  // at y = 100, 200, 300, 400, 500
  console.log("Sampling row y=100 from x=100 to 900:");
  const row100 = [];
  for (let x = 150; x <= 900; x += 25) {
    const p = isBackground(x, 100);
    row100.push({ x, ...p });
  }
  
  // Find where card begins and ends at y=50, 100, 200, 300, 400, 500
  for (let y of [40, 80, 150, 250, 350, 450, 520]) {
    let cardLeft = -1, cardRight = -1;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // Background has slight color tint where b > r + 3 and not pure white (r < 252)
      // Card has pure white (r >= 253, g >= 253, b >= 253) or internal elements
      if (r > 250 && g > 250 && b > 250) {
        if (cardLeft === -1) cardLeft = x;
        cardRight = x;
      }
    }
    console.log(`y=${y}: card pure-white range [${cardLeft}, ${cardRight}]`);
  }
}
detectEdges();

