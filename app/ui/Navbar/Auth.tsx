import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { FaSignInAlt } from "react-icons/fa";

export default function Auth() {
  return (
    <div className="text-sm font-semibold text-sky-900">
      <SignedOut>
        <SignInButton
          children={
            <div className="flex items-center gap-2 cursor-pointer">
              <FaSignInAlt />
              Sign in
            </div>
          }
        />
      </SignedOut>
      <SignedIn>
        <Link href="/profile">
          <UserButton showName />
        </Link>
      </SignedIn>
    </div>
  );
}
