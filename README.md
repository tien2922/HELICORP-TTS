# AirPods Pro 3 - Premium Landing Page

An interactive, high-end product landing page for the next-generation **AirPods Pro 3**. Designed and developed with a focus on premium aesthetics, smooth scroll-driven storytelling (scrollytelling), responsive performance, and modern UI/UX design patterns.

**Author**: Chi Tien (IT Web Developer Intern - Healthy Living Corporation)  
**Live Site**: [helicorp-tts.vercel.app](https://helicorp-tts.vercel.app)

---

## 🚀 Key Features & Highlights

### 1. Modern UI/UX Design & Aesthetic Excellence
* **Theme Toggle (Monochrome Switch)**: Smooth sliding switch toggle allowing users to swap between Light and Dark mode seamlessly. Font and background colors adapt dynamically.
* **Apple-Inspired Typography & Spacing**: Utilizing sleek sans-serif typography, tailored HSL color systems, and balanced whitespace.
* **Vignette Background Video**: Hero section displays a high-definition local loop video overlayed with a subtle 20% opacity radial vignette for focus.

### 2. Interactive Scrollytelling & Micro-Animations
* **02 • Design Section (3D Parallax Card)**: Scroll-interactive glassmorphism card hosting the AirPods image. Glows and tilts dynamically as the user scrolls, highlighting distinct components (Contour, Materials, Design) via interactive glowing hotspots.
* **03 • Personalized Listening Section**: Displays 3 high-res feature cards showcasing microphones, voice isolation, and Adaptive EQ. Icons replaced by beautiful cropped assets, complete with a clean bolded description layout and a centralized "Discover" CTA.
* **04 • Experience Section (Left-aligned Tab Switcher)**: Features a static tab bar allowing smooth switching between *Live Translation*, *Controls*, and *Connectivity*. When toggled, the left text content fades in, and the right rounded image shifts with a vertical parallax scroll transform.

### 3. Performance & SEO Optimizations
* **Next.js Server & Client Optimization**: Structured layouts, dynamic providers, and isolated client components to prevent Hydration mismatches.
* **Next.js Image (`next/image`) & Local Media**: Local video elements (`hero_sec.mp4`) replace heavy external YouTube players, reducing initial load latency.
* **Responsive Layout**: Designed with a mobile-first philosophy, utilizing grid structures that stack cleanly on tablet and mobile viewports.
* **SEO Metadata**: Outfitted with robust Search Engine Optimization headers (Titles, descriptions, viewport tags).

---

## 🛠️ Technology Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
* **Animations**: [Framer Motion](https://www.framer.com/motion/) (Layout transformations, spring physics, scroll events, layout animations)
* **Styling**: Vanilla CSS Modules & CSS custom variables (Tailwind CSS initialized)
* **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/) scroll smoothing wrapper

---

## 📦 Getting Started

### Prerequisites
* Node.js v18.0.0 or higher
* npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tien2922/HELICORP-TTS.git
   cd HELICORP-TTS
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## ☁️ Deployment on Vercel

This repository is optimized for one-click deployment on [Vercel](https://vercel.com).
* **Framework Preset**: Select `Next.js` (Ensure it is not set to `Other`).
* **Root Directory**: `./`
* **Build Command**: `next build`
* **Output Directory**: `.next`
