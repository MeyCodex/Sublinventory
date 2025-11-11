import { create } from "zustand";

type SettingsState = {
  isSidebarOpen: boolean;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  toggleCollapse: () => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  isSidebarOpen: false,
  isCollapsed: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
