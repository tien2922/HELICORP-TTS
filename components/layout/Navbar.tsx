"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Moon, Sun, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Thiết kế", href: "#design" },
  { label: "Spatial Audio", href: "#audio" },
  { label: "Pin", href: "#battery" },
  { label: "Thông số", href: "#specs" },
  { label: "Liên hệ", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "0 24px",
          transition: "all 0.3s ease",
          background: scrolled
            ? theme === "dark"
              ? "rgba(0,0,0,0.8)"
              : "rgba(255,255,255,0.8)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? theme === "dark"
              ? "1px solid rgba(255,255,255,0.12)"
              : "1px solid rgba(0,0,0,0.08)"
            : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1600,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
            width: "100%",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            <svg
              viewBox="0 0 170 170"
              style={{
                width: 20,
                height: 20,
                fill: theme === "dark" ? "#ffffff" : "#000000",
                transition: "fill 0.3s ease",
              }}
            >
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.37.13-9.13-1.9-14.28-6.07-3.47-2.91-7.4-7.69-11.8-14.37C19.78 120.32 14 102.73 14 85.34c0-11.16 2.68-20.35 8.04-27.56 5.37-7.22 12.23-10.83 20.58-10.83 4.13 0 9.07 1.29 14.82 3.86 5.74 2.57 9.49 3.86 11.24 3.86 1.51 0 5.48-1.29 11.93-3.86 6.44-2.57 11.19-3.74 14.26-3.5 11.07.7 19.38 4.9 24.93 12.6-9.61 5.86-14.35 13.88-14.23 24.06.12 8.16 3.13 15.01 9.03 20.54 5.9 5.53 13 8.64 21.29 9.34-1.22 3.65-2.85 7.42-4.91 11.3zM119.22 31c0-6.72 2.37-12.87 7.1-18.46 4.74-5.6 10.63-9.17 17.67-10.73.13 1.25.19 2.38.19 3.4 0 6.57-2.45 12.71-7.36 18.42-4.91 5.71-10.97 9.45-18.17 11.23-.96-.4-1.43-3.86-1.43-3.86z" />
            </svg>
            <span
              style={{
                color: theme === "dark" ? "#ffffff" : "#000000",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "-0.02em",
                transition: "color 0.3s ease",
              }}
            >
              AirPods 3
            </span>
          </Link>

          {/* Right Area: Nav Links + Actions (Shifting tightly to the right) */}
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginLeft: "auto" }}>
            {/* Desktop Nav (Moved to right) */}
            <nav
              style={{
                display: "flex",
                gap: 24,
                listStyle: "none",
                alignItems: "center",
              }}
              className="hidden md:flex"
            >
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    background: "none",
                    border: "none",
                    color: theme === "dark" ? "#ffffff" : "#000000",
                    opacity: 0.75,
                    fontSize: "0.825rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "opacity 0.25s ease, color 0.25s ease",
                    fontFamily: "var(--font)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.opacity = "1")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.opacity = "0.75")
                  }
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Premium Switch Toggle for Dark/Light Mode */}
              <div
                onClick={toggleTheme}
                style={{
                  width: 52,
                  height: 28,
                  borderRadius: 100,
                  background: theme === "dark" ? "#000000" : "#ffffff",
                  border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 4px",
                  cursor: "pointer",
                  position: "relative",
                  transition: "background 0.3s ease, border-color 0.3s ease",
                }}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: theme === "dark" ? "#ffffff" : "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    position: "absolute",
                    left: theme === "dark" ? "auto" : 4,
                    right: theme === "dark" ? 4 : "auto",
                    transition: "background 0.3s ease",
                  }}
                >
                  {theme === "dark" ? (
                    <Moon size={11} color="#000000" />
                  ) : (
                    <Sun size={11} color="#ffffff" />
                  )}
                </motion.div>
              </div>

              {/* CTA Button (desktop) */}
              <button 
                className="btn-primary hidden md:flex" 
                style={{ 
                  padding: "8px 18px", 
                  fontSize: "0.8rem",
                  background: theme === "dark" ? "#ffffff" : "#000000",
                  color: theme === "dark" ? "#000000" : "#ffffff",
                  transition: "all 0.3s ease",
                }}
              >
                Mua ngay
              </button>
            </div>

            {/* Mobile menu */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "var(--bg-glass)",
                border: "1px solid var(--border-glass)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--text-primary)",
              }}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 64,
              left: 0,
              right: 0,
              zIndex: 999,
              background: "rgba(0,0,0,0.95)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              padding: "20px 24px 28px",
            }}
          >
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-secondary)",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    textAlign: "left",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    fontFamily: "var(--font)",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
              <button
                className="btn-primary"
                style={{ marginTop: 16, textAlign: "center", justifyContent: "center" }}
              >
                Mua ngay
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
