"use server";

import getUserDto, { GetUserDto } from "@/app/dtos/data-access/getUserDto";
import { UpdateUserDto } from "@/app/dtos/data-access/updateUserDto";
import UserPersistenceDto from "@/app/dtos/persistence/UserPersistenceDto";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getUser(): Promise<{
  user?: GetUserDto;
  error?: string;
}> {
  try {
    const { userId } = auth() as { userId: string };
    const user = (await clerkClient().users.getUser(
      userId
    )) as UserPersistenceDto;
    user.publicMetadata.role ||= "patient";

    const mappedUser = getUserDto(user);
    return {
      user: mappedUser,
    };
  } catch (error: any) {
    console.error(error);
    return { error: error.message || error.msg || "Something went wrong!" };
  }
}

export async function updateUser(
  user: UpdateUserDto
): Promise<{ isSuccessful: boolean; error?: string }> {
  try {
    const { userId } = auth() as { userId: string };

    clerkClient().users.updateUser(userId, {
      firstName: user.firstName,
      lastName: user.lastName,
      publicMetadata: {
        address: user.address,
        dob: user.dob,
        gender: user.gender,
      },
    });

    return {
      isSuccessful: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      isSuccessful: false,
      error:
        error.msg ||
        error.message ||
        "An error occurred while updating your profile",
    };
  }
}
