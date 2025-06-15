import { LOCAL_STORAGE_KEYS } from "@/api/client/config";
import { PROTECTED_ROUTES } from "@/constants";
import useAppSelector from "@/hooks/useSelector";
import { getLocalStorageItem } from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ProtectedRoutedWrapper = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const accessToken = getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    let protectedRoutes = false;
    for (const route of PROTECTED_ROUTES) {
      if (pathname.startsWith(route)) {
        protectedRoutes = true;
        break;
      }
    }

    if (!accessToken && protectedRoutes) {
      router.push("/");
    }
  }, [isAuthenticated, pathname, router]);

  return <>{children}</>;
};

export default ProtectedRoutedWrapper;
