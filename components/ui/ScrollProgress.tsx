"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

    const { theme } = useTheme();

  return (
    <motion.div
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: theme === "dark" ? "#ffffff" : "#000000",
        transformOrigin: "0%",
        zIndex: 2000,
        transition: "background-color 0.3s ease",
      }}
    />
  );
}
