export default function snakeToCamel(obj: Record<string, any>) {
  const camelObj: any = {};

  for (const key in obj) {
    const camelKey = key.replace(/([-_][a-z])/gi, ($1) =>
      $1.toUpperCase().replace("-", "").replace("_", "")
    );
    camelObj[camelKey] = obj[key];
  }

  return camelObj;
}