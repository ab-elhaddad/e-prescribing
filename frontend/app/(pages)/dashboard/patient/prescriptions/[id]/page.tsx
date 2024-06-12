import Link from "next/link";
import { cookies } from "next/headers";

import Breadcrumbs from "@/app/ui/custom/Breadcrumbs";
import FullBorderInput from "@/app/ui/custom/FullBorderInput";
import Button from "@/app/ui/custom/Button";
import { getPrescription } from "@/app/lib/data";

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

function handleData(data: any) {
  data.drugs = data.drugs.map((drug: any) => {
    drug.similarDrugs = drug.similar_drugs.join(", ");
    delete drug.similar_drugs;
    drug.sideEffects = drug.side_effects.join(", ");
    delete drug.side_effects;
    drug.contraindications = drug.contraindications.join(", ");
    return drug;
  });
}

async function PrescriptionDetails({ id }: { id: string }) {
  const token = cookies().get("authorization")?.value || "";
  const { data, error } = await getPrescription(token, id);
  if (error)
    return (
      <div className="w-full laign-center p-5 bg-gray-50 text-red-500">
        {error}
      </div>
    );

  handleData(data);
  return (
    <div className="w-full p-5 bg-gray-50 rounded-md flex flex-col gap-y-3">
      <div className="flex justify-between gap-x-5 mb-3">
        <FullBorderInput
          name="doctorName"
          label="Doctor Name"
          type="text"
          disabled={true}
          defaultValue={data.doctor.name}
        />
        <FullBorderInput
          name="doctorPhoneNumber"
          label="Doctor Phone Number"
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
    <div className="flex justify-between gap-x-3">
      <FullBorderInput
        name="name"
        disabled={true}
        label="Drug Name"
        defaultValue={drug.name}
        type="text"
      />
      <FullBorderInput
        name="usage"
        disabled={true}
        label="Drug Usage"
        defaultValue={drug.usage}
        type="text"
      />
      <FullBorderInput
        name="sideEffects"
        disabled={true}
        label="Drug Side Effects"
        defaultValue={drug.sideEffects}
        type="text"
      />
      <FullBorderInput
        name="contraindications"
        disabled={true}
        label="Drug Contraindications"
        defaultValue={drug.contraindications}
        type="text"
      />
      <FullBorderInput
        name="similarDrugs"
        disabled={true}
        label="Drug Similar Drugs"
        defaultValue={drug.similarDrugs}
        type="text"
      />
    </div>
  );
}
