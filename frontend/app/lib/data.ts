"use server";

import config from "@/app/lib/config";
import snakeToCamel from "./utils/snakeToCamel";

async function handleResponse(
  response: Response
): Promise<{ error?: string; data: any[] }> {
  if (!response.ok) return { error: await response.text(), data: [] };
  return { data: (await response.json()).reverse() };
}

export async function getPatients(token: string) {
  try {
    const response = await fetch(`${config.apiUrl}/pat/patients`, {
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

export async function getDrugs(token: string) {
  try {
    const response = await fetch(`${config.apiUrl}/drug`, {
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

export async function getPrescriptions(
  token: string
) {
  try {
    const response = await fetch(`${config.apiUrl}/pat/prescriptions`, {
      headers: {
        authorization: token,
      },
    });

    return handleResponse(response);
  } catch (error: any) {
    console.error(error);
    return { error: error.message || "An error occurred", data: [] };
  }
}

export async function getDoctors(token: string) {
  try {
    // The endpoint is not implemented yet
    const response = await fetch(`${config.apiUrl}/doc/doctors`, {
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
