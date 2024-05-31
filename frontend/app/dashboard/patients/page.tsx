import { Suspense } from "react";
import { Metadata } from "next";

import InvoicesTableSkeleton from "@/app/ui/skeletons";
import AddForm from "@/app/ui/forms/dashboard/addForm";
import Table from "@/app/ui/dashboard/Table";
import Breadcrumps from "@/app/ui/custom/Breadcrumbs";
import {
  addPatientAction,
  deletePatientAction,
} from "@/app/lib/actions/patientsActions";
import { getPatients } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Patients",
};

export default async function Page() {
  return (
    <div className="w-full">
      <Breadcrumps
        breadcrumbs={[
          { href: "/dashborad/patients", label: "Patients", active: true },
        ]}
      />

      <AddForm
        addAction={addPatientAction}
        entity="Patient"
        inputPlaceholder="Write patient's email address"
      />
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table
          deleteAction={deletePatientAction}
          getData={getPatients}
          headerToAttribute={{
            Name: "name",
            Email: "email",
            Phone: "phoneNumber",
          }}
        />
      </Suspense>
    </div>
  );
}
