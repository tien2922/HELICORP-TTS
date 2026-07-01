import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://helicorp-tts.vercel.app"),
  title: {
    default: "AirPods Pro 3 | Premium Wireless Audio Experience",
    template: "%s | AirPods Pro 3",
  },
  description:
    "AirPods Pro 3 with the world's best in-ear Active Noise Cancellation, all-new heart rate sensing, and up to 8 hours of battery life.",
  keywords: [
    "AirPods Pro 3",
    "wireless earbuds",
    "Active Noise Cancellation",
    "Apple",
    "heart rate sensing",
    "bluetooth earphones",
  ],
  authors: [{ name: "Chi Tien" }],
  creator: "Chi Tien",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://helicorp-tts.vercel.app",
    title: "AirPods Pro 3 | Sound. Redefined.",
    description:
      "Experience the world's best Active Noise Cancellation, heart rate sensing, and up to 8 hours of battery life.",
    siteName: "AirPods Pro 3",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "AirPods Pro 3 - Sound Redefined",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AirPods Pro 3 | Sound. Redefined.",
    description: "Experience Active Noise Cancellation, heart rate sensing, and 8 hours of battery life.",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Apple AirPods Pro 3",
  description:
    "AirPods Pro 3 with Active Noise Cancellation, heart rate sensing, and MagSafe Charging Case",
  brand: { "@type": "Brand", name: "Apple" },
  offers: {
    "@type": "Offer",
    price: "249",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "2847",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Preload hero poster for faster LCP */}
        <link
          rel="preload"
          as="image"
          href="/airpods-hero.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <LenisProvider>
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#111111",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "16px",
                  fontSize: "14px",
                },
                success: {
                  iconTheme: { primary: "#3b82f6", secondary: "#ffffff" },
                },
                error: {
                  iconTheme: { primary: "#ef4444", secondary: "#ffffff" },
                },
              }}
            />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
