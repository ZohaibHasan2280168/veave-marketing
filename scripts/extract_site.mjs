import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const assetsDir = path.join(projectRoot, 'public', 'assets');
const blueprintPath = path.join(projectRoot, 'SITE_BLUEPRINT.md');
const debugDataPath = path.join(__dirname, 'extracted_raw_data.json');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

async function run() {
  console.log('🚀 Launching Chrome via Playwright...');
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1440,900'
    ]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  // Track network resources
  const capturedResponses = new Map();
  page.on('response', async (response) => {
    try {
      const url = response.url();
      const status = response.status();
      const contentType = response.headers()['content-type'] || '';
      if (status >= 200 && status < 300) {
        if (
          contentType.includes('image') ||
          contentType.includes('video') ||
          contentType.includes('svg') ||
          /\.(png|jpe?g|webp|avif|gif|svg|mp4|webm)(\?.*)?$/i.test(url)
        ) {
          const buffer = await response.body().catch(() => null);
          if (buffer && buffer.length > 0) {
            capturedResponses.set(url, { buffer, contentType });
          }
        }
      }
    } catch (e) {
      // Ignore response body collection errors
    }
  });

  console.log('🌐 Navigating to https://autodealer.io ...');
  await page.goto('https://autodealer.io', {
    waitUntil: 'networkidle',
    timeout: 60000
  });

  console.log('⏳ Waiting 4 seconds for initial page animations and scripts...');
  await page.waitForTimeout(4000);

  const initialTitle = await page.title();
  console.log(`📄 Page Title: ${initialTitle}`);

  // Scroll down slowly
  console.log('📜 Scrolling page slowly to trigger animations and lazy load...');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 250;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy({ top: distance, behavior: 'smooth' });
        totalHeight += distance;

        if (totalHeight >= scrollHeight + 1000) {
          clearInterval(timer);
          resolve();
        }
      }, 150);
    });
  });

  console.log('⏳ Reached bottom. Waiting 4 seconds for lazy-loaded assets and end animations...');
  await page.waitForTimeout(4000);

  // Scroll back to top smoothly
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  await page.waitForTimeout(2000);

  console.log('🔍 Extracting design tokens, DOM hierarchy, and sections...');

  const extractionResult = await page.evaluate(() => {
    // Helper to rgb to hex
    function rgbToHex(rgb) {
      if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return null;
      const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);
      if (!match) return rgb;
      const r = parseInt(match[1]).toString(16).padStart(2, '0');
      const g = parseInt(match[2]).toString(16).padStart(2, '0');
      const b = parseInt(match[3]).toString(16).padStart(2, '0');
      const a = match[4] !== undefined ? Math.round(parseFloat(match[4]) * 255).toString(16).padStart(2, '0') : '';
      return `#${r}${g}${b}${a}`;
    }

    // 1. Root CSS variables
    const cssVars = {};
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules || []) {
          if (rule.selectorText === ':root' || rule.selectorText === 'html' || rule.selectorText === 'body') {
            for (let i = 0; i < rule.style.length; i++) {
              const prop = rule.style[i];
              if (prop.startsWith('--')) {
                cssVars[prop] = rule.style.getPropertyValue(prop).trim();
              }
            }
          }
        }
      } catch (e) {}
    }

    // 2. Computed styles across all elements
    const colors = {
      text: {},
      backgrounds: {},
      borders: {},
      fills: {},
      strokes: {},
      gradients: new Set()
    };
    const fontFamilies = {};
    const fontSizes = {};
    const borderRadii = {};
    const shadows = {};

    const allElements = document.querySelectorAll('*');
    allElements.forEach((el) => {
      const style = window.getComputedStyle(el);
      const text = el.innerText ? el.innerText.trim() : '';

      // Text Color
      if (text.length > 0 && style.color) {
        const hex = rgbToHex(style.color) || style.color;
        colors.text[hex] = (colors.text[hex] || 0) + 1;
      }

      // Background Color
      if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent') {
        const hex = rgbToHex(style.backgroundColor) || style.backgroundColor;
        colors.backgrounds[hex] = (colors.backgrounds[hex] || 0) + 1;
      }

      // Border Color
      if (style.borderColor && style.borderWidth !== '0px' && style.borderColor !== 'rgba(0, 0, 0, 0)' && style.borderColor !== 'transparent') {
        const hex = rgbToHex(style.borderColor) || style.borderColor;
        colors.borders[hex] = (colors.borders[hex] || 0) + 1;
      }

      // SVG fill / stroke
      if (el.tagName.toLowerCase() === 'svg' || el.tagName.toLowerCase() === 'path') {
        if (style.fill && style.fill !== 'none') {
          const hex = rgbToHex(style.fill) || style.fill;
          colors.fills[hex] = (colors.fills[hex] || 0) + 1;
        }
        if (style.stroke && style.stroke !== 'none') {
          const hex = rgbToHex(style.stroke) || style.stroke;
          colors.strokes[hex] = (colors.strokes[hex] || 0) + 1;
        }
      }

      // Gradient background
      if (style.backgroundImage && style.backgroundImage.includes('gradient')) {
        colors.gradients.add(style.backgroundImage);
      }

      // Font Family
      if (text.length > 0 && style.fontFamily) {
        const primaryFont = style.fontFamily.split(',')[0].replace(/['"]/g, '').trim();
        fontFamilies[primaryFont] = (fontFamilies[primaryFont] || 0) + 1;
      }

      // Font Size + Weight
      if (text.length > 0 && style.fontSize) {
        const key = `${style.fontSize} (weight: ${style.fontWeight}, line-height: ${style.lineHeight})`;
        fontSizes[key] = (fontSizes[key] || 0) + 1;
      }

      // Border Radius
      if (style.borderRadius && style.borderRadius !== '0px') {
        borderRadii[style.borderRadius] = (borderRadii[style.borderRadius] || 0) + 1;
      }

      // Box Shadows
      if (style.boxShadow && style.boxShadow !== 'none') {
        shadows[style.boxShadow] = (shadows[style.boxShadow] || 0) + 1;
      }
    });

    // 3. Extract visible media elements
    const images = [];
    document.querySelectorAll('img').forEach((img, idx) => {
      const src = img.currentSrc || img.src || img.getAttribute('src');
      const alt = img.getAttribute('alt') || '';
      const rect = img.getBoundingClientRect();
      images.push({
        id: `img_${idx}`,
        src,
        alt,
        width: rect.width || img.naturalWidth || img.width,
        height: rect.height || img.naturalHeight || img.height,
        classes: img.className,
        visible: rect.width > 0 && rect.height > 0
      });
    });

    // Inline SVGs
    const svgs = [];
    document.querySelectorAll('svg').forEach((svg, idx) => {
      const rect = svg.getBoundingClientRect();
      // Only include reasonably sized SVGs (ignore 0x0)
      const parent = svg.closest('header, nav, button, a, section, footer, [data-section]');
      const contextTag = parent ? `${parent.tagName.toLowerCase()}${parent.id ? '#' + parent.id : ''}${parent.className ? '.' + String(parent.className).split(' ')[0] : ''}` : '';
      svgs.push({
        id: `svg_${idx}`,
        context: contextTag,
        outerHTML: svg.outerHTML,
        width: rect.width || svg.clientWidth,
        height: rect.height || svg.clientHeight,
        classes: svg.getAttribute('class') || ''
      });
    });

    // Videos
    const videos = [];
    document.querySelectorAll('video').forEach((v, idx) => {
      const rect = v.getBoundingClientRect();
      const sources = Array.from(v.querySelectorAll('source')).map(s => s.getAttribute('src') || s.src);
      videos.push({
        id: `video_${idx}`,
        src: v.currentSrc || v.src || (sources.length > 0 ? sources[0] : ''),
        sources,
        poster: v.getAttribute('poster') || '',
        width: rect.width,
        height: rect.height,
        classes: v.className,
        autoplay: v.autoplay,
        loop: v.loop
      });
    });

    // 4. Extract Section Breakdown
    // Let's find top-level sections in <main>, body, or main containers
    const sections = [];

    // Check header
    const headerEl = document.querySelector('header') || document.querySelector('nav');
    if (headerEl) {
      const rect = headerEl.getBoundingClientRect();
      const style = window.getComputedStyle(headerEl);
      const links = Array.from(headerEl.querySelectorAll('a, button')).map(el => el.innerText.trim()).filter(Boolean);
      sections.push({
        type: 'Header / Navigation',
        tag: headerEl.tagName.toLowerCase(),
        id: headerEl.id,
        className: headerEl.className,
        layout: {
          display: style.display,
          position: style.position,
          justifyContent: style.justifyContent,
          alignItems: style.alignItems,
          padding: `${style.paddingTop} ${style.paddingRight} ${style.paddingBottom} ${style.paddingLeft}`,
          width: rect.width,
          height: rect.height,
          sticky: style.position === 'sticky' || style.position === 'fixed'
        },
        styles: {
          backgroundColor: rgbToHex(style.backgroundColor) || style.backgroundColor,
          backdropFilter: style.backdropFilter,
          borderBottom: style.borderBottom
        },
        contentSummary: {
          navItems: links,
          text: headerEl.innerText.replace(/\s+/g, ' ').slice(0, 300)
        }
      });
    }

    // Identify main container and child sections
    const mainContainer = document.querySelector('main') || document.body;
    // Look for direct sections, divs with role="region", or direct structural children
    const candidates = Array.from(mainContainer.children).filter(el => {
      const tag = el.tagName.toLowerCase();
      if (['script', 'style', 'noscript', 'header', 'nav', 'footer'].includes(tag)) return false;
      const rect = el.getBoundingClientRect();
      return rect.height > 50; // meaningful height
    });

    candidates.forEach((cand, idx) => {
      const tag = cand.tagName.toLowerCase();
      const style = window.getComputedStyle(cand);
      const rect = cand.getBoundingClientRect();

      // Find headings inside
      const headings = Array.from(cand.querySelectorAll('h1, h2, h3, h4')).map(h => ({
        level: h.tagName.toLowerCase(),
        text: h.innerText.trim()
      }));

      // Find buttons or links
      const ctas = Array.from(cand.querySelectorAll('button, a')).map(b => b.innerText.trim()).filter(t => t.length > 0 && t.length < 50).slice(0, 6);

      // Find images and videos count
      const imgCount = cand.querySelectorAll('img').length;
      const svgCount = cand.querySelectorAll('svg').length;
      const videoCount = cand.querySelectorAll('video').length;

      // Detect layout
      const gridCols = style.gridTemplateColumns;
      const flexDir = style.flexDirection;

      // Extract card elements
      const cards = Array.from(cand.querySelectorAll('[class*="card"], [class*="item"], [class*="grid"] > div')).slice(0, 8).map(c => {
        const cStyle = window.getComputedStyle(c);
        return {
          tag: c.tagName.toLowerCase(),
          className: String(c.className).slice(0, 60),
          bg: rgbToHex(cStyle.backgroundColor) || cStyle.backgroundColor,
          border: cStyle.border,
          borderRadius: cStyle.borderRadius,
          textSample: c.innerText.slice(0, 80).replace(/\s+/g, ' ')
        };
      });

      sections.push({
        type: `Section ${idx + 1}${headings.length > 0 ? ': ' + headings[0].text : ''}`,
        tag,
        id: cand.id,
        className: cand.className,
        headings,
        ctas,
        mediaCounts: { imgCount, svgCount, videoCount },
        layout: {
          display: style.display,
          flexDirection: flexDir,
          gridTemplateColumns: gridCols,
          padding: `${style.paddingTop} ${style.paddingRight} ${style.paddingBottom} ${style.paddingLeft}`,
          maxWidth: style.maxWidth,
          width: rect.width,
          height: rect.height
        },
        styles: {
          backgroundColor: rgbToHex(style.backgroundColor) || style.backgroundColor,
          backgroundImage: style.backgroundImage.includes('url') || style.backgroundImage.includes('gradient') ? style.backgroundImage.slice(0, 100) : 'none',
          borderRadius: style.borderRadius,
          border: style.border
        },
        textPreview: cand.innerText.replace(/\s+/g, ' ').slice(0, 400),
        sampleCards: cards.slice(0, 4)
      });
    });

    // Check footer
    const footerEl = document.querySelector('footer');
    if (footerEl) {
      const rect = footerEl.getBoundingClientRect();
      const style = window.getComputedStyle(footerEl);
      sections.push({
        type: 'Footer',
        tag: 'footer',
        id: footerEl.id,
        className: footerEl.className,
        layout: {
          display: style.display,
          gridTemplateColumns: style.gridTemplateColumns,
          padding: `${style.paddingTop} ${style.paddingRight} ${style.paddingBottom} ${style.paddingLeft}`,
          width: rect.width,
          height: rect.height
        },
        styles: {
          backgroundColor: rgbToHex(style.backgroundColor) || style.backgroundColor,
          borderTop: style.borderTop
        },
        textPreview: footerEl.innerText.replace(/\s+/g, ' ').slice(0, 400),
        links: Array.from(footerEl.querySelectorAll('a')).map(a => a.innerText.trim()).filter(Boolean).slice(0, 20)
      });
    }

    return {
      cssVars,
      colors: {
        text: colors.text,
        backgrounds: colors.backgrounds,
        borders: colors.borders,
        fills: colors.fills,
        strokes: colors.strokes,
        gradients: Array.from(colors.gradients)
      },
      fontFamilies,
      fontSizes,
      borderRadii,
      shadows,
      images,
      svgs,
      videos,
      sections
    };
  });

  console.log(`📊 Extracted:
- ${Object.keys(extractionResult.colors.backgrounds).length} background colors
- ${Object.keys(extractionResult.colors.text).length} text colors
- ${Object.keys(extractionResult.fontFamilies).length} font families
- ${Object.keys(extractionResult.fontSizes).length} font size variations
- ${Object.keys(extractionResult.borderRadii).length} border-radius values
- ${extractionResult.images.length} images found
- ${extractionResult.svgs.length} inline SVGs found
- ${extractionResult.videos.length} videos found
- ${extractionResult.sections.length} major sections detected`);

  // Save raw extraction result for reference
  fs.writeFileSync(debugDataPath, JSON.stringify(extractionResult, null, 2), 'utf-8');

  // Download all media assets
  console.log('📥 Downloading all visible images, logos, videos, and SVGs into public/assets/...');
  const downloadedAssets = [];

  // 1. Download images
  for (let i = 0; i < extractionResult.images.length; i++) {
    const img = extractionResult.images[i];
    if (!img.src || img.src.startsWith('data:')) {
      // If it's a data URI, handle it
      if (img.src && img.src.startsWith('data:image/')) {
        const matches = img.src.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
        if (matches) {
          const ext = matches[1].replace('+xml', '');
          const filename = `image_${i}_${cleanName(img.alt || 'img')}.${ext}`;
          const filePath = path.join(assetsDir, filename);
          fs.writeFileSync(filePath, Buffer.from(matches[2], 'base64'));
          downloadedAssets.push({ type: 'image', filename, originalUrl: 'data-uri', size: fs.statSync(filePath).size, alt: img.alt });
        }
      }
      continue;
    }

    try {
      let buffer = null;
      let ext = 'png';

      // Check captured network responses
      if (capturedResponses.has(img.src)) {
        buffer = capturedResponses.get(img.src).buffer;
      } else {
        // Try to fetch via page evaluate or direct node fetch
        const response = await context.request.get(img.src).catch(() => null);
        if (response && response.ok()) {
          buffer = await response.body();
        }
      }

      if (buffer) {
        // Determine extension
        const urlObj = new URL(img.src, 'https://autodealer.io');
        const pathname = urlObj.pathname;
        const matchExt = pathname.match(/\.(png|jpe?g|webp|avif|gif|svg)$/i);
        if (matchExt) {
          ext = matchExt[1].toLowerCase();
          if (ext === 'jpeg') ext = 'jpg';
        } else if (img.src.includes('format=webp')) {
          ext = 'webp';
        } else if (img.src.includes('format=avif')) {
          ext = 'avif';
        }

        const nameBase = cleanName(img.alt || path.basename(pathname, path.extname(pathname)) || `image_${i}`);
        const filename = `${nameBase}.${ext}`;
        const uniqueFilename = getUniqueFilename(assetsDir, filename);
        const filePath = path.join(assetsDir, uniqueFilename);
        fs.writeFileSync(filePath, buffer);
        downloadedAssets.push({
          type: 'image',
          filename: uniqueFilename,
          originalUrl: img.src,
          size: buffer.length,
          alt: img.alt,
          dimensions: `${img.width}x${img.height}`
        });
      }
    } catch (err) {
      console.warn(`Failed downloading image ${img.src}:`, err.message);
    }
  }

  // 2. Download and save SVGs
  console.log('🎨 Processing inline SVGs...');
  for (let i = 0; i < extractionResult.svgs.length; i++) {
    const svg = extractionResult.svgs[i];
    let svgContent = svg.outerHTML.trim();
    if (!svgContent.includes('xmlns="http://www.w3.org/2000/svg"')) {
      svgContent = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    // Determine clean name from context
    let name = `icon_${i}`;
    if (svg.context) {
      const sanitizedContext = cleanName(svg.context.replace(/[#.\[\]:]/g, '_'));
      name = `${sanitizedContext}_icon_${i}`;
    }
    // Check if it's a logo
    if (svg.classes.toLowerCase().includes('logo') || (svg.context && svg.context.toLowerCase().includes('logo')) || (svg.context && svg.context.includes('header') && i < 2)) {
      name = `autodealer_logo_${i}`;
    }

    const filename = `${name}.svg`;
    const uniqueFilename = getUniqueFilename(assetsDir, filename);
    const filePath = path.join(assetsDir, uniqueFilename);
    fs.writeFileSync(filePath, svgContent, 'utf-8');
    downloadedAssets.push({
      type: 'svg',
      filename: uniqueFilename,
      context: svg.context,
      dimensions: `${svg.width}x${svg.height}`,
      size: Buffer.byteLength(svgContent)
    });
  }

  // 3. Download Videos
  console.log('🎥 Processing videos...');
  for (let i = 0; i < extractionResult.videos.length; i++) {
    const video = extractionResult.videos[i];
    const videoUrl = video.src || (video.sources && video.sources[0]);
    if (!videoUrl) continue;

    try {
      let buffer = null;
      if (capturedResponses.has(videoUrl)) {
        buffer = capturedResponses.get(videoUrl).buffer;
      } else {
        const response = await context.request.get(videoUrl).catch(() => null);
        if (response && response.ok()) {
          buffer = await response.body();
        }
      }

      if (buffer) {
        const urlObj = new URL(videoUrl, 'https://autodealer.io');
        const pathname = urlObj.pathname;
        const ext = path.extname(pathname) || '.mp4';
        const filename = getUniqueFilename(assetsDir, `video_${i}${ext}`);
        const filePath = path.join(assetsDir, filename);
        fs.writeFileSync(filePath, buffer);
        downloadedAssets.push({
          type: 'video',
          filename,
          originalUrl: videoUrl,
          size: buffer.length
        });
      }
    } catch (err) {
      console.warn(`Failed downloading video ${videoUrl}:`, err.message);
    }
  }

  // Check any additional captured image responses that weren't in img tags (e.g. background images or logos)
  for (const [url, data] of capturedResponses.entries()) {
    const alreadyDownloaded = downloadedAssets.some(a => a.originalUrl === url);
    if (!alreadyDownloaded && (data.contentType.includes('image') || data.contentType.includes('svg'))) {
      try {
        const urlObj = new URL(url);
        const basename = path.basename(urlObj.pathname);
        if (basename && basename.length > 2) {
          const filename = getUniqueFilename(assetsDir, cleanName(basename));
          const filePath = path.join(assetsDir, filename);
          fs.writeFileSync(filePath, data.buffer);
          downloadedAssets.push({
            type: 'background-or-network-image',
            filename,
            originalUrl: url,
            size: data.buffer.length
          });
        }
      } catch (e) {}
    }
  }

  console.log(`✅ Total downloaded assets: ${downloadedAssets.length}`);

  // Now, construct SITE_BLUEPRINT.md
  console.log('📝 Generating SITE_BLUEPRINT.md...');
  const blueprintMarkdown = generateBlueprintMarkdown(extractionResult, downloadedAssets);
  fs.writeFileSync(blueprintPath, blueprintMarkdown, 'utf-8');
  console.log(`🎉 Successfully saved SITE_BLUEPRINT.md to ${blueprintPath}`);

  await browser.close();
}

function cleanName(str) {
  if (!str) return 'asset';
  return str
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 40)
    .replace(/^_+|_+$/g, '') || 'asset';
}

function getUniqueFilename(dir, baseFilename) {
  let name = baseFilename;
  const ext = path.extname(baseFilename);
  const stem = path.basename(baseFilename, ext);
  let counter = 1;
  while (fs.existsSync(path.join(dir, name))) {
    name = `${stem}_${counter}${ext}`;
    counter++;
  }
  return name;
}

function generateBlueprintMarkdown(data, assets) {
  // Sort and categorize colors
  const bgColorsSorted = Object.entries(data.colors.backgrounds)
    .sort((a, b) => b[1] - a[1])
    .filter(([c]) => c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent');

  const textColorsSorted = Object.entries(data.colors.text)
    .sort((a, b) => b[1] - a[1]);

  const borderColorsSorted = Object.entries(data.colors.borders)
    .sort((a, b) => b[1] - a[1]);

  const fontSizesSorted = Object.entries(data.fontSizes)
    .sort((a, b) => b[1] - a[1]);

  const borderRadiiSorted = Object.entries(data.borderRadii)
    .sort((a, b) => b[1] - a[1]);

  let md = `# AutoDealer.io Site Blueprint & Design System

> **Source URL:** https://autodealer.io  
> **Extraction Tool:** Playwright Automated Headless Browser  
> **Target Project:** \`Projects/veave-marketing\`  
> **Assets Directory:** \`public/assets/\`  

---

## 1. Design Tokens & Visual Language

### 1.1 Color Palette

#### Primary Backgrounds & Surfaces
| Hex / Value | Usage Count | Typical Role |
|-------------|-------------|--------------|
${bgColorsSorted.map(([color, count]) => `| \`${color}\` | ${count} | ${categorizeBg(color)} |`).join('\n')}

#### Text & Typography Colors
| Hex / Value | Usage Count | Typographic Hierarchy |
|-------------|-------------|-----------------------|
${textColorsSorted.map(([color, count]) => `| \`${color}\` | ${count} | ${categorizeText(color)} |`).join('\n')}

#### Border & Stroke Colors
| Hex / Value | Usage Count | Context |
|-------------|-------------|---------|
${borderColorsSorted.map(([color, count]) => `| \`${color}\` | ${count} | Cards, Dividers, Inputs, Button Outlines |`).join('\n')}

${data.colors.gradients.length > 0 ? `
#### Gradients & Background Effects
${data.colors.gradients.map(g => `- \`${g}\``).join('\n')}
` : ''}

${Object.keys(data.cssVars).length > 0 ? `
#### Root CSS Variables
\`\`\`css
${Object.entries(data.cssVars).map(([k, v]) => `${k}: ${v};`).join('\n')}
\`\`\`
` : ''}

---

### 1.2 Typography & Fonts

#### Font Families
| Font Family | Elements Count | Usage |
|-------------|----------------|-------|
${Object.entries(data.fontFamilies).map(([font, count]) => `| \`${font}\` | ${count} | ${font.includes('Sans') || font.includes('Inter') || font.includes('Geist') ? 'Primary UI Sans-Serif font' : 'Display / Accent font'} |`).join('\n')}

#### Font Sizes, Weights & Line Heights
| Size / Weight / Line-Height | Occurrences | Role |
|-----------------------------|-------------|------|
${fontSizesSorted.slice(0, 25).map(([sizeKey, count]) => `| \`${sizeKey}\` | ${count} | ${categorizeFontSize(sizeKey)} |`).join('\n')}

---

### 1.3 Border Radius Values

| Radius Value | Occurrences | Semantic Mapping |
|--------------|-------------|------------------|
${borderRadiiSorted.map(([radius, count]) => `| \`${radius}\` | ${count} | ${categorizeBorderRadius(radius)} |`).join('\n')}

---

### 1.4 Shadows & Elevation
${Object.keys(data.shadows).length > 0 ? `
| Box Shadow | Occurrences |
|------------|-------------|
${Object.entries(data.shadows).map(([shadow, count]) => `| \`${shadow}\` | ${count} |`).join('\n')}
` : '_No prominent CSS box-shadows (site leverages high-contrast borders and subtle background elevation)._'}

---

## 2. Page Structure & Section Breakdown (Top to Bottom)

The page layout is structured sequentially as follows:

`;

  data.sections.forEach((sec, idx) => {
    md += `### Section ${idx + 1}: ${sec.type}
- **HTML Element:** \`<${sec.tag}>\` ${sec.id ? `\`#${sec.id}\`` : ''}
- **Classes:** \`${sec.className || 'None'}\`
- **Dimensions & Box Model:**
  - Width: \`${Math.round(sec.layout.width)}px\` | Height: \`${Math.round(sec.layout.height)}px\`
  - Display: \`${sec.layout.display}\`
  ${sec.layout.flexDirection ? `- Flex Direction: \`${sec.layout.flexDirection}\`` : ''}
  ${sec.layout.gridTemplateColumns && sec.layout.gridTemplateColumns !== 'none' ? `- Grid Columns: \`${sec.layout.gridTemplateColumns}\`` : ''}
  - Padding: \`${sec.layout.padding}\`
  ${sec.layout.sticky ? `- Position: **Sticky / Fixed Navbar**` : ''}
- **Visual Styling:**
  - Background: \`${sec.styles.backgroundColor}\`
  - Border: \`${sec.styles.border || 'none'}\`
  - Border Radius: \`${sec.styles.borderRadius || 'none'}\`
- **Headings & Content:**
${sec.headings && sec.headings.length > 0 ? sec.headings.map(h => `  - **[${h.level.toUpperCase()}]** ${h.text}`).join('\n') : '  - *(No primary headings directly inside)*'}
${sec.ctas && sec.ctas.length > 0 ? `- **Buttons / Action Elements:** ${sec.ctas.map(c => `\`${c}\``).join(', ')}` : ''}
- **Media Count:** ${sec.mediaCounts ? `${sec.mediaCounts.imgCount} images, ${sec.mediaCounts.svgCount} SVGs, ${sec.mediaCounts.videoCount} videos` : 'N/A'}
- **Text Preview:** 
  > "${sec.textPreview ? sec.textPreview.slice(0, 250) + '...' : (sec.contentSummary?.text ? sec.contentSummary.text.slice(0, 250) + '...' : '')}"

${sec.sampleCards && sec.sampleCards.length > 0 ? `
- **Key Cards / Items in Section:**
${sec.sampleCards.map((c, i) => `  - **Card ${i + 1}**: \`${c.tag}\` (bg: \`${c.bg}\`, radius: \`${c.borderRadius}\`) — "${c.textSample}"`).join('\n')}
` : ''}
---
`;
  });

  md += `
## 3. Media & Assets Catalog (\`public/assets/\`)

A total of **${assets.length}** media files have been extracted and saved into \`public/assets/\`:

| File Name | Asset Type | Dimensions / Context | File Size |
|-----------|------------|----------------------|-----------|
${assets.map(a => `| \`${a.filename}\` | ${a.type} | ${a.dimensions || a.context || a.alt || '-'} | ${(a.size / 1024).toFixed(1)} KB |`).join('\n')}

---

## 4. Implementation Guidance for \`Projects/veave-marketing\`

1. **Tailwind CSS Configuration:**
   - Configure colors based on the primary dark/light background tokens, border colors, and accent colors extracted.
   - Configure typography using the detected font families (e.g. Next.js font loader for Geist or Inter).
   - Set border radius tokens matching \`8px\`, \`12px\`, \`16px\`, \`24px\`, and \`9999px\`.

2. **Animation Stack:**
   - Framer Motion (\`framer-motion\`) is already installed in \`package.json\`.
   - Scroll-based viewport reveals (\`whileInView\`, \`initial={{ opacity: 0, y: 20 }}\`, \`viewport={{ once: true }}\`).
   - Sticky navbar blur with \`backdrop-filter: blur(12px)\`.

3. **Asset Usage:**
   - All SVGs, logos, and images are organized in \`/assets/\` for direct import into Next.js components via \`<Image src="/assets/..." />\`.
`;

  return md;
}

function categorizeBg(color) {
  if (color === '#000000' || color === '#0a0a0a' || color === '#0f172a' || color === '#111827' || color.startsWith('#0') || color.startsWith('#1')) {
    return 'Dark Base / Canvas / Dark Card Surface';
  }
  if (color === '#ffffff' || color.startsWith('#f') || color.startsWith('#e')) {
    return 'Light Canvas / Card / Button Background';
  }
  return 'Accent / Tint / Pill Badge';
}

function categorizeText(color) {
  if (color === '#ffffff' || color.startsWith('#f')) return 'Primary Heading / High-Contrast Text';
  if (color.startsWith('#9') || color.startsWith('#a') || color.startsWith('#8') || color.startsWith('#6')) return 'Secondary / Muted / Subtitle Text';
  if (color === '#000000' || color.startsWith('#0') || color.startsWith('#1')) return 'Dark Text on Light Surfaces / Buttons';
  return 'Accent / Highlight / Link Text';
}

function categorizeFontSize(key) {
  const size = parseFloat(key);
  if (size >= 48) return 'Hero / Main Headline (Display)';
  if (size >= 32) return 'Section H1 / H2 Headline';
  if (size >= 24) return 'Subheading / Feature H3';
  if (size >= 18) return 'Card Title / Lead Body Text';
  if (size >= 14 && size <= 16) return 'Body Text / Nav Item / Standard Button';
  if (size <= 13) return 'Caption / Badge / Small Metadata';
  return 'Typography Token';
}

function categorizeBorderRadius(radius) {
  if (radius.includes('9999') || radius === '50%') return 'Pill Badges, Avatars, Rounded Buttons';
  if (radius.includes('16px') || radius.includes('20px') || radius.includes('24px')) return 'Feature Cards, Modals, Bento Containers';
  if (radius.includes('8px') || radius.includes('10px') || radius.includes('12px')) return 'Standard Cards, Inputs, Buttons';
  if (radius.includes('4px') || radius.includes('6px')) return 'Tags, Tooltips, Small Badges';
  return 'Component Border Radius';
}

run().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});

