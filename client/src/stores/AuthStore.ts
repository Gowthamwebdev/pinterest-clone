import { create } from 'zustand';
import Cookies from 'js-cookie';
import { authState } from '@type/authTypes';

export const useAuthStore = create<authState>((set) => ({
  auth: {
    isAuthenticated: false,
    accessToken: undefined,
  },

  setAuth: (partialAuth) => {
    if (partialAuth.accessToken) {
      Cookies.set('token', partialAuth.accessToken, { expires: 1 });
    }
    set((state) => ({ auth: { ...state.auth, ...partialAuth } }));
  },

  logout: () => {
    Cookies.remove('token');
    set({
      auth: {
        isAuthenticated: false,
        accessToken: undefined,
      },
    });
  },

  resetAuth: () =>
    set({
      auth: {
        isAuthenticated: false,
        accessToken: undefined,
      },
    }),
}));
