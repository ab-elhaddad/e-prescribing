"use client";

import Link from "next/link";

export default function NavLinks() {
  const links = ["Home", "About", "Contact"];
  return (
    <>
      {links.map((link) => {
        const isHome = link === "Home";
        return (
          <Link
            href={isHome ? "/" : `/${link.toLowerCase()}`}
            className="text-sm font-semibold leading-6 text-gray-900 hover:underline"
            key={link}
          >
            {link}
          </Link>
        );
      })}
    </>
  );
}
