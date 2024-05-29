"use client";

import { useContext } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";

import SelectRole from "../custom/selectRole";
import BottomBorderInput from "../custom/BottomBorderInput";
import Button from "../custom/Button";

import { loginAction } from "@/app/lib/actions/authActions";
import { AuthContext } from "@/app/context/AuthProvider";
import { ZodError } from "../custom/ZodError";

const initialState = {
  data: null,
  errors: {},
  message: null,
  token: null,
};

export default function LoginForm() {
  const router = useRouter();

  const { user, login } = useContext(AuthContext);
  // if (user) router.push("/");

  const [formState, formAction] = useFormState(loginAction, initialState);

  const handleSuccess = async (token: string | null) => {
    if (!token) return;
    login();
    router.push("/");
    // TODO redirect to the dashboard
  };
  handleSuccess(formState.token);

  return (
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

        <ZodError
          error={[formState.errors.server]}
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: ".85rem",
          }}
        />
      <Button body="Log in" />
      <p className="mt-5">
        Don't have an account?{" "}
        <Link href="/signup" className="text-sky-500">
          Sign up
        </Link>
      </p>
    </form>
  );
}
