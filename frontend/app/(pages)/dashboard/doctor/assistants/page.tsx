import { Suspense } from "react";
import { Metadata } from "next";

import Table from "@/app/ui/dashboard/Table";
import Breadcrumps from "@/app/ui/custom/Breadcrumbs";
import AddForm from "@/app/ui/forms/dashboard/addForm";
import InvoicesTableSkeleton from "@/app/ui/skeletons";

import {
  addAssistantAction,
  deleteAssistantAction,
} from "@/app/lib/actions/assistantsActions";
import { getAssistants } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Assistants",
};

export default async function Page() {
  return (
    <div className="w-full">
      <Breadcrumps breadcrumbs={[{href: ".", label: "Assistants", active: true}]}/>
      <AddForm addAction={addAssistantAction} entity="Assistant" inputPlaceholder="Write assistant's email address"/>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table
          getData={getAssistants}
          headerToAttribute={{
            Name: "name",
            Email: "email",
            Phone: "phoneNumber",
          }}
          deleteAction={deleteAssistantAction}
        />
      </Suspense>
    </div>
  );
}
