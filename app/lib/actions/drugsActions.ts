"use server";

import { cookies } from "next/headers";
import config from "@/app/lib/config";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const AddDrugSchema = z.object({
  name: z
    .string()
    .min(5, "Drug name must be at least 5 chracters")
    .max(50, "Drug name must be at most 50 characters"),
  usage: z
    .string()
    .min(5, "Drug usage must be at least 5 chracters")
    .max(50, "Drug usage must be at most 50 characters"),
});

export async function addDrugAction(
  prevState: any,
  formData: FormData
): Promise<{
  errors: { [key: string]: string | string[] | undefined };
  success: string;
}> {
  const data = {
    name: formData.get("name"),
    usage: formData.get("usage"),
    sideEffects: (formData.get("sideEffects") as string)
      .split(",")
      .map((sideEffect) => sideEffect.trim()),
    contraindications: formData.get("contraindications")
      ? (formData.get("contraindications") as string)
          .split(",")
          .map((contraindication) => contraindication.trim())
      : [],
    similarDrugs: (formData.get("similarDrugs") as string)
      .split(",")
      .map((similarDrug) => similarDrug.trim()),
  };

  console.log(data);

  const validationResult = AddDrugSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      success: "",
    };
  }

  try {
    const response = await fetch(`${config.apiUrl}/drug/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies().get("authorization")?.value || "",
      },
      body: JSON.stringify({
        name: data.name,
        usage: data.usage,
        side_effects: data.sideEffects,
        contraindications: data.contraindications,
        similar_drugs: data.similarDrugs,
      }),
    });

    if (!response.ok) {
      throw await response.text();
    }

    revalidatePath("/dashboard/drugs");
    revalidatePath("/dashboard/drugs/add");
    return {
      errors: {},
      success: "Drug added successfully!",
    };
  } catch (error: any) {
    console.error(error);
    return {
      errors: {
        server: error.error || error.message || "Something went wrong!",
      },
      success: "",
    };
  }
}

export async function deleteDrugAction(prevState: any, formData: FormData) {
  const id = formData.get("id");
  try {
    const response = await fetch(`${config.apiUrl}/drug/del/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: cookies().get("authorization")?.value || "",
      }
    });
    console.log(response);
    if (!response.ok) throw { message: await response.text() };

    revalidatePath("/dashboard/drugs");
    return { success: "Drug deleted successfully!", error: null };
  } catch (error: any) {
    console.error(error);
    return {
      error: error.error || error.message || "Something went wrong!",
      success: null,
    };
  }
}
