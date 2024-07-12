"use client";

import toast, { Toaster } from "react-hot-toast";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import LoadingSpinner from "@/components/LoadingSpinner";

const initialState = {
  error: null,
  success: null,
};

export default function DeleteForm({
  entityId,
  deleteAction,
}: {
  entityId: number;
  deleteAction: (prevState: any, formData: FormData) => Promise<any>;
}) {
  const [formState, formAction] = useFormState(deleteAction, initialState);

  useEffect(() => {
    if (formState.error) toast.error(formState.error);
    if (formState.success) toast.success(formState.success);
  }, [formState]);

  return (
    <form action={formAction}>
      <Toaster />
      <SubmitButton />
      <input name="id" value={entityId} hidden />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="border border-gray-200 text-gray-700 text-2xl h-9 w-8 rounded-md hover:bg-gray-100 flex justify-center items-center"
      disabled={pending}
    >
      {pending ? <LoadingSpinner /> : <MdDeleteOutline />}
    </button>
  );
}
