import { Suspense } from "react";
import CreatePrescriptionForm from "@/forms/dashboard/doctor/createPrescriptionForm";
import { InvoiceSkeleton } from "@/app/ui/skeletons";
import { getPatientByDoctorController } from "@/app/controllers/doctor";
import { getDrugsByDoctorController } from "@/app/controllers/drug";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <Suspense fallback={<InvoiceSkeleton />}>
      <DataFetchingLayer id={id} />
    </Suspense>
  );
}

async function DataFetchingLayer({id }: { id: string }) {
  const patientPromise = getPatientByDoctorController(id);
  const drugsPromise = getDrugsByDoctorController();
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
