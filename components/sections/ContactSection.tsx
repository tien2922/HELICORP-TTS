"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Send, CheckCircle, Loader2 } from "lucide-react";

const WEBHOOK_URL = "https://httpbin.org/post"; // Replace with real webhook

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = { name: "", email: "" };
    if (!form.name.trim()) newErrors.name = "Vui lòng nhập tên của bạn";
    else if (form.name.trim().length < 2)
      newErrors.name = "Tên phải có ít nhất 2 ký tự";
    if (!form.email.trim()) newErrors.email = "Vui lòng nhập email";
    else if (!validateEmail(form.email))
      newErrors.email = "Email không hợp lệ";
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Track event
    console.log("[Analytics] form_submit", { form });

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          product: "AirPods 3",
          source: "landing_page",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Webhook error");

      setSubmitted(true);
      toast.success("🎉 Đăng ký thành công! Chúng tôi sẽ liên hệ sớm.");
      setForm({ name: "", email: "" });
    } catch {
      toast.error("❌ Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: "var(--bg-secondary)",
        padding: "160px 0 120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          style={{
            textAlign: "center",
            marginBottom: 16,
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            fontWeight: 600,
          }}
        >
          06 • Đăng ký nhận tin
        </motion.div>

        <motion.h2
          className="display-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 16 }}
        >
          <span className="gradient-text">Đừng bỏ lỡ</span>
          <br />
          <span className="gradient-text-blue">bất kỳ điều gì.</span>
        </motion.h2>

        <motion.p
          className="body-lg"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            textAlign: "center",
            maxWidth: 480,
            margin: "0 auto 60px",
          }}
        >
          Đăng ký để nhận thông báo về giá ưu đãi, phụ kiện mới và các tips
          sử dụng AirPods tốt nhất.
        </motion.p>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong"
          style={{
            maxWidth: 520,
            margin: "0 auto",
            padding: "48px 48px",
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
                    color: "var(--text-primary)",
                    marginBottom: 10,
                  }}
                >
                  Cảm ơn bạn! 🎉
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                  Chúng tôi sẽ gửi thông tin mới nhất về AirPods 3 đến email của bạn.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: 24,
                    background: "none",
                    border: "1px solid var(--border-glass)",
                    color: "var(--text-secondary)",
                    padding: "8px 20px",
                    borderRadius: 100,
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontFamily: "var(--font)",
                  }}
                >
                  Đăng ký thêm email khác
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                {/* Name field */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginBottom: 8,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, name: e.target.value }));
                      if (errors.name)
                        setErrors((err) => ({ ...err, name: "" }));
                    }}
                    placeholder="Nguyễn Văn A"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: errors.name
                        ? "1px solid rgba(239,68,68,0.5)"
                        : "1px solid var(--border-glass)",
                      borderRadius: 12,
                      color: "var(--text-primary)",
                      fontSize: "0.95rem",
                      outline: "none",
                      fontFamily: "var(--font)",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(59,130,246,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.name
                        ? "rgba(239,68,68,0.5)"
                        : "var(--border-glass)")
                    }
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

                {/* Email field */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginBottom: 8,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Địa chỉ Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, email: e.target.value }));
                      if (errors.email)
                        setErrors((err) => ({ ...err, email: "" }));
                    }}
                    placeholder="example@email.com"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: errors.email
                        ? "1px solid rgba(239,68,68,0.5)"
                        : "1px solid var(--border-glass)",
                      borderRadius: 12,
                      color: "var(--text-primary)",
                      fontSize: "0.95rem",
                      outline: "none",
                      fontFamily: "var(--font)",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(59,130,246,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.email
                        ? "rgba(239,68,68,0.5)"
                        : "var(--border-glass)")
                    }
                  />
                  <AnimatePresence>
                    {errors.email && (
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
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Privacy note */}
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.5,
                  }}
                >
                  Bằng cách đăng ký, bạn đồng ý nhận email marketing từ chúng tôi.
                  Bạn có thể hủy đăng ký bất cứ lúc nào.
                </p>

                {/* Submit */}
                <motion.button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                  whileHover={loading ? {} : { scale: 1.02 }}
                  whileTap={loading ? {} : { scale: 0.98 }}
                  style={{
                    justifyContent: "center",
                    gap: 10,
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} style={{ animation: "rotate-slow 1s linear infinite" }} />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Đăng ký nhận tin
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
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{ textAlign: "center", marginTop: 40 }}
        >
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            ✓ Đã có{" "}
            <strong style={{ color: "var(--text-secondary)" }}>12,400+</strong>{" "}
            người đăng ký • Không spam • Hủy bất cứ lúc nào
          </p>
        </motion.div>
      </div>
    </section>
  );
}
