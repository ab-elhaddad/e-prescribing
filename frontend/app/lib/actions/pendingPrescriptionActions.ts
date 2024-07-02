"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import config from "../config";

export async function scanPrescriptionAction(
  prevState: any,
  formData: FormData
): Promise<{
  errors: {
    prescriptionImage?: string[];
    patientEmail?: string[];
    doctorEmail?: string[];
    server?: string;
  };
  isSubmitted: boolean;
}> {
  const data = {
    prescriptionImage: formData.get("prescriptionImage"),
    patientEmail: formData.get("patientEmail"),
    doctorEmail: formData.get("doctorEmail"),
  };

  const validatedData = z
    .object({
      prescriptionImage: z.object({ name: z.string() }),
      patientEmail: z.string().email("Invalid email address"),
      doctorEmail: z.string().email("Invalid email address"),
    })
    .safeParse(data);

  if (!validatedData.success) {
    return {
      errors: validatedData.error.formErrors.fieldErrors,
      isSubmitted: false,
    };
  }

  const requestFormData = new FormData();
  // requestFormData.append("patientEmail", data.patientEmail as string);
  requestFormData.append("image", data.prescriptionImage as File);

  try {
    const response = await fetch(config.aiModelUrl as string, {
      method: "POST",
      body: requestFormData,
      redirect: "follow",
    });

    if (!response.ok) {
      throw { message: "Something went wrong!" };
    }

    const drugs = (await response.json()).ocr as Array<string>;
    const filteredDrugs = drugs.filter(
      (drug) =>
        !drug.includes("*") && !drug.includes("/") && !drug.includes("+")
    );
    const drugsIds = await getDrugsIds(
      filteredDrugs,
      validatedData.data.doctorEmail
    );

    return await createPendingPrescription(
      drugsIds,
      validatedData.data.patientEmail,
      validatedData.data.doctorEmail
    );
  } catch (error: any) {
    console.error(error);
    return {
      errors: {
        server: error.error || error.message || "Something went wrong!",
      },
      isSubmitted: false,
    };
  }
}

async function getDrugsIds(drugs: string[], doctorEmail: string) {
  const response = await fetch(`${config.apiUrl}/drug//model-drugs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies().get("authorization")?.value || "",
    },
    body: JSON.stringify({ drugs, email: doctorEmail }),
  });

  if (!response.ok) {
    throw { message: await response.text() };
  }

  return await response.json();
}

async function createPendingPrescription(
  drugs: string[],
  patientEmail: string,
  doctorEmail: string
) {
  try {
    const response = await fetch(`${config.apiUrl}/pen/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies().get("authorization")?.value || "",
      },
      body: JSON.stringify({ drugs, patientEmail, doctorEmail }),
    });
    console.log(response);

    if (!response.ok) {
      throw { message: await response.text() };
    }

    return { errors: {}, isSubmitted: true };
  } catch (error: any) {
    console.error(error);
    return {
      errors: {
        server: error.error || error.message || "Something went wrong!",
      },
      isSubmitted: false,
    };
  }
}

export async function deletePendingPrescriptionAction(
  prevState: any,
  formData: FormData
) {
  const id = formData.get("id") as string;
  const token = cookies().get("authorization")?.value || "";
  return deletePendingPrescription(id, token);
}

export async function deletePendingPrescription(id: string, token: string) {
  try {
    const response = await fetch(
      `${config.apiUrl}/pen/del/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    if (!response.ok) {
      throw { message: await response.text() };
    }

    return { errors: {} };
  } catch (error: any) {
    console.error(error);
    return {
      errors: {
        server: error.error || error.message || "Something went wrong!",
      },
    };
  }
}