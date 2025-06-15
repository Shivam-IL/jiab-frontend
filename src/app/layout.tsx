import localFont from "next/font/local";
import "./globals.css";
import LayoutClient from "@/components/LayoutClient";
import { metadata } from "./metadata";
import LoadGAScript from "@/components/common/LoadGAScript";

export const aktivGrotesk = localFont({
  src: [
    {
      path: "./fonts/AktivGrotesk-Hairline.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/AktivGrotesk-Thin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/AktivGrotesk-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/AktivGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/AktivGrotesk-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/AktivGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/AktivGrotesk-XBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/AktivGrotesk-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/AktivGrotesk-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/AktivGrotesk-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-aktiv-grotesk",
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
        <LoadGAScript />
      </head>
      <body
        className={`${aktivGrotesk.variable} antialiased bg-[#F2F2F2]`}
        scroll-behavior="smooth"
      >
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
