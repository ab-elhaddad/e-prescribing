export async function scanPrescriptionAction(
  prevState: any,
  formData: FormData,
): Promise<{
  errors: {
    prescriptionImage?: string[];
    patientEmail?: string[];
    doctorEmail?: string[];
    server?: string;
  };
  success: boolean;
}> {
  return {
    errors: {
      prescriptionImage: undefined,
      patientEmail: undefined,
      doctorEmail: undefined,
      server: undefined,
    },
    success: true,
  };
}
