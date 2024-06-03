import DeleteForm from "../forms/dashboard/deleteForm";
import CreatePrescriptionButton from "./CreatePrescriptionButton";

const styles = {
  td: "text-left px-5 py-3 border-b border-gray-200 rounded-md",
};

export default function Row({
  el,
  deleteAction,
  headerToAttribute,
  entity,
}: {
  el: any;
  deleteAction?: (prevState: any, formData: FormData) => Promise<any>;
  headerToAttribute: Record<string, string>;
  entity?: "Doctor" | "Assistant" | "Patient";
}) {
  return (
    <tr>
      {Object.values(headerToAttribute).map((attribute: string) => (
        <td className={styles.td}> {el[attribute] || "N/A"} </td>
      ))}
      <td className="px-5 py-3 border-b border-gray-200 flex justify-end gap-x-3">
        {entity === "Patient" && <CreatePrescriptionButton patientId={el._id}/>}
        {deleteAction && (
          <DeleteForm entityId={el._id} deleteAction={deleteAction} />
        )}
      </td>
    </tr>
  );
}