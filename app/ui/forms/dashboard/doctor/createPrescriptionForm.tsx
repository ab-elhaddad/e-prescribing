"use client";

import toast, { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import Breadcrumbs from "@/app/ui/custom/Breadcrumbs";
import FullBorderInput from "@/app/ui/custom/inputs/FullBorderInput";
import Button from "@/app/ui/custom/inputs/Button";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";
import { createPrescriptionAction } from "@/app/lib/actions/doctorActions";

export default function CreatePrescriptionForm({
  patientResponse,
  drugsResponse,
}: {
  patientResponse: { error?: string; data: any };
  drugsResponse: { error?: string; data: any[] };
}) {
  const { data: patientData, error: patientError } = patientResponse;
  console.log(patientData);
  const { _id: id, name, email, age } = patientData;
  const [firstname] = name?.split(" ");

  const { data: drugsData, error: drugsError } = drugsResponse;

  if (patientError || drugsError) {
    toast.error((patientError as string) || (drugsError as string));
  }

  const [selectedDrugs, setSelectedDrugs] = useState<any[]>([]);
  const createPrescriptionWithDrugs = createPrescriptionAction.bind(null, selectedDrugs);
  const [formState, formAction] = useFormState(createPrescriptionWithDrugs, {errors: {}, isSuccess: false});

  useEffect(() => {
    if (formState.isSuccess) 
      toast.success("Prescription created successfully");
    else if(formState.errors?.server)
      toast.error(formState.errors?.server);
  }, [formState.isSuccess, formState.errors]);

  
  return (
    <div>
      <Toaster />
      <Breadcrumbs
        breadcrumbs={[
          { label: "Patients", href: "/dashboard/doctor/patients" },
          { label: `${firstname}`, href: `/dashboard/doctor/patients/${id}` },
          {
            label: "Create Prescription",
            href: `/dashboard/doctor/patients/${id}/add`,
            active: true,
          },
        ]}
      />
      <form action={formAction} className="my-10">
        <input type="text" value={id} name="id" hidden />
        <div className="bg-gray-50 p-5 rounded-md my-5">
          <div className="flex gap-x-3">
            <div className="w-2/5">
              <FullBorderInput
                type="text"
                name="patientName"
                error={undefined}
                disabled={true}
                defaultValue={name}
                label="Full name"
              />
            </div>
            <div className="w-2/5">
              <FullBorderInput
                type="text"
                name="patientEmail"
                error={undefined}
                disabled={true}
                defaultValue={email}
                label="Email"
              />
            </div>
            <div className="w-1/5">
              <FullBorderInput
                type="text"
                name="patientAge"
                error={undefined}
                disabled={true}
                defaultValue={age}
                label="Age"
              />
            </div>
          </div>
          <DrugsList
            drugsData={drugsData}
            selectedDrugs={selectedDrugs}
            setSelectedDrugs={setSelectedDrugs}
          />
        </div>
        <div className="flex justify-end gap-x-3">
          <Link href={".."}>
            <Button body="Cancel" variant="secondary" type="button" />
          </Link>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

export function DrugsList({
  drugsData: drugs,
  selectedDrugs,
  setSelectedDrugs,
}: {
  drugsData: any[];
  selectedDrugs: any[];
  setSelectedDrugs: (selectedDrugs: any[]) => void;
}) {
  const [filteredDrugs, setFilteredDrugs] = useState(drugs);

  const handleDrugsSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const search = e.target.value;
    const filteredDrugs = drugs.filter((drug) =>
      drug.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDrugs(filteredDrugs);
  };

  const handleDrugSelect: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const drug = JSON.parse(e.currentTarget.value);
    let isSelected = false;
    selectedDrugs.forEach((el) => (isSelected ||= el.name === drug.name));
    if (isSelected) return;
    setSelectedDrugs([...selectedDrugs, drug]);
  };

  const handleDrugDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const drug = JSON.parse(e.currentTarget.value);
    const updatedDrugs = selectedDrugs.filter(
      (selectedDrug) => selectedDrug.name !== drug.name
    );
    setSelectedDrugs(updatedDrugs);
  };

  return (
    <div className="flex flex-col gap-y-5">
      <div>
        <FullBorderInput
          type="text"
          name="drugsSearch"
          label="Search Drugs"
          placeholder="Write drug name"
          onChange={handleDrugsSearch}
          style={{ marginBottom: 0 }}
        />
        <div className="w-full bg-white rounded-b-md min-h-10 max-h-40 overflow-y-scroll flex flex-col">
          {filteredDrugs.length ? (
            filteredDrugs.map((drug) => (
              <button
                className="flex p-2 border-b border-gray-200 text-md"
                key={JSON.stringify(drug)}
                onClick={handleDrugSelect}
                value={JSON.stringify(drug)}
                type="button"
              >
                {drug.name}
              </button>
            ))
          ) : (
            <div className="self-center pt-2">No matched drugs.</div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-2">
        {selectedDrugs.map((drug) => {
          return (
          <div
            key={drug.name}
            className="flex gap-x-3 text-sky-600 bg-sky-100 p-2 px-3 rounded-full h-fit w-fit"
          >
            <span className="h-fit w-fit text-sm md:text-md">{drug.name}</span>
            <button onClick={handleDrugDelete} value={JSON.stringify(drug)} type="button">
              <IoCloseOutline className="text-red-500 text-xl font-bold hover:text-red-700 hover:rotate-90 duration-300" />
            </button>
          </div>
        )})}
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button body="Create" pending={pending} />;
}
