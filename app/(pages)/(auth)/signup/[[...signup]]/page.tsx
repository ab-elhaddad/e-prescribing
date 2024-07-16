import { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Signup",
};

export default function Page() {
  return (
    <div className="w-full flex justify-around items-center">
      <img
        src="/female-doctor-c.png"
        alt="Female Doctor"
        className="hidden md:block object-cover w-[33vw] z-10 self-end mt-5"
      />
      <div className="py-10">
      <SignUp />
      </div>
    </div>
  );
}
