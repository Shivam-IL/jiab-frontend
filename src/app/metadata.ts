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
  themeColor: "#11A64B",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  alternates: {
    canonical: "https://sprite-joke-in-a-bottle.coke2home.com/",
  },
};