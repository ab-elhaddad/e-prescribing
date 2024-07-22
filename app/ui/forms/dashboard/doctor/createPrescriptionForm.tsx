"use client";

import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import Breadcrumbs from "@/components/Breadcrumbs";
import FullBorderInput from "@/components/inputs/FullBorderInput";
import Button from "@/components/inputs/Button";
import { IoCloseOutline } from "react-icons/io5";
import { createPrescriptionAction } from "@/app/actions/doctor";
import { GetUserDto } from "@/app/dtos/user/getUserDto";
import { GetDrugDto } from "@/app/dtos/drug/getDrugDto";
import { ControllerReturn } from "@/app/controllers/types";

const initialState = {
  errors: {
    server: undefined,
  },
  success: false,
};

export default function CreatePrescriptionForm({
  patientResponse,
  drugsResponse,
}: {
  patientResponse: ControllerReturn<GetUserDto>;
  drugsResponse: ControllerReturn<GetDrugDto[]>;
}) {
  const { data: patientData, error: patientError } = patientResponse;
  const { data: drugsData, error: drugsError } = drugsResponse;

  if (patientError || drugsError) {
    const error = patientError || (drugsError as string);
    toast.error(error);
    return <div className="text-red-200">{error}</div>;
  }

  const [selectedDrugs, setSelectedDrugs] = useState<any[]>([]);
  const createPrescriptionWithDrugs = createPrescriptionAction.bind(
    null,
    selectedDrugs,
  );
  const [formState, formAction] = useFormState(
    createPrescriptionWithDrugs,
    initialState,
  );

  useEffect(() => {
    if (formState.success) toast.success("Prescription created successfully");
    else if (formState.errors?.server) toast.error(formState.errors?.server);
  }, [formState.success, formState.errors]);

  return (
    <div>
      <Toaster />
      <Breadcrumbs
        breadcrumbs={[
          { label: "Patients", href: "/dashboard/doctor/patients" },
          {
            label: `${patientData?.firstName}`,
            href: `/dashboard/doctor/patients/${patientData?.id}`,
          },
          {
            label: "Create Prescription",
            href: `/dashboard/doctor/patients/${patientData?.id}/add`,
            active: true,
          },
        ]}
      />
      <form action={formAction} className="my-10">
        <input type="text" value={patientData?.id} name="id" hidden />
        <div className="my-5 rounded-md bg-gray-50 p-5">
          <div className="flex gap-x-3">
            <div className="w-2/5">
              <FullBorderInput
                type="text"
                name="patientName"
                error={undefined}
                disabled={true}
                defaultValue={patientData?.fullName || ""}
                label="Full name"
              />
            </div>
            <div className="w-2/5">
              <FullBorderInput
                type="text"
                name="patientEmail"
                error={undefined}
                disabled={true}
                defaultValue={patientData?.email || ""}
                label="Email"
              />
            </div>
            <div className="w-1/5">
              <FullBorderInput
                type="text"
                name="patientAge"
                error={undefined}
                disabled={true}
                defaultValue={String(patientData?.age) || ""}
                label="Age"
              />
            </div>
          </div>
          <DrugsList
            drugsData={drugsData as GetDrugDto[]}
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
  drugsData: GetDrugDto[];
  selectedDrugs: GetDrugDto[];
  setSelectedDrugs: (selectedDrugs: any[]) => void;
}) {
  const [filteredDrugs, setFilteredDrugs] = useState(drugs);

  const handleDrugsSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const search = e.target.value;
    const filteredDrugs = drugs.filter((drug) =>
      drug.name.toLowerCase().includes(search.toLowerCase()),
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
      (selectedDrug) => selectedDrug.name !== drug.name,
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
        <div className="flex max-h-40 min-h-10 w-full flex-col overflow-y-scroll rounded-b-md bg-white">
          {filteredDrugs.length ? (
            filteredDrugs.map((drug) => (
              <button
                className="text-md flex border-b border-gray-200 p-2"
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
              className="flex h-fit w-fit gap-x-3 rounded-full bg-sky-100 p-2 px-3 text-sky-600"
            >
              <span className="md:text-md h-fit w-fit text-sm">
                {drug.name}
              </span>
              <button
                onClick={handleDrugDelete}
                value={JSON.stringify(drug)}
                type="button"
              >
                <IoCloseOutline className="text-xl font-bold text-red-500 duration-300 hover:rotate-90 hover:text-red-700" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button body="Create" pending={pending} />;
}
