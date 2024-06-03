"use server";

import { cookies } from "next/headers";
import config from "@/app/lib/config";
import { revalidatePath } from "next/cache";

export async function addPatientAction(prevState: any, formData: FormData) {
  const patientEmail = formData.get("email");
  try {
    const response = await fetch(`${config.apiUrl}/pat/addPatient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies().get("authorization")?.value || "",
      },
      body: JSON.stringify({ email: patientEmail }),
    });

    if (!response.ok) {
      return {
        error: await response.text(),
        isSubmitted: false,
      }
    }

    revalidatePath("/dashboard/patients");
    return {
      ...prevState,
      error: null,
      isSubmitted: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      ...prevState,
      error: error.error || error.message || "Something went wrong!",
      isSubmitted: false,
    };
  }
}

export async function deletePatientAction(prevState: any, formData: FormData) {
  try {
    const response = await fetch(`${config.apiUrl}/doc/delPatient`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies().get("authorization")?.value || "",
      },
      body: JSON.stringify({ patientId: formData.get("id") }),
    });
    // console.log(await response.text());
    if (!response.ok) throw { message: await response.text() };

    revalidatePath("/dashboard/patients");
    return { success: "Patient deleted successfully!", error: null };
  } catch (error: any) {
    console.error(error);
    return {
      error: error.error || error.message || "Something went wrong!",
      success: null,
    };
  }
}
