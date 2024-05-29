"use client";

import Link from "next/link";

export default function NavLinks() {
  const links = ["Home", "About", "Contact"];
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
