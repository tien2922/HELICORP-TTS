"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import Image from "next/image";

const tabsData = [
  {
    id: "translation",
    label: "Live Translation",
    title: "Speak and hear in real time.",
    image: "/1aaa.webp",
    description: "With Live Translation, powered by Apple Intelligence, you can listen to people speaking in different languages and hear translations through your AirPods Pro 3. To respond, just speak naturally, and your words will appear in the other person’s language on your iPhone screen. To make the experience even more magical, if you both have AirPods Pro 3, you can each speak in your own language and hear translations through your AirPods.",
  },
  {
    id: "controls",
    label: "Controls",
    title: "Simple gestures. More control.",
    image: "/2aaa.webp",
    description: "Simple touch controls let you do things like raise and lower volume, skip tracks, and send “Unknown Caller” straight to voicemail. And the new camera remote feature lets you control your iPhone to record a video or snap a pic, even from afar.",
  },
  {
    id: "connectivity",
    label: "Connectivity",
    title: "Magically effortless setup.",
    image: "/3aaa.webp",
    description: "To set up AirPods Pro 3, just place them next to your iPhone and follow the onscreen prompts. Use Automatic Switching to have your AirPods seamlessly connect to whichever device you’re listening to. All you have to do is press play.",
  },
];

export default function BatterySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("translation");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Dynamic Parallax vertical shift for the right image (only active on desktop)
  const imgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const currentTab = tabsData.find((t) => t.id === activeTab) || tabsData[0];

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        background: "var(--bg-primary)",
        padding: "20px 0",
        position: "relative",
        overflow: "hidden",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* ── Background Accent Glow ── */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "30%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: theme === "dark" 
            ? "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)" 
            : "radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* ── Section Header (Căn giữa với scroll reveal) ── */}
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 60px" }}>
          {/* Section label */}
          <div
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            04 • Experience
          </div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.8rem)",
              fontWeight: 800,
              color: theme === "dark" ? "#ffffff" : "#000000",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: 24,
              transition: "color 0.3s ease",
            }}
          >
            Magic to your ears.
          </motion.h2>

          {/* Sub description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0, 0, 0, 0.6)",
              transition: "color 0.3s ease",
              margin: 0,
            }}
          >
            AirPods Pro 3 are packed with features that make even the simplest moments seem extraordinary. From the all-new Live Translation feature to superconvenient camera control, there’s so much more to AirPods than meets the ear.
          </motion.p>
        </div>

        {/* ── Interactive Content Grid ── */}
        <div className="experience-grid">
          {/* Left — Text details corresponding to tab */}
          <div className="experience-text-side">
            {/* Switcher Buttons (Gạch qua gạch lại, nằm cố định phía trên tiêu đề) */}
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 32 }}>
              <div
                style={{
                  display: "inline-flex",
                  padding: 5,
                  borderRadius: 100,
                  background: theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
                  border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
                  position: "relative",
                  gap: 4,
                }}
              >
                {tabsData.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        position: "relative",
                        padding: "8px 18px",
                        borderRadius: 100,
                        border: "none",
                        background: "transparent",
                        color: isActive
                          ? (theme === "dark" ? "#000000" : "#ffffff")
                          : (theme === "dark" ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)"),
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        zIndex: 1,
                        fontFamily: "var(--font)",
                        transition: "color 0.25s ease",
                      }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: 100,
                            background: theme === "dark" ? "#ffffff" : "#000000",
                            zIndex: -1,
                          }}
                          transition={{ type: "spring", stiffness: 450, damping: 30 }}
                        />
                      )}
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Dynamic Title */}
                <h3
                  style={{
                    fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
                    fontWeight: 800,
                    color: theme === "dark" ? "#ffffff" : "#000000",
                    lineHeight: 1.2,
                    marginBottom: 20,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {currentTab.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                    marginBottom: 0,
                    maxWidth: 520,
                  }}
                >
                  {currentTab.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — Rounded Rectangular Image */}
          <motion.div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              y: isMobile ? 0 : imgY,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                style={{ width: "100%", position: "relative" }}
              >
                <Image
                  src={currentTab.image}
                  alt={currentTab.label}
                  width={600}
                  height={340}
                  sizes="(max-width: 991px) 100vw, 600px"
                  priority={activeTab === "translation"}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: 24,
                    boxShadow: theme === "dark"
                      ? "0 30px 80px rgba(0,0,0,0.6)"
                      : "0 30px 80px rgba(0,0,0,0.12)",
                    transition: "box-shadow 0.3s ease",
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        .experience-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: center;
          min-height: 520px;
        }
        .experience-text-side {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-self: stretch;
          padding-top: 40px;
        }
        @media (max-width: 991px) {
          .experience-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            min-height: auto !important;
          }
          .experience-text-side {
            padding-top: 0px !important;
          }
          .container {
            padding: 0 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
