import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://airpods3.vercel.app"),
  title: {
    default: "AirPods 3 | Trải nghiệm âm thanh không dây đỉnh cao",
    template: "%s | AirPods 3",
  },
  description:
    "AirPods thế hệ 3 với Spatial Audio, chip H1, thiết kế MagSafe, pin 30 giờ và khả năng chống nước IPX4. Âm thanh. Tái định nghĩa.",
  keywords: [
    "AirPods 3",
    "tai nghe không dây",
    "Spatial Audio",
    "Apple",
    "MagSafe",
    "tai nghe bluetooth",
  ],
  authors: [{ name: "Apple Inc." }],
  creator: "Apple Inc.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://airpods3.vercel.app",
    title: "AirPods 3 | Âm thanh. Tái định nghĩa.",
    description:
      "Trải nghiệm Spatial Audio, pin 30 giờ và thiết kế MagSafe với AirPods thế hệ 3.",
    siteName: "AirPods 3",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AirPods 3 - Âm thanh tái định nghĩa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AirPods 3 | Âm thanh. Tái định nghĩa.",
    description: "Trải nghiệm Spatial Audio, pin 30 giờ và thiết kế MagSafe.",
    images: ["/og-image.png"],
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
  name: "Apple AirPods (3rd generation)",
  description:
    "AirPods thế hệ 3 với Spatial Audio, chip H1, MagSafe Charging Case",
  brand: { "@type": "Brand", name: "Apple" },
  offers: {
    "@type": "Offer",
    price: "4990000",
    priceCurrency: "VND",
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
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
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
