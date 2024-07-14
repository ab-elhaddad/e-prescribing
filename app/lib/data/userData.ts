"use server";

import config from "../config";
import { typeShorten } from "../constants";

export async function getUser(
  token: string,
  type: string
): Promise<{ user: any; error?: string }> {
  const shortType = typeShorten[type];
  try {
    const response = await fetch(`${config.apiUrl}/${shortType}/`, {
      headers: {
        authorization: token,
      },
    });

    if (!response.ok) return { error: await response.text(), user: {} };

    const user = await response.json();
    return { user: { ...user, type } };
  } catch (error: any) {
    console.error(error);
    return {
      error: error.message || error.msg || "An error occurred",
      user: {},
    };
  }
}
