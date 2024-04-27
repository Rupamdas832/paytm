import { create } from "zustand";

type Store = {
  notifications: string[];
  addNotification: (val: string) => void;
};

export const useNotificationStore = create<Store>()((set) => ({
  notifications: [],
  addNotification: (val) =>
    set((state) => ({ notifications: [...state.notifications, val] })),
}));
