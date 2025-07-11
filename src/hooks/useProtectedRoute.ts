import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PROTECTED_ROUTES, SESSION_STORAGE_KEYS } from '@/constants';
import { LOCAL_STORAGE_KEYS } from '@/api/client/config';
import { getLocalStorageItem, removeSessionStorageItem } from '@/utils';
import useAppSelector from '@/hooks/useSelector';
import useAppDispatch from '@/hooks/useDispatch';
import {  updateRefreshTokenNotVerified } from '@/store/auth/auth.slice';

export const useProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const accessToken = getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        const isProtectedRoute = PROTECTED_ROUTES.some(route => 
      pathname.startsWith(route)
    );

    if (!accessToken && isProtectedRoute) {
      // Open login modal when trying to access protected route without authentication
      removeSessionStorageItem(SESSION_STORAGE_KEYS.HAS_SHOWN_LOCK_MODAL)
      dispatch(updateRefreshTokenNotVerified({ refreshTokenNotVerified: true }))
      router.push('/');
    }
  }, [isAuthenticated, pathname, router, dispatch]);

  const isCurrentRouteProtected = () => {
    return PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  };

  return {
    isCurrentRouteProtected
  };
}; 