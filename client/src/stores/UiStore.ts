import { create } from 'zustand';

interface appState {
  notification: boolean;
  setting: boolean;
  openModal: boolean;
  ownProfile: boolean;

  setNotification: (notification: boolean) => void;
  setSetting: (setting: boolean) => void;
  setOpenModal: (openModal: boolean) => void;
  setOwnProfile: (ownProfile: boolean) => void;
}
export const useUiStore = create<appState>((set) => ({
  notification: false,
  setting: false,
  openModal: false,
  ownProfile: false,

  setNotification: (notification: boolean) => set({ notification }),
  setSetting: (setting: boolean) => set({ setting }),
  setOpenModal: (openModal: boolean) => set({ openModal }),
  setOwnProfile: (ownProfile: boolean) => set({ ownProfile }),
}));
