"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { ReactNode } from "react";

interface LanguageHydrationProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const LanguageHydration: React.FC<LanguageHydrationProps> = ({
  children,
  fallback = null,
}) => {
  const { isHydrated } = useLanguage();

  // Show fallback or nothing until hydrated to prevent mismatch
  if (!isHydrated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default LanguageHydration;
