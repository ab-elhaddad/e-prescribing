"use client";

import Link from "next/link";
import { useClerk } from "@clerk/nextjs";

type Props = {
  closeSidenav?: () => void;
};

export default function NavLinks({ closeSidenav }: Props) {
  const links: Record<string, string> = {
    Home: "/home",
    About: "/about",
    Contact: "/contact",
  };

  const { user } = useClerk();

  if (user) {
    // The only role we don't set in clerk portal is 'patient'
    const role = user?.publicMetadata.role ?? "patient";
    links.Dashboard = `/dashboard/${role}`;
  }

  return (
    <>
      {Object.entries(links).map(([header, href]) => {
        return (
          <Link
            href={href}
            className="text-sm font-semibold leading-6 text-sky-900 hover:underline"
            key={header}
            onClick={closeSidenav}
          >
            {header}
          </Link>
        );
      })}
    </>
  );
}
