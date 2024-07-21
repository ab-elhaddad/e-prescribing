"use server";

import { unlinkPatientAndDoctorController } from "@/app/controllers/doctor";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function unlinkPatientAndDoctorAction(
  prevState: any,
  formData: FormData
) {
  const patientId = formData.get("id") as string;

  const doctorId = auth().userId;
  if (!doctorId) return { error: "Not logged in" };

  const { error } = await unlinkPatientAndDoctorController(patientId, doctorId);

  revalidatePath("/dashboard/patients");
  return { error, isSuccessful: !!error };
}
