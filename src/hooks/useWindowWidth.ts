import { useEffect, useState } from "react";

const useWindowWidth = () => {
  // Lazily initialize the state so that we only touch `window` on the client.
  const [windowWidth, setWindowWidth] = useState<number>(() => {
    if (typeof window !== "undefined") {
      console.log("window.innerWidth", window.innerWidth);
      return window.innerWidth;
    }
    // Fallback value during server-side rendering
    return 0;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Capture the initial width once the component has mounted on the client
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};

export default useWindowWidth;
