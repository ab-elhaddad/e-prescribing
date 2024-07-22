import { getDoctorsByPatient } from "../data-access/doctor";
import { handleControllerError } from "./utility";
import { ControllerReturn } from "./types";
import { GetUserDto } from "../dtos/user/getUserDto";

export async function getDoctorsByPatientController():Promise<ControllerReturn<GetUserDto[]>> {
  try {
    const doctors = await getDoctorsByPatient();
    return { data: doctors };
  } catch (error: any) {
    return handleControllerError(error);
  }
}
