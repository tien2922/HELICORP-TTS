"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";

const environmentCards = [
  {
    iconColor: "#8b5cf6", // Purple
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="M20 12h2" />
        <path d="M2 12h2" />
      </svg>
    ),
    boldText: "40% recycled material",
    prefixText: "Made with ",
    suffixText: " by weight.",
    highlightColor: "#8b5cf6",
  },
  {
    iconColor: "#f97316", // Orange
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    boldText: "40% renewable electricity",
    prefixText: "Manufactured with ",
    suffixText: ".",
    highlightColor: "#f97316",
  },
  {
    iconColor: "#0ea5e9", // Teal/Blue
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    boldText: "25% more units",
    prefixText: "Shipped with ",
    suffixText: " per charter flight to cut transportation emissions.",
    highlightColor: "#0ea5e9",
  },
];

export default function SpecsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();

  return (
    <section
      id="specs"
      ref={ref}
      style={{
        background: "var(--bg-primary)",
        padding: "160px 0 120px",
        position: "relative",
        overflow: "hidden",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: theme === "dark" 
            ? "radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0,0,0,0.01) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Title Block */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            05 • Environment
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.8rem)",
              fontWeight: 800,
              color: theme === "dark" ? "#ffffff" : "#000000",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: 20,
              transition: "color 0.3s ease",
            }}
          >
            Magic. Runs in the family.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0, 0, 0, 0.6)",
              maxWidth: 580,
              margin: "0 auto",
              transition: "color 0.3s ease",
            }}
          >
            AirPods Pro 3 are designed to minimize their environmental impact. From manufacturing to packaging, we think about sustainability at every step.
          </motion.p>
        </div>

        {/* Dynamic 3 Grid Cards */}
        <div className="specs-grid">
          {environmentCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.8,
                delay: 0.1 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -6,
                boxShadow: theme === "dark"
                  ? "0 30px 60px rgba(0, 0, 0, 0.4)"
                  : "0 30px 60px rgba(0, 0, 0, 0.06)",
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              style={{
                background: theme === "dark" ? "rgba(255, 255, 255, 0.02)" : "rgba(245, 245, 247, 0.65)",
                border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(0, 0, 0, 0.04)",
                borderRadius: 24,
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 250,
                position: "relative",
                cursor: "pointer",
                transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              {/* Top Section — Icon */}
              <div
                style={{
                  color: card.iconColor,
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {card.icon}
              </div>

              {/* Bottom Section — Text highlights */}
              <div style={{ paddingRight: 32, flex: 1, display: "flex", alignItems: "flex-end" }}>
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.5,
                    color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                    fontFamily: "var(--font)",
                    textAlign: "left",
                  }}
                >
                  {card.prefixText}
                  <strong style={{ color: card.highlightColor, fontWeight: 700 }}>
                    {card.boldText}
                  </strong>
                  {card.suffixText}
                </p>
              </div>

              {/* Black / White circular + button absolute bottom-right */}
              <div
                className="plus-btn"
                style={{
                  position: "absolute",
                  bottom: 24,
                  right: 24,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: theme === "dark" ? "#ffffff" : "#000000",
                  color: theme === "dark" ? "#000000" : "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  transition: "transform 0.3s ease, background-color 0.3s ease, color 0.3s ease",
                }}
              >
                +
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        .specs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        @media (max-width: 991px) {
          .specs-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          #specs > div:nth-child(2) {
            padding: 0 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
