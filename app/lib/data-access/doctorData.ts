"use server";

import { handleResponse } from "./utility";
import config from "../config";

export async function getDoctors(token: string) {
  try {
    const response = await fetch(`${config.apiUrl}/pat/doctors`, {
      headers: {
        authorization: token,
      },
    });
    return handleResponse(response);
  } catch (error: any) {
    console.error(error);
    return {
      error: error.message || error.msg || "An error occurred",
      data: [],
    };
  }
}
