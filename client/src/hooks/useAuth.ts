import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAuthStore } from '@stores/AuthStore';

export const useAuth = () => {
  const { auth, setAuth } = useAuthStore();
  const token = Cookies.get('token');

  useEffect(() => {
    if (token && !auth.isAuthenticated) {
      setAuth({
        accessToken: token,
        isAuthenticated: true,
      });
    }
  }, [token, auth.isAuthenticated, setAuth]);

  return auth;
};
