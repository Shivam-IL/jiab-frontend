import localFont from "next/font/local";
import "./globals.css";
import LayoutClient from "@/components/LayoutClient";
import { metadata } from "./metadata";
import LoadGAScript from "@/components/common/LoadGAScript";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>{String(metadata?.title ?? "")}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#11A64B" />

        {/* Font preload hints for better performance */}
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

        <LoadGAScript />
      </head>
      <body
        className={`${aktivGrotesk.variable} antialiased bg-[#F2F2F2]`}
        style={{
          fontFeatureSettings: "'kern' 1, 'liga' 1, 'calt' 1",
          fontOpticalSizing: "auto",
          textRendering: "optimizeLegibility",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <LayoutClient>{children}</LayoutClient>
        {/* {showExitPopup && (
        <BreakTheIceExitPopup
          open={showExitPopup}
          onClose={handleStayOnPage}
        />
      )} */}
      </body>
    </html>
  );
}
