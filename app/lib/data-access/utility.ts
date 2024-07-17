import snakeToCamel from "../utils/snakeToCamel";

export async function handleResponse(
  response: Response
): Promise<{ error?: string; data: any[] | any }> {
  console.log(response);

  if (!response.ok) return { error: await response.text(), data: [] };
  const data = await response.json();
  console.log(data);

  if (Array.isArray(data)) {
    const camelData = data.map((item: any) => snakeToCamel(item));
    return { data: camelData.reverse() };
  }

  return { data: snakeToCamel(data) };
}
