"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Footer from "@/components/layout/Footer";

// Lazy load heavy sections for performance
const DesignSection = dynamic(
  () => import("@/components/sections/DesignSection"),
  { ssr: false }
);
const AudioSection = dynamic(
  () => import("@/components/sections/AudioSection")
);
const BatterySection = dynamic(
  () => import("@/components/sections/BatterySection")
);
const SpecsSection = dynamic(
  () => import("@/components/sections/SpecsSection")
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection")
);

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <DesignSection />
      <AudioSection />
      <BatterySection />
      <SpecsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
