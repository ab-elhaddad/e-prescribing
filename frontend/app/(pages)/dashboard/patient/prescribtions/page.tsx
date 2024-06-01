import { Suspense } from "react";
import { Metadata } from "next";

import InvoicesTableSkeleton from "@/app/ui/skeletons";
import Table from "@/app/ui/dashboard/Table";
import Breadcrumps from "@/app/ui/custom/Breadcrumbs";
import { getPrescriptions } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Prescribtions",
};

export default function Page() {
  return (
    <div className="w-full">
      <Breadcrumps
        breadcrumbs={[
          {
            href: "prescribtions",
            label: "Prescribtions",
            active: true,
          },
        ]}
      />

      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table
          getData={getPrescriptions}
          headerToAttribute={{
            Doctor: "doctor",
            Drugs: "drugs",
            Created: "createdAt",
            "Last Updated": "updatedAt",
          }}
        />
      </Suspense>
    </div>
  );
}
