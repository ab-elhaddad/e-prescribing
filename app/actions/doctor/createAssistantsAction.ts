import { z } from "zod";

const CreateAssistantSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long" }),
    lastName: z.string().min(2, "Last name must be at least 2 characters long"),
    birthday: z.string().refine((val) => !isNaN(Date.parse(val)), {
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

export async function createAssistantAction(
  prevState: any,
  formData: FormData,
) {}
