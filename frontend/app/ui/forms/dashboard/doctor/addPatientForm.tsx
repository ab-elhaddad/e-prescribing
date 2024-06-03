"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import FullBorderInput from "@/app/ui/custom/FullBorderInput";
import FullBorderGenderSelect from "@/app/ui/custom/FullBorderGenderSelect";
import Button from "@/app/ui/custom/Button";
import { createPatientAction } from "@/app/lib/actions/patientsActions";

export default function AddPatientForm() {
  const [formState, formAction] = useFormState(createPatientAction, {
    errors: {},
    isSubmitted: false,
  });
  const { errors, isSubmitted } = formState;

  useEffect(() => {
    if (errors.server) toast.error(errors.server);
  }, [errors]);

  useEffect(() => {
    if (isSubmitted) toast.success('Patient added successfully');
  }, [isSubmitted])

  return (
    <form action={formAction}>
      <Toaster />
      <div className="flex flex-col gap-y-3 p-3 bg-gray-50 rounded-md">
        <div className="flex gap-x-3">
          <div className="w-1/4">
            <FullBorderInput
              name="firstName"
              type="text"
              placeholder="First name"
              error={errors?.firstName}
            />
          </div>
          <div className="w-1/4">
            <FullBorderInput
              name="lastName"
              type="text"
              placeholder="Last name"
              error={errors?.lastName}
            />
          </div>
          <div className="w-1/4">
            <FullBorderInput
              name="birthday"
              type="date"
              error={errors?.birthday}
            />
          </div>
          <div className="w-1/4">
            <FullBorderGenderSelect defaultValue="male" />
          </div>
        </div>
        <div className="flex gap-x-3">
          <FullBorderInput
            name="email"
            type="email"
            placeholder="Email"
            error={errors?.email}
          />
          <FullBorderInput
            name="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            error={errors?.phoneNumber}
          />
        </div>
        <div className="flex gap-x-3">
          <FullBorderInput
            name="nationalityId"
            type="text"
            placeholder="National ID"
            error={errors?.nationalityId}
          />
          <FullBorderInput
            name="address"
            type="text"
            placeholder="Address"
            error={errors?.address}
          />
        </div>
        <div className="flex gap-x-3">
          <FullBorderInput
            name="password"
            type="password"
            placeholder="Password"
            error={errors?.password}
          />
          <FullBorderInput
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            error={errors?.confirmPassword}
          />
        </div>
      </div>
      <div className="flex justify-end gap-x-3 mt-2">
        <Link href="..">
          <Button body="Cancel" variant="secondary" type="button" />
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" body="Create" pending={pending} />;
}
