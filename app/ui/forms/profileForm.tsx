"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import FullBorderInput from "@/components/inputs/FullBorderInput";
import Button from "@/components/inputs/Button";
import FullBorderGenderSelect from "@/components/inputs/FullBorderGenderSelect";
import { GetUserDto } from "@/app/dtos/user/getUserDto";
import { updateProfileAction } from "@/app/actions/profile";

const initialState = {
  errors: {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phoneNumber: undefined,
    address: undefined,
    dob: undefined,
    gender: undefined,
    server: undefined,
  },
  success: false,
};

export default function ProfileForm({ user }: { user: GetUserDto }) {
  const [formState, formAction] = useFormState(
    updateProfileAction,
    initialState
  );

  const { errors, success } = formState;

  useEffect(() => {
    if (success) {
      toast.success("Profile updated successfully");
    }
    if (errors.server) {
      toast.error(errors.server);
    }
  }, [formState]);

  return (
    <div>
      <Toaster />
      <form
        action={formAction}
        className="mt-36 md:mt-20 mb-20 pb-10 pt-6 px-10 rounded-lg flex flex-col gap-3 md:gap-5 w-full bg-gray-50 relative z-20 shadow-md text-sm md:text-base"
      >
        <div className="flex justify-between items-start mb-5">
          <SubmitButton />
        </div>
        <div className="flex flex-col md:flex-row gap-x-3 md:gap-x-5 w-full">
          <div className="flex justify-between gap-x-3 md:gap-x-5 w-full">
            <div className="w-1/2">
              <FullBorderInput
                type="text"
                placeholder="First Name"
                defaultValue={user.firstName || undefined}
                name="firstName"
                error={errors.firstName}
              />
            </div>
            <div className="w-1/2">
              <FullBorderInput
                type="text"
                placeholder="Last Name"
                defaultValue={user.lastName || undefined}
                name="lastName"
                error={errors.lastName}
              />
            </div>
          </div>
          <FullBorderInput
            type="text"
            placeholder="Role"
            name="role"
            disabled
            defaultValue={user.role[0].toUpperCase() + user.role.slice(1)}
          />
        </div>

        <div className="flex gap-x-5 w-full">
          <FullBorderInput
            type="email"
            placeholder="E-mail"
            defaultValue={user.email}
            name="email"
            disabled
          />

          <FullBorderInput
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            defaultValue={user.phoneNumber}
            disabled
          />
        </div>
        <FullBorderInput
          type="text"
          placeholder="Address"
          name="address"
          defaultValue={user.address}
          error={errors.address}
        />

        <div className="flex gap-x-5 w-full">
          <FullBorderGenderSelect defaultValue={user.gender} />
          <FullBorderInput
            type="date"
            placeholder="Birth Date"
            name="dob"
            defaultValue={user.dob?.split("T")[0]}
            error={errors.dob}
          />
        </div>
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <div className="flex justify-center m-0 md:ml-auto w-full md:w-[15vw]">
      <Button body="Update Profile" pending={pending} />
    </div>
  );
}
