import { CSSProperties } from "react";

export function ZodError({
  error,
  style,
}: {
  error: string[];
  style?: CSSProperties;
}) {
  if (!error) return null;
  return error.map((err: string, index: number) => (
    <div key={index} className="text-red-500 text-xs italic w-80" style={style}>
      {err}
    </div>
  ));
}
