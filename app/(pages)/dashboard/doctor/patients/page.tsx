import { Suspense } from "react";

import InvoicesTableSkeleton from "@/app/ui/skeletons";
import AddForm from "@/forms/dashboard/addForm";
import Table from "@/app/ui/dashboard/Table";
import Breadcrumps from "@/components/Breadcrumbs";
import {
  addPatientAction,
  deletePatientAction,
} from "@/app/lib/actions/patientsActions";
import { getPatients } from "@/app/lib/data-access/patientData";
import Button from "@/components/inputs/Button";
import Link from "next/link";
import { GoPlus } from "react-icons/go";

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <Breadcrumps
          breadcrumbs={[
            { href: "./patients", label: "Patients", active: true },
          ]}
        />
        <Link href="patients/add" className="md:w-[12vw]">
          <Button
            body={
              <div className="flex justify-between items-center w-full">
                Add Patient
                <GoPlus className="text-2xl" />
              </div>
            }
            type="button"
          />
        </Link>
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table
          deleteAction={deletePatientAction}
          getData={getPatients}
          headerToAttribute={{
            Name: "name",
            Email: "email",
            Phone: "phoneNumber",
          }}
          entity="Patient"
          owner="Doctor"
        />
      </Suspense>
    </div>
  );
}
