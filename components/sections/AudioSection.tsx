"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";

const WaveVisualizer = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const bars = Array.from({ length: 48 });

  if (!mounted) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 4,
          height: 120,
          justifyContent: "center",
        }}
      >
        {bars.map((_, i) => (
          <div
            key={i}
            className="wave-bar"
            style={{
              height: "20%",
              opacity: 0.2,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 4,
        height: 120,
        justifyContent: "center",
      }}
    >
      {bars.map((_, i) => {
        const height = 15 + Math.sin(i * 0.35) * 40 + Math.cos(i * 0.6) * 25 + 40;
        const delay = i * 0.04;
        return (
          <div
            key={i}
            className="wave-bar"
            style={{
              height: `${Math.max(10, height)}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${0.8 + Math.sin(i) * 0.4}s`,
              opacity: 0.4 + Math.sin(i * 0.2) * 0.4,
            }}
          />
        );
      })}
    </div>
  );
};

import Image from "next/image";

const features = [
  {
    image: "/ca1.jpg",
    boldPrefix: "New ultra-low-noise microphones.",
    desc: " Using advanced computational audio to remove background noise and deliver clean audio.",
  },
  {
    image: "/ca2.jpg",
    boldPrefix: "Voice Isolation.",
    desc: " AirPods Pro 3 reduce background noise and isolate voices so you can hear clearly in loud environments.",
  },
  {
    image: "/ca3.jpg",
    boldPrefix: "Adaptive Audio.",
    desc: " AirPods Pro 3 combine Active Noise Cancellation with next-level transparency to adapt sound dynamically.",
  },
];

export default function AudioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();

  return (
    <section
      id="audio"
      ref={ref}
      style={{
        background: "var(--bg-primary)",
        padding: "160px 0",
        position: "relative",
        overflow: "hidden",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Ambient circles */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          border: "1px solid rgba(59,130,246,0.06)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: "1px solid rgba(59,130,246,0.08)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: "1px solid rgba(59,130,246,0.1)",
          pointerEvents: "none",
        }}
      />

      {/* Center glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: "center",
            marginBottom: 16,
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
            fontWeight: 600,
          }}
        >
          03 • Personalized Listening
        </motion.div>

        {/* Title: 1 line dynamic theme */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            textAlign: "center", 
            marginBottom: 24,
            fontSize: "clamp(2.5rem, 6vw, 4.8rem)",
            fontWeight: 800,
            color: theme === "dark" ? "#ffffff" : "#000000",
            transition: "color 0.3s ease",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          For your ears only.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            textAlign: "center",
            maxWidth: 620,
            margin: "0 auto 60px",
            fontSize: "0.92rem",
            lineHeight: 1.6,
            color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
            transition: "color 0.3s ease",
          }}
        >
          AirPods Pro 3 feature next-generation Adaptive EQ, which customizes a sound signature for your unique ear geometry and fit. And Personalized Volume uses machine learning to understand your listening patterns and adapt to your preferences over time.
        </motion.p>

        {/* Wave Visualizer */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginBottom: 80,
            transformOrigin: "bottom",
          }}
        >
          <WaveVisualizer />
        </motion.div>

        {/* Feature Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "default",
              }}
            >
              {/* Image Container with large rounded corners */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 380,
                  borderRadius: 24,
                  overflow: "hidden",
                  marginBottom: 16,
                  boxShadow: theme === "dark" 
                    ? "0 15px 35px rgba(0, 0, 0, 0.4)" 
                    : "0 15px 35px rgba(0, 0, 0, 0.08)",
                }}
              >
                <Image
                  src={feat.image}
                  alt={feat.boldPrefix}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Text Description underneath the image */}
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.55,
                  color: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)",
                  textAlign: "left",
                  padding: "0 4px",
                  transition: "color 0.3s ease",
                }}
              >
                <strong style={{ color: theme === "dark" ? "#ffffff" : "#000000", fontWeight: 700 }}>
                  {feat.boldPrefix}
                </strong>
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Centered Discover Button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 54 }}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              padding: "14px 38px",
              background: theme === "dark" ? "#ffffff" : "#000000",
              color: theme === "dark" ? "#000000" : "#ffffff",
              fontWeight: 600,
              fontSize: "0.95rem",
              borderRadius: 100,
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font)",
              boxShadow: theme === "dark"
                ? "0 10px 25px rgba(255, 255, 255, 0.1)"
                : "0 10px 25px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
          >
            Discover
          </motion.button>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #audio > div.container {
            padding: 0 24px !important;
          }
          #audio div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          #audio div[style*="height: 380"] {
            height: 280px !important;
          }
        }
      `}</style>
    </section>
  );
}
