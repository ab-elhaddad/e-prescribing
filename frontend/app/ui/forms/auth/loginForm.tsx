"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useEffect } from "react";

import SelectRole from "@/app/ui/custom/selectRole";
import BottomBorderInput from "@/app/ui/custom/BottomBorderInput";
import Button from "@/app/ui/custom/Button";

import { loginAction } from "@/app/lib/actions/authActions";
import { useAuth } from "@/app/context/AuthProvider";

const initialState = {
  data: null,
  errors: {},
  message: null,
  token: null,
};

export default function LoginForm() {
  const router = useRouter();

  const { user, login } = useAuth();
  // if (user) router.push("/");

  const [formState, formAction] = useFormState(loginAction, initialState);

  useEffect(() => {
    if (formState.errors.server)
      toast.error(formState.errors.server, { className: "text-sm" });
  }, [formState.errors.server]);

  useEffect(() => {
    const handleSuccess = async (token: string | null) => {
      if (!token) return;
      login();
      router.push(`/dashboard/${Cookies.get("userType")}`);
    };
    handleSuccess(formState.token);
  }, [formState.token]);

  return (
    <>
      <Toaster />
      <form
        action={formAction}
        className="my-20 flex flex-col justify-center items-center w-fit md:z-20"
      >
        <h1 className="text-6xl font-bold mb-16">
          Log <span className="text-sky-600">in</span>
        </h1>
        <BottomBorderInput
          type="email"
          placeholder="E-mail"
          name="email"
          error={formState.errors.email}
        />
        <BottomBorderInput
          type="password"
          placeholder="Password"
          name="password"
          error={formState.errors.password}
        />
        <div className="mb-12">
          <SelectRole roles={["doctor", "assistant", "patient"]} />
        </div>

        {/* <ZodError
        error={[formState.errors.server]}
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: ".85rem",
        }}
      /> */}
        <SubmitButton />
        <p className="mt-5">
          {`Don't have an account?`}{" "}
          <Link href="/signup" className="text-sky-500">
            Sign up
          </Link>
        </p>
      </form>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button body="Log in" pending={pending} />;
}
