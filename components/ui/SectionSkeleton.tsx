"use client";

export default function SectionSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 24px",
        background: "var(--bg-primary)",
        gap: 24,
      }}
    >
      {/* Title skeleton */}
      <div
        className="skeleton-pulse"
        style={{
          width: "240px",
          height: "32px",
          borderRadius: "8px",
          background: "var(--border-glass)",
        }}
      />

      {/* Subtitle skeleton */}
      <div
        className="skeleton-pulse"
        style={{
          width: "160px",
          height: "16px",
          borderRadius: "4px",
          background: "var(--border-glass)",
          marginBottom: 32,
        }}
      />

      {/* Main feature content skeleton */}
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              padding: 24,
              borderRadius: 20,
              border: "1px solid var(--border-glass)",
              background: "var(--bg-glass)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {/* Box image/icon */}
            <div
              className="skeleton-pulse"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "var(--border-glass)",
              }}
            />
            {/* Box header */}
            <div
              className="skeleton-pulse"
              style={{
                width: "70%",
                height: "20px",
                borderRadius: "4px",
                background: "var(--border-glass)",
              }}
            />
            {/* Box text */}
            <div
              className="skeleton-pulse"
              style={{
                width: "100%",
                height: "60px",
                borderRadius: "6px",
                background: "var(--border-glass)",
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        .skeleton-pulse {
          animation: pulse 1.6s ease-in-out infinite;
        }
        @keyframes pulse {
          0% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
