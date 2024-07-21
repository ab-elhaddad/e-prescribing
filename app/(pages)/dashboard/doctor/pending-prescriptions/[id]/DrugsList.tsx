"use client";

import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import Button from "@/components/inputs/Button";
import { DrugsList } from "@/forms/dashboard/doctor/createPrescriptionForm";
import { createPrescriptionAction } from "@/app/actions/doctor";
import { deletePendingPrescriptionController } from "@/app/controllers/pendingPrescription";

export default function ClientDrugsList({
  patientId,
  pendingPrescriptionId,
  drugsData,
  selectedDrugs: passedSelectedDrugs,
}: {
  patientId: string;
  pendingPrescriptionId: string;
  drugsData: any[];
  selectedDrugs: any[];
}) {
  const [selectedDrugs, setSelectedDrugs] = useState(passedSelectedDrugs);

  const createPrescriptionActionWithDrugs = createPrescriptionAction.bind(
    null,
    selectedDrugs,
  );

  const [formState, formAction] = useFormState(
    createPrescriptionActionWithDrugs,
    {
      errors: {
        server: undefined,
      },
      success: false,
    },
  );

  useEffect(() => {
    if (formState.errors.server) toast.error(formState.errors.server);
    if (formState.success) {
      toast.success("Prescription created successfully!");
      deletePendingPrescriptionController(pendingPrescriptionId);
    }
  }, [formState, pendingPrescriptionId]);

  return (
    <form action={formAction} className="flex w-full flex-col gap-y-5">
      <Toaster />
      <input type="text" name="id" defaultValue={patientId} hidden />
      <div className="rounded-md bg-gray-50 p-5">
        <DrugsList
          drugsData={drugsData}
          selectedDrugs={selectedDrugs}
          setSelectedDrugs={setSelectedDrugs}
        />
      </div>
      <div className="flex justify-start gap-x-3">
        <Link href=".">
          <Button body="Cancel" variant="secondary" type="button" />
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button body="Approve" pending={pending} />;
}
