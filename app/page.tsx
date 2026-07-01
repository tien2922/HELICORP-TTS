"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Footer from "@/components/layout/Footer";
import BuyModal from "@/components/ui/BuyModal";
import { useTheme } from "@/components/providers/ThemeProvider";

// Lazy load heavy sections for performance
const DesignSection = dynamic(
  () => import("@/components/sections/DesignSection"),
  { ssr: false }
);
const AudioSection = dynamic(
  () => import("@/components/sections/AudioSection"),
  { ssr: false }
);
const BatterySection = dynamic(
  () => import("@/components/sections/BatterySection"),
  { ssr: false }
);
const SpecsSection = dynamic(
  () => import("@/components/sections/SpecsSection"),
  { ssr: false }
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
  { ssr: false }
);
const Chatbot = dynamic(
  () => import("@/components/ui/Chatbot"),
  { ssr: false }
);

export default function Home() {
  const [isBuyOpen, setIsBuyOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <main>
      <ScrollProgress />
      <Navbar onBuyClick={() => setIsBuyOpen(true)} />
      <HeroSection onBuyClick={() => setIsBuyOpen(true)} />
      <DesignSection />
      <AudioSection />
      <BatterySection />
      <SpecsSection />
      <ContactSection />
      <Footer />

      {/* Dynamic Chatbot Assistant */}
      <Chatbot />

      {/* Quick Buy Checkout Modal */}
      <BuyModal 
        isOpen={isBuyOpen} 
        onClose={() => setIsBuyOpen(false)} 
        theme={theme}
      />
    </main>
  );
}
