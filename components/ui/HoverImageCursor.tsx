"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useTheme } from "@/components/providers/ThemeProvider";

export default function HoverImageCursor() {
  const { theme } = useTheme();
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    // Track mouse coordinates using CSS custom variables
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);

      // Find the element currently under the cursor
      const target = e.target as HTMLElement;
      if (target) {
        // Find nearest img tag inside or if the target itself is an img
        const img = target.tagName === "IMG" ? (target as HTMLImageElement) : target.closest("img");
        if (img && img.src && !img.closest(".navbar-logo") && !img.closest(".footer-logo")) {
          setHoveredImage(img.src);
          img.style.setProperty("cursor", "none", "important");
          if (img.parentElement) {
            img.parentElement.style.setProperty("cursor", "none", "important");
          }
        } else {
          setHoveredImage(null);
        }
      }
    };

    const handleMouseLeaveGlobal = () => {
      setHoveredImage(null);
    };

    // Listen to mouse coordinates and hover targets globally
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeaveGlobal);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveGlobal);
    };
  }, []);

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
              transform: "translate3d(calc(var(--cursor-x, 0px) - 40px), calc(var(--cursor-y, 0px) - 40px), 0)",
              willChange: "transform",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          />
          <style>{`
            section img, .design-image-side img, .checkout-product-img-wrapper img, .experience-grid img, .battery-image-wrapper img {
              cursor: none !important;
            }
            main img {
              cursor: none !important;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
