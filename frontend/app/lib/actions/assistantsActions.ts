"use server";

import { cookies } from "next/headers";
import config from "@/app/lib/config";
import { revalidatePath } from "next/cache";

export async function addAssistantAction(prevState: any, formData: FormData) {
  const assistantEmail = formData.get("email");
  try {
    const response = await fetch(`${config.apiUrl}/doc/addAssistant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies().get("authorization")?.value || "",
      },
      body: JSON.stringify({ email: assistantEmail }),
    });
    console.log(await response.text());

    if (!response.ok) {
      throw await response.text();
    }

    revalidatePath("/dashboard/assistants");
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

export async function deleteAssistantAction(prevState: any, formData: FormData) {
  try {
    const response = await fetch(`${config.apiUrl}/doc/delAssistant`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies().get("authorization")?.value || "",
      },
      body: JSON.stringify({ id: formData.get("id") }),
    });
    if (!response.ok) throw { message: await response.text() };

    revalidatePath("/dashboard/assistants");
    return { success: "Assistant deleted successfully!", error: null };
  } catch (error: any) {
    console.error(error);
    return {
      error: error.error || error.message || "Something went wrong!",
      success: null,
    };
  }
}
