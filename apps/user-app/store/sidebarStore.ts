import { create } from "zustand";

type Store = {
  showSidebar: boolean;
  toggleShowSidebar: () => void;
};

export const useSidebarStore = create<Store>()((set) => ({
  showSidebar: true,
  toggleShowSidebar: () =>
    set((state) => ({ showSidebar: !state.showSidebar })),
}));
