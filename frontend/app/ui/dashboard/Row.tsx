"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";
import DeleteForm from "../forms/dashboard/deleteForm";
import CreatePrescriptionButton from "./CreatePrescriptionButton";

const styles = {
  td: "text-left px-5 py-3 border-b border-gray-200",
};

export default function Row({
  el,
  deleteAction,
  headerToAttribute,
  entity,
  href,
}: {
  el: any;
  deleteAction?: (prevState: any, formData: FormData) => Promise<any>;
  headerToAttribute: Record<string, string>;
  entity?: "Doctor" | "Assistant" | "Patient" | "Drug" | "Prescription" | "Pending-Prescription";
  href?: string;
}) {
  const router = useRouter();
  const handleClick = () => {
    router.push(href as string);
  };

  return (
    <tr
      className={clsx(
        "rounded-md hover:bg-sky-100 hover:text-sky-500 duration-200",
        { "cursor-pointer": href }
      )}
    >
      {Object.values(headerToAttribute).map((attribute: string) => (
        <td
          key={el._id}
          className={styles.td}
          onClick={href ? handleClick : undefined}
        >
          {" "}
          {el[attribute] || "N/A"}{" "}
        </td>
      ))}
      {deleteAction && (
        <td className="px-5 py-3 border-b border-gray-200 flex justify-end gap-x-3">
          {entity === "Patient" && (
            <CreatePrescriptionButton patientId={el._id} />
          )}
          <DeleteForm entityId={el._id} deleteAction={deleteAction} />
        </td>
      )}
    </tr>
  );
}
