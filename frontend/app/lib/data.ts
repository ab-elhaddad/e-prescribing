'use server'

import config from "@/app/lib/config";

export async function getPatients(token: string) {
  const patients = await fetch(`${config.apiUrl}/pat/patients`, {
    headers: {
      authorization: token || "",
    },
  });

  try {
    const data: any[] = await patients.json();
    return data.reverse();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAssistants(token: string) {
  const assistants = await fetch(`${config.apiUrl}/doc/assistants`, {
    headers: {
      authorization: token || "",
    },
  });

  try {
    const data: any[] = await assistants.json();
    return data.reverse();
  } catch (error) {
    return [];
  }
}

export async function getDrugs (token: string) {
  const drugs = await fetch(`${config.apiUrl}/drug`, {
    headers: {
      authorization: token || "",
    },
  });
  try {
    const data: any[] = await drugs.json();
    return data.reverse().map((drug) => {
      drug.side_effects = drug.side_effects.join(", ");
      drug.sideEffects = drug.side_effects;
      delete drug.side_effects;

      drug.similar_drugs = drug.similar_drugs.join(", ");
      drug.similarDrugs = drug.similar_drugs;
      delete drug.similar_drugs;

      drug.contraindications = drug.contraindications.join(", ");

      return drug;
    });
  } catch (error) {
    return [];
  }
}