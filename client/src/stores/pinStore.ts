import { create } from 'zustand';
import { postState } from '../types/postTypes';

export const usePinStore = create<postState>((set) => ({
  id: '',
  image_url: '',
  title: '',
  description: '',
  tags: '',
  board: '',

  setImgUrl: (image_url) => set({ image_url }),
  setTitle: (title) => set({ title }),
  setDescription: (description: string) => set({ description }),
  setTags: (tags) => set({ tags }),
  setBoard: (board) => set({ board }),
}));
