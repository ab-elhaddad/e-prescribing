import LoginForm from "@/app/ui/forms/loginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <>
      <img
        src="/male-doctor-c.png"
        alt="Male Doctor"
        style={{
          zIndex: 10,
          width: "75vh",
          position: "sticky",
          marginTop: "auto",
        }}
        className="hidden md:block object-cover h-full"
      />
      <LoginForm />
    </>
  );
}
