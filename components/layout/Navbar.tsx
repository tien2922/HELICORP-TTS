"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useCart } from "@/components/providers/CartContext";
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
  const { cartCount, isFavorite, toggleWishlist } = useCart();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      if (!scrolled) setScrolled(true);
    } else {
      if (scrolled) setScrolled(false);
    }
  });

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          background: scrolled 
            ? (theme === "dark" ? "rgba(10, 10, 10, 0.75)" : "rgba(255, 255, 255, 0.75)")
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? (theme === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.05)")
            : "1px solid transparent",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "0 24px" }}>
          {/* Logo / Brand */}
          <Link 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 8, 
              textDecoration: "none",
              color: "var(--text-primary)"
            }}
          >
            {/* Apple Logo SVG */}
            <svg 
              viewBox="0 0 170 170" 
              style={{ 
                width: 18, 
                height: 18, 
                fill: "var(--text-primary)",
                transition: "fill 0.3s ease" 
              }}
            >
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.92-14.37-6.15-3.61-2.92-7.53-7.7-11.75-14.36-9.19-14.64-13.79-28.53-13.79-41.68 0-12.54 3.15-22.92 9.45-31.14 6.3-8.22 14.18-12.33 23.64-12.33 4.8 0 10.14 1.25 16 3.75 5.88 2.5 9.5 3.75 10.88 3.75 1.5 0 5.31-1.35 11.44-4.04 6.12-2.69 11.43-3.95 15.93-3.77 15.54.91 27.24 6.78 35.1 17.6-12.87 7.82-19.16 18.43-18.89 31.84.27 10.27 4.1 18.73 11.51 25.37 7.41 6.64 16.03 10.24 25.86 10.81 1.05 4.67 2.1 9.35 3.15 14.02zM119.22 32.4c0-7.72 2.76-14.88 8.27-21.49 5.51-6.61 12.34-10.49 20.49-11.66.16 8.01-2.48 15.35-7.92 22.02-5.44 6.67-12.44 10.74-21 12.22.11-.36.16-.73.16-1.09z" />
            </svg>
            <span style={{ fontWeight: 600, fontSize: "0.95rem", letterSpacing: "-0.01em" }}>AirPods 3</span>
          </Link>
 
          {/* Navigation Links (desktop) */}
          <nav className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="nav-link-item"
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  transition: "color 0.25s ease",
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
 
          {/* Actions Menu */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              
              {/* Theme Switcher Toggle */}
              <div
                onClick={toggleTheme}
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 100,
                  background: theme === "dark" ? "#000000" : "#ffffff",
                  border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 2px",
                  cursor: "pointer",
                  position: "relative",
                  transition: "background-color 0.3s ease",
                }}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: theme === "dark" ? "#ffffff" : "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                    position: "absolute",
                    left: theme === "dark" ? "auto" : 2,
                    right: theme === "dark" ? 2 : "auto",
                  }}
                >
                  {theme === "dark" ? (
                    <Moon size={10} color="#000000" />
                  ) : (
                    <Sun size={10} color="#ffffff" />
                  )}
                </motion.div>
              </div>

              {/* Wishlist Heart SVG Button (desktop) */}
              <motion.button
                onClick={toggleWishlist}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 4,
                  color: isFavorite ? "#ef4444" : "var(--text-secondary)",
                }}
                title="Yêu thích"
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    width: 18,
                    height: 18,
                    fill: isFavorite ? "#ef4444" : "none",
                    stroke: isFavorite ? "#ef4444" : "var(--text-secondary)",
                    strokeWidth: 2,
                    transition: "fill 0.2s, stroke 0.2s",
                  }}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.button>

              {/* Cart Bag SVG Button (desktop) */}
              <motion.button
                onClick={onBuyClick}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 4,
                  position: "relative",
                  color: "var(--text-secondary)",
                }}
                title="Giỏ hàng"
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    width: 18,
                    height: 18,
                    fill: "none",
                    stroke: "var(--text-secondary)",
                    strokeWidth: 2,
                  }}
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                </svg>
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: -2,
                      right: -4,
                      background: "#ef4444",
                      color: "#ffffff",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      borderRadius: "50%",
                      width: 13,
                      height: 13,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: theme === "dark" ? "1px solid #000000" : "1px solid #ffffff",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </motion.button>

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

              {/* Mobile Wishlist & Cart Toggles */}
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
                  Sản phẩm yêu thích
                </span>
                <motion.button
                  onClick={toggleWishlist}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    padding: 8,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    style={{
                      width: 22,
                      height: 22,
                      fill: isFavorite ? "#ef4444" : "none",
                      stroke: isFavorite ? "#ef4444" : "var(--text-secondary)",
                      strokeWidth: 2,
                    }}
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </motion.button>
              </div>

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
                  Giỏ hàng của bạn
                </span>
                <motion.button
                  onClick={() => {
                    setMobileOpen(false);
                    onBuyClick();
                  }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    padding: 8,
                    position: "relative",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    style={{
                      width: 22,
                      height: 22,
                      fill: "none",
                      stroke: "var(--text-secondary)",
                      strokeWidth: 2,
                    }}
                  >
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                  </svg>
                  {cartCount > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: 2,
                        right: 0,
                        background: "#ef4444",
                        color: "#ffffff",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        borderRadius: "50%",
                        width: 15,
                        height: 15,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid var(--bg-primary)",
                      }}
                    >
                      {cartCount}
                    </span>
                  )}
                </motion.button>
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

      <style>{`
        @media (max-width: 767px) {
          .hidden.md\\:flex {
            display: none !important;
          }
          nav.hidden.md\\:flex {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
