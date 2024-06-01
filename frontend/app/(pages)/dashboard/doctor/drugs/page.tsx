import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";

import Table from "@/app/ui/dashboard/Table";
import Breadcrumps from "@/app/ui/custom/Breadcrumbs";
import Button from "@/app/ui/custom/Button";
import InvoicesTableSkeleton from "@/app/ui/skeletons";
import {
  addDrugAction,
  deleteDrugAction,
} from "@/app/lib/actions/drugsActions";
import { getDrugs } from "@/app/lib/data";
import { GoPlus } from "react-icons/go";

export const metadata: Metadata = {
  title: "Drugs",
};

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
              <div className="flex justify-between items-center w-full">
                Add Drug
                <GoPlus className="text-2xl" />
              </div>
            }
            style={{
              width: "15vw",
              marginTop: "0",
              fontWeight: "500",
            }}
          />
        </Link>
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table
          getData={getDrugs}
          headerToAttribute={{
            Name: "name",
            Usage: "usage",
            "Side Effects": "sideEffects",
          }}
          deleteAction={deleteDrugAction}
        />
      </Suspense>
    </div>
  );
}
