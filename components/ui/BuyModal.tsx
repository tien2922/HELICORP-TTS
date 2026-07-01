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
            padding: 24,
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
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 720,
              background: theme === "dark" ? "rgba(20, 20, 20, 0.85)" : "rgba(255, 255, 255, 0.9)",
              border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.06)",
              borderRadius: 28,
              boxShadow: theme === "dark"
                ? "0 50px 100px rgba(0,0,0,0.8)"
                : "0 50px 100px rgba(0,0,0,0.15)",
              display: "grid",
              gridTemplateColumns: "1fr 1.1fr",
              overflow: "hidden",
              zIndex: 1,
              fontFamily: "var(--font)",
            }}
          >
            {/* Left side — Product details */}
            <div
              style={{
                background: theme === "dark" ? "rgba(255, 255, 255, 0.01)" : "rgba(0, 0, 0, 0.01)",
                borderRight: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(0, 0, 0, 0.04)",
                padding: 40,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
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
              <div style={{ position: "relative", width: "100%", height: 200, margin: "24px 0" }}>
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
            <div style={{ padding: 40, position: "relative" }}>
              {/* Close button */}
              <button
                onClick={onClose}
                style={{
                  position: "absolute",
                  top: 24,
                  right: 24,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = theme === "dark" ? "#fff" : "#000")}
                onMouseLeave={(e) => (e.currentTarget.style.color = theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)")}
              >
                <X size={20} />
              </button>

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
                          placeholder="Your Full Name"
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            background: theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                            border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
                            borderRadius: 12,
                            color: theme === "dark" ? "#fff" : "#000",
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
                          placeholder="Phone Number"
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            background: theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                            border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
                            borderRadius: 12,
                            color: theme === "dark" ? "#fff" : "#000",
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
                          placeholder="Shipping Address"
                          rows={3}
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            background: theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                            border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
                            borderRadius: 12,
                            color: theme === "dark" ? "#fff" : "#000",
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
