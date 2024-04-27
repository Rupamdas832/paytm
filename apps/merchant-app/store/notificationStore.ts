import { create } from "zustand";

type NotificationType = "Payment";

export type Notification = {
  id: string;
  message: string;
  referenceId: string;
  type: NotificationType;
  isUnRead?: boolean;
  createdOn: Date;
};

type Store = {
  notifications: Notification[];
  addNotification: (val: Notification) => void;
  markAllNotificationsRead: () => void;
};

export const useNotificationStore = create<Store>()((set) => ({
  notifications: [],
  addNotification: (val) =>
    set((state) => ({ notifications: [...state.notifications, val] })),
  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notif) => ({
        ...notif,
        isUnRead: false,
      })),
    })),
}));
