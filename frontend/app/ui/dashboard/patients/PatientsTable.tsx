import { cookies } from "next/headers";
import config from "@/app/lib/config";
import DeletePatientForm from "../../forms/deletePatientForm";

async function getPatients(docToken?: string) {
  const patients = await fetch(`${config.apiUrl}/pat/patients`, {
    headers: {
      authorization: docToken || "",
    },
  });

  try {
    const data: any[] = await patients.json();
    return data.reverse();
  } catch (error) {
    return [];
  }
}

const styles = {
  th: "text-left p-5 font-semibold bg-gray-50",
  td: "text-left px-5 py-3 border-b border-gray-200 rounded-md",
};

export default async function PatientsTable() {
  // const patients = await getPatients(cookies().get("authorization")?.value);
  const patients = [];
  return (
    <>
      <div className="max-h-96 overflow-y-auto mt-10 p-3 pt-0 bg-gray-50 rounded-md">
        <table className="w-full rounded-md">
          <thead className="bg-white sticky top-0">
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Phone</th>
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {patients.length !== 0 ? (
              patients.map((patient: any) => (
                <tr key={patient._id}>
                  <td className={styles.td}>{patient.name}</td>
                  <td className={styles.td}>{patient.email}</td>
                  <td className={styles.td}>{patient.phone || "-"}</td>
                  <td className="px-5 py-3 border-b border-gray-200 flex justify-end gap-x-3">
                    <DeletePatientForm patientId={patient._id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-5">
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
