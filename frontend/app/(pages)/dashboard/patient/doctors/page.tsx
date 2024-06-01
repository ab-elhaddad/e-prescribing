import { Suspense } from "react";
import { Metadata } from "next";

import InvoicesTableSkeleton from "@/app/ui/skeletons";
import Table from "@/app/ui/dashboard/Table";
import Breadcrumps from "@/app/ui/custom/Breadcrumbs";
import { getDoctors } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Doctors",
};

export default function Page() {
  return (
    <div className="w-full">
      <Breadcrumps
        breadcrumbs={[
          {
            href: "doctors",
            label: "Doctors",
            active: true,
          },
        ]}
      />

      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table
          getData={getDoctors}
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
