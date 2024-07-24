"use client";

import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSignInAlt } from "react-icons/fa";

export default function SignInOrHome() {
  const pathname = usePathname();
  return (
    <>
      {pathname.startsWith("/login") || pathname.startsWith("/signup") ? (
        <Link href={"/home"}>
          <div className="scale-x-[-1]">
            <FaSignInAlt />
          </div>
          {"Home"}
        </Link>
      ) : (
        <>
          <SignInButton>
            <div className="flex cursor-pointer items-center gap-2">
              <FaSignInAlt />
              {"SignIn"}
            </div>
          </SignInButton>
        </>
      )}
    </>
  );
}
