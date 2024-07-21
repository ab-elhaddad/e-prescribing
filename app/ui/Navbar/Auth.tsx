import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { FaSignInAlt } from "react-icons/fa";

export default function Auth() {
  return (
    <div className="text-sm font-semibold text-sky-900">
      <SignedOut>
        <SignInButton>
          <div className="flex cursor-pointer items-center gap-2">
            <FaSignInAlt />
            Sign in
          </div>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="hidden items-center gap-x-3 font-normal text-black md:flex">
          <Link href={"/profile"} className="text-sm">
            Profile
          </Link>
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}
