import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAuthStore } from '../stores/AuthStore';

export const useAuth = () => {
  const { setAuth } = useAuthStore();
  const token = Cookies.get('token');

  useEffect(() => {
    if (token) {
      setAuth({
        accessToken: token,
        isAuthenticated: true,
      });
    }
  }, [setAuth, token]);
  return token;
};
