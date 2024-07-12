"use client";

import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";

import Button from "@/components/inputs/Button";
import FullBorderInput from "@/components/inputs/FullBorderInput";
import UploadImage from "@/components/inputs/UploadImage";
import { scanPrescriptionAction } from "@/app/lib/actions/pendingPrescriptionActions";

const initialState = {
  errors: {
    prescriptionImage: undefined,
    patientEmail: undefined,
    doctorEmail: undefined,
  },
  isSubmitted: false,
};

export default function ScanForm() {
  const [formState, formAction] = useFormState(
    scanPrescriptionAction,
    initialState
  );

  useEffect(() => {
    if (formState.isSubmitted) {
      toast.success("Prescription scanned successfully!");
    } else if (formState.errors.server) {
      toast.error(formState.errors.server);
    }
  }, [formState]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-y-3 text-sm md:text-base"
    >
      <Toaster />
      <div className="bg-gray-50 p-5 rounded-md flex flex-col md:flex-row justify-around gap-x-3 gap-y-4">
        <div className="flex flex-col gap-y-2 md:w-1/2">
          <UploadImage
            label="Select prescription"
            hint="(crop the image to contain only the prescriped drugs)"
            inputName="prescriptionImage"
            error={formState.errors.prescriptionImage}
          />
        </div>
        <div className="md:w-1/2 flex gap-x-3">
          <div className="flex flex-col gap-y-1 w-1/2">
            <FullBorderInput
              name="patientEmail"
              type="email"
              label="Patient email"
              error={formState.errors.patientEmail}
            />
          </div>
          <div className="flex flex-col gap-y-1 w-1/2">
            <FullBorderInput
              name="doctorEmail"
              type="email"
              label="Doctor Email"
              error={formState.errors.doctorEmail}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-x-3">
        <Link href="dashboard/assistant/scan">
          <Button body="Cancel" variant="secondary" type="button" />
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button body="Submit" pending={pending} />;
}
