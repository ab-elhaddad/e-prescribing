import Image from "next/image";
import SignupForm from "@/app/ui/forms/auth/signupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
};

export default function Page() {
  return (
    <>
      <img
        src="/female-doctor-c.png"
        alt="Female Doctor"
        style={{
          zIndex: 10,
          width: "75vh",
          position: "sticky",
          marginTop: "auto",
        }}
        className="hidden md:block object-cover h-full"
      />
      <SignupForm />
    </>
  );
}
