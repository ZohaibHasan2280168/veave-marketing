const sharp = require('/home/harry/Devops/Projects/veave-marketing/node_modules/sharp');

async function analyze() {
  const image = sharp('/home/harry/Devops/Projects/veave-marketing/public/assets/veave/tilted_dashboard_raw.jpg');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  function getPixel(x, y) {
    const idx = (y * width + x) * channels;
    return [data[idx], data[idx + 1], data[idx + 2]];
  }

  // Let us inspect color at corners of the image:
  console.log("Top-left image (10, 10):", getPixel(10, 10));
  console.log("Top-right image (1010, 10):", getPixel(1010, 10));
  console.log("Bottom-left image (10, 560):", getPixel(10, 560));
  console.log("Bottom-right image (1010, 560):", getPixel(1010, 560));

  // The card has a white/light surface, but let us look at the edges of the card.
  // Let us sample along vertical lines at x = 200, 300, 500, 700, 800 to find top edge y and bottom edge y
  // The outer background has a gradient around rgb(235, 243, 250) or similar.
  // The card has a rounded corner and border.
  // Let us check top-most pixel that belongs to the card:
  // Let us find the top-most point, left-most point, right-most point, bottom-most point of the card.
}
analyze();

