"use server";

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

export async function addDrugAction(prevState: any, formData: FormData) {
  return {
    errors: {
      name: undefined,
      usage: undefined,
      server: undefined,
    },
    success: true,
  };
}
