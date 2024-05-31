"use client";

import { useAuth } from "@/app/context/AuthProvider";
import Link from "next/link";
import Cookies from "js-cookie";

export default function NavLinks() {
  const links = ["Home", "About", "Contact"];
  const { user } = useAuth();
  if (user && Cookies.get("authorization")) links.push("Dashboard");

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            href={`/${link.toLowerCase()}`}
            className="text-sm font-semibold leading-6 text-sky-900 hover:underline"
            key={link}
          >
            {link}
          </Link>
        );
      })}
    </>
  );
}
