"use server";

export async function createPrescriptionAction(
  selectedDrugs: any[],
  prevState: any,
  formData: FormData,
) {
  return {
    errors: {
      server: undefined,
    },
    success: true,
  };
}
