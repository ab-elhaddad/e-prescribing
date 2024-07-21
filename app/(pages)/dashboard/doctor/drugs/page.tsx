import { Suspense } from "react";
import Link from "next/link";

import Table from "@/app/ui/dashboard/Table";
import Breadcrumps from "@/components/Breadcrumbs";
import Button from "@/components/inputs/Button";
import InvoicesTableSkeleton from "@/app/ui/skeletons";
import { deleteDrugAction } from "@/app/actions/drug";
import { GoPlus } from "react-icons/go";
import { getDrugsByDoctorController } from "@/app/controllers/drug";

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <Breadcrumps
          breadcrumbs={[
            { href: "/dashboard/doctor/drugs", label: "Drugs", active: true },
          ]}
        />
        <Link href={"drugs/add"}>
          <Button
            body={
              <div className="flex w-full items-center justify-between">
                Add Drug
                <GoPlus className="text-2xl" />
              </div>
            }
          />
        </Link>
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table
          getData={getDrugsByDoctorController}
          headerToAttribute={{
            Name: "name",
            Usage: "usage",
            "Side Effects": "sideEffects",
          }}
          deleteAction={deleteDrugAction}
          owner="Doctor"
          entity="Drug"
        />
      </Suspense>
    </div>
  );
}
