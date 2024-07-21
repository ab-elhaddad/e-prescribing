export function handleControllerError(error: any): { error: string } {
  console.error(error);
  return { error: error.message || error.msg || "Something went wrong!" };
}
