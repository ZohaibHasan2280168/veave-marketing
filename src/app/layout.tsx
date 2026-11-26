import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Veave | The Complete Multi-Tenant CRM, Storefront & Operations Platform",
  description:
    "Run your storefront website, buyer CRM, Google Meet appointments, sales opportunities, production orders, visual floor plan, financial records, and Paddle billing from one isolated workspace.",
  icons: {
    icon: "/assets/veave/brand/veave-icon-primary.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#16303f] font-sans selection:bg-[#0e6bfd]/15 selection:text-[#0e6bfd]">
        {children}
      </body>
    </html>
  );
}
