import Link from "next/link";
import { Suspense } from "react";
import { GoPlus } from "react-icons/go";

import Table from "@/app/ui/dashboard/Table";
import Button from "@/components/inputs/Button";
import Breadcrumps from "@/components/Breadcrumbs";
import InvoicesTableSkeleton from "@/app/ui/skeletons";

import { deleteAssistantAction } from "@/app/actions/doctor";
import { getAssistantsByDoctorController } from "@/app/controllers/doctor";

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <Breadcrumps
          breadcrumbs={[
            { href: "./assistants", label: "Assistants", active: true },
          ]}
        />
        <Link href="assistants/add" className="md:w-[12vw]">
          <Button
            body={
              <div className="flex justify-between items-center w-full">
                Add Assistant
                <GoPlus className="text-2xl" />
              </div>
            }
            type="button"
          />
        </Link>
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table
          getData={getAssistantsByDoctorController}
          headerToAttribute={{
            Name: "name",
            Email: "email",
            Phone: "phoneNumber",
          }}
          deleteAction={deleteAssistantAction}
          owner="Doctor"
          entity="Assistant"
        />
      </Suspense>
    </div>
  );
}
