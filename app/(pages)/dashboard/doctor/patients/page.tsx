import Link from "next/link";
import { Suspense } from "react";

import Breadcrumps from "@/components/Breadcrumbs";
import InvoicesTableSkeleton from "@/app/ui/skeletons";
import Table from "@/app/ui/dashboard/Table";
import Button from "@/components/inputs/Button";
import { GoPlus } from "react-icons/go";

import {
  unlinkPatientAndDoctorAction
} from "@/app/actions/doctor";
import { getPatientsByDoctorController } from "@/app/controllers/doctor";

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
          deleteAction={unlinkPatientAndDoctorAction}
          getData={getPatientsByDoctorController}
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
