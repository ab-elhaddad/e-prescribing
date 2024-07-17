"use server";

import { handleResponse } from "./utility";
import config from "../config";

export async function getPatient(
  token: string,
  id: string
): Promise<{ error?: string; data: any }> {
  try {
    const response = await fetch(`${config.apiUrl}/pat/get-patient/${id}`, {
      headers: {
        authorization: token,
      },
    });

    const { data, error } = await handleResponse(response);
    if (error) return { error, data: {} };

    return { data: { ...data.patient, prescriptions: data.prescriptions } };
  } catch (error: any) {
    console.error(error);
    return {
      error: error.message || error.msg || "An error occurred",
      data: {},
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