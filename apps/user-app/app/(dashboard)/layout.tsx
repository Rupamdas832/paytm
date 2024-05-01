"use client";
import SiderbarItem from "../../components/SidebarItem";
import { sidebarItems } from "../../constants/sidebarItems";
import { useSidebarStore } from "../../store/sidebarStore";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { showSidebar } = useSidebarStore();

  return (
    <div className="flex bg-slate-100">
      {showSidebar && (
        <div className="w-72 border-r border-slate-300 min-h-screen p-4 pt-8">
          {sidebarItems.map((sideItem) => {
            return (
              <SiderbarItem
                key={sideItem.title}
                icon={sideItem.icon}
                title={sideItem.title}
                href={sideItem.path}
              />
            );
          })}
        </div>
      )}
      <div className="p-4 pt-8 w-full">{children}</div>
    </div>
  );
}
