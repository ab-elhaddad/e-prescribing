import { cookies } from "next/headers";
import clsx from "clsx";
import Row from "./Row";

const styles = {
  th: "text-left p-5 font-semibold bg-gray-50",
};

export default async function Table({
  getData,
  headerToAttribute,
  deleteAction,
  entity,
  owner,
}: {
  getData: (token: string) => Promise<{ error?: string; data: any[] }>;
  headerToAttribute: Record<string, string>;
  deleteAction?: (prevState: any, formData: FormData) => Promise<any>;
  entity?: "Doctor" | "Assistant" | "Patient" | "Drug" | "Prescription";
  owner?: "Doctor" | "Assistant" | "Patient";
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
              data.map((el: any) => {
                const href = 
                `/dashboard`
                + `/${owner?.toLowerCase()}`
                + `/${entity?.toLocaleLowerCase()}s`
                + `/${el._id}`;

                return (
                  <Row
                    el={el}
                    deleteAction={deleteAction}
                    headerToAttribute={headerToAttribute}
                    key={el._id}
                    entity={entity}
                    href={owner === "Doctor" || entity === "Prescription" ? href : undefined}
                  />
                );
              })
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
