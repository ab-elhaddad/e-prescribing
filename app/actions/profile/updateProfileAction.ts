"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { updateUserController } from "@/app/controllers/user";

const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be 2 characters at least")
    .max(50, {
      message: "First name cannot be more than 50 characters",
    }),
  lastName: z
    .string()
    .min(2, "Last name must be 2 characters at least")
    .max(50, {
      message: "Last name cannot be more than 50 characters",
    }),
  address: z.optional(
    z
      .string()
      .min(10, "Address must be at least 10 characters")
      .max(100, "Address cannot be more than 100 characters")
  ),
  dob: z.optional(z.string()),
  gender: z.enum(["male", "female"], {
    message: "Please select a valid gender",
  }),
});

type UpdateProfileErrors = {
  firstName?: string[];
  lastName?: string[];
  address?: string[];
  dob?: string[];
  gender?: string[];
  server?: string;
};

export async function updateProfileAction(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; errors: UpdateProfileErrors }> {
  const validatedFields = profileFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    address: formData.get("address") || undefined,
    dob: formData.get("dob") || undefined,
    gender: formData.get("gender"),
  });

  if (!validatedFields.success)
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const { error } = await updateUserController(validatedFields.data);
  if (!error) {
    revalidatePath("/profile");
  }

  return {
    success: !error,
    errors: { server: error },
  };
}
