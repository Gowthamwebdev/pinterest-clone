import { create } from 'zustand';
import { postState } from '../types/postTypes';

export const usePinStore = create<postState>((set) => ({
  id: '',
  image_url: '',
  title: '',
  desc: '',
  tags: '',
  board: '',

  setImgUrl: (image_url) => set({ image_url }),
  setTitle: (title) => set({ title }),
  setDesc: (desc) => set({ desc }),
  setTags: (tags) => set({ tags }),
  setBoard: (board) => set({ board }),
}));
