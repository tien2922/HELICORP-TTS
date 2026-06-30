"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

const WEBHOOK_URL = "https://httpbin.org/post"; // Replace with real webhook

function validatePhone(phone: string) {
  return /^[0-9+\s-]{8,15}$/.test(phone);
}

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();

  const [form, setForm] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = { name: "", phone: "" };
    if (!form.name.trim()) newErrors.name = "Please enter your name";
    else if (form.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";
    if (!form.phone.trim()) newErrors.phone = "Please enter your phone number";
    else if (!validatePhone(form.phone))
      newErrors.phone = "Invalid phone number format";
    setErrors(newErrors);
    return !newErrors.name && !newErrors.phone;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          product: "AirPods Pro 3",
          source: "landing_page",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Webhook error");

      setSubmitted(true);
      toast.success("🎉 Successfully subscribed! We will contact you soon.");
      setForm({ name: "", phone: "" });
    } catch {
      toast.error("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: "var(--bg-primary)",
        padding: "160px 0 120px",
        position: "relative",
        overflow: "hidden",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: theme === "dark"
            ? "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
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
          06 • Stay Updated
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
            textAlign: "center",
            marginBottom: 20,
            transition: "color 0.3s ease",
          }}
        >
          Buy AirPods Pro 3
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0, 0, 0, 0.6)",
            textAlign: "center",
            maxWidth: 580,
            margin: "0 auto 60px",
            transition: "color 0.3s ease",
          }}
        >
          Now with the world’s best in‑ear Active Noise Cancellation, all‑new heart rate sensing, and up to 8 hours of battery life.
        </motion.p>

        {/* Form Card (Glassmorphism layout) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: 520,
            margin: "0 auto",
            padding: "48px",
            background: theme === "dark" ? "rgba(255, 255, 255, 0.02)" : "rgba(245, 245, 247, 0.65)",
            border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(0, 0, 0, 0.04)",
            borderRadius: 24,
            boxShadow: theme === "dark"
              ? "0 30px 60px rgba(0, 0, 0, 0.4)"
              : "0 30px 60px rgba(0, 0, 0, 0.05)",
            transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ textAlign: "center", padding: "20px 0" }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle
                    size={56}
                    style={{ color: "#3b82f6", margin: "0 auto 20px" }}
                  />
                </motion.div>
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: theme === "dark" ? "#ffffff" : "#000000",
                    marginBottom: 10,
                  }}
                >
                  Thank you! 🎉
                </h3>
                <p style={{ color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)", fontSize: "0.95rem" }}>
                  We've added your phone number. Look forward to getting the latest news about AirPods Pro 3.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: 24,
                    background: "none",
                    border: theme === "dark" ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.1)",
                    color: theme === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
                    padding: "10px 24px",
                    borderRadius: 100,
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    fontFamily: "var(--font)",
                    transition: "all 0.25s",
                  }}
                >
                  Subscribe another number
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 24 }}
              >
                {/* Name field */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                      marginBottom: 8,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={form.name || ""}
                    required
                    onChange={(e) => {
                      setForm((f) => ({ ...f, name: e.target.value }));
                      if (errors.name)
                        setErrors((err) => ({ ...err, name: "" }));
                    }}
                    placeholder="Enter your name"
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      background: theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                      border: errors.name
                        ? "1px solid rgba(239,68,68,0.5)"
                        : (theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)"),
                      borderRadius: 16,
                      color: theme === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.95rem",
                      outline: "none",
                      fontFamily: "var(--font)",
                      transition: "border-color 0.25s ease, background-color 0.25s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
                      e.target.style.backgroundColor = theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.name
                        ? "rgba(239,68,68,0.5)"
                        : (theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)");
                      e.target.style.backgroundColor = theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)";
                    }}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                          color: "#ef4444",
                          fontSize: "0.78rem",
                          marginTop: 6,
                        }}
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Phone field */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                      marginBottom: 8,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={form.phone || ""}
                    required
                    onChange={(e) => {
                      setForm((f) => ({ ...f, phone: e.target.value }));
                      if (errors.phone)
                        setErrors((err) => ({ ...err, phone: "" }));
                    }}
                    placeholder="Enter your phone number"
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      background: theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                      border: errors.phone
                        ? "1px solid rgba(239,68,68,0.5)"
                        : (theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)"),
                      borderRadius: 16,
                      color: theme === "dark" ? "#ffffff" : "#000000",
                      fontSize: "0.95rem",
                      outline: "none",
                      fontFamily: "var(--font)",
                      transition: "border-color 0.25s ease, background-color 0.25s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
                      e.target.style.backgroundColor = theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.phone
                        ? "rgba(239,68,68,0.5)"
                        : (theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)");
                      e.target.style.backgroundColor = theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)";
                    }}
                  />
                  <AnimatePresence>
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                          color: "#ef4444",
                          fontSize: "0.78rem",
                          marginTop: 6,
                        }}
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Privacy note */}
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
                    lineHeight: 1.5,
                  }}
                >
                  By subscribing, you agree to receive promotional updates from us. You may unsubscribe at any time.
                </p>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={loading ? {} : { scale: 1.02 }}
                  whileTap={loading ? {} : { scale: 0.98 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "14px 28px",
                    background: theme === "dark" ? "#ffffff" : "#000000",
                    color: theme === "dark" ? "#000000" : "#ffffff",
                    borderRadius: 100,
                    border: "none",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    fontFamily: "var(--font)",
                    boxShadow: theme === "dark"
                      ? "0 10px 25px rgba(255, 255, 255, 0.1)"
                      : "0 10px 25px rgba(0, 0, 0, 0.1)",
                    opacity: loading ? 0.7 : 1,
                    gap: 10,
                    transition: "background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease",
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} style={{ animation: "rotate-slow 1s linear infinite" }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Subscribe Now
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          style={{ textAlign: "center", marginTop: 40 }}
        >
          <p style={{ fontSize: "0.8rem", color: theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>
            ✓ Join over{" "}
            <strong style={{ color: theme === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)" }}>12,400+</strong>{" "}
            subscribers • No spam • Unsubscribe anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
