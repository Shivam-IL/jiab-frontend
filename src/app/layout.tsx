import localFont from "next/font/local";
import "./globals.css";
import LayoutClient from "@/components/LayoutClient";
import LoadGAScript from "@/components/common/LoadGAScript";
export const dynamic = "force-dynamic";
import { Metadata } from "next";

// Application-wide metadata
export const metadata: Metadata = {
  title: "Sprite Joke-In-A-Bottle | Scan Karo, Joke Suno, Thand Rakho",
  description:
    "Listen to your favorite comedians as per your mood with Sprite's refreshing humor hub! Submit your own joke and stand a chance to win fabulous prizes. Enjoy a laughter bonanza.",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://sprite-joke-in-a-bottle.coke2home.com/",
  },
};

// Viewport configuration
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#11A64B",
};

export const aktivGrotesk = localFont({
  src: [
    {
      path: "./fonts/AktivGroteskCorp-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/AktivGroteskCorp-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/AktivGroteskCorp-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/AktivGroteskCorp-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/AktivGroteskCorp-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/AktivGroteskCorp-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/AktivGroteskCorp-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/AktivGroteskCorp-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/AktivGroteskCorp-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/AktivGroteskCorp-Italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/AktivGroteskCorp-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/AktivGroteskCorp-LightItalic.woff",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/AktivGroteskCorp-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/AktivGroteskCorp-MediumItalic.woff",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/AktivGroteskCorp-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/AktivGroteskCorp-BoldItalic.woff",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-aktiv-grotesk",
  display: "swap",
  preload: true,
  fallback: [
    // Mac fallbacks
    "-apple-system",
    "BlinkMacSystemFont",
    // Windows fallbacks
    "Segoe UI",
    // Generic fallbacks
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
    // Emoji fallbacks
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
  ],
});

export const octoberCompressed = localFont({
  src: [
    {
      path: "./fonts/OctoberCompressedHairline.woff2",
      weight: "100",
      style: "regular",
    },
  ],
  variable: "--font-october-compressed",
  display: "swap",
  preload: false,
  fallback: [
    // Mac fallbacks
    "-apple-system",
    "BlinkMacSystemFont",
    // Windows fallbacks
    "Segoe UI",
    // Generic fallbacks
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
    // Emoji fallbacks
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/AktivGroteskCorp-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/AktivGroteskCorp-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/AktivGroteskCorp-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/videos/coin-anim.json"
          as="fetch"
          type="application/json"
          crossOrigin="anonymous"
        />

        <LoadGAScript />
      </head>
      <body
        className={`${aktivGrotesk.variable} ${octoberCompressed.variable} antialiased bg-[#F2F2F2]`}
        style={{
          fontFeatureSettings: "'kern' 1, 'liga' 1, 'calt' 1",
          fontOpticalSizing: "auto",
          textRendering: "optimizeLegibility",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          touchAction: "manipulation",
        }}
      >
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
