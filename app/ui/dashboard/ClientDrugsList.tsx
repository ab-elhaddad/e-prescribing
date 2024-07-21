"use client";

import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import Button from "@/components/inputs/Button";
import { DrugsList } from "@/forms/dashboard/doctor/createPrescriptionForm";
import { updatePrescriptionAction } from "@/app/actions/doctor";

export function ClientDrugsList({
  id,
  drugsData,
  selectedDrugs: passedSelectedDrugs,
}: {
  id: string;
  drugsData: any[];
  selectedDrugs: any[];
}) {
  const [selectedDrugs, setSelectedDrugs] = useState(passedSelectedDrugs);

  const updatePrescritpionWithDrugs = updatePrescriptionAction.bind(
    null,
    selectedDrugs,
  );
  const [formState, formAction] = useFormState(updatePrescritpionWithDrugs, {
    success: false,
    errors: {
      server: undefined,
    },
  });

  useEffect(() => {
    if (formState?.errors?.server) toast.error(formState.errors.server);
    if (formState.success) toast.success("Prescription updated successfully!");
  }, [formState]);

  return (
    <form action={formAction} className="flex w-full flex-col gap-y-5">
      <Toaster />
      <input type="text" name="id" defaultValue={id} hidden />
      <div className="rounded-md bg-gray-50 p-5">
        <DrugsList
          drugsData={drugsData}
          selectedDrugs={selectedDrugs}
          setSelectedDrugs={setSelectedDrugs}
        />
      </div>
      <div className="flex justify-start gap-x-3">
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
  return <Button body="Update" pending={pending} />;
}
