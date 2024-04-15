"use client";
import { usePathname, useRouter } from "next/navigation";
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

  return (
    <div
      onClick={() => router.push(href)}
      className={`${selected ? "text-blue-600" : "text-slate-500"} p-2 flex items-center font-semibold cursor-pointer`}
    >
      <div>{icon}</div>
      <p className="ml-2">{title}</p>
    </div>
  );
};
export default SiderbarItem;
