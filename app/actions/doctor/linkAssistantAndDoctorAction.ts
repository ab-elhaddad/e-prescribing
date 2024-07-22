"use server";

import { ActionReturn } from "../types";

export async function linkAssistantAndDoctorAction(
  prevState: any,
  formData: FormData,
): Promise<ActionReturn<void>> {
  return {
    success: true,
  };
}
