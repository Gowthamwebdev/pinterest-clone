import { create } from 'zustand';
import Cookies from 'js-cookie';
import { authState } from '../types/authTypes';

export const useAuthStore = create<authState>((set) => ({
  isAuthenticated: false,
  accessToken: '',

  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setAccessToken: (accessToken: string) => set({ accessToken }),

  logout: () => {
    Cookies.remove('token');
    set({
      isAuthenticated: false,
      accessToken: '',
    });
  },

  resetAuth: () =>
    set({
      isAuthenticated: false,
      accessToken: '',
    }),
}));
