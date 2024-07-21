import {
  deletePendingPrescription,
  getPendingPrescription,
  getPendingPrescriptions,
} from "../data-access/pendingPrescription";
import getPendingPrescriptionDto, {
  GetPendingPrescriptionDto,
} from "../dtos/data-access/GetPendingPrescriptionDto";
import PendingPrescriptionsPersistenceDto from "../dtos/persistence/PendingPrescriptionPersistenceDto";
import { ControllerReturn } from "./types";
import { handleControllerError } from "./utility";

export async function getPendingPrescriptionController(
  id: string,
): Promise<ControllerReturn<GetPendingPrescriptionDto>> {
  try {
    const pendingPrescription = await getPendingPrescription(id);
    return { data: getPendingPrescriptionDto(pendingPrescription) };
  } catch (error) {
    return handleControllerError(error);
  }
}

export async function getPendingPrescriptionsController(): Promise<
  ControllerReturn<GetPendingPrescriptionDto[]>
> {
  try {
    const pendingPrescriptions = await getPendingPrescriptions();
    return {
      data: pendingPrescriptions.map(
        (pendingPrescription: PendingPrescriptionsPersistenceDto) =>
          getPendingPrescriptionDto(pendingPrescription),
      ),
    };
  } catch (error) {
    return handleControllerError(error);
  }
}

export async function deletePendingPrescriptionController(
  id: string,
): Promise<ControllerReturn<void>> {
  try {
    await deletePendingPrescription(id);
    return { data: undefined };
  } catch (error) {
    return handleControllerError(error);
  }
}
