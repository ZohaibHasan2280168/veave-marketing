# Veave Product Positioning, Unslop & Paddle Onboarding Guardrails

1. **Complete Business OS Positioning (Not Just QC/Assembly):**
   - Always represent Veave across all four pillars:
     1. **Storefront & Brand:** Visual Website Builder, 12 Themes, Custom Domains, Category Price Estimator, Google Places Live Reviews.
     2. **CRM & Sales Pipeline:** Inbound Leads, Customer Directory, Google Calendar/Meet Appointments, Sales Opportunities, Counter-Proposals & Quotes.
     3. **Orders & Operations:** Order Intake, Configurable Workflows, Visual Business & Floor Plan Board, Kanban Tasks, Role Workspaces (`/dashboard`, `/my-work`, `/qc-queue`), and Sequential Checkpoints.
     4. **Financials, Team & Governance:** Financial Records & Payroll Ledger, 12-Module Custom Role Permission Matrix, Real-Time Team Chat, Cloudflare R2 Private Document Vault (never refer to Cloudinary for new storage), Client Mobile App, 2FA, and Paddle Billing.

2. **Conversion CTAs & Onboarding Invariant:**
   - Never add `"Book factory walkthrough"` or `"Book Demo"` primary CTAs.
   - All public navigation and hero CTAs must route to **`Log in`** (`/login` workspace resolver) and **`Start free trial`** (`/signup` 4-step self-serve onboarding: Identity & Subdomain -> Business Profile, Employees & Tax IDs -> R2 Compliance Documents -> Live Paddle Trial Plan Checkout).

3. **Paddle Billing Everywhere:**
   - Never hardcode fake pricing tiers (e.g., `$149 / $349 / $799` or "No credit card required").
   - Always fetch live commercial plans (`BASE`, `PROFESSIONAL`, `ENTERPRISE`) from `GET /api/billing/public-plans` and `GET /api/billing/public-config`, support Monthly/Annual toggles and regional overrides (`PK` vs Global USD), and use Paddle.js (`PricePreview` and `Checkout.open`) for 14-day `$0.00` card-authorized trial onboarding.

4. **Unslop Craft Rules:**
   - No floating cards with infinite bounce loops (`repeat: Infinity`), no hallucinated widget labels, no radial color-blob clutter, and no borrowed automotive icons. Use real Veave interface previews, sentence-case labels, tabular numerals, and a single consistent Lucide 1.5px stroke icon set.
