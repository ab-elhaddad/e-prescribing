"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/inputs/Button";
import FullBorderInput from "@/components/inputs/FullBorderInput";
import { addDrugAction } from "@/app/actions/drug/addDrugAction";

const initialState = {
  errors: {
    server: undefined,
    name: undefined,
    usage: undefined,
  },
  success: false,
};

export default function AddDrugForm() {
  const [formState, formAction] = useFormState(addDrugAction, initialState);

  useEffect(() => {
    if (formState.success) toast.success("Drug added successfully");
    if (formState.errors.server) toast.error(formState.errors.server as string);
  }, [formState]);

  return (
    <div>
      <Toaster />
      <Breadcrumbs
        breadcrumbs={[
          { href: ".", label: "Drugs" },
          { href: "add", label: "Add Drug", active: true },
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
          <div className="w-full flex gap-x-5 mb-3">
            <div className="flex flex-col gap-y-1 w-full">
              <FullBorderInput
                name="sideEffects"
                type="text"
                placeholder="Side Effects"
                style={{marginBottom: "0"}}
              />
              <p className="m-0 p-0 ml-2 text-[10px] md:text-xs text-gray-500 ">
                {`ie. 'Headache, Dizziness, Flushing'`}
              </p>
            </div>
            <div className="flex flex-col gap-y-1 w-full">
              <FullBorderInput
                name="contraindications"
                type="text"
                placeholder="Contraindications"
                                style={{marginBottom: "0"}}

              />
              <p className="m-0 p-0 ml-2 text-[10px] md:text-xs text-gray-500 ">
                {`ie. 'Ungina, Cardiac failure, Prignancy'`}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-1 w-full">
            <FullBorderInput
              name="similarDrugs"
              type="text"
              placeholder="Similar Drugs"
                              style={{marginBottom: "0"}}

            />
            <p className="m-0 p-0 ml-2 text-[10px] md:text-xs text-gray-500 ">
              {`ie. 'blockadibine 10, blockadibine 20'`}
            </p>
          </div>
        </div>
        <div className="flex gap-x-5 justify-end mt-5">
          <Link href={"."}>
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