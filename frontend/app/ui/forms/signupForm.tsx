"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

import BottomBorderInput from "../custom/BottomBorderInput";

import { signupAction } from "@/app/lib/actions/authActions";
import { ZodError } from "../custom/ZodError";

export const initialState = {
  data: null,
  errors: {},
  message: null,
};

export default function SignupForm() {
  const [formState, formAction] = useFormState(signupAction, initialState);
  if (formState.message) {
    toast.error(formState.message, {
      position: "bottom-center",
    });
  }

  return (
    <>
      {/* <ToastContainer /> */}
      <form
        action={formAction}
        className="my-12 flex flex-col justify-center items-center w-fit md:z-20"
      >
        <h1 className="text-5xl font-bold mb-6">
          Sign <span className="text-sky-600">up</span>
        </h1>
        <div className="py-1 pb-0 pt-7 w-80 flex justify-between">
          <div className="flex-col w-32">
            <BottomBorderInput
              type="text"
              placeholder="First"
              name="firstName"
              error={formState.errors?.firstName}
              style={{ width: "100%" }}
            />
          </div>
          <div className="flex-col w-32">
            <BottomBorderInput
              type="text"
              placeholder="Last"
              name="lastName"
              error={formState.errors?.lastName}
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <BottomBorderInput
          type="email"
          placeholder="E-mail"
          name="email"
          error={formState.errors?.email}
        />
        <BottomBorderInput
          type="password"
          placeholder="Password"
          name="password"
          error={formState.errors?.password}
        />
        <BottomBorderInput
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          error={formState.errors?.confirmPassword}
        />

        {/* <div className="flex justify-between w-80 text-center">
        <BottomBorderInput
          type="number"
          name="day"
          placeholder="DD"
          className="focus:outline-none bg-transparent py-3 border-b-2 border-gray-300 focus:border-sky-500 pb-1 my-3 w-12"
        />
        <span className="mt-auto mb-2 text-3xl text-gray-300">/</span>
        <BottomBorderInput
          type="number"
          name="month"
          placeholder="MM"
          className="focus:outline-none bg-transparent py-3 border-b-2 border-gray-300 focus:border-sky-500 pb-1 my-3 w-12"
          />
          <span className="mt-auto mb-2 text-3xl text-gray-300">/</span>
          <BottomBorderInput
          type="number"
          name="year"
          placeholder="YYYY"
          className="focus:outline-none bg-transparent py-3 border-b-2 border-gray-300 focus:border-sky-500 pb-1 my-3 w-16"
        />
      </div> */}
        <div className="mb-9">
          <BottomBorderInput
            type="date"
            name="dateOfBirth"
            error={formState.errors?.dateOfBirth}
          />
        </div>

          <ZodError
            error={formState.errors.server}
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: ".85rem",
            }}
          />
        <button
          type="submit"
          className="bg-sky-600 duration-300 hover:bg-sky-500 text-white font-semibold p-3 rounded-md w-40 mt-3"
        >
          Sign up
        </button>
        <p className="mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-sky-500">
            Log in
          </Link>
        </p>
      </form>
    </>
  );
}
