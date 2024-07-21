import { z } from "zod";

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
  requestFormData.append("file", data.prescriptionImage as File);
  try {
    // const response = await fetch(config.ocrApi as string, {
    //   headers: {
    //     Authorization: "Basic " + btoa(`${config.ocrApiKey}:`),
    //   },
    //   method: "POST",
    //   body: requestFormData,
    // });

    // if (!response.ok) {
    //   throw {
    //     message:
    //       (await response.json()).errors[0].reason || "Something went wrong!",
    //   };
    // }
    // const ocrResult = (await response.json()).result[0].prediction as Array<{
    //   label: string;
    //   ocr_text: string;
    // }>;

    // const drugs = getDrugsFromOcrResult(ocrResult);
    const drugs = [
      "Climbosis 5",
      "Aggrex 75",
      "Lanoxine 0.25",
      "Empa Cora 10",
      "Selkom",
      "Panadol",
    ];
    console.log(drugs);

    const drugsIds = await getDrugsIds(drugs, validatedData.data.doctorEmail);
    console.log(drugsIds);

    return {
      errors: {},
      isSubmitted: true,
    };
    // return await createPendingPrescription(
    //   drugsIds,
    //   validatedData.data.patientEmail,
    //   validatedData.data.doctorEmail,
    // );
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

function getDrugsFromOcrResult(
  ocrResult: { label: string; ocr_text: string }[],
) {
  const drugs: string[] = [];
  const ocrMap = new Map<string, string>();

  // Create a map for quick lookup
  ocrResult.forEach((ocr) => {
    ocrMap.set(ocr.label, ocr.ocr_text);
  });

  let drugCounter = 1;
  while (true) {
    const medicationLabel = `Medication_${drugCounter}`;
    const dosageLabel = `Dosage_${drugCounter}`;

    let medication = ocrMap.get(medicationLabel);
    if (!medication) break; // No more medications
    if (medication.startsWith("RI")) medication = medication.slice(2); // Remove "RI" prefix

    const dosage = ocrMap.get(dosageLabel) || "";

    const drugWithDosage = `${medication} ${dosage}`;
    drugs.push(drugWithDosage.trim());

    drugCounter++;
  }

  return drugs;
}

async function getDrugsIds(drugs: string[], doctorEmail: string) {}