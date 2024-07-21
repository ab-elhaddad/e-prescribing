import clsx from "clsx";
import Row from "./Row";
import { ControllerReturn } from "@/app/controllers/types";
import { TableEntity, TableOwner } from "./types";

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
  getData: <T>() => Promise<ControllerReturn<any[]>>;
  headerToAttribute: Record<string, string>;
  deleteAction?: (prevState: any, formData: FormData) => Promise<any>;
  entity?: TableEntity;
  owner?: TableOwner;
}) {
  const { error, data } = await getData();
  if (!data) return null;

  return (
    <>
      <div className="max-h-96 overflow-y-auto mt-10 p-3 pt-0 bg-gray-50 rounded-md text-sm md:text-md">
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
                  `/dashboard` +
                  `/${owner?.toLowerCase()}` +
                  `/${entity?.toLocaleLowerCase()}s` +
                  `/${el.id}`;

                return (
                  <Row
                    el={el}
                    deleteAction={deleteAction}
                    headerToAttribute={headerToAttribute}
                    key={el.id}
                    entity={entity}
                    href={
                      owner === "Doctor" || entity === "Prescription"
                        ? href
                        : undefined
                    }
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
