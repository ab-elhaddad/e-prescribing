"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import FullBorderInput from "../custom/FullBorderInput";
import Button from "../custom/Button";

import { updateProfile } from "@/app/lib/actions/profileActions";
import { initialState } from "./signupForm";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthProvider";

export default function profileForm() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  // if (!user) router.push("/login");

  const [formState, formAction] = useFormState(updateProfile, initialState);
  return (
    <form
      action={formAction}
      className="my-20 pb-10 pt-6 px-10 rounded-lg flex flex-col gap-5 w-full bg-slate-50 relative z-20 shadow-md"
    >
      <div className="flex justify-between items-start mb-5">
        {/* <h1 className="text-3xl text-sky-700 font-bold ml-44">Your Profile</h1> */}
        <Button
          body="Update Profile"
          style={{ margin: "0", marginLeft: "auto", width: "15vw" }}
        />
      </div>
      <div className="flex gap-x-5 w-full">
        <div className="flex justify-between gap-x-3 w-full">
          <div className="w-1/2">
            <FullBorderInput
              type="text"
              placeholder="First Name"
              name="firstName"
              error={formState.errors?.firstName}
            />
          </div>
          <div className="w-1/2">
            <FullBorderInput
              type="text"
              placeholder="Last Name"
              name="lastName"
              error={formState.errors?.lastName}
            />
          </div>
        </div>
        <FullBorderInput
          type="text"
          placeholder="Department"
          name="department"
          error={formState.errors?.department}
        />
      </div>

      <div className="flex gap-x-5 w-full">
        <FullBorderInput
          type="email"
          placeholder="E-mail"
          name="email"
          error={formState.errors?.email}
        />

        <FullBorderInput
          type="text"
          placeholder="Phone Number"
          name="phoneNumber"
          error={formState.errors?.phoneNumber}
        />
      </div>

      <div className="flex gap-x-5 w-full">
        <FullBorderInput
          type="text"
          placeholder="Nationality ID"
          name="nationalityId"
          error={formState.errors?.nationalityId}
        />

        <FullBorderInput
          type="text"
          placeholder="Address"
          name="address"
          error={formState.errors?.address}
        />
      </div>

      <div className="flex gap-x-5 w-full">
        <select
          name="gender"
          id="gender"
          className="focus:outline-none bg-transparent p-3 border-2 border-gray-200 rounded-xl shadow-sm focus:border-sky-500 my-2 w-80 w-full h-fit text-start text-left"
        >
          <option value="male">Male</option>
          <option value="Female">Male</option>
        </select>
        <FullBorderInput
          type="date"
          placeholder="Birth Date"
          name="birthDate"
          error={formState.errors?.birthDate}
        />
      </div>
    </form>
  );
}
