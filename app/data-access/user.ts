"use server";

import getUserDto from "@/app/dtos/user/getUserDto";
import { UpdateUserDto } from "@/app/dtos/user/updateUserDto";
import UserPersistenceDto from "@/app/dtos/user/userPersistenceDto";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getUser(id: string) {
  const user = (await clerkClient().users.getUser(id)) as UserPersistenceDto;
  user.publicMetadata.role ||= "patient";

  return getUserDto(user);
}

export async function getCurrentUser() {
  const { userId } = auth() as { userId: string };
  return getUser(userId);
}

export async function getCurrentUserId() {
  const { userId } = auth() as { userId: string };
  return userId;
}

export async function getUsers(ids: string[]) {
  const users = (
    await clerkClient().users.getUserList({
      emailAddress: ids,
    })
  ).data;
  return users.map((user) => getUserDto(user));
}

export async function updateUser(user: UpdateUserDto) {
  const { userId } = auth() as { userId: string };

  return clerkClient().users.updateUser(userId, {
    firstName: user.firstName,
    lastName: user.lastName,
    publicMetadata: {
      address: user.address,
      dob: user.dob,
      gender: user.gender,
    },
  });
}

export async function getUserId(email: string) {
  const users = await clerkClient().users.getUserList({
    emailAddress: [email],
  });
  return users.data[0].id;
}
