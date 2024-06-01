"use client";

import { useAuth } from "@/app/context/AuthProvider";
import Link from "next/link";
import Cookies from "js-cookie";

export default function NavLinks() {
  const links: Record<string, string> = {
    Home: '/home',
    About: '/about',
    Contact: '/contact',
  }
  const { user } = useAuth();
  if (user && Cookies.get("authorization")) links.Dashboard = `/dashboard/${Cookies.get("userType")}`;

  return (
    <>
      {Object.entries(links).map(([header, href]) => {
        return (
          <Link
            href={href}
            className="text-sm font-semibold leading-6 text-sky-900 hover:underline"
            key={header}
          >
            {header}
          </Link>
        );
      })}
    </>
  );
}
