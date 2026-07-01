"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
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
  const { theme } = useTheme();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 56,
          height: 56,
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
            : "0 10px 30px rgba(0, 0, 0, 0.2)",
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
              <X size={24} />
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
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              bottom: 72,
              right: 0,
              width: "clamp(320px, 90vw, 380px)",
              height: "min(500px, 80vh)",
              borderRadius: 24,
              background: theme === "dark" ? "rgba(20, 20, 20, 0.85)" : "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: theme === "dark" 
                ? "1px solid rgba(255, 255, 255, 0.12)"
                : "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: theme === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.08)"
                  : "1px solid rgba(0, 0, 0, 0.06)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "#3b82f6",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                }}
              >
                <Bot size={20} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: "0.95rem", color: theme === "dark" ? "#fff" : "#000" }}>
                    Helicorp AI Assistant
                  </span>
                  <Sparkles size={12} color="#3b82f6" style={{ fill: "#3b82f6" }} />
                </div>
                <span style={{ fontSize: "0.72rem", color: "#3b82f6", fontWeight: 600 }}>
                  Online • Trực tuyến
                </span>
              </div>
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
                    gap: 8,
                    alignItems: "flex-end",
                  }}
                >
                  {msg.role === "assistant" && (
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "rgba(59, 130, 246, 0.1)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#3b82f6",
                        flexShrink: 0,
                      }}
                    >
                      <Bot size={16} />
                    </div>
                  )}
                  <div
                    style={{
                      maxWidth: "75%",
                      padding: "10px 16px",
                      borderRadius: 18,
                      fontSize: "0.85rem",
                      lineHeight: 1.45,
                      background: msg.role === "user" 
                        ? "#3b82f6" 
                        : theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                      color: msg.role === "user"
                        ? "#ffffff"
                        : theme === "dark" ? "#ffffff" : "#000000",
                      border: msg.role === "assistant" 
                        ? theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.05)"
                        : "none",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {/* Loader */}
              {isLoading && (
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "rgba(59, 130, 246, 0.1)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#3b82f6",
                    }}
                  >
                    <Bot size={16} />
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <div className="dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", animation: "bounce 1s infinite alternate" }} />
                    <div className="dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", animation: "bounce 1s infinite alternate 0.2s" }} style-deps />
                    <div className="dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", animation: "bounce 1s infinite alternate 0.4s" }} style-deps />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies list (Scrollable horizontally) */}
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
                      padding: "6px 14px",
                      borderRadius: 100,
                      background: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                      border: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
                      color: theme === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
                      fontSize: "0.75rem",
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
                padding: "16px 20px",
                borderTop: theme === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.08)"
                  : "1px solid rgba(0, 0, 0, 0.06)",
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
                placeholder="Hỏi trợ lý AI..."
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: 100,
                  border: theme === "dark" ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.1)",
                  background: theme === "dark" ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)",
                  color: theme === "dark" ? "#ffffff" : "#000000",
                  fontSize: "0.85rem",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
              />
              <button
                onClick={() => handleSendMessage(input)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#3b82f6",
                  color: "#ffffff",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 4px 10px rgba(59,130,246,0.3)",
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
