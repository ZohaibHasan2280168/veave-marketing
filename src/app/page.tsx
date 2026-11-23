import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UnifiedWorkflow from "@/components/UnifiedWorkflow";
import PlatformScope from "@/components/PlatformScope";
import PricingValue from "@/components/PricingValue";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <UnifiedWorkflow />
        <PlatformScope />
        <PricingValue />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
