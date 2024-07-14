"use server";

import { handleResponse } from "./utility";
import config from "../config";

export async function getAssistant(
  token: string,
  id: string
): Promise<{ error?: string; data: any }> {
  try {
    const response = await fetch(`${config.apiUrl}/doc/spec_assistant/${id}`, {
      headers: {
        authorization: token,
      },
    });

    return handleResponse(response);
  } catch (error: any) {
    console.error(error);
    return {
      error: error.message || error.msg || "An error occurred",
      data: {},
    };
  }
}

export async function getAssistants(token: string) {
  try {
    const response = await fetch(`${config.apiUrl}/doc/assistants`, {
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