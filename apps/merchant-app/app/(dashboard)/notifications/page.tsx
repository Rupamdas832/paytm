"use client";
import { useEffect } from "react";
import {
  Notification,
  useNotificationStore,
} from "../../../store/notificationStore";
import dayjs from "dayjs";

const Notifications = () => {
  const { notifications, markAllNotificationsRead } = useNotificationStore();

  useEffect(() => {
    markAllNotificationsRead();
    return () => markAllNotificationsRead();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Notifications</h1>
      <div className="w-1/2 mt-4">
        {notifications
          .filter((item) => item.isUnRead)
          .sort(
            (a: Notification, b: Notification) =>
              new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
          )
          .map((notif: Notification) => {
            return (
              <div key={notif.id} className="p-2 bg-slate-200 mt-2 rounded-sm">
                <p>{notif.message}</p>
                <p className="text-xs text-gray-400">
                  {dayjs(notif.createdOn).format("hh:mm:ss,DD-MMM")}
                </p>
              </div>
            );
          })}
        {notifications.filter((item) => item.isUnRead).length > 0 && (
          <p className="text-sm text-gray-400">
            ---------------new message-------------------
          </p>
        )}
        {notifications
          .filter((item) => !item.isUnRead)
          .sort(
            (a: Notification, b: Notification) =>
              new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
          )
          .map((notif: Notification) => {
            return (
              <div key={notif.id} className="p-2 bg-slate-200 mt-2 rounded-sm">
                <p>{notif.message}</p>
                <p className="text-xs text-gray-400">
                  {dayjs(notif.createdOn).format("hh:mm:ss,DD-MMM")}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Notifications;
