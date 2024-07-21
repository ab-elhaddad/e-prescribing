import { Suspense } from "react";

import InvoicesTableSkeleton from "@/app/ui/skeletons";
import Table from "@/app/ui/dashboard/Table";
import Breadcrumps from "@/components/Breadcrumbs";
import { deletePendingPrescriptionAction } from "@/app/actions/pendingPrescription";
import { getPendingPrescriptionsController } from "@/app/controllers/pendingPrescription";

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <Breadcrumps
          breadcrumbs={[
            {
              href: "./pending-prescriptions",
              label: "Pending Prescriptions",
              active: true,
            },
          ]}
        />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table
          deleteAction={deletePendingPrescriptionAction}
          getData={getPendingPrescriptionsController}
          headerToAttribute={{
            Patinet: "patient",
            Drugs: "drugs",
          }}
          entity="Pending-Prescription"
          owner="Doctor"
        />
      </Suspense>
    </div>
  );
}
