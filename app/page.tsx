"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Footer from "@/components/layout/Footer";
import BuyModal from "@/components/ui/BuyModal";
import SectionSkeleton from "@/components/ui/SectionSkeleton";
import HoverImageCursor from "@/components/ui/HoverImageCursor";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useCart } from "@/components/providers/CartContext";

// Lazy load heavy sections with animated skeleton loaders
const DesignSection = dynamic(
  () => import("@/components/sections/DesignSection"),
  { ssr: false, loading: () => <SectionSkeleton /> }
);
const AudioSection = dynamic(
  () => import("@/components/sections/AudioSection"),
  { ssr: false, loading: () => <SectionSkeleton /> }
);
const BatterySection = dynamic(
  () => import("@/components/sections/BatterySection"),
  { ssr: false, loading: () => <SectionSkeleton /> }
);
const SpecsSection = dynamic(
  () => import("@/components/sections/SpecsSection"),
  { ssr: false, loading: () => <SectionSkeleton /> }
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
  { ssr: false, loading: () => <SectionSkeleton /> }
);
const Chatbot = dynamic(
  () => import("@/components/ui/Chatbot"),
  { ssr: false }
);

export default function Home() {
  const [isBuyOpen, setIsBuyOpen] = useState(false);
  const { theme } = useTheme();
  const { logViewProduct } = useCart();

  // Log product view when user lands on home page
  useEffect(() => {
    logViewProduct("AirPods Pro 3");
  }, []);

  return (
    <main>
      <ScrollProgress />
      <HoverImageCursor />
      <Navbar onBuyClick={() => setIsBuyOpen(true)} />
      <HeroSection onBuyClick={() => setIsBuyOpen(true)} />
      <DesignSection />
      <AudioSection />
      <BatterySection />
      <SpecsSection />
      <ContactSection />

      {/* Dynamic Chatbot Assistant */}
      <Chatbot />

      {/* Quick Buy Checkout Modal */}
      <AnimatePresence>
        {isBuyOpen && (
          <BuyModal 
            isOpen={isBuyOpen} 
            onClose={() => setIsBuyOpen(false)} 
            theme={theme}
          />
        )}
      </AnimatePresence>
      <Footer />
    </main>
  );
}
