import { cookies } from "next/headers";
import { Suspense } from "react";
import CreatePrescriptionForm from "@/forms/dashboard/doctor/createPrescriptionForm";
import { InvoiceSkeleton } from "@/app/ui/skeletons";
import { getDrugs, getPatient } from "@/app/lib/data";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const token = cookies().get("authorization")?.value as string;

  return (
    <Suspense fallback={<InvoiceSkeleton />}>
      <DataFetchingLayer token={token} id={id} />
    </Suspense>
  );
}

async function DataFetchingLayer({ token, id }: { token: string; id: string }) {
  const patientPromise = getPatient(token, id);
  const drugsPromise = getDrugs(token);
  const [patientResponse, drugsResponse] = await Promise.all([
    patientPromise,
    drugsPromise,
  ]);

  console.log(patientResponse, drugsResponse);

  return (
    <CreatePrescriptionForm
      patientResponse={patientResponse}
      drugsResponse={drugsResponse}
    />
  );
}
