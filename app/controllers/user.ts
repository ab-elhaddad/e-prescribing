import { auth } from "@clerk/nextjs/server";
import { getUser, updateUser } from "../data-access/user";
import { handleControllerError } from "./utility";
import { ControllerReturn } from "./types";
import { GetUserDto } from "../dtos/data-access/getUserDto";
import { UpdateUserDto } from "../dtos/data-access/updateUserDto";

export async function getCurrentUserController(): Promise<
  ControllerReturn<GetUserDto>
> {
  try {
    const userId = auth().userId;
    if (!userId) throw { msg: "User not found" };
    const user = await getUser(userId);
    return { data: user };
  } catch (error) {
    return handleControllerError(error);
  }
}

export async function updateUserController(
  user: UpdateUserDto
): Promise<ControllerReturn<void>> {
  try {
    await updateUser(user);
    return { data: undefined };
  } catch (error: any) {
    return handleControllerError(error);
  }
}
