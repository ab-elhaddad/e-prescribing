import { Suspense } from "react";

import DisplayEntityCard from "@/app/ui/dashboard/DisplayEntityCard";
import { getAssistant } from "@/app/lib/data-access/assistantData";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <DisplayEntityCard
          entity="Assistant"
          entityId={id}
          getEntity={getAssistant}
          attributeToLabel={{
            name: "Name",
            age: "Age",
            gender: "Gender",
            email: "Email",
            phoneNumber: "Phone Number",
            address: "Address",
            nationalityNumber: "Nationality Number",
          }}
        />
      </Suspense>
    </div>
  );
}
