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
            initial={{ opacity: 0, scale: 0.7, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 15 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: 220,
              height: 140,
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme === "dark" ? "rgba(30, 30, 30, 0.75)" : "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(0, 0, 0, 0.08)",
              borderRadius: "20px",
              pointerEvents: "none",
              zIndex: 99999,
              transform: "translate3d(calc(var(--cursor-x, 0px) + 20px), calc(var(--cursor-y, 0px) + 20px), 0)",
              willChange: "transform",
              boxShadow: theme === "dark" 
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(59, 130, 246, 0.15)"
                : "0 25px 50px -12px rgba(0, 0, 0, 0.18)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${hoveredImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "14px",
              }}
            />
          </motion.div>
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
