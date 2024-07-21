import { z } from "zod";
import { ActionReturn } from "../types";
import { formDataToObject, handleActionError } from "../utility";
import { createPatient } from "@/app/data-access/patient";

const CreatePatientSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long" }),
    lastName: z.string().min(2, "Last name must be at least 2 characters long"),
    dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Date must br valid",
    }),
    email: z.string().email("Invalid email address"),
    phoneNumber: z
      .string()
      .min(11, "Phone number must be at least 11 characters long")
      .max(11, "Phone number must be at most 11 characters long"),
    address: z.string().min(5, "Address must be at least 5 characters long"),
    nationalityId: z
      .string()
      .min(14, "National ID must be at least 14 characters long")
      .max(14, "National ID must be at most 14 characters long"),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function createPatientAction(
  prevState: any,
  formData: FormData,
): Promise<
  ActionReturn<{
    server?: string[];
    firstName?: string[];
    lastName?: string[];
    dob?: string[];
    email?: string[];
    phoneNumber?: string[];
    address?: string[];
    password?: string[];
  }>
> {
  try {
    const validatedData = CreatePatientSchema.safeParse(
      formDataToObject(formData),
    );

    if (!validatedData.success) {
      return { success: false, errors: validatedData.error.flatten().fieldErrors };
    }

    await createPatient(validatedData.data);

    return { success: true };
  } catch (error) {
    return handleActionError(error);
  }
}
