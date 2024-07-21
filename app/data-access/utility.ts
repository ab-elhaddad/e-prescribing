import { auth } from "@clerk/nextjs/server";

/**
 * Handle the user id. If the id is not provided, it will use the current user id.
 * If the current user is not authenticated, it will throw an error.
 * @param id The user id.
 *
 * @returns The user id.
 */
export function handleUserId(id?: string): string {
  if (id !== undefined) return id;
  const { userId } = auth();
  if (!userId) throw { msg: "Not authenticated" };
  return userId;
}
