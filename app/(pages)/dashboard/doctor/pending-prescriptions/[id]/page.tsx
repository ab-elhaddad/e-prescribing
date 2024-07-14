import Breadcrumbs from "@/components/Breadcrumbs";
import DrugsList from "./DrugsList";
import { getPendingPrescription } from "@/app/lib/data/pendingPrescriptionData";
import { getDrugs } from "@/app/lib/data/drugData";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";

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
  const { data: drugsData, error: drugsError } = await getDrugs(
    cookies().get("authorization")?.value || ""
  );
  const { data: pendingPrescriptionData, error: pendingPrescriptionError } =
    await getPendingPrescription(
      cookies().get("authorization")?.value || "",
      id
    );
  return (
    <DrugsList
      patientId={pendingPrescriptionData.patientId._id}
      pendingPrescriptionId={id}
      doctorToken={cookies().get("authorization")?.value || ""}
      drugsData={drugsData}
      selectedDrugs={pendingPrescriptionData.drugs}
    />
  );
}
