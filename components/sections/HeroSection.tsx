"use client";
import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Pause, Play } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { theme } = useTheme();

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying((p) => !p);
  }, [isPlaying]);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        background: "var(--bg-primary)",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* ── Fullscreen Video ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <video
          ref={videoRef}
          src="/hero_sec.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            height: "100vh",
            minWidth: "100vw",
            minHeight: "100vh",
            objectFit: "cover",
            opacity: theme === "dark" ? 0.8 : 0.9,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* 20% Opacity Vignette border overlay around the desktop screen */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle, transparent 40%, rgba(0,0,0,0.20) 100%)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />

        {/* Gradient top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 80,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)",
            zIndex: 4,
            pointerEvents: "none",
          }}
        />

        {/* Gradient bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 200,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)",
            zIndex: 4,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Pause/Play Button (top-right, Apple style) ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isPlaying ? "Tạm dừng video" : "Phát video"}
        style={{
          position: "absolute",
          top: 80,
          right: 24,
          zIndex: 100,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#ffffff",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.background =
            "rgba(255, 255, 255, 0.25)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background =
            "rgba(255, 255, 255, 0.15)")
        }
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </motion.button>

      {/* ── Text Content Overlay (Căn trái toàn bộ theo mod.construction) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          padding: "0 80px",
          background: theme === "dark"
            ? "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)"
            : "linear-gradient(to right, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
          transition: "background 0.3s ease",
        }}
      >
        <div style={{ maxWidth: 640 }}>
          {/* Tag / Product name: Nhỏ hơn, Đen ở Light mode / Trắng ở Dark mode */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: theme === "dark" ? "#ffffff" : "#000000",
              marginBottom: 16,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "color 0.3s ease",
            }}
          >
            AirPods Pro 3
          </motion.p>

          {/* Headline H1: Giới hạn đúng 2 dòng, Đen ở Light mode / Trắng ở Dark mode */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.55,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
              fontWeight: 800,
              color: theme === "dark" ? "#ffffff" : "#000000",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: 20,
              transition: "color 0.3s ease",
            }}
          >
            Best in-ear Active
            <br />
            Noise Cancellation.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.7,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              fontSize: "1.05rem",
              color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: 36,
              maxWidth: 480,
              transition: "color 0.3s ease",
            }}
          >
            Up to 2x more active noise cancellation than previous generations. Hear what you want to hear.
          </motion.p>

          {/* Price & Buy Now Button directly below description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.85,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: "14px 36px",
                background: theme === "dark" ? "#ffffff" : "#000000",
                color: theme === "dark" ? "#000000" : "#ffffff",
                fontWeight: 600,
                fontSize: "0.95rem",
                borderRadius: 100,
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font)",
                boxShadow: theme === "dark" 
                  ? "0 10px 25px rgba(255, 255, 255, 0.15)"
                  : "0 10px 25px rgba(0, 0, 0, 0.15)",
                transition: "all 0.3s ease",
              }}
            >
              Buy Now • $249
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          #hero > div:nth-child(3) {
            padding: 0 24px !important;
            align-items: flex-end !important;
            padding-bottom: 80px !important;
          }
        }
      `}</style>
    </section>
  );
}
