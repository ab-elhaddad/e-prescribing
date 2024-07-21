import Link from "next/link";

import Breadcrumbs from "@/components/Breadcrumbs";
import FullBorderInput from "@/components/inputs/FullBorderInput";
import Button from "@/components/inputs/Button";
import FullBorderParagraph from "@/components/FullBorderParagraph";
import { getPrescriptionController } from "@/app/controllers/prescription";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-y-3">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Prescriptions", href: "/dashboard/patinet/prescriptions" },
          {
            label: "Prescription Details",
            href: `/dashboard/patient/prescriptions/${params.id}`,
            active: true,
          },
        ]}
      />
      <PrescriptionDetails id={params.id} />
      <Link href=".">
        <Button body="Cancel" variant="secondary" />
      </Link>
    </div>
  );
}

async function PrescriptionDetails({ id }: { id: string }) {
  const { error, data } = await getPrescriptionController(id);
  if (!data)
    return (
      <div className="w-full laign-center p-5 bg-gray-50 text-red-500">
        {error}
      </div>
    );

  return (
    <div className="w-full p-5 bg-gray-50 rounded-md flex flex-col gap-y-5 text-sm md:text-base">
      <div className="flex justify-between gap-x-5 mb-3">
        <FullBorderInput
          name="doctorName"
          label="Doctor Name"
          type="text"
          disabled={true}
          defaultValue={data.doctor.fullName || ""}
        />
        <FullBorderInput
          name="doctorPhoneNumber"
          label="Phone Number"
          type="tel"
          disabled={true}
          defaultValue={data.doctor.phoneNumber}
        />
      </div>
      {data.drugs.map((drug: any) => (
        <SingleDrug key={drug._id} drug={drug} />
      ))}
    </div>
  );
}

function SingleDrug({ drug }: { drug: any }) {
  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between gap-x-3 border-b border-b-gray-200">
      <FullBorderParagraph label="Drug Name" content={drug.name} name="name" />
      <FullBorderParagraph
        label="Drug Usage"
        content={drug.usage}
        name="usage"
      />
      <FullBorderParagraph
        label="Side Effects"
        content={drug.sideEffects}
        name="sideEffects"
      />
      <FullBorderParagraph
        label="Contraindications"
        content={drug.contraindications}
        name="contraindications"
      />
      <FullBorderParagraph
        label="Similar Drugs"
        content={drug.similarDrugs}
        name="similarDrugs"
      />
    </div>
  );
}
