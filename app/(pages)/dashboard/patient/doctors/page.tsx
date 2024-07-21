import { Suspense } from "react";

import InvoicesTableSkeleton from "@/app/ui/skeletons";
import Table from "@/app/ui/dashboard/Table";
import Breadcrumps from "@/components/Breadcrumbs";
import { getDoctorsByPatientController } from "@/app/controllers/patient";

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
          getData={getDoctorsByPatientController}
          headerToAttribute={{
            Doctor: "fullName",
            Department: "department",
            Email: "email",
            Phone: "phoneNumber"
          }}
        />
      </Suspense>
    </div>
  );
}
