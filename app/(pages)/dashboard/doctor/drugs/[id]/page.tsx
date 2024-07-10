import { getDrug } from "@/app/lib/data";
import DisplayEntityCard from "@/app/ui/dashboard/DisplayEntityCard";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <DisplayEntityCard
          entity="Drug"
          entityId={id}
          getEntity={getDrug}
          attributeToLabel={{
            name: "Name",
            usage: "Usage",
            sideEffects: "Side Effects",
            similarDrugs: "Similar Drugs",
            contraindications: "Contraindications",
          }}
        />
      </Suspense>
    </div>
  );
}
