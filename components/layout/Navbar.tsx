"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Moon, Sun, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Design", href: "#design" },
  { label: "Audio", href: "#audio" },
  { label: "Experience", href: "#experience" },
  { label: "Environment", href: "#specs" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onBuyClick }: { onBuyClick: () => void }) {
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo12.png"
              alt="Apple Logo"
              width={22}
              height={22}
              style={{
                width: 22,
                height: 22,
                objectFit: "contain",
                // Optional inversion filter depending on theme to make black logo white in dark mode
                filter: theme === "dark" ? "invert(1)" : "none",
                transition: "filter 0.3s ease",
              }}
            />
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
              {/* Premium Switch Toggle for Dark/Light Mode (hidden on mobile, shown on desktop) */}
              <div
                onClick={toggleTheme}
                className="hidden md:flex"
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
                onClick={onBuyClick}
                className="btn-primary hidden md:flex" 
                style={{ 
                  padding: "8px 18px", 
                  fontSize: "0.8rem",
                  background: theme === "dark" ? "#ffffff" : "#000000",
                  color: theme === "dark" ? "#000000" : "#ffffff",
                  transition: "all 0.3s ease",
                }}
              >
                Buy Now
              </button>
            </div>

            {/* Mobile menu button (always visible on mobile) */}
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
              background: theme === "dark" ? "rgba(10,10,10,0.96)" : "rgba(255,255,255,0.96)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              borderBottom: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
              padding: "20px 24px 28px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
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
                    borderBottom: theme === "dark" ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.04)",
                    fontFamily: "var(--font)",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
              
              {/* Theme Selector inside mobile drawer */}
              <div 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  padding: "16px 0",
                  borderBottom: theme === "dark" ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.04)",
                }}
              >
                <span style={{ fontSize: "1rem", fontWeight: 500, color: "var(--text-secondary)" }}>
                  Theme Mode
                </span>
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
                    }}
                  >
                    {theme === "dark" ? (
                      <Moon size={11} color="#000000" />
                    ) : (
                      <Sun size={11} color="#ffffff" />
                    )}
                  </motion.div>
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileOpen(false);
                  onBuyClick();
                }}
                className="btn-primary"
                style={{ 
                  marginTop: 20, 
                  textAlign: "center", 
                  justifyContent: "center",
                  background: theme === "dark" ? "#ffffff" : "#000000",
                  color: theme === "dark" ? "#000000" : "#ffffff",
                }}
              >
                Buy Now
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
