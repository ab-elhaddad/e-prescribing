export function formDataToObject(formData: FormData) {
  const obj: Record<string, string> = {};
  formData.forEach((value, key) => {
    obj[key] = value.toString();
  });
  return obj;
}

export function handleActionError(error: any) {
  console.log(error);
  return {
    success: false,
    errors: { server: error.msg || error.message || "An error occurred" },
  };
}
