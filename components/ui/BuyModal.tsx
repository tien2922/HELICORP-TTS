"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Loader2, Check } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: "light" | "dark";
}

const WEBHOOK_ORDER_URL = "https://httpbin.org/post"; // Simulate order processing

export default function BuyModal({ isOpen, onClose, theme }: BuyModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const price = 249;
  const totalPrice = price * quantity;

  const handleInputBlur = () => {
    // Reset view position to counter virtual keyboard shift bugs on mobile browsers
    setTimeout(() => {
      window.scrollTo({ top: window.scrollY, behavior: "instant" });
    }, 50);
  };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(WEBHOOK_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: "AirPods Pro 3",
          quantity,
          totalPrice,
          customerName: name,
          customerPhone: phone,
          customerAddress: address,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Order failed");

      setOrdered(true);
      toast.success("🎉 Order placed successfully!");
      // Reset form
      setName("");
      setPhone("");
      setAddress("");
      setQuantity(1);
    } catch {
      toast.error("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              background: theme === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="checkout-modal-container"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 720,
              background: theme === "dark" ? "rgba(20, 20, 20, 0.9)" : "rgba(255, 255, 255, 0.95)",
              border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.06)",
              borderRadius: 28,
              boxShadow: theme === "dark"
                ? "0 50px 100px rgba(0,0,0,0.8)"
                : "0 50px 100px rgba(0,0,0,0.15)",
              overflow: "hidden",
              zIndex: 1,
              fontFamily: "var(--font)",
            }}
          >
             {/* Close button - Kept absolute for perfect corner positioning */}
            <button
              onClick={onClose}
              className="checkout-close-btn"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                zIndex: 100,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = theme === "dark" ? "#fff" : "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)")}
            >
              <X size={16} />
            </button>

            {/* Inner Scrollable area */}
            <div className="checkout-scroll-area" style={{ width: "100%", height: "100%" }}>
              <div className="checkout-grid">
              {/* Left side — Product details */}
              <div
                style={{
                  background: theme === "dark" ? "rgba(255, 255, 255, 0.01)" : "rgba(0, 0, 0, 0.01)",
                  borderRight: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(0, 0, 0, 0.04)",
                  padding: "40px 32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                className="checkout-product-side"
              >
                <div style={{ textAlign: "center", width: "100%" }}>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
                    }}
                  >
                    Quick Checkout
                  </span>
                  <h3
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: 800,
                      color: theme === "dark" ? "#ffffff" : "#000000",
                      marginTop: 8,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    AirPods Pro 3
                  </h3>
                </div>

                {/* Product Image */}
                <div className="checkout-product-img-wrapper">
                  <Image
                    src="/airpods-hero copy.webp"
                    alt="AirPods Pro 3"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>

                <div style={{ textAlign: "center", width: "100%" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: theme === "dark" ? "#ffffff" : "#000000" }}>
                    ${totalPrice}.00
                  </div>
                  <div style={{ fontSize: "0.85rem", color: theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", marginTop: 4 }}>
                    Free shipping included
                  </div>
                </div>
              </div>

              {/* Right side — Checkout form */}
              <div style={{ padding: "40px 32px" }} className="checkout-form-side">
                <AnimatePresence mode="wait">
                  {ordered ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "20px 0",
                      }}
                    >
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: "50%",
                          background: "#22c55e",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 20,
                        }}
                      >
                        <Check size={28} />
                      </div>
                      <h4 style={{ fontSize: "1.3rem", fontWeight: 700, color: theme === "dark" ? "#ffffff" : "#000000", marginBottom: 8 }}>
                        Thank You!
                      </h4>
                      <p style={{ fontSize: "0.85rem", lineHeight: 1.5, color: theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)", marginBottom: 24 }}>
                        Your order has been placed. We will contact you at <strong>{phone}</strong> to confirm shipping.
                      </p>
                      <button
                        onClick={() => {
                          setOrdered(false);
                          onClose();
                        }}
                        className="btn-primary"
                        style={{
                          padding: "10px 24px",
                          fontSize: "0.85rem",
                          background: theme === "dark" ? "#ffffff" : "#000000",
                          color: theme === "dark" ? "#000000" : "#ffffff",
                        }}
                      >
                        Continue Shopping
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleOrder}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: theme === "dark" ? "#ffffff" : "#000000", marginBottom: 4 }}>
                          Shipping Info
                        </h4>

                        {/* Quantity Selector */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }}>
                            Quantity
                          </span>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                              borderRadius: 100,
                              padding: "4px 8px",
                              gap: 12,
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => setQuantity(q => Math.max(1, q - 1))}
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: theme === "dark" ? "#fff" : "#000",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Minus size={14} />
                            </button>
                            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: theme === "dark" ? "#fff" : "#000", minWidth: 16, textAlign: "center" }}>
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQuantity(q => q + 1)}
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: theme === "dark" ? "#fff" : "#000",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Full Name input */}
                        <div>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={handleInputBlur}
                            placeholder="Your Full Name"
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              background: theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                              border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
                              borderRadius: 12,
                              color: theme === "dark" ? "#ffffff" : "#000000",
                              fontSize: "0.9rem",
                              outline: "none",
                              transition: "border-color 0.2s",
                            }}
                          />
                        </div>

                        {/* Phone input */}
                        <div>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onBlur={handleInputBlur}
                            placeholder="Phone Number"
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              background: theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                              border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
                              borderRadius: 12,
                              color: theme === "dark" ? "#ffffff" : "#000000",
                              fontSize: "0.9rem",
                              outline: "none",
                              transition: "border-color 0.2s",
                            }}
                          />
                        </div>

                        {/* Address input */}
                        <div>
                          <textarea
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            onBlur={handleInputBlur}
                            placeholder="Shipping Address"
                            rows={3}
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              background: theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                              border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
                              borderRadius: 12,
                              color: theme === "dark" ? "#ffffff" : "#000000",
                              fontSize: "0.9rem",
                              outline: "none",
                              resize: "none",
                              fontFamily: "var(--font)",
                              transition: "border-color 0.2s",
                            }}
                          />
                        </div>
                      </div>

                      {/* Order submit button */}
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={loading ? {} : { scale: 1.02 }}
                        whileTap={loading ? {} : { scale: 0.98 }}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "14px 0",
                          marginTop: 20,
                          background: theme === "dark" ? "#ffffff" : "#000000",
                          color: theme === "dark" ? "#000000" : "#ffffff",
                          borderRadius: 100,
                          border: "none",
                          fontWeight: 600,
                          fontSize: "0.95rem",
                          cursor: "pointer",
                          boxShadow: theme === "dark"
                            ? "0 10px 25px rgba(255, 255, 255, 0.1)"
                            : "0 10px 25px rgba(0, 0, 0, 0.1)",
                          opacity: loading ? 0.7 : 1,
                          gap: 10,
                          transition: "all 0.3s ease",
                        }}
                      >
                        {loading ? (
                          <>
                            <Loader2 size={16} style={{ animation: "rotate-slow 1s linear infinite" }} />
                            Processing Order...
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={16} />
                            Place Order
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          </motion.div>
        </div>
      )}

      {/* Embedded CSS rules for modal responsiveness */}
      <style>{`
        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
        }
        .checkout-product-img-wrapper {
          position: relative;
          width: 100%;
          height: 160px;
          margin: 16px 0;
        }
        .checkout-scroll-area {
          overflow-y: visible;
        }
        @media (max-width: 767px) {
          .checkout-modal-container {
            max-height: 90dvh !important;
            overflow: hidden !important;
            border-radius: 24px !important;
            width: 95vw !important;
            display: flex;
            flex-direction: column;
          }
          .checkout-scroll-area {
            overflow-y: auto !important;
            flex: 1;
          }
          .checkout-close-btn {
            position: absolute !important;
            top: 16px !important;
            right: 16px !important;
            background: ${theme === "dark" ? "rgba(0,0,0,0.5) !important" : "rgba(255,255,255,0.7) !important"};
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 100 !important;
          }
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
          .checkout-product-side {
            border-right: none !important;
            border-bottom: 1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"};
            padding: 32px 24px 16px !important;
          }
          .checkout-product-img-wrapper {
            height: 110px !important;
            margin: 8px 0 !important;
          }
          .checkout-form-side {
            padding: 20px 24px 24px !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}
