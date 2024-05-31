"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

import config from "../config";
import { typeShorten } from "../constants";
const { apiUrl } = config;

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
    };
  }

  const { firstName, lastName, email, password, dateOfBirth } =
    validatedData.data;
  const fullName = `${firstName} ${lastName}`;

  try {
    await fetch(`${apiUrl}/pat/signup`, {
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
  } catch (error: any) {
    console.log(error);
    return {
      ...prevState,
      errors: {
        server: error.error || error.message || "Something went wrong!",
      },
    };
  }
  redirect("/login");
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

    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((value) => value.json());

    const {
      tokens,
    }: { tokens: Array<{ token: string; _id: string; userType: string }> } =
      response;

    const token = tokens?.at(-1)?.token || "";

    cookies().set("authorization", `Bearer ${token}`, {
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    const { userType } = jwtDecode(token) as {
      userType: string;
      _id: string;
      iat: number;
    };
    cookies().set("userType", userType, {
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return {
      data,
      errors: {},
      token: token,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ...prevState,
      errors: {
        server: error.error|| error.message || "Something went wrong!",
      },
    };
  }
}

export async function getUserAction(role: string) {
  const userData = await fetch(`${config.apiUrl}/${typeShorten[role]}/`).then(
    (res) => res
  );
  return userData;
}
