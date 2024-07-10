"use client";

import Link from "next/link";
import toast, {Toaster} from 'react-hot-toast';
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import Button from "../custom/inputs/Button";
import { DrugsList } from "../forms/dashboard/doctor/createPrescriptionForm";
import { updatePrescription } from "@/app/lib/actions/doctorActions";

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

  const updatePrescritpionWithDrugs = updatePrescription.bind(null, selectedDrugs);
  const [formState, formAction] = useFormState(updatePrescritpionWithDrugs, {
    isSuccessful: false,
    error: "",
  });

  useEffect(() => {
    if (formState.error) toast.error(formState.error);
    if(formState.isSuccessful) toast.success("Prescription updated successfully!");
  }, [formState])

  return (
    <form action={formAction} className="w-full flex flex-col gap-y-5">
      <Toaster />
      <input type="text" name="id" defaultValue={id} hidden/>
      <div className=" p-5 bg-gray-50 rounded-md">
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
        <SubmitButton/>
      </div>
    </form>
  );
}

function SubmitButton(){
  const { pending } = useFormStatus();
  return <Button body="Update" pending={pending}/>;
}
