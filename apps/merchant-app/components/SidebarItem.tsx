"use client";
import { usePathname, useRouter } from "next/navigation";
import { useNotificationStore } from "../store/notificationStore";
import { useMemo } from "react";

const SiderbarItem = ({
  icon,
  title,
  href,
}: {
  icon: any;
  title: string;
  href: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;
  const { notifications } = useNotificationStore();
  const isNotificationRoute = title === "Notifications";

  const unreadNotifications = useMemo(() => {
    return notifications.filter((item) => item.isUnRead);
  }, [notifications]);

  return (
    <div
      onClick={() => router.push(href)}
      className={`${selected ? "text-blue-600" : "text-slate-500"} p-2 flex items-center font-semibold cursor-pointer relative`}
    >
      <div>{icon}</div>
      <p className="ml-2">{title}</p>
      {isNotificationRoute && unreadNotifications.length > 0 && (
        <p className="ml-2 p-0 text-white bg-blue-600 rounded-full w-5 h-5 text-xs flex items-center justify-center">
          {unreadNotifications.length}
        </p>
      )}
    </div>
  );
};
export default SiderbarItem;
