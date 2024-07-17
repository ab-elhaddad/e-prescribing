"use server";

import { handleResponse } from "./utility";
import config from "../config";

function handlePrescriptionsData(data: any[]) {
  return data.map((item) => {
    item.drugs = item.drugs.map((drug: any) => drug.name).join(", ");
    item.doctor = item.doctor.name;
    item.createdAt = new Date(item.createdAt).toUTCString().slice(0, -12);
    item.updatedAt = new Date(item.updatedAt).toUTCString().slice(0, -12);
    return item;
  });
}

export async function getPrescription(token: string, id: string) {
  try {
    const response = await fetch(`${config.apiUrl}/pre/${id}`, {
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

export async function getPatientPrescriptions(token: string) {
  try {
    const response = await fetch(`${config.apiUrl}/pat/prescriptions`, {
      headers: {
        authorization: token,
      },
    });
    const { error, data } = await handleResponse(response);
    console.log(data);

    return { error, data: handlePrescriptionsData(data) };
  } catch (error: any) {
    console.error(error);
    return { error: error.message || "An error occurred", data: [] };
  }
}

export async function getDoctorPrescriptions(token: string, id: string) {
  try {
    const response = await fetch(`${config.apiUrl}/doc/prescriptions`, {
      headers: {
        authorization: token,
      },
      cache: "no-cache",
    });

    const { error, data } = await handleResponse(response);
    if (error) return { error, data: [] };
    return {
      error,
      data: handlePrescriptionsData(data).filter((el) => el.patient._id === id),
    };
  } catch (error: any) {
    console.error(error);
    return { error: error.message || "An error occurred", data: [] };
  }
}
