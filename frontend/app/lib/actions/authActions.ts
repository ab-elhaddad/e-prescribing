"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import data from "../config";
import config from "../config";
const { baseUrl } = data;

const SignupFormSchema = z
  .object({
    firstName: z.string().min(1, {
      message: "First name is required",
    }),
    lastName: z.string().min(1, {
      message: "Last name is required",
    }),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Please enter a valid date",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function signupAction(prevState: any, formData: FormData) {
  const validatedData = SignupFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    dateOfBirth: formData.get("dateOfBirth") as string,
  });

  if (!validatedData.success) {
    return {
      ...prevState,
      errors: validatedData.error.flatten().fieldErrors,
      message: "",
    };
  }

  const { firstName, lastName, email, password, dateOfBirth } =
    validatedData.data;
  const fullName = `${firstName} ${lastName}`;

  try {
    const response = await fetch(`${baseUrl}/pat/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fullName,
        email,
        password,
        birthday: dateOfBirth,
      }),
    });
    redirect("/login");
  } catch (error: any) {
    return {
      ...prevState,
      errors: {},
      message:
        "ERROR: " +
        (error.error || "An error occurred. Please try again later."),
    };
  }
}

const LoginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  role: z.enum(["doctor", "patient", "assistant"]),
});

export async function loginAction(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  };
  const validatedData = LoginFormSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      ...prevState,
      errors: validatedData.error.flatten().fieldErrors,
      message: "",
    };
  }

  const { email, password } = validatedData.data;

  let endpoint = "";
  switch (validatedData.data.role) {
    case "doctor":
      endpoint = "/doc/signIn";
      break;
    case "patient":
      endpoint = "/pat/signIn";
      break;
    case "assistant":
      endpoint = "/ast/signIn";
      break;
  }

  try {
    // throw { error: "Thrown error." };

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const { tokens } = await response.json();
    // cookies().set("Authorization", tokens[0].token, {
    //   sameSite: "strict",
    //   // secure: true,
    //   maxAge: 60 * 60 * 24 * 7, // 1 week
    // });

    // redirect("/");

    return {
      data,
      errors: {},
      message: "SUCCESS: Login successful",
      token: tokens[0].token,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ...prevState,
      errors: {},
      message:
        "ERROR: " +
        (error.error || "An error occurred. Please try again later."),
    };
  }
}

export async function getUserAction (role: string) {
  let reqRole;
    switch (role) {
      case "doctor":
        reqRole = "doc";
        break;
      case "assistant":
        reqRole = "ast";
        break;
      case "patient":
        reqRole = "pat";
        break;
    }

    const userData = fetch(`${config.baseUrl}/${reqRole}/`).then((res) => res);
    return userData;
  }
