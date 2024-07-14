"use server";

import { handleResponse } from "./utility";
import config from "../config";

export async function getPendingPrescription(token: string, id: string) {
  try {
    const response = await fetch(`${config.apiUrl}/pen/${id}`, {
      headers: {
        authorization: token,
      },
    });

    const { error, data } = await handleResponse(response);
    if (error) return { error, data };

    return { error, data };
  } catch (error: any) {
    console.error(error);
    return {
      error: error.message || error.msg || "An error occurred",
      data: {},
    };
  }
}

export async function getPendingPrescriptions(token: string) {
  try {
    const response = await fetch(`${config.apiUrl}/pen`, {
      headers: {
        authorization: token,
      },
    });

    const { error, data } = await handleResponse(response);
    if (error) return { error, data };

    data.forEach((el: any) => {
      el.patient = el.patientId.name;
      el.drugs = el.drugs.map((drug: any) => drug.name).join(", ");
    });

    return { error, data };
  } catch (error: any) {
    console.error(error);
    return {
      error: error.message || error.msg || "An error occurred",
      data: [],
    };
  }
}
