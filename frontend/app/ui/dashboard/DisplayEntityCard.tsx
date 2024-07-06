import React from "react";
import { cookies } from "next/headers";

import Breadcrumbs from "@/app/ui/custom/Breadcrumbs";
import Button from "@/app/ui/custom/inputs/Button";
import FullBorderInput from "@/app/ui/custom/inputs/FullBorderInput";
import Link from "next/link";
import Table from "./Table";
import { deletePrescriptionAction } from "@/app/lib/actions/doctorActions";
import { RiSurveyLine } from "react-icons/ri";
import { getDoctorPrescriptions } from "@/app/lib/data";

export default async function DisplayEntityCard({
  entityId,
  entity,
  attributeToLabel,
  getEntity,
}: {
  entityId: string;
  entity: "Drug" | "Patient" | "Assistant";
  attributeToLabel: Record<string, string>;
  getEntity: (token: string, entityId: string) => Promise<any>;
}) {
  const token = cookies().get("authorization")?.value as string;
  const { error, data } = await getEntity(token, entityId);
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <Breadcrumbs
          breadcrumbs={[
            {
              label: `${entity}s`,
              href: "/dashboard/doctor/drugs",
            },
            {
              label:
                entity === "Patient" || entity === "Assistant"
                  ? data.name?.split(" ")[0]
                  : data.name,
              href: ".",
              active: true,
            },
          ]}
        />
        {entity === "Patient" && <AddPrescriptionButton id={entityId} />}
      </div>
      <div className="bg-gray-50 rounded-md p-5 items-center gap-2 max-h-[60vh] overflow-y-scroll">
        {error ? (
          <h1 className="text-red-500">{error}</h1>
        ) : (
          Object.entries(data).map(
            ([attribute, value]) =>
              attributeToLabel[attribute] &&
              (attribute === "prescriptions" ? (
                <Prescriptions token={token} id={entityId} />
              ) : (
                <FullBorderInput
                  label={attributeToLabel[attribute]}
                  name={attribute}
                  defaultValue={value as string}
                  type="text"
                  disabled={true}
                  key={attribute}
                />
              ))
          )
        )}
      </div>
      <Link href=".">
        <Button body="Back" variant="secondary" />
      </Link>
    </div>
  );
}

async function Prescriptions({ token, id }: { token: string; id: string }) {
  const getData = async (token: string) => {
    return getDoctorPrescriptions(token, id);
  };

  return (
    <Table
      getData={getData}
      headerToAttribute={{
        Doctor: "doctor",
        Drugs: "drugs",
        Date: "createdAt",
      }}
      owner="Doctor"
      entity="Prescription"
      deleteAction={deletePrescriptionAction}
    />
  );
}

function AddPrescriptionButton({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/doctor/patients/${id}/add-prescription`}>
      <Button
        body={
          <div className="flex justify-between items-center w-full">
            Create Prescription
            <RiSurveyLine className="text-2xl" />
          </div>
        }
        style={{
          width: "35vh"
        }}
      />
    </Link>
  );
}
