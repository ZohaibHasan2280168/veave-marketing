const sharp = require('/home/harry/Devops/Projects/veave-marketing/node_modules/sharp');

async function findExactCorners() {
  const image = sharp('/home/harry/Devops/Projects/veave-marketing/public/assets/veave/tilted_dashboard_raw.jpg');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Let us inspect the four extreme points:
  // 1. Top-most point of the card (minimum y)
  // 2. Right-most point of the card (maximum x)
  // 3. Bottom-most point of the card (maximum y)
  // 4. Left-most point of the card (minimum x)
  
  // A pixel is "Card" if it is NOT background.
  // The background has r in [215..248], g in [225..250], b in [235..255] AND b >= g >= r (it is cool blue-tinted grey).
  // The card has r=255, g=255, b=255 (or dark text, blue buttons r < 50, etc.), but the card's surface is pure white r=255,g=255,b=255.
  // But near the edge of the card, the card has a border or shadow.
  // Let us find the 4 corners:
  // Top-left: near (x=280, y=25)
  // Top-right: near (x=860, y=180)
  // Bottom-right: near (x=730, y=550)
  // Bottom-left: near (x=140, y=390)

  // Let us check along lines:
  console.log("Inspecting top-left area x: 260..300, y: 15..45");
  for (let y = 15; y <= 35; y++) {
    for (let x = 260; x <= 300; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // blue button is r < 100, b > 200
      if (b > 180 && r < 100) {
        console.log(`Blue button found at x=${x}, y=${y}, rgb=[${r},${g},${b}]`);
      }
    }
  }

  // Inspect bottom-left:
  console.log("Inspecting bottom-left area x: 120..160, y: 380..420");
  for (let y = 390; y <= 420; y += 5) {
    for (let x = 120; x <= 160; x += 5) {
      const idx = (y * width + x) * channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (r > 250 && g > 250 && b > 250) {
        console.log(`Bottom-left white at x=${x}, y=${y}`);
      }
    }
  }

  // Inspect top-right:
  console.log("Inspecting top-right area x: 840..890, y: 170..210");
  for (let y = 170; y <= 210; y += 5) {
    for (let x = 840; x <= 890; x += 5) {
      const idx = (y * width + x) * channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (r > 250 && g > 250 && b > 250) {
        console.log(`Top-right white at x=${x}, y=${y}`);
      }
    }
  }

  // Inspect bottom-right:
  console.log("Inspecting bottom-right area x: 700..750, y: 530..565");
  for (let y = 530; y <= 565; y += 5) {
    for (let x = 700; x <= 750; x += 5) {
      const idx = (y * width + x) * channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (r > 250 && g > 250 && b > 250) {
        console.log(`Bottom-right white at x=${x}, y=${y}`);
      }
    }
  }
}
findExactCorners();

