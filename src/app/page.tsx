import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

// // Page-level metadata (optional). You can customise as needed.
// export const metadata: Metadata = {
//   title: "Sprite Joke-In-A-Bottle | Home",
//   description:
//     "Endless entertainment, jokes and more – pick your mood and laugh out loud! ",
// };

export default function Home() {
  return <HomePageClient />;
}
