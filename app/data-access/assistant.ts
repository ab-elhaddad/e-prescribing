"use server";

import { getCurrentUser, getUsers } from "./user";

export async function getAssistantsByDoctor() {
  const doctor = await getCurrentUser();
  if (doctor.role !== "doctor") throw { msg: "Unauthorized" };

  const assistantsIds = doctor.assistants || [];
  return getUsers(assistantsIds);
}
