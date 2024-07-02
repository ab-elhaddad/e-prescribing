"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import config from "@/app/lib/config";

export async function addPatientAction(prevState: any, formData: FormData) {
  const patientEmail = formData.get("email");
  try {
    const response = await fetch(`${config.apiUrl}/pat/addPatient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies().get("authorization")?.value || "",
      },
      body: JSON.stringify({ email: patientEmail }),
    });

    if (!response.ok) {
      return {
        error: await response.text(),
        isSubmitted: false,
      };
    }

    revalidatePath("/dashboard/patients");
    return {
      ...prevState,
      error: null,
      isSubmitted: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      ...prevState,
      error: error.error || error.message || "Something went wrong!",
      isSubmitted: false,
    };
  }
}

export async function deletePatientAction(prevState: any, formData: FormData) {
  try {
    const response = await fetch(`${config.apiUrl}/doc/delPatient`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies().get("authorization")?.value || "",
      },
      body: JSON.stringify({ patientId: formData.get("id") }),
    });
    // console.log(await response.text());
    if (!response.ok) throw { message: await response.text() };

    revalidatePath("/dashboard/patients");
    return { success: "Patient deleted successfully!", error: null };
  } catch (error: any) {
    console.error(error);
    return {
      error: error.error || error.message || "Something went wrong!",
      success: null,
    };
  }
}

const CreatePatientSchema = z
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

export async function createPatientAction(prevState: any, formData: FormData) {
  const validatedData = CreatePatientSchema.safeParse({
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    birthday: formData.get("birthday") as string,
    email: formData.get("email") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    address: formData.get("address") as string,
    nationalityId: formData.get("nationalityId") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.formErrors.fieldErrors,
      isSubmitted: false,
    };
  }

  const { firstName, lastName } = validatedData.data;
  // @ts-ignore
  validatedData.data.name = `${firstName} ${lastName}`;
  // @ts-ignore
  delete validatedData.data.firstName;
  // @ts-ignore
  delete validatedData.data.lastName

  try {
    const response = await fetch(`${config.apiUrl}/pat/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies().get("authorization")?.value || "",
      },
      body: JSON.stringify(validatedData.data),
    });

    if (!response.ok) {
      return {
        errors: { server: await response.text() },
        isSubmitted: false,
      };
    }

    revalidatePath("/dashboard/patients");
    return {
      ...prevState,
      errors: {},
      isSubmitted: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      ...prevState,
      errors: {
        server: error.error || error.message || "Something went wrong!",
      },
      isSubmitted: false,
    };
  }
}
