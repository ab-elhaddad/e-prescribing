"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { IoHomeOutline } from "react-icons/io5";
import { LiaUserInjuredSolid } from "react-icons/lia";
import { RiMedicineBottleLine } from "react-icons/ri";
import { FaUserNurse } from "react-icons/fa6";

const links = [
  // { name: "Home", href: "/home", icon: IoHomeOutline },
  {
    name: "Patients",
    href: "/dashboard/patients",
    icon: LiaUserInjuredSolid,
  },
  {
    name: "Assistants",
    href: "/dashboard/assistants",
    icon: FaUserNurse,
  },
  { name: "Drugs", href: "/dashboard/drugs", icon: RiMedicineBottleLine },
];

export default function NavLinks() {
  const pathName = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 text-gray-800 p-3 text-sm font-medium hover:bg-sky-100 hover:text-sky-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-sky-600": pathName.startsWith(link.href),
              }
            )}
          >
            <LinkIcon
              className={clsx("w-6", {
                "text-2xl": link.name === "Patients",
                "text-xl": link.name !== "Patients",
              })}
            />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
