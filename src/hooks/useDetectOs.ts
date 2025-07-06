import { useEffect, useState } from "react";

export function useDetectOs() {
  const [os, setOS] = useState<"iPhone" | "Mac" | "Other">("Other");

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/iPhone/i.test(userAgent)) {
      setOS("iPhone");
    } else if (/Macintosh/i.test(userAgent)) {
      setOS("Mac");
    } 
  }, []);

  return os;
}
