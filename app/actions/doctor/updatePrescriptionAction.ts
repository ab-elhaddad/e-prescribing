import { ActionReturn } from "../types";

export async function updatePrescriptionAction(
  drugs: string[],
  prevState: any,
  formData: FormData,
): Promise<ActionReturn<{ server?: string }>> {
  return { success: true };
}
