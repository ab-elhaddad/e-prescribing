"use server";

import config from "@/app/lib/config";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createPrescriptionAction(
  selectedDrugs: any[],
  prevState: any,
  formData: FormData
): Promise<{
  errors: {
    server?: string;
    drugs?: string;
  };
  isSuccess: boolean;
}> {
  const data = {
    patient: formData.get("id"),
    drugs: selectedDrugs.map((drug) => drug._id),
  };

  if (selectedDrugs.length === 0) {
    return {
      errors: { drugs: "Please select at least one drug" },
      isSuccess: false,
    };
  }

  try {
    const response = await fetch(`${config.apiUrl}/pre/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: cookies().get("authorization")?.value || "",
      },
      body: JSON.stringify(data),
    });
    console.log(response);

    if (!response.ok) throw { message: await response.text() };

    return { errors: {}, isSuccess: true };
  } catch (error: any) {
    return {
      errors: { server: error.message || "Something went wrong!" },
      isSuccess: false,
    };
  }
}

export async function deletePrescriptionAction(
  prevState: any,
  formData: FormData
): Promise<{
  success: string | null;
  error: string | null;
}> {
  const id = formData.get("id");
  try {
    const response = await fetch(`${config.apiUrl}/pre/del/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies().get("authorization")?.value || "",
      },
    });

    if (!response.ok) throw { success: null, error: await response.text() };

    revalidatePath(`/dashboard/doctor/patients/${id}`);
    return { success: "Prescription deleted successfully!", error: null };
  } catch (error: any) {
    return {
      success: null,
      error: error.error || error.message || "Something went wrong!",
    };
  }
}

export async function updatePrescription(
  drugs: string[],
  prevState: any,
  formData: FormData
) {
  const data = {
    drugs,
  };
  console.log(drugs);
  try {
    const response = await fetch(
      `${config.apiUrl}/pre/update/${formData.get("id")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies().get("authorization")?.value || "",
        },
        body: JSON.stringify(data),
      }
    );
    console.log(response);
    if (!response.ok) throw { message: await response.text() };

    revalidatePath(`/dashboard/doctor/prescriptions/${formData.get("id")}`);
    return { isSuccessful: true, erorr: "" };
  } catch (error: any) {
    return {
      error: error.message as string || "Something went wrong!",
      isSuccessful: false,
    };
  }
}
