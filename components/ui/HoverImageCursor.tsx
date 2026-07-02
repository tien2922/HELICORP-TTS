"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useTheme } from "@/components/providers/ThemeProvider";

export default function HoverImageCursor() {
  const { theme } = useTheme();
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Detect mobile small screens to protect PageSpeed score
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Track mouse coordinates using CSS custom variables to prevent React state lag
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const img = e.currentTarget as HTMLImageElement;
      if (img && img.src) {
        // Resolve absolute source url
        setHoveredImage(img.src);
      }
    };

    const handleMouseLeave = () => {
      setHoveredImage(null);
    };

    // Listen to mouse coordinates globally
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Target content images
    const imageElements = document.querySelectorAll(
      ".experience-grid img, .design-glass-card img, .checkout-product-img-wrapper img"
    );

    imageElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter as any);
      el.addEventListener("mouseleave", handleMouseLeave as any);
      // Apply cursor none styles natively
      (el as HTMLElement).style.setProperty("cursor", "none", "important");
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      imageElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter as any);
        el.removeEventListener("mouseleave", handleMouseLeave as any);
        (el as HTMLElement).style.cursor = "";
      });
    };
  }, [isMobile]);

  // If mobile, do not render or add any DOM elements to protect PageSpeed score
  if (isMobile) return null;

  return (
    <AnimatePresence>
      {hoveredImage && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 450, damping: 28 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: 80,
              height: 80,
              backgroundImage: `url(${hoveredImage})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.12)",
              borderRadius: "16px",
              pointerEvents: "none",
              zIndex: 99999,
              // Leverage hardware acceleration via CSS variables
              transform: "translate3d(calc(var(--cursor-x, 0px) - 40px), calc(var(--cursor-y, 0px) - 40px), 0)",
              willChange: "transform",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          />
          <style>{`
            .experience-grid img, .design-glass-card img, .checkout-product-img-wrapper img {
              cursor: none !important;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
