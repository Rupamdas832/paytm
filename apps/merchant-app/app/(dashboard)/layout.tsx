import SideBar from "../../components/Sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex bg-slate-100">
      <div className="w-64 border-r border-slate-300 min-h-screen p-4 pt-8">
        <SideBar />
      </div>
      <div className="p-4 pt-8 w-full">{children}</div>
    </div>
  );
}
