import { create } from 'zustand';

interface appState {
  notification: boolean;
  setting: boolean;
  openModal: boolean;

  setNotification: (notification: boolean) => void;
  setSetting: (setting: boolean) => void;
  setOpenModal: (openModal: boolean) => void;
}
export const useUiStore = create<appState>((set) => ({
  notification: false,
  setting: false,
  openModal: false,

  setNotification: (notification: boolean) => set({ notification }),
  setSetting: (setting: boolean) => set({ setting }),
  setOpenModal: (openModal: boolean) => set({ openModal }),
}));
