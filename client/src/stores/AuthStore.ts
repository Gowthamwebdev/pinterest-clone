import { create } from 'zustand';
import Cookies from 'js-cookie';
import { authState } from '../types/authTypes';

export const useAuthStore = create<authState>((set) => ({
  auth: {
    isAuthenticated: false,
    accessToken: '',
  },

  setAuth: (partialAuth) => {
    set((state) => ({ auth: { ...state.auth, ...partialAuth } }));
  },

  logout: () => {
    Cookies.remove('token');
    set({
      auth: {
        isAuthenticated: false,
        accessToken: '',
      },
    });
  },

  resetAuth: () =>
    set({
      auth: {
        isAuthenticated: false,
        accessToken: '',
      },
    }),
}));
