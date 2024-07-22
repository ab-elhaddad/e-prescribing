"use client";

import { usePathname } from "next/navigation";
import { FaSignInAlt } from "react-icons/fa";

export default function SignInOrHome() {
  const pathName = usePathname();
  return (
    <>
      {pathName.startsWith("/login") || pathName.startsWith("/signup") ? (
        <>
          <div className="scale-x-[-1]">
            <FaSignInAlt />
          </div>
          {"Home"}
        </>
      ) : (
        <>
          <FaSignInAlt />
          {"SignIn"}
        </>
      )}
    </>
  );
}
