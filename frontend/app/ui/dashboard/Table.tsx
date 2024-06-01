import { cookies } from "next/headers";
import clsx from "clsx";
import DeleteForm from "../forms/dashboard/deleteForm";

const styles = {
  th: "text-left p-5 font-semibold bg-gray-50",
  td: "text-left px-5 py-3 border-b border-gray-200 rounded-md",
};

export default async function Table({
  getData,
  headerToAttribute,
  deleteAction,
}: {
  getData: (token: string) => Promise<{ error?: string; data: any[] }>;
  headerToAttribute: Record<string, string>;
  deleteAction?: (prevState: any, formData: FormData) => Promise<any>;
}) {
  const { error, data } = await getData(
    cookies().get("authorization")?.value || ""
  );
  return (
    <>
      <div className="max-h-96 overflow-y-auto mt-10 p-3 pt-0 bg-gray-50 rounded-md">
        <table className="w-full rounded-md">
          <thead className="bg-white sticky top-0">
            <tr>
              {Object.keys(headerToAttribute).map((el) => (
                <th key={el} className={styles.th}>
                  {el}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.length !== 0 ? (
              data.map((el: any) => (
                <Row
                  el={el}
                  deleteAction={deleteAction}
                  headerToAttribute={headerToAttribute}
                  key={el._id}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={Object.keys(headerToAttribute).length}
                  className={clsx("text-center py-5", error && "text-red-500")}
                >
                  {error || "No data found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Row({
  el,
  deleteAction,
  headerToAttribute,
}: {
  el: any;
  deleteAction?: (prevState: any, formData: FormData) => Promise<any>;
  headerToAttribute: Record<string, string>;
}) {
  return (
    <tr>
      {Object.keys(headerToAttribute).map((header) => {
        let value = el[headerToAttribute[header]] || "N/A";
        if (Array.isArray(value)) value = value.join(", ");
        return (
          <td key={header} className={styles.td}>
            {value}
          </td>
        );
      })}
      {deleteAction && (
        <td className="px-5 py-3 border-b border-gray-200 flex justify-end gap-x-3">
          <DeleteForm entityId={el._id} deleteAction={deleteAction} />
        </td>
      )}
    </tr>
  );
}
