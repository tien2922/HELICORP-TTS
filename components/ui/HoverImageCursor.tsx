"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HoverImageCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
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

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Find and attach listeners to image wrappers/containers
    const handleMouseEnter = (e: MouseEvent) => {
      const img = e.currentTarget as HTMLImageElement;
      if (img && img.src) {
        setHoveredImage(img.src);
        // Hide default cursor
        img.style.cursor = "none";
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const img = e.currentTarget as HTMLImageElement;
      setHoveredImage(null);
      img.style.cursor = "";
    };

    // Listen to mouse coordinates globally
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Target all images in content sections
    const imageElements = document.querySelectorAll(
      "section img, .design-glass-card img, .checkout-product-img-wrapper img"
    );

    imageElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter as any);
      el.addEventListener("mouseleave", handleMouseLeave as any);
      // Ensure cursor none stylesheet applies on hover
      (el as HTMLElement).style.cursor = "none";
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      imageElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter as any);
        el.removeEventListener("mouseleave", handleMouseLeave as any);
      });
    };
  }, [isMobile]);

  // If mobile, do not render or add any DOM elements to protect PageSpeed score
  if (isMobile) return null;

  return (
    <AnimatePresence>
      {hoveredImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
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
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "16px",
            pointerEvents: "none",
            zIndex: 99999,
            // Centered offset from cursor point
            transform: `translate3d(${position.x - 40}px, ${position.y - 40}px, 0)`,
            willChange: "transform",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          }}
        />
      )}
    </AnimatePresence>
  );
}
