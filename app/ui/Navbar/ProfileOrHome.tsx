"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSignInAlt } from "react-icons/fa";

export default function ProfileOrHome() {
  const pathname = usePathname();
  return (
    <>
      {pathname.startsWith("/profile") ? (
        <Link href={"/home"}>
          <div className="scale-x-[-1]">
            <FaSignInAlt />
          </div>
          {"Home"}
        </Link>
      ) : (
        <>
          <Link href={"/profile"} className="text-sm">
            Profile
          </Link>
        </>
      )}
    </>
  );
}
