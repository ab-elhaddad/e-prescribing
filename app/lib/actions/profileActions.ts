"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { updateUser } from "../data-access/userData";

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
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(100, "Address cannot be more than 100 characters")
    .or(z.string().max(0)),
  dob: z.date({ message: "Please enter a valid date" }),
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

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ isSuccessful: boolean; errors: UpdateProfileErrors }> => {
  const validatedFields = profileFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    address: formData.get("address"),
    dob: new Date(formData.get("dob") as string),
    gender: formData.get("gender"),
  });

  if (!validatedFields.success)
    return {
      isSuccessful: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const { isSuccessful, error } = await updateUser(validatedFields.data);

  if (isSuccessful) {
    revalidatePath("/profile");
  }

  return {
    isSuccessful,
    errors: { server: error },
  };
};
