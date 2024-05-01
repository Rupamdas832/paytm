"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";
import { useSidebarStore } from "../store/sidebarStore";

export function AppbarMerchant() {
  const session = useSession();
  const router = useRouter();
  const { toggleShowSidebar } = useSidebarStore();

  return (
    <Appbar
      onSignin={signIn}
      onSignout={async () => {
        await signOut();
        router.push("/api/auth/signin");
      }}
      user={session.data?.user}
      toggleSidebar={toggleShowSidebar}
    />
  );
}
