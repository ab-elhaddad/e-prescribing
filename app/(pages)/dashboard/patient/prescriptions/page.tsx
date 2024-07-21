import { Suspense } from "react";

import InvoicesTableSkeleton from "@/app/ui/skeletons";
import Table from "@/app/ui/dashboard/Table";
import Breadcrumps from "@/components/Breadcrumbs";
import { getPatientPrescriptionsController } from "@/app/controllers/prescription";
import { GetPrescriptionDto } from "@/app/dtos/data-access/getPrescriptionDto";

export default function Page() {
  return (
    <div className="w-full">
      <Breadcrumps
        breadcrumbs={[
          {
            href: "prescriptions",
            label: "Prescriptions",
            active: true,
          },
        ]}
      />

      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table
          getData={getPatientPrescriptionsController}
          headerToAttribute={{
            Doctor: "doctor",
            Drugs: "drugs",
            Created: "createdAt",
            "Last Updated": "updatedAt",
          }}
          owner="Patient"
          entity="Prescription"
        />
      </Suspense>
    </div>
  );
}
