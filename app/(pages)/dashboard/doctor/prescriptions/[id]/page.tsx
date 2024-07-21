import { Suspense } from "react";

import Breadcrumbs from "@/components/Breadcrumbs";
import { ClientDrugsList } from "@/app/ui/dashboard/ClientDrugsList";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { getDrugsByDoctorController } from "@/app/controllers/drug";
import { getPrescriptionController } from "@/app/controllers/prescription";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <FetchDataLayer id={id} />
      </Suspense>
    </div>
  );
}

async function FetchDataLayer({ id }: { id: string }) {
  const drugsPromise = getDrugsByDoctorController();
  const prescriptionPromise = getPrescriptionController(id);

  const [drugsResult, prescriptionResult] = await Promise.allSettled([
    drugsPromise,
    prescriptionPromise,
  ]);

  if (
    drugsResult.status === "rejected" ||
    prescriptionResult.status === "rejected"
  )
    return <p className="text-red-500">Something went wrong!</p>;

  const { data: drugsData, error: drugsError } = drugsResult.value;
  const { data: prescriptionData, error: prescriptionError } =
    prescriptionResult.value;

  if (!drugsData || !prescriptionData)
    return (
      <p className="text-red-500">
        Something went wrong! {drugsError || prescriptionError}
      </p>
    );

  return (
    <div className="flex flex-col gap-y-5">
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "Patients",
            href: "/dashboard/patients",
          },
          {
            label: prescriptionData.patient?.fullName || "",
            href: `/dashboard/doctor/patients/${prescriptionData.patient?.id}`,
            active: true,
          },
        ]}
      />
      <ClientDrugsList
        id={id}
        drugsData={drugsData}
        selectedDrugs={prescriptionData.drugs}
      />
    </div>
  );
}
