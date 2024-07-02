"use client";

import Link from "next/link";
import toast, {Toaster} from 'react-hot-toast';
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import Button from "@/app/ui/custom/inputs/Button";
import { DrugsList } from "@/app/ui/forms/dashboard/doctor/createPrescriptionForm";
import { createPrescriptionAction } from "@/app/lib/actions/doctorActions";
import { deletePendingPrescription } from "@/app/lib/actions/pendingPrescriptionActions";

export default function ClientDrugsList({
  patientId,
  pendingPrescriptionId,
  doctorToken,
  drugsData,
  selectedDrugs: passedSelectedDrugs,
}: {
  patientId: string;
  pendingPrescriptionId: string;
  doctorToken: string;
  drugsData: any[];
  selectedDrugs: any[];
}) {
  const [selectedDrugs, setSelectedDrugs] = useState(passedSelectedDrugs);

  const createPrescriptionActionWithDrugs = createPrescriptionAction.bind(null, selectedDrugs)

  const [formState, formAction] = useFormState(
    createPrescriptionActionWithDrugs,
    {
      errors: {
        server: "",
        drugs: "",
      },
      isSuccess: false,
    }
  );

  useEffect(() => {
    if (formState.errors.server) toast.error(formState.errors.server);
    if(formState.isSuccess) {
      toast.success("Prescription created successfully!");
      deletePendingPrescription(pendingPrescriptionId, doctorToken);
    };
  }, [formState])

  return (
    <form action={formAction} className="w-full flex flex-col gap-y-5">
      <Toaster />
      <input type="text" name="id" defaultValue={patientId} hidden/>
      <div className=" p-5 bg-gray-50 rounded-md">
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
        <SubmitButton/>
      </div>
    </form>
  );
}

function SubmitButton(){
  const { pending } = useFormStatus();
  return <Button body="Approve" pending={pending}/>;
}
