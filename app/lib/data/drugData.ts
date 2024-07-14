"use server";

import { handleResponse } from "./utility";
import config from "../config";

export async function getDrug(token: string, id: string) {
  try {
    const response = await fetch(`${config.apiUrl}/drug/spec_drug/${id}`, {
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

export async function getDrugs(token: string) {
  try {
    const response = await fetch(`${config.apiUrl}/drug`, {
      headers: {
        authorization: token,
      },
    });

    const { data, error } = await handleResponse(response);
    if (error) return { error, data: [] };

    data.forEach((el: any) => (el.sideEffects = el.sideEffects.join(", ")));
    return { error, data };
  } catch (error: any) {
    console.error(error);
    return {
      error: error.message || error.msg || "An error occurred",
      data: [],
    };
  }
}
