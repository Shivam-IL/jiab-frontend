"use client";

import { useEffect } from "react";
import useAppSelector from "@/hooks/useSelector";
import { LANGUAGE_MNEMONICS } from "@/constants";

export default function FontProvider() {
  const { selectedLanguage } = useAppSelector((state) => state.language);

  useEffect(() => {
    // Remove any existing font classes from html element
    document.documentElement.classList.remove(
      "font-aktiv-grotesk",
      "font-october-compressed"
    );

    // Apply the appropriate font class based on language
    if (selectedLanguage === LANGUAGE_MNEMONICS.TAMIL) {
      document.documentElement.classList.add("font-october-compressed");

      // Preload Tamil font if not already loaded
      if (
        !document.querySelector(
          'link[href="/fonts/OctoberCompressedHairline.woff2"]'
        )
      ) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = "/fonts/OctoberCompressedHairline.woff2";
        link.as = "font";
        link.type = "font/woff2";
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
      }
    } else {
      document.documentElement.classList.add("font-aktiv-grotesk");
    }

    // Also set default on initial load if no class is present
    if (
      !document.documentElement.classList.contains("font-aktiv-grotesk") &&
      !document.documentElement.classList.contains("font-october-compressed")
    ) {
      document.documentElement.classList.add("font-aktiv-grotesk");
    }
  }, [selectedLanguage]);

  return null;
}
