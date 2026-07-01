"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/components/providers/ThemeProvider";

const panels = [
  {
    tag: "Design",
    title: "Perfected in\nevery detail.",
    description:
      "AirPods 3 are completely redesigned with a shorter stem and contoured shape that fits naturally in your ear. Every single curve has a clear purpose.",
    highlight: "33% shorter stem",
    hotspot: { x: "42%", y: "45%", label: "Optimized Stem" },
  },
  {
    tag: "Materials",
    title: "Light as air.\nTough as stone.",
    description:
      "Crafted from premium recycled plastics and medical-grade membranes. Weighing just 4.28 grams each, you will easily forget they are even there.",
    highlight: "4.28g ultra-lightweight",
    hotspot: { x: "28%", y: "38%", label: "Bio-recycled Casing" },
  },
  {
    tag: "Contour",
    title: "Tailored specifically\nfor your ears.",
    description:
      "Equipped with skin-detect sensors that recognize when they are in your ears. Music plays automatically when placed inside and pauses when removed.",
    highlight: "Skin-detect sensors",
    hotspot: { x: "62%", y: "30%", label: "Skin Proximity Sensor" },
  },
];

export default function DesignSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth layout transforms for the card and image based on scroll progress
  const cardRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-12, 0, 12]);
  const cardRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 8, -5]);
  const cardScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 5, 20]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.9]);
  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 30]);

  // Render a simple loading placeholder on server to prevent Hydration Mismatch
  if (!mounted) {
    return (
      <section id="design" style={{ background: "var(--bg-primary)", minHeight: "100vh" }} />
    );
  }

  return (
    <section
      id="design"
      ref={containerRef}
      style={{
        position: "relative",
        height: "300vh",
        background: "var(--bg-primary)",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Sticky container */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Ambient background glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: theme === "dark" 
              ? "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(59,130,246,0.03) 0%, transparent 80%)"
              : "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 80%)",
            pointerEvents: "none",
          }}
        />

        <div className="design-container-inner">
          {/* Left/Top — Text Panels */}
          <div className="design-text-side">
            {panels.map((panel, i) => {
              // Exact non-overlapping boundaries for opacity transitions on scroll
              let opacityRange: number[] = [];
              let scrollRange: number[] = [];
              let yScrollRange: number[] = [];
              let yValueRange: number[] = [];

              if (i === 0) {
                scrollRange = [0.00, 0.22, 0.28, 1.00];
                opacityRange = [1, 1, 0, 0];
                yScrollRange = [0.00, 0.22, 0.28, 1.00];
                yValueRange = [0, 0, -20, -20];
              } else if (i === 1) {
                scrollRange = [0.00, 0.28, 0.36, 0.58, 0.64, 1.00];
                opacityRange = [0, 0, 1, 1, 0, 0];
                yScrollRange = [0.00, 0.28, 0.36, 0.58, 0.64, 1.00];
                yValueRange = [20, 20, 0, 0, -20, -20];
              } else {
                scrollRange = [0.00, 0.64, 0.72, 1.00];
                opacityRange = [0, 0, 1, 1];
                yScrollRange = [0.00, 0.64, 0.72, 1.00];
                yValueRange = [20, 20, 0, 0];
              }

              const panelOpacity = useTransform(scrollYProgress, scrollRange, opacityRange);
              const panelY = useTransform(scrollYProgress, yScrollRange, yValueRange);

              return (
                <motion.div
                  key={panel.tag}
                  className="design-panel-card"
                  style={{
                    opacity: panelOpacity,
                    y: panelY,
                  }}
                >
                  {/* Tags Container */}
                  <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                    {/* Tag 1 — Category */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "6px 14px",
                        borderRadius: 100,
                        background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                        border: theme === "dark" ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: theme === "dark" ? "#ffffff" : "#000000",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {panel.tag}
                      </span>
                    </div>

                    {/* Tag 2 — Highlight detail */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "6px 14px",
                        borderRadius: 100,
                        background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                        border: theme === "dark" ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: theme === "dark" ? "#ffffff" : "#000000",
                          transition: "background-color 0.3s ease",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: theme === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {panel.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2
                    className="design-panel-title"
                    style={{
                      whiteSpace: "pre-line",
                      color: theme === "dark" ? "#ffffff" : "#000000",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {panel.title}
                  </h2>

                  {/* Description */}
                  <p className="design-panel-desc">
                    {panel.description}
                  </p>

                  {/* Discover Button */}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      padding: "12px 32px",
                      background: theme === "dark" ? "#ffffff" : "#000000",
                      color: theme === "dark" ? "#000000" : "#ffffff",
                      fontWeight: 600,
                      fontSize: "0.9rem",
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

                  {/* Progress indicator */}
                  <div style={{ display: "flex", gap: 8, marginTop: 32 }}>
                    {panels.map((_, pi) => (
                      <div
                        key={pi}
                        style={{
                          height: 3,
                          width: pi === i ? 28 : 12,
                          borderRadius: 2,
                          background: pi === i ? "#3b82f6" : theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
                          transition: "all 0.3s ease",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right/Bottom — Interactive Parallax Glassmorphism Card */}
          <div className="design-image-side">
            <motion.div
              className="design-glass-card"
              style={{
                rotateY: cardRotateY,
                rotateX: cardRotateX,
                scale: cardScale,
                boxShadow: theme === "dark" 
                  ? "0 40px 100px rgba(0, 0, 0, 0.7)"
                  : "0 40px 100px rgba(0, 0, 0, 0.15)",
                transition: "box-shadow 0.3s ease",
              }}
            >
              {/* Dynamic Glowing background inside card */}
              <div
                style={{
                  position: "absolute",
                  width: "150%",
                  height: "150%",
                  background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 60%)",
                  filter: "blur(30px)",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />

              {/* Parallax Product Image */}
              <motion.div
                style={{
                  position: "relative",
                  zIndex: 1,
                  rotate: imageRotate,
                  scale: imageScale,
                  y: imageY,
                  filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.55))",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transformStyle: "preserve-3d",
                }}
                className="design-image-wrap"
              >
                <Image
                  src="/airpods-side1.webp"
                  alt="AirPods 3 premium design"
                  width={340}
                  height={340}
                  priority
                  style={{
                    objectFit: "contain",
                    transform: "translateZ(50px)",
                  }}
                  className="design-main-image"
                />

                {/* Hotspots container */}
                {panels.map((p, index) => (
                  <HotspotItem
                    key={index}
                    index={index}
                    total={panels.length}
                    scrollYProgress={scrollYProgress}
                    hotspot={p.hotspot}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Section label */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            fontWeight: 600,
          }}
        >
          02 • Design
        </div>
      </div>

      {/* Responsive styling defining layouts purely in CSS */}
      <style>{`
        .design-container-inner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
          width: 100%;
          padding: 0 80px;
          max-width: 100%;
        }
        .design-text-side {
          position: relative;
          min-height: 480px;
        }
        .design-panel-card {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
        }
        .design-panel-title {
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
        }
        .design-panel-desc {
          font-size: 0.92rem;
          line-height: 1.55;
          margin-bottom: 32px;
          max-width: 520px;
          color: var(--text-secondary);
        }
        .design-image-side {
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1500px;
          width: 100%;
        }
        .design-glass-card {
          position: relative;
          width: 100%;
          maxWidth: 440px;
          height: 520px;
          border-radius: 32px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          transform-style: preserve-3d;
        }
        
        @media (max-width: 991px) {
          .design-container-inner {
            display: flex !important;
            flex-direction: column !important;
            padding: 0 24px !important;
            gap: 40px !important;
          }
          .design-text-side {
            min-height: 280px !important;
            width: 100% !important;
          }
          .design-panel-card {
            width: 100% !important;
          }
          .design-panel-title {
            font-size: 1.8rem !important;
            margin-bottom: 12px !important;
          }
          .design-panel-desc {
            font-size: 0.875rem !important;
            margin-bottom: 20px !important;
          }
          .design-image-side {
            width: 100% !important;
            margin-top: 10px !important;
          }
          .design-glass-card {
            height: 380px !important;
            max-width: 340px !important;
            border-radius: 24px !important;
          }
          .design-main-image {
            width: 240px !important;
            height: 240px !important;
          }
        }
      `}</style>
    </section>
  );
}

interface HotspotProps {
  index: number;
  total: number;
  scrollYProgress: any;
  hotspot: { x: string; y: string; label: string };
}

function HotspotItem({ index, total, scrollYProgress, hotspot }: HotspotProps) {
  const start = index / total;
  const end = (index + 1) / total;
  
  // Ensure start bounds are strictly increasing and non-negative
  const r1 = Math.max(0, start - 0.04);
  const r2 = start;
  const r3 = Math.max(r2 + 0.01, end - 0.04);
  const r4 = end;

  // Transform scale and opacity dynamically based on scroll ranges
  const opacity = useTransform(
    scrollYProgress,
    [r1, r2, r3, r4],
    [0, 1, 1, 0]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [r1, r2, r3, r4],
    [0.6, 1, 1, 0.6]
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        left: hotspot.x,
        top: hotspot.y,
        transform: "translateZ(80px)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        pointerEvents: "none",
        opacity,
        scale,
      }}
    >
      {/* Pulse circle */}
      <div style={{ position: "relative", width: 14, height: 14 }}>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "#3b82f6",
            animation: "pulse-glow 1.5s infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 3,
            left: 3,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#ffffff",
          }}
        />
      </div>
      
      {/* Label tag */}
      <div
        style={{
          padding: "6px 14px",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "#ffffff",
          whiteSpace: "nowrap",
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(10px)",
          borderRadius: 8,
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        {hotspot.label}
      </div>
    </motion.div>
  );
}
