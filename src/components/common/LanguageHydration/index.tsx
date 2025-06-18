"use client";

import { ReactNode } from "react";

interface LanguageHydrationProps {
  children: ReactNode;
  fallback?: ReactNode;
}

// Redux Persist will handle hydration automatically
// This component is no longer needed but kept for backward compatibility
const LanguageHydration: React.FC<LanguageHydrationProps> = ({ children }) => {
  return <>{children}</>;
};

export default LanguageHydration;
