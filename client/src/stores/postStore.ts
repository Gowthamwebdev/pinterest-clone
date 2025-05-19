import { create } from 'zustand';
import { postState } from '../types/postTypes';

export const usePostStore = create<postState>((set) => ({
  post: {
    id: '',
    image_url: '',
    title: '',
    description: '',
    tags: '',
    board: '',
  },

  setPost: (partialPost) =>
    set((state) => ({ post: { ...state.post, ...partialPost } })),

  reset: () =>
    set({
      post: {
        id: '',
        image_url: '',
        title: '',
        description: '',
        tags: '',
        board: '',
      },
    }),
}));
