import { z } from "zod";

import data from "../config";
const { baseUrl } = data;

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
  department: z
    .string()
    .max(50, "Department cannot be more than 50 characters"),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z
    .string()
    .min(11, "Phone number must be 11 characters")
    .max(11, "Phone number must be 11 characters")
    .or(z.string().max(0)),
  nationalityId: z
    .string()
    .min(11, "Nationality ID must be 11 characters")
    .max(11, "Nationality ID must be 11 characters")
    .or(z.string().max(0)),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(100, "Address cannot be more than 100 characters")
    .or(z.string().max(0)),
  birthDate: z.date({ message: "Please enter a valid date" }),
});

export type ProfileForm = z.infer<typeof profileFormSchema>;
export default profileFormSchema;

export const updateProfile = async (prevState: any, formData: FormData) => {
  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    department: formData.get("department"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    nationalityId: formData.get("nationalityId"),
    address: formData.get("address"),
    birthDate: new Date(formData.get("birthDate") as string),
  };
  const validatedFields = profileFormSchema.safeParse(data);

  if (!validatedFields.success)
    return {
      ...prevState,
      message: "",
      errors: validatedFields.error.flatten().fieldErrors,
    };

  try {
    const response = await fetch(`${baseUrl}/doc/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return {
      ...prevState,
      message: "",
      errors: { server: "An error occurred while updating your profile" },
    };
  }

  return {
    data: validatedFields.data,
    message: "Profile updated successfully",
    errors: null,
  };
};
