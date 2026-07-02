"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickReplies = [
  "AirPods Pro 3 giá bao nhiêu?",
  "Tính năng nổi bật là gì?",
  "Thời lượng pin dùng bao lâu?",
  "Tính năng Dịch trực tiếp hoạt động thế nào?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Xin chào! Mình là trợ lý AI của Helicorp. Mình có thể giúp gì cho bạn về AirPods Pro 3?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkQuery = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkQuery();
    const media = window.matchMedia("(max-width: 768px)");
    media.addEventListener("change", checkQuery);
    return () => media.removeEventListener("change", checkQuery);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      const data = await response.json();
      
      if (data.text) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Xin lỗi bạn, kết nối của mình đang bị gián đoạn. Hãy thử lại sau nhé!" },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Không thể kết nối đến máy chủ. Hãy kiểm tra kết nối mạng của bạn!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: isMobile ? 16 : 24, right: isMobile ? 16 : 24, zIndex: 9999 }}>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          background: theme === "dark" ? "#ffffff" : "#000000",
          color: theme === "dark" ? "#000000" : "#ffffff",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: theme === "dark" 
            ? "0 10px 30px rgba(255, 255, 255, 0.15)"
            : "0 10px 30px rgba(0, 0, 0, 0.15)",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <MessageSquare size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={isMobile ? { opacity: 0, y: "100%" } : { opacity: 0, y: 30, scale: 0.95 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={isMobile ? { opacity: 0, y: "100%" } : { opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={isMobile ? {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100dvh",
              background: theme === "dark" ? "#0f0f0f" : "#ffffff",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              zIndex: 99999,
            } : {
              position: "absolute",
              bottom: 66,
              right: 0,
              width: 360,
              height: 480,
              borderRadius: 20,
              background: theme === "dark" ? "rgba(20, 20, 20, 0.85)" : "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              border: theme === "dark" 
                ? "1px solid rgba(255, 255, 255, 0.08)"
                : "1px solid rgba(0, 0, 0, 0.06)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header (Minimal Apple Style) */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: theme === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.06)"
                  : "1px solid rgba(0, 0, 0, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: 60,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.02em", color: theme === "dark" ? "#fff" : "#000" }}>
                  AI assistant
                </span>
                <span style={{ fontSize: "0.68rem", color: "#10b981", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                  Trực tuyến
                </span>
              </div>

              {isMobile && (
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: theme === "dark" ? "#ffffff" : "#000000",
                    cursor: "pointer",
                    padding: 8,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Messages Body */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "80%",
                      padding: "10px 14px",
                      borderRadius: 16,
                      fontSize: "0.82rem",
                      lineHeight: 1.45,
                      background: msg.role === "user" 
                        ? theme === "dark" ? "#ffffff" : "#000000"
                        : theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                      color: msg.role === "user"
                        ? theme === "dark" ? "#000000" : "#ffffff"
                        : theme === "dark" ? "#e0e0e0" : "#202020",
                      border: msg.role === "assistant"
                        ? theme === "dark" ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.03)"
                        : "none",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {/* Loader */}
              {isLoading && (
                <div style={{ display: "flex", gap: 4, padding: "8px 12px" }}>
                  <div className="dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--text-muted)", animation: "bounce 1s infinite alternate" }} />
                  <div className="dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--text-muted)", animation: "bounce 1s infinite alternate 0.2s" }} style-deps />
                  <div className="dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--text-muted)", animation: "bounce 1s infinite alternate 0.4s" }} style-deps />
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies list */}
            {messages.length === 1 && (
              <div
                style={{
                  padding: "0 20px 12px",
                  display: "flex",
                  gap: 8,
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  scrollbarWidth: "none",
                }}
              >
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(reply)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 100,
                      background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                      border: theme === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.05)",
                      color: theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                      fontSize: "0.72rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div
              style={{
                padding: "12px 20px",
                borderTop: theme === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.06)"
                  : "1px solid rgba(0, 0, 0, 0.05)",
                display: "flex",
                gap: 10,
                alignItems: "center",
                background: theme === "dark" ? "#0f0f0f" : "#ffffff",
                paddingBottom: isMobile ? "calc(12px + env(safe-area-inset-bottom))" : 12,
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
                placeholder="Nhập nội dung hỏi..."
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: 100,
                  border: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
                  background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                  color: theme === "dark" ? "#ffffff" : "#000000",
                  fontSize: "0.82rem",
                  outline: "none",
                }}
              />
              <button
                onClick={() => handleSendMessage(input)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: theme === "dark" ? "#ffffff" : "#000000",
                  color: theme === "dark" ? "#000000" : "#ffffff",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
