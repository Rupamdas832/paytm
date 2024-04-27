"use client";
import { useNotificationStore } from "../../../store/notificationStore";

const Notifications = () => {
  const { notifications } = useNotificationStore();

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Notifications</h1>
      {notifications.map((notif) => {
        return (
          <p key={notif} className="p-2 bg-slate-200 mt-2">
            {notif}
          </p>
        );
      })}
    </div>
  );
};

export default Notifications;
