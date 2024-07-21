import Breadcrumbs from "@/components/Breadcrumbs";
import DrugsList from "./DrugsList";
import { Suspense } from "react";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { getDrugsByDoctorController } from "@/app/controllers/drug";
import { getPendingPrescriptionController } from "@/app/controllers/pendingPrescription";

export default function page({ params }: { params: { id: string } }) {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "Pending Prescriptions",
            href: "/dashboard/doctor/pending-prescriptions",
          },
          {
            label: "Pending Prescription Details",
            href: `/dashboard/doctor/pending-prescriptions/${params.id}`,
            active: true,
          },
        ]}
      />
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <DataLayer id={params.id} />
      </Suspense>
    </>
  );
}

async function DataLayer({ id }: { id: string }) {
  const { data: drugsData, error: drugsError } =
    await getDrugsByDoctorController();
  const { data: pendingPrescriptionData, error: pendingPrescriptionError } =
    await getPendingPrescriptionController(id);

  if (!drugsData || !pendingPrescriptionData) {
    return (
      <p className="w-full text-center text-red-500">
        Something went wrong. {drugsError || pendingPrescriptionError}
      </p>
    );
  }

  return (
    <DrugsList
      patientId={pendingPrescriptionData?.patientId}
      pendingPrescriptionId={id}
      drugsData={drugsData}
      selectedDrugs={pendingPrescriptionData?.drugs}
    />
  );
}
