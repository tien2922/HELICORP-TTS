"use client";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Terminal, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LogMessage {
  id: string;
  time: string;
  type: "click" | "scroll" | "system";
  message: string;
  details?: any;
}

interface TrackerContextType {
  trackEvent: (eventName: string, details?: any) => void;
}

const TrackerContext = createContext<TrackerContextType | undefined>(undefined);

export function TrackerProvider({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [showConsole, setShowConsole] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const pathname = usePathname();

  // Tracked milestones to prevent duplicate scroll sending
  const scrollMilestones = useRef<{ [key: number]: boolean }>({
    25: false,
    50: false,
    75: false,
    100: false,
  });

  const addLog = (type: LogMessage["type"], message: string, details?: any) => {
    const newLog: LogMessage = {
      id: Math.random().toString(36).substring(2, 9),
      time: new Date().toLocaleTimeString(),
      type,
      message,
      details,
    };
    setLogs((prev) => [newLog, ...prev].slice(0, 30)); // Keep last 30 logs
  };

  const trackEvent = async (eventName: string, details: any = {}) => {
    const payload = {
      event: eventName,
      path: pathname || "/",
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
      timestamp: new Date().toISOString(),
      details,
    };

    addLog(
      eventName.toLowerCase().includes("scroll") ? "scroll" : "click",
      `${eventName} - Screen: ${payload.screenSize}`,
      details
    );

    // Call API Route
    try {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.warn("Tracker fetch failed", e);
    }
  };

  // Track scroll depth milestones
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPercent = Math.min(100, Math.round((scrollTop / docHeight) * 100));

      const milestones = [25, 50, 75, 100];
      milestones.forEach((m) => {
        if (scrollPercent >= m && !scrollMilestones.current[m]) {
          scrollMilestones.current[m] = true;
          trackEvent(`USER_SCROLLED_${m}%`, { scrollPercent });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Add system log on start
    addLog("system", "Bắt đầu giám sát hành vi người dùng (Helicorp Tracker)...");

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Track click on data attributes automatically
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Capture element tag, text content, class names
      const text = target.textContent?.trim().slice(0, 30) || "";
      const tagName = target.tagName;

      // Filter click tracking to interactive elements only to avoid spamming
      if (
        tagName === "BUTTON" || 
        tagName === "A" || 
        target.closest("button") || 
        target.closest("a") ||
        target.onclick
      ) {
        trackEvent(`USER_CLICKED_${tagName}`, {
          text,
          class: target.className || undefined,
        });
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <TrackerContext.Provider value={{ trackEvent }}>
      {children}

      {/* Floating Telemetry Control Icon Toggle */}
      {!showConsole && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setShowConsole(true)}
          style={{
            position: "fixed",
            bottom: 80,
            left: 20,
            zIndex: 9998,
            background: "rgba(0,0,0,0.85)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "50%",
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#10b981", // Hacker green
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          }}
          title="Mở bảng theo dõi hành vi"
        >
          <Terminal size={18} />
        </motion.button>
      )}

      {/* Telemetry Logger Panel */}
      <AnimatePresence>
        {showConsole && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            style={{
              position: "fixed",
              bottom: 80,
              left: 20,
              width: "320px",
              maxHeight: isMinimized ? "44px" : "280px",
              background: "rgba(10, 10, 10, 0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "16px",
              color: "#34d399",
              fontFamily: "monospace",
              fontSize: "11px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
              zIndex: 9998,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "10px 14px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(255,255,255,0.02)",
                userSelect: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: "bold" }}>
                <Terminal size={12} />
                <span>Behavior Telemetry</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  style={{ background: "none", border: "none", color: "#34d399", cursor: "pointer", display: "flex", padding: 2 }}
                >
                  {isMinimized ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                <button
                  onClick={() => setShowConsole(false)}
                  style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", display: "flex", padding: 2 }}
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Logs list */}
            {!isMinimized && (
              <div
                style={{
                  padding: "10px 14px",
                  overflowY: "auto",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {logs.length === 0 ? (
                  <div style={{ color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "20px 0" }}>
                    No events captured yet.
                  </div>
                ) : (
                  logs.map((log) => (
                    <div key={log.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", paddingBottom: 4 }}>
                      <span style={{ color: "rgba(255,255,255,0.4)" }}>[{log.time}] </span>
                      <span
                        style={{
                          color: log.type === "click" ? "#3b82f6" : log.type === "scroll" ? "#f59e0b" : "#10b981",
                          fontWeight: "bold",
                        }}
                      >
                        {log.type.toUpperCase()}:{" "}
                      </span>
                      <span style={{ color: "#e2e8f0" }}>{log.message}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error("useTracker must be used within a TrackerProvider");
  }
  return context;
}
