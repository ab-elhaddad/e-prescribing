import React from "react";
import { cookies } from "next/headers";

import Breadcrumbs from "@/app/ui/custom/Breadcrumbs";
import Button from "@/app/ui/custom/Button";
import FullBorderInput from "@/app/ui/custom/FullBorderInput";
import Link from "next/link";

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
      <Breadcrumbs
        breadcrumbs={[
          {
            label: entity,
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
      <div className="bg-gray-50 rounded-md p-5 items-center gap-2 max-h-[60vh] overflow-y-scroll">
        {error ? (
          <h1 className="text-red-500">{error}</h1>
        ) : (
          Object.entries(data).map(([attribute, value]) => (
            attributeToLabel[attribute] &&
            <FullBorderInput
              label={attributeToLabel[attribute]}
              name={attribute}
              defaultValue={value as string}
              type="text"
              disabled={true}
              key={attribute}
            />
          ))
        )}
      </div>
      <Link href=".">
        <Button body="Back" variant="secondary" />
      </Link>
    </div>
  );
}
