"use client";
import SideBar from "../../components/Sidebar";
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
        <div className="w-64 border-r border-slate-300 min-h-screen p-4 pt-8">
          <SideBar />
        </div>
      )}
      <div className="p-4 pt-8 w-full">{children}</div>
    </div>
  );
}
