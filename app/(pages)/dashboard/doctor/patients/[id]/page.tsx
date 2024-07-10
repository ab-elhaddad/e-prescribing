import { Suspense } from "react";

import DisplayEntityCard from "@/app/ui/dashboard/DisplayEntityCard";
import { getPatient } from "@/app/lib/data";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <DisplayEntityCard
          entity="Patient"
          entityId={id}
          getEntity={getPatient}
          attributeToLabel={{
            name: "Name",
            age: "Age",
            gender: "Gender",
            email: "Email",
            phoneNumber: "Phone Number",
            address: "Address",
            nationalityNumber: "Nationality Number",
            prescriptions: "Prescriptions"
          }}
        />
      </Suspense>
    </div>
  );
}
