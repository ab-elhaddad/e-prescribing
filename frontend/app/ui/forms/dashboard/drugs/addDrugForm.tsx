"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import Breadcrumbs from "@/app/ui/custom/Breadcrumbs";
import Button from "@/app/ui/custom/Button";
import FullBorderInput from "@/app/ui/custom/FullBorderInput";
import { addDrugAction } from "@/app/lib/actions/drugsActions";

const initialState = {
  errors: {
    server: undefined,
    name: undefined,
    usage: undefined,
  },
  success: "",
};

export default function AddDrugForm() {
  const [formState, formAction] = useFormState(addDrugAction, initialState);

  useEffect(() => {
    if (formState.success) toast.success(formState.success);
    if (formState.errors.server) toast.error(formState.errors.server as string);
  }, [formState.success, formState.errors.server]);

  return (
    <div>
      <Toaster />
      <Breadcrumbs
        breadcrumbs={[
          { href: "/dashboard/drugs", label: "Drugs" },
          { href: "/dashboard/drugs/add", label: "Add Drug", active: true },
        ]}
      />
      <form action={formAction}>
        <div className="bg-gray-50 p-5 rounded-md">
          <div className="w-full flex gap-x-5">
            <FullBorderInput
              name="name"
              type="text"
              placeholder="Name"
              error={formState.errors.name}
            />
            <FullBorderInput
              name="usage"
              type="text"
              placeholder="Usage"
              error={formState.errors.usage}
            />
          </div>
          <div className="w-full flex gap-x-5">
            <div className="flex-flex-col gap-y-1 w-full">
              <FullBorderInput
                name="sideEffects"
                type="text"
                placeholder="Side Effects"
              />
              <p className="m-0 p-0 ml-2 text-xs text-gray-500 ">
                ie. 'Headache, Dizziness, Flushing'
              </p>
            </div>
            <div className="flex-flex-col gap-y-1 w-full">
              <FullBorderInput
                name="contraindications"
                type="text"
                placeholder="Contraindications"
              />
              <p className="m-0 p-0 ml-2 text-xs text-gray-500 ">
                ie. 'Ungina, Cardiac failure, Prignancy'
              </p>
            </div>
          </div>
          <div className="flex-flex-col gap-y-1 w-full">
            <FullBorderInput
              name="similarDrugs"
              type="text"
              placeholder="Similar Drugs"
            />
            <p className="m-0 p-0 ml-2 text-xs text-gray-500 ">
              ie. 'blockadibine 10, blockadibine 20'
            </p>
          </div>
        </div>
        <div className="flex gap-x-5 justify-end mt-5">
          <Link href={"/dashboard/drugs"}>
            <Button body="Cancel" variant="secondary" type="button"/>
          </Link>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

function SubmitButton(){
  const {pending} = useFormStatus();

  return <Button body="Add Drug" pending={pending}/>;
}