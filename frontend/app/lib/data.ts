"use server";

import config from "@/app/lib/config";
import snakeToCamel from "./utils/snakeToCamel";
import { typeShorten } from "./constants";

async function handleResponse(
  response: Response
): Promise<{ error?: string; data: any[] | any }> {
  if (!response.ok) return { error: await response.text(), data: [] };
  const data = await response.json();
  if (Array.isArray(data)) {
    const camelData = data.map((item: any) => snakeToCamel(item));
    return { data: camelData.reverse() };
  } 
  
  return { data: snakeToCamel(data) };
}

export async function getUser(
  token: string,
  type: string
): Promise<{ user: any; error?: string }> {
  const shortType = typeShorten[type];
  try {
    const response = await fetch(`${config.apiUrl}/${shortType}/`, {
      headers: {
        authorization: token,
      },
    });

    if (!response.ok) return { error: await response.text(), user: {} };

    const user = await response.json();
    return { user: { ...user, type } };
  } catch (error: any) {
    console.error(error);
    return {
      error: error.message || error.msg || "An error occurred",
      user: {},
    };
  }
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

export async function getPrescriptions(token: string) {
  try {
    const response = await fetch(`${config.apiUrl}/pat/prescriptions`, {
      headers: {
        authorization: token,
      },
    });
    const { error, data } = await handleResponse(response);

    const handledData = data.map((item: any) => {
      item.drugs = item.drugs.map((drug: any) => drug.name).join(", ");
      item.doctor = item.doctor.name;
      item.createdAt = new Date(item.createdAt).toLocaleString();
      item.updatedAt = new Date(item.updatedAt).toLocaleString();
      return item;
    });

    return { error, data: handledData };
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
