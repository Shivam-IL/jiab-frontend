"use client";

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryClientAndReduxWrapper from "@/components/QueryClientAndReduxWrapper";
import Navbar from "@/components/common/Navbar/Navbar";
import Footer from "@/components/common/Footer/Footer";

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

// Metadata configuration for the application
// Title: Main title for the website that appears in browser tabs and search results
// Description: SEO description explaining the website's purpose and features
// Icons: Favicon configuration for browser tabs and bookmarks
/*export const metadata: Metadata = {
  title: 'Sprite Joke-In-A-Bottle | Scan Karo, Joke Suno, Thand Rakho',
  description: "Listen to your favorite comedians as per your mood with Sprite's refreshing humor hub! Submit your own joke and stand a chance to win fabulous prizes. Enjoy a laughter bonanza.",
  icons: {
    icon: '/favicon.ico'
  }
}*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${aktivGrotesk.variable} antialiased`}>
        <QueryClientAndReduxWrapper>
          <Navbar />
          {children}
          <Footer />
        </QueryClientAndReduxWrapper>
      </body>
    </html>
  );
}
