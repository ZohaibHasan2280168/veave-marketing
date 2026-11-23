const sharp = require('/home/harry/Devops/Projects/veave-marketing/node_modules/sharp');

async function findVertices() {
  const image = sharp('/home/harry/Devops/Projects/veave-marketing/public/assets/veave/tilted_dashboard_raw.jpg');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  let min_x_plus_y = Infinity, cornerTL = null;
  let max_x_minus_y = -Infinity, cornerTR = null;
  let max_x_plus_y = -Infinity, cornerBR = null;
  let min_x_minus_y = Infinity, cornerBL = null;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      
      // Is card pixel:
      // Note that background in the corners has decorative faint triangles (like at bottom-left x=66 y=500).
      // Let's filter out the decorative triangles in background by checking if it's card body.
      // Card has pure white (r > 252, g > 252, b > 252) or dark text (r < 180).
      // But the faint triangles have colors like [210, 222, 235] which might be < 200 in R? No, let's check.
      const isCard = (r >= 253 && g >= 253 && b >= 253) || (r < 160 && g < 160 && b < 160) || (b > 180 && r < 50);

      if (isCard) {
        if (x + y < min_x_plus_y) {
          min_x_plus_y = x + y;
          cornerTL = { x, y };
        }
        if (x - y > max_x_minus_y) {
          max_x_minus_y = x - y;
          cornerTR = { x, y };
        }
        if (x + y > max_x_plus_y) {
          max_x_plus_y = x + y;
          cornerBR = { x, y };
        }
        if (x - y < min_x_minus_y) {
          min_x_minus_y = x - y;
          cornerBL = { x, y };
        }
      }
    }
  }

  console.log("Corner Top-Left:", cornerTL);
  console.log("Corner Top-Right:", cornerTR);
  console.log("Corner Bottom-Right:", cornerBR);
  console.log("Corner Bottom-Left:", cornerBL);
}
findVertices();

