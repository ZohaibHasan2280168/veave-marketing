import fs from 'fs';
import path from 'path';

const projectRoot = '/home/harry/Devops/Projects/veave-marketing';
const assetsDir = path.join(projectRoot, 'public', 'assets');
const blueprintPath = path.join(projectRoot, 'SITE_BLUEPRINT.md');

const files = fs.readdirSync(assetsDir).sort();
const assetRows = files.map(filename => {
  const stat = fs.statSync(path.join(assetsDir, filename));
  const ext = path.extname(filename).toLowerCase();
  let type = 'Raster Image';
  if (ext === '.svg') type = 'SVG Vector';
  else if (ext === '.mp4' || ext === '.webm') type = 'Video';
  const sizeKb = (stat.size / 1024).toFixed(1) + ' KB';
  return `| \`${filename}\` | ${type} | ${sizeKb} |`;
}).join('\n');

const blueprintContent = `# AutoDealer.io Site Blueprint & Design System

> **Source URL:** https://autodealer.io  
> **Extraction Method:** Playwright Automated Headless Chromium Browser  
> **Target Project:** \`Projects/veave-marketing\`  
> **Asset Storage:** \`public/assets/\` (Total: ${files.length} assets downloaded)  
> **Status:** Discovery & Blueprint phase complete. Ready for component construction.

---

## 1. Design Tokens & Visual Language

AutoDealer.io employs a modern, high-contrast, AI-native fintech aesthetic. It balances deep oceanic navy tones for high-impact hero and AI sections with clean, ultra-refined clinical light surfaces for workflows and data displays.

### 1.1 Color Palette

#### Primary Canvas & Surfaces
| Hex / Value | Semantic Role | Tailwind Equivalent / Token |
|-------------|---------------|------------------------------|
| \`#122a38\` | Dark Primary Canvas (Hero & Final CTA) | \`bg-[#122a38]\` (Deep Slate Navy) |
| \`#0d1f2b\` | Dark AI Section Canvas | \`bg-[#0d1f2b]\` (Dark Oceanic Abyss) |
| \`#0f2330\` | Footer Canvas | \`bg-[#0f2330]\` |
| \`#ffffff\` | Primary Light Background / Card Surface | \`bg-white\` |
| \`#f3f6f8\` | Light Muted Background / Alternating Section | \`bg-[#f3f6f8]\` |
| \`#eef2f5\` | Light Card Hover / Inner Well | \`bg-[#eef2f5]\` |
| \`#e4f3ea\` | Mint Soft Tint (Success / Growth Badges) | \`bg-[#e4f3ea]\` |

#### Brand Accent & Interactive Colors
| Hex / Value | Semantic Role | Tailwind Equivalent / Token |
|-------------|---------------|------------------------------|
| \`#0e6bfd\` | Primary Brand Blue (CTAs, Active Tabs, Highlights) | \`bg-[#0e6bfd]\` / \`text-[#0e6bfd]\` |
| \`#0b5ad9\` | Primary Button Hover State | \`hover:bg-[#0b5ad9]\` |
| \`#9cc4ff\` | Neon / Light Blue Accent (Dark Mode text/borders) | \`text-[#9cc4ff]\` |
| \`#257a55\` | Forest Green (Financial metrics, approved tags) | \`text-[#257a55]\` |
| \`#5fb58a\` | Soft Green Accent | \`text-[#5fb58a]\` |

#### Typography Colors
| Hex / Value | Semantic Role | Notes |
|-------------|---------------|-------|
| \`#16303f\` | Primary Text (Light Mode) | High-contrast deep slate navy body & titles |
| \`#2d4959\` | Dark Secondary Text | Headings, subheadings |
| \`#587080\` | Muted Body / Secondary Labels | Captions, card descriptions |
| \`#8fa9bb\` | Subtle Text / Metadata | Micro-labels, timestamps |
| \`#c6d6e1\` | Muted Text (Dark Mode) | Descriptions in dark sections |
| \`#ffffff\` | Primary Headings (Dark Mode) | Hero H1, AI section titles, button labels |

#### Border & Divider Colors
| Hex / Value | Semantic Role | Notes |
|-------------|---------------|-------|
| \`#e3eaef\` | Light Mode Primary Border | Cards, inputs, section dividers |
| \`#dbe4ea\` | Light Mode Subtle Border | Sub-cards, table borders |
| \`#ffffff1f\` | Dark Mode Subtle Border (rgba 12%) | Dark cards, hero floating preview |
| \`#74b8ff61\` | Dark Mode Neon Accent Border | Active AI chat bubbles, spotlight borders |
| \`#8eb2d53d\` | Dark Mode Card Border (rgba 24%) | Bento containers in dark sections |

#### Background Gradients & Glow Effects
- **Hero Ambient Glow:** \`radial-gradient(70% 60% at 85% 20%, rgba(14, 107, 253, 0.35), rgba(0, 0, 0, 0) 70%)\`
- **Subtle Radial Highlight:** \`radial-gradient(480px 288px at 100% 0px, rgba(14, 107, 253, 0.5), rgba(0, 0, 0, 0) 72%)\`
- **Beam / Scanner Line:** \`linear-gradient(90deg, rgba(0, 0, 0, 0), rgb(147, 202, 255) 40%, rgb(178, 236, 255) 60%, rgba(0, 0, 0, 0))\`
- **Card Subtle Gradient:** \`linear-gradient(145deg, rgb(53, 91, 120), rgb(24, 53, 77))\`

---

### 1.2 Typography & Fonts

- **Primary Font Family:** \`Geist\` (Geist Sans variable font by Vercel)
- **Monospace Font Family:** \`Geist Mono\` (Used for VIN numbers, financial calculations, code tokens)

#### Typographic Hierarchy & Scale
| Level | Font Size | Font Weight | Line Height | Letter Spacing | Context / Usage |
|-------|-----------|-------------|-------------|----------------|-----------------|
| **Display / Hero H1** | \`48px - 56px\` | \`600\` (SemiBold) | \`1.1\` | \`-0.025em\` | Main Hero Headline |
| **Section Title H2** | \`32px - 38px\` | \`600\` (SemiBold) | \`1.2\` | \`-0.02em\` | Section Major Headings |
| **Feature Title H3** | \`20px - 24px\` | \`600\` (SemiBold) | \`1.3\` | \`-0.01em\` | Bento Card Titles, Workflow Stages |
| **Lead Subheading** | \`18px\` | \`400\` (Regular) | \`1.5\` | \`-0.005em\` | Section Lead Intros |
| **Body Regular** | \`16px\` | \`400\` (Regular) | \`24px\` | \`normal\` | Standard Body Paragraphs |
| **Body Small / Nav** | \`14px\` | \`400 / 550 / 600\` | \`20px\` | \`normal\` | Navigation, Button Text, Table Data |
| **Caption / Tiny** | \`12px\` | \`400 / 600\` | \`16px\` | \`normal\` | Secondary details, table headers |
| **Eyebrow Badge** | \`10px - 11px\` | \`650\` (Bold) | \`15px\` | \`0.08em\` (Uppercase) | Section Eyebrows, Pill Tags |

---

### 1.3 Border Radius Tokens

| Radius Value | Token Name | Application |
|--------------|------------|-------------|
| \`9999px\` / \`50%\` | \`rounded-full\` | Pill Eyebrows, Status Badges, Circular Avatars, Search Pills |
| \`20px\` | \`rounded-2xl\` | Large Feature Bento Boxes, Hero Journey Card, Photo Studio Card |
| \`14px\` | \`rounded-xl\` | Standard Content Cards, Workflow Step Cards, FAQ Accordion Items |
| \`10px\` | \`rounded-lg\` | Sub-Cards, Inner Previews, Form Fields |
| \`7px\` | \`rounded-md\` | Primary Buttons, Dropdowns, Filter Buttons |
| \`4px\` | \`rounded-sm\` | Micro Tags, Status Dots, Currency / VIN Pills |

---

### 1.4 Elevation, Shadows & Glassmorphism

- **Sticky Header Glass:** \`backdrop-blur-[10px]\` with \`background: rgba(255, 255, 255, 0.92)\` or \`rgba(18, 42, 56, 0.92)\` in dark mode.
- **Card Floating Elevation:** \`box-shadow: 0 20px 50px rgba(18, 42, 56, 0.08)\`
- **Dark Section Ambient Glow:** \`box-shadow: 0 0 28px rgba(46, 139, 244, 0.16), inset 0 1px 0 rgba(205, 237, 255, 0.25)\`
- **Active Focus Ring:** \`0 0 0 2px #0e6bfd\`

---

## 2. Comprehensive Page Structure & Section Breakdown (Top to Bottom)

The site is engineered as a seamless single-page journey divided into 13 distinct visual and functional sections:

\`\`\`
[1. Sticky Header / Navbar]
         ↓
[2. Hero Section: The AI-Native DMS + Interactive Vehicle Journey]
         ↓
[3. Social Proof & Integrations Marquee]
         ↓
[4. Unified Workflow: Purchase to Payment (4-Stage Pipeline)]
         ↓
[5. Platform Scope: 17 Dealership Tools Bento Grid]
         ↓
[6. AI Assistant Experience: Conversational Dealer Ops & Guardrails]
         ↓
[7. Photo Studio & 360 Spin Showcase]
         ↓
[8. Integration Ecosystem: DMS, Auction, Accounting, Advertising]
         ↓
[9. Platform Pricing & Independent Dealer Value Checklist]
         ↓
[10. Interactive FAQ Accordion with Category Filters]
         ↓
[11. Free Dealer Utility Tools (6 Calculators & Checklists)]
         ↓
[12. Final Call-to-Action Banner]
         ↓
[13. Comprehensive Multi-Column Footer]
\`\`\`

---

### Section 1: Sticky Navigation Bar
- **Element / Tag:** \`<header>\` (\`site-header\`)
- **Dimensions:** Width: \`100%\` | Height: \`69px\` | Sticky top-0 (\`z-50\`)
- **Visual Style:** Translucent background with \`backdrop-blur-[10px]\`, bottom hairline border (\`#e3eaef\`).
- **Layout & Structure:**
  - Left: AutoDealer.io Logo (Icon + bold typography).
  - Center: Nav Links (\`Features\`, \`Pricing\`, \`Resources\`, \`Connections\`, \`Company\`) with subtle hover transitions.
  - Right: \`Log in\` link + High-contrast Primary Button (\`Start free trial →\`, \`#0e6bfd\`, 7px radius).
- **Interactions & Animations:** Sticky transition on scroll, dropdown menus with subtle fade-in.

---

### Section 2: Hero Section (The AI-Native Dealer Management System)
- **Element / Tag:** \`<section>\` (\`story dark relative overflow-hidden bg-background text-foreground\`)
- **Background:** Deep Slate Navy (\`#122a38\`) with blue ambient radial glow (\`radial-gradient at 85% 20%\`).
- **Dimensions:** Min-height \`880px\`, padded container (\`max-w-7xl mx-auto px-6 py-20\`).
- **Typography & Content:**
  - Eyebrow Pill: \`BUILT FOR INDEPENDENT USED-CAR DEALERS\` (pill badge with subtle translucent border).
  - Heading (H1): \`The AI-Native Dealer Management System\` (\`56px\`, Geist SemiBold).
  - Subhead: \`Run the whole lot from one system. Inventory, website, CRM, deals, payments, BHPH and books, with an AI assistant that prepares the work and waits for your approval.\`
  - CTAs: Primary Button \`Start free trial →\` (Blue \`#0e6bfd\`) + Ghost Button \`See what it does\`.
  - Trust Badge: \`14-day trial. Nothing charged today. Cancel any time.\`
- **Interactive Vehicle Journey Graphic:**
  - Floating dark card (\`20px\` border-radius) showcasing an interactive multi-step vehicle workflow:
    - Step buttons: \`Add from photos →\`, \`Inventory →\`, \`Website builder →\`, \`CRM and leads →\`.
    - Live vehicle preview: 2021 Ford F-150 / BMW with VIN status, recon costs (\$420), gross margin (\$3,850), and AI-generated listing copy.
- **Animations:** Staggered entrance animations on page load; interactive tab switching between journey stages.

---

### Section 3: Social Proof & Integrations Banner
- **Element / Tag:** \`<section>\` (\`px-4 sm:px-6 py-14 bg-background border-b border-border\`)
- **Background:** Pure White (\`#ffffff\`) with border-b (\`#e3eaef\`).
- **Typography & Content:**
  - Eyebrow (H2): \`WORKS WITH THE AUCTION FILES, HISTORY REPORT LINKS, LISTING SITES, AD PROGRAMS AND ACCOUNTS YOUR DEALERSHIP ALREADY USES\` (uppercase, \`12px\`, \`#587080\`, letter-spacing: \`0.05em\`).
- **Partner Logos Grid / Marquee:**
  - Includes: \`Manheim\`, \`Facebook\`, \`Craigslist\`, \`QuickBooks® Online\`, \`Plaid\`, \`CARFAX\`, \`AutoCheck\`, \`AutoTrader\`, \`Cars.com\`, \`CarGurus\`.
  - Link: \`See every connection →\` with hover underline.
- **Animations:** Infinite smooth marquee scroll effect or responsive flex-wrap grid.

---

### Section 4: Unified Workflow (Purchase to Payment)
- **Element / Tag:** \`<section id="whole-sale">\` (\`bg-muted border-t border-border\`)
- **Background:** Cool Gray Tint (\`#f3f6f8\`).
- **Typography & Content:**
  - Eyebrow: \`FROM PURCHASE TO PAYMENT\` (uppercase badge, \`#0e6bfd\`).
  - Heading (H2): \`One record follows every car, from purchase to payment.\` (\`36px\`, \`#16303f\`).
  - Subhead: \`Each step starts where the last one stopped. The car you bought is the car you list, the shopper who asks about it becomes the buyer on the deal, and the deal posts its own entries to your books.\`
- **The 4-Stage Progressive Pipeline:**
  1. **1. Buy and prep:** Add cars from auction lists, mobile photo upload, VIN decoding, recon tracking.
  2. **2. List and sell:** Instant website generation, auto-syndication to Facebook Marketplace & Craigslist.
  3. **3. Deal and fund:** Interactive desking, financing options, contract printing, digital e-signatures.
  4. **4. Books and collect:** BHPH recurring payments, automated journal entries synced to QuickBooks.
- **Interactive UI:** Step switcher cards with connected progress lines and animated visual state transitions.
- **CTA:** \`See the AI at work →\`.

---

### Section 5: Platform Scope (17 Dealership Tools Bento Grid)
- **Element / Tag:** \`<section id="platform">\` (\`bg-background\`)
- **Background:** Pure White (\`#ffffff\`).
- **Typography & Content:**
  - Eyebrow: \`EVERYTHING IN ONE PLACE\`
  - Heading (H2): \`Run your dealership's day-to-day work from one system.\`
  - Subhead: \`Seventeen tools, from the first vehicle to the final journal entry. They all read the same vehicle, customer and deal records, so you enter a car once and the website, the deal and the books all work from that record.\`
- **The Three Core Pillars (Bento Grid):**
  - **Pillar 01: From stock to sale** (6 tools):
    - Vehicle Inventory Management
    - Window Sticker Generator
    - AI Photo Studio & 360 Spin
    - Dealership Website Builder
    - CRM & Lead Capture
    - Advertising & Syndication Feeds
  - **Pillar 02: Money & performance** (6 tools):
    - Deal Desking & F&I
    - Floor Plan Management
    - Buy Here Pay Here (BHPH) Portfolio
    - Integrated Credit Card & ACH Payments
    - Double-Entry Dealer Accounting
    - Real-Time Profit & Margin Analytics
  - **Pillar 03: Everyday operations** (5 tools):
    - Repairs & Reconditioning Work Orders
    - Document Vault & E-Sign
    - Telegram & SMS Instant Alerts
    - User Roles & Permission Guardrails
    - Full Audit Trail & Activity Logs
- **Layout & Cards:** Responsive 3-column Bento grid with custom SVG icons (\`150x150\`), interactive hover glow, and micro-metric badges.

---

### Section 6: AI Assistant In-Depth Experience
- **Element / Tag:** \`<section id="ai">\` (\`dark bg-muted text-foreground ai-experience relative overflow-clip\`)
- **Background:** Deep Oceanic Abyss (\`#0d1f2b\`) with neon gradient borders and ambient glow.
- **Typography & Content:**
  - Eyebrow: \`NATIVE BY DESIGN\`
  - Heading (H2): \`Your dealership, connected to one AI assistant.\`
  - Subhead: \`Use your inventory, lead, deal and accounting records in one conversation. Get answers, prepare changes and keep control over what runs automatically.\`
- **Interactive Live Simulation Widget:**
  - Header: Dealership switcher (\`Northgate Motors\`), status badge (\`AI Active\`), playback control (\`Pause animation\`).
  - Chat & Action Card:
    - User prompt: *"Write a compelling listing for the newly acquired 2021 Ford F-150 Lariat and syndicate it to Facebook."*
    - AI response card: Generated description with specs, mileage, and high-margin features.
    - **Critical Safety Guardrail:** Visible **\`Needs approval\`** badge with \`Approve & Publish\` and \`Edit\` buttons. (Key message: AI assists, humans approve).
- **Four Guiding Principles:**
  1. *Listing description* — Context-aware auto-writing based on window sticker & packages.
  2. *Answers from your records* — Instant natural language queries (*"What was our average recon cost on Hondas last month?"*).
  3. *A visible next step* — Proactive reminders for expiring inspections, pending floor plans, and lead follow-ups.
  4. *Control that stays with you* — Strict permission fences ensuring the AI never commits financial actions or sends external emails without explicit user sign-off.
- **CTAs:** \`Explore the AI assistant →\`, \`Explore inventory →\`.

---

### Section 7: Photo Studio & 360 Spin Showcase
- **Element / Tag:** \`<section id="studio">\` (\`bg-muted\`)
- **Background:** Cool Gray (\`#f3f6f8\`).
- **Typography & Content:**
  - Eyebrow: \`THE PHOTO STUDIO\`
  - Heading (H2): \`Your inventory. Shown at its best.\`
  - Subhead: \`Guide the shoot, create a consistent studio look and bring photos and 360 views together on your dealership website.\`
- **Interactive Visual Component:**
  - 360-degree interactive car viewer (Interactive draggable slider rotating a BMW demo car).
  - Instant background replacement before/after toggle (Cluttered lot background → Clean showroom studio backdrop).
- **CTA:** \`Explore the photo editor →\`.

---

### Section 8: Dealership Integration Ecosystem
- **Element / Tag:** \`<section id="connections">\` (\`bg-background\`)
- **Background:** Pure White (\`#ffffff\`).
- **Typography & Content:**
  - Eyebrow: \`YOUR DEALERSHIP ECOSYSTEM\`
  - Heading (H2): \`Keep the connections you rely on.\`
  - Subhead: \`Imports, links, integrations and account connections, with a clear setup path for each.\`
- **Structured Categories:**
  - **Auction Purchases:** Direct file imports and automated VIN ingestion from Manheim, ACV Auctions, ADESA.
  - **History & Book Values:** One-click links and valuation lookups via CARFAX, AutoCheck, Black Book.
  - **Listing Channels:** Automated daily XML/CSV syndication to Facebook Marketplace, Craigslist, AutoTrader, CarGurus, Cars.com.
  - **Accounting & Banking:** Real-time bidirectional sync with QuickBooks Online and Plaid bank verification.
- **CTA:** \`See what is connected and what is not →\`.

---

### Section 9: Platform Pricing & Value Checklist
- **Element / Tag:** \`<section id="value">\` (\`bg-background border-t border-border\`)
- **Background:** Pure White (\`#ffffff\`).
- **Typography & Content:**
  - Eyebrow: \`PLATFORM PRICING\` / \`ONE SUBSCRIPTION\`
  - Heading (H2): \`Enterprise-class software, priced for independent dealers.\`
  - Subhead: \`A large dealership usually assembles its software from several vendors. Independent dealers are often sold the same tools one module at a time. AutoDealer.io brings them together in a single platform, on one subscription.\`
- **12-Point Value Checklist Grid:**
  - \`14-day free trial\` — Test with real cars before paying.
  - \`No sales call\` — Transparent signup without pressure.
  - \`No setup fees\` — Zero hidden onboarding charges.
  - \`No long-term contract\` — Month-to-month flexibility.
  - \`Cancel any time\` — Data export available upon cancellation.
  - \`No add-on modules\` — All 17 tools included standard.
  - \`Up and running on day one\` — Self-serve guided setup in minutes.
  - \`Your website, live on day one\` — Instant SEO-ready dealer site.
  - \`Run it from your phone\` — Full responsive mobile app & mobile web.
  - \`English and Spanish\` — Complete bilingual interface toggle.
  - \`Bring your inventory\` — Free CSV/DMS migration assistance.
  - \`Focused on dealers\` — Built exclusively for independent used-car lots.
- **CTA:** \`See every plan and price →\`.

---

### Section 10: Interactive FAQ Accordion
- **Element / Tag:** \`<section id="faq">\` (\`bg-muted home-faq border-t border-border\`)
- **Background:** Cool Gray (\`#f3f6f8\`).
- **Typography & Content:**
  - Eyebrow: \`A FEW GOOD QUESTIONS\`
  - Heading (H2): \`Before you make the move.\`
  - Subhead: \`Straight answers about what is included, what connects and what the AI is allowed to do. Pick a topic or read straight through.\`
- **Interactive Topic Filter Pills:**
  - Filter options: \`All\`, \`Getting started\`, \`The AI\`, \`Website\`, \`Connections\`, \`Plans & security\`.
- **18 Detailed Accordion Items:**
  1. *Is this built for independent used-car dealers?*
  2. *Can I bring in my existing inventory?*
  3. *How long does setup take?*
  4. *Does it work on my phone?*
  5. *Can each person use the dashboard in Spanish?*
  6. *Does the AI make changes without asking?*
  7. *Where does the AI get its answers?*
  8. *Can I stop it?*
  9. *Is a dealership website included?*
  10. *What can the AI salesman on my website promise a shopper?*
  11. *How do shoppers reach me from the website?*
  12. *How do QuickBooks and the other providers connect?*
  13. *Can customers pay by card or bank account?*
  14. *Does it file with the DMV?*
  15. *Who can see costs and gross?*
  16. *What is included in the trial?*
  17. *What do the plans limit, and what happens if I cancel?*
  18. *What support do I get?*
- **Contact Card:** \`Something else? Send us a message →\`.

---

### Section 11: Free Dealer Utility Tools
- **Element / Tag:** \`<section id="free-tools">\` (\`bg-muted border-t border-border\`)
- **Background:** Cool Gray (\`#f3f6f8\`).
- **Typography & Content:**
  - Eyebrow: \`FREE TOOLS\`
  - Heading (H2): \`Try a tool before you sign up.\`
  - Subhead: \`Each one is free and opens without a login.\`
- **Grid of 6 Standalone Dealer Calculators & Utilities:**
  1. **Auto loan payment calculator:** Estimate monthly car payment from price, down payment, trade-in, APR & term.
  2. **Out-the-door price calculator:** Calculate complete out-the-door price including sales tax, doc fees, title/registration, trade-in equity & rebates.
  3. **VIN decoder & recall check:** Decode year, make, model, trim, engine specs, and NHTSA safety recall notices.
  4. **Window sticker lookup:** Retrieve factory specifications, original MSRP, and installed option packages.
  5. **Chart of accounts template:** Download an auto-dealer-specific standard chart of accounts optimized for QuickBooks.
  6. **Car photo shot list:** Complete printable checklist for shooting lot photos that convert shoppers.

---

### Section 12: Final Call to Action Banner
- **Element / Tag:** \`<section>\` (\`dark bg-background text-foreground\`)
- **Background:** Deep Slate Navy (\`#122a38\`) with high-contrast glowing border.
- **Typography & Content:**
  - Eyebrow: \`EVERY RECORD. A CLEARER NEXT STEP.\`
  - Heading (H2): \`Move your dealership forward.\` (\`42px\`, \`#ffffff\`).
  - Subhead: \`A connected system for the work that matters every day.\`
  - CTAs: Primary Blue Button \`Start free trial →\` + Ghost Button \`See pricing\`.
  - Reassurance: \`14-day free trial. Nothing is charged until it ends.\`

---

### Section 13: Site Footer
- **Element / Tag:** \`<footer>\` (\`#site-footer\`, \`dark bg-muted\`)
- **Background:** Dark Navy (\`#0f2330\`), top border \`#ffffff1f\`.
- **Dimensions:** Height: \`~900px\`, padded (\`pt-16 pb-24\`).
- **Content Columns:**
  - **Brand Col:** AutoDealer.io logo, value statement (*"Dealer management software with AI built in. Built for independent used-car dealers."*), system status badge, language toggle (English / Español).
  - **Product (Inventory & Operations):** Dealer management system, Inventory management, Syndication, CARFAX integration, Photo editor, Reconditioning, Floor plan management.
  - **Product (Sales & Customers):** Dealer websites, CRM & leads, AI assistants, Proactive AI briefings, Deals & F&I, Payment processing, Buy here pay here.
  - **Finance & Compliance:** Accounting & books, QuickBooks sync, OFAC & Red Flags, Form library, E-sign.
  - **Free Tools & Guides:** All free dealer tools, VIN decoder & recalls, Window sticker lookup, Photo checklist, Background remover, Description generator, Recon cost calculator, Desking worksheet.
  - **Company & Legal:** Pricing, Blog, Security & SOC-2 compliance, Terms of Service, Privacy Policy, Contact Support.

---

## 3. Media & Assets Catalog (\`public/assets/\`)

All **${files.length}** visible images, logos, partner badges, tool icons, and SVGs from \`https://autodealer.io\` have been downloaded and saved into \`public/assets/\` with clean, descriptive filenames:

| File Name | Format / Type | File Size |
|-----------|---------------|-----------|
${assetRows}

---

## 4. Architectural Guidance for \`Projects/veave-marketing\`

1. **Framework & Dependencies:**
   - **Next.js 16.4.6** with Turbopack and React 19.
   - **Tailwind CSS 4.3.3**: Pre-configure theme variables with colors (\`#122a38\`, \`#0d1f2b\`, \`#0e6bfd\`, \`#f3f6f8\`), custom border radii (\`7px\`, \`10px\`, \`14px\`, \`20px\`), and Geist font family.
   - **Framer Motion 14.14.0**: Viewport scroll reveals (\`whileInView\`), floating cards, sticky header blur transitions, and accordion animations.
   - **Lucide React 1.77.0**: Crisp vector icons complementing the downloaded SVGs.

2. **Asset Integration:**
   - Use Next.js \`Image\` component or inline SVGs directly from \`public/assets/\` (e.g., \`<Image src="/assets/autodealer_io.png" alt="AutoDealer.io" width={180} height={24} />\`).

3. **Performance & Rendering Strategy:**
   - Server-render static sections (Social proof logos, 17-tools list, pricing checklist, footer).
   - Client components for interactive widgets (\`HeroJourney\`, \`AiExperienceDemo\`, \`PhotoStudio360\`, \`FaqAccordion\`).
`;

fs.writeFileSync(blueprintPath, blueprintContent, 'utf-8');
console.log('✅ SITE_BLUEPRINT.md updated successfully with all 13 sections and complete design tokens!');

