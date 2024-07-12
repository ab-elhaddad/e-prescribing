import { getDrugs, getPrescription } from "@/app/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ClientDrugsList } from "@/app/ui/dashboard/ClientDrugsList";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { cookies } from "next/headers";
import { Suspense } from "react";

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
  const token = cookies().get("authorization")?.value || "";
  const drugsPromise = getDrugs(token);
  const prescriptionPromise = getPrescription(token, id);

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
    console.log(prescriptionData);

    return (
    <div className="flex flex-col gap-y-5">
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "Patients",
            href: "/dashboard/patients",
          },
          {
            label: prescriptionData?.patient?.name,
            href: `/dashboard/doctor/patients/${prescriptionData?.patient?._id}`,
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
