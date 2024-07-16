import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="w-full flex justify-around items-center">
      <img
        src="/male-doctor-c.png"
        alt="Male Doctor"
        className="hidden md:block object-cover w-[37vw] z-10 self-end mt-5"
      />
      <div className="py-10">
        <SignIn afterSignOutUrl="/home" />
      </div>
    </div>
  );
}
