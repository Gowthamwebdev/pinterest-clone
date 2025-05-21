import { create } from 'zustand';
import { userState } from '@type/userTypes';

export const useUserStore = create<userState>((set) => ({
  user: {
    userId: '',
    name: '',
    email: '',
    profile_img: '',
    password: '',
    dateOfBirth: '',
  },

  setUser: (partialUser) =>
    set((state) => ({ user: { ...state.user, ...partialUser } })),

  resetUser: () =>
    set({
      user: {
        userId: '',
        name: '',
        email: '',
        profile_img: '',
        password: '',
        dateOfBirth: '',
      },
    }),
}));
