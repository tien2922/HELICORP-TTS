"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const specs = [
  {
    category: "Chip & Kết nối",
    items: [
      { label: "Chip xử lý", value: "Apple H1" },
      { label: "Bluetooth", value: "5.0" },
      { label: "Phạm vi kết nối", value: "10m" },
      { label: "Ghép đôi tức thì", value: "✓ iCloud Pairing" },
    ],
  },
  {
    category: "Âm thanh",
    items: [
      { label: "Driver", value: "11mm custom" },
      { label: "Spatial Audio", value: "✓ Head Tracking" },
      { label: "Adaptive EQ", value: "✓ Dynamic" },
      { label: "Codec", value: "AAC" },
    ],
  },
  {
    category: "Pin & Sạc",
    items: [
      { label: "Pin tai nghe", value: "6 giờ" },
      { label: "Pin với hộp", value: "30 giờ" },
      { label: "Sạc nhanh", value: "5 phút = 1 giờ" },
      { label: "Cổng sạc", value: "Lightning" },
    ],
  },
  {
    category: "Thiết kế & Bảo vệ",
    items: [
      { label: "Khối lượng tai nghe", value: "4.28g" },
      { label: "Chống mồ hôi/nước", value: "IPX4" },
      { label: "Cảm biến", value: "Optical skin, Motion" },
      { label: "Màu sắc", value: "Trắng" },
    ],
  },
];

export default function SpecsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="specs"
      ref={ref}
      style={{
        background: "var(--bg-primary)",
        padding: "160px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "100% 80px",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
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
          05 • Thông số kỹ thuật
        </motion.div>

        <motion.h2
          className="display-lg gradient-text"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 16 }}
        >
          Mọi chi tiết.
        </motion.h2>

        <motion.p
          className="body-lg"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            textAlign: "center",
            maxWidth: 480,
            margin: "0 auto 80px",
          }}
        >
          Thông số kỹ thuật đầy đủ của AirPods thế hệ 3 —
          được thiết kế để hoạt động hoàn hảo trong mọi khoảnh khắc.
        </motion.p>

        {/* Specs Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
          }}
        >
          {specs.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.3 + gi * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass"
              style={{ padding: "32px", overflow: "hidden" }}
            >
              {/* Category header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 24,
                  paddingBottom: 16,
                  borderBottom: "1px solid var(--border-glass)",
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 20,
                    borderRadius: 2,
                    background: "var(--gradient-blue)",
                  }}
                />
                <h3
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#60a5fa",
                  }}
                >
                  {group.category}
                </h3>
              </div>

              {/* Spec rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {group.items.map((item, ii) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + gi * 0.1 + ii * 0.07,
                    }}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "14px 0",
                      borderBottom:
                        ii < group.items.length - 1
                          ? "1px solid rgba(255,255,255,0.04)"
                          : "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--text-secondary)",
                        fontWeight: 400,
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        textAlign: "right",
                      }}
                    >
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          style={{ textAlign: "center", marginTop: 60 }}
        >
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              marginBottom: 20,
            }}
          >
            * Thời lượng pin phụ thuộc vào cài đặt thiết bị và điều kiện sử dụng
          </p>
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Tải thông số đầy đủ (PDF)
          </motion.button>
        </motion.div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #specs [style*="grid-template-columns: repeat(2"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
