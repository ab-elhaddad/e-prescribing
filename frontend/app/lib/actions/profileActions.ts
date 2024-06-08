"use server";

import { z } from "zod";

import config from "../config";
import { typeShorten } from "../constants";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
const { apiUrl } = config;

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
    .max(50, "Department cannot be more than 50 characters")
    .or(z.null()),
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

export const updateProfile = async (
  type: string,
  prevState: any,
  formData: FormData
) => {
  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    department: formData.get("department"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    nationalityId: formData.get("nationalityId"),
    address: formData.get("address"),
    birthDate: new Date(formData.get("birthDate") as string),
    gender: formData.get("gender"),
  };
  const validatedFields = profileFormSchema.safeParse(data);

  if (!validatedFields.success)
    return {
      ...prevState,
      message: "",
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const dataToSend = {
    name: `${data.firstName} ${data.lastName}`,
    department: data.department || "",
    email: data.email,
    phoneNumber: data.phoneNumber,
    nationalityNumber: data.nationalityId,
    address: data.address,
    birthday: data.birthDate,
    gender: data.gender,
  };

  try {
    const reponse = await fetch(`${apiUrl}/${typeShorten[type]}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies().get("authorization")?.value || "",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!reponse.ok) {
      throw { message: await reponse.json() };
    }
  } catch (error: any) {
    console.error(error);
    return {
      isSuccessful: false,
      errors: {
        server:
          error.error ||
          error.message ||
          "An error occurred while updating your profile",
      },
    };
  }

  revalidatePath("/profile");
  return {
    isSuccessful: true,
    errors: {},
  };
};
