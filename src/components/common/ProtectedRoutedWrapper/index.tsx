import { ReactNode } from "react";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

const ProtectedRoutedWrapper = ({ children }: { children: ReactNode }) => {
  // The hook handles all the protected route logic
  useProtectedRoute();

  return <>{children}</>;
};

export default ProtectedRoutedWrapper;
