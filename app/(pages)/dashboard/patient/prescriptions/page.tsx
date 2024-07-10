import { Suspense } from "react";
import { Metadata } from "next";

import InvoicesTableSkeleton from "@/app/ui/skeletons";
import Table from "@/app/ui/dashboard/Table";
import Breadcrumps from "@/app/ui/custom/Breadcrumbs";
import { getPatientPrescriptions } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Prescriptions",
};

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
          getData={getPatientPrescriptions}
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
