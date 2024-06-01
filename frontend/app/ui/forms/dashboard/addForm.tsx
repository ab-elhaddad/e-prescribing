"use client";

import { useFormState, useFormStatus } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import Button from "@/app/ui/custom/Button";
import { GoPlus } from "react-icons/go";
import { useEffect } from "react";

const initialState = {
  error: null,
  isSubmitted: false,
};

export default function AddForm({
  addAction,
  inputPlaceholder,
  entity,
}: {
  addAction: (prevState: any, formData: FormData) => Promise<any>;
  inputPlaceholder: string;
  entity: string;
}) {
  const [formState, formAction] = useFormState(addAction, initialState);

  useEffect(() => {
    if (formState.error) toast.error(formState.error);
    if (formState.isSubmitted) toast.success(`${entity} added successfully!`);
  }, [formState, entity]);

  return (
    <form
      action={formAction}
      className="flex justify-between items-center gap-x-3 h-10"
    >
      <Toaster />
      <input
        type="email"
        name="email"
        placeholder={inputPlaceholder}
        required
        className="focus:outline-none placeholder:font-normal border border-gray-200 px-3 py-2 rounded-md w-full h-full relative"
      />
      {/* <GoPlus className="absolute text-gray-400 text-2xl left-[.5vw] bottom-[1vh]" /> */}
      <SubmitButton entity={entity} />
    </form>
  );
}

function SubmitButton({ entity }: { entity: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      pending={pending}
      body={
        <div className="flex justify-between items-center w-full">
          Add {entity}
          <GoPlus className="text-2xl" />
        </div>
      }
      style={{
        width: "15vw",
        height: "100%",
        marginTop: "0",
        fontWeight: "500",
      }}
    />
  );
}
