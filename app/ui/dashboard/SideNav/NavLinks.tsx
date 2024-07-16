"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { useClerk } from "@clerk/nextjs";

import { LiaUserInjuredSolid } from "react-icons/lia";
import { RiMedicineBottleLine, RiSurveyLine } from "react-icons/ri";
import { FaUserDoctor, FaUserNurse } from "react-icons/fa6";
import { TbScan } from "react-icons/tb";
import { MdOutlinePendingActions } from "react-icons/md";

const linkToIcon: Record<string, IconType> = {
  Patients: LiaUserInjuredSolid,
  Assistants: FaUserNurse,
  Drugs: RiMedicineBottleLine,
  Doctors: FaUserDoctor,
  Prescriptions: RiSurveyLine,
  Scan: TbScan,
  "Pending-Prescriptions": MdOutlinePendingActions,
};

export default function NavLinks({ links }: { links: string[] }) {
  const pathName = usePathname();
  const { user } = useClerk();
  // The only role we don't set in clerk portal is 'patient'
  const role = user?.publicMetadata.role ?? "patient";

  return (
    <>
      {links.map((link) => {
        const LinkIcon = linkToIcon[link];
        const linkHref = `/dashboard/${role}/${link.toLowerCase()}`;
        return (
          <Link
            key={link}
            href={linkHref}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 text-gray-800 p-3 text-sm font-medium hover:bg-sky-100 hover:text-sky-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-sky-600": pathName.startsWith(linkHref),
              }
            )}
          >
            {LinkIcon && (
              <LinkIcon
                className={clsx("w-6", {
                  "text-2xl": link === "Patients",
                  "text-xl": link !== "Patients",
                })}
              />
            )}
            <p className="hidden md:block">{link.replace("-", " ")}</p>
          </Link>
        );
      })}
    </>
  );
}
