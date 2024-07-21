"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { linkPatientAndDoctorController } from "@/app/controllers/doctor";

export async function linkPatientAndDoctorAction(
  prevState: any,
  formData: FormData
) {
  const patientEmail = formData.get("email") as string;
  z.string()
    .email({ message: "Invalid email address" })
    .safeParse(patientEmail);

  const doctorId = auth().userId;
  if (!doctorId) return { error: "Not logged in", isSuccessful: false };
  const { error } = await linkPatientAndDoctorController(
    patientEmail,
    doctorId
  );

  revalidatePath("/dashboard/patients");
  return {
    error,
    isSuccessful: !!error,
  };
}
