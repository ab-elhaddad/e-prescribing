import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import SignInOrHome from "./SignInOrHome";

export default function Auth() {
  return (
    <div className="text-sm font-semibold text-sky-900">
      <SignedOut>
        <SignInOrHome />
      </SignedOut>
      <SignedIn>
        <div className="hidden items-center gap-x-3 font-normal text-black md:flex">
          <SignInOrHome />
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}
