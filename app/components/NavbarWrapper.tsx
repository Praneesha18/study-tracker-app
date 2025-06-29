"use client";

import Webnav from "./Webnav";
import { usePathname } from "next/navigation";

export default function NavbarWrapper({ user }: { user: any }) {
  const pathname = usePathname();

  // Hide navbar on dashboard pages
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return <Webnav user={user} />;
}
