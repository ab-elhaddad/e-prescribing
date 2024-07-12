import { ZodError } from "../ZodError";

export default function BottomBorderInput({
  type,
  placeholder,
  name,
  style,
  error,
}: {
  type: string;
  placeholder?: string;
  name: string;
  style?: React.CSSProperties;
  error: any;
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className={`focus:outline-none bg-transparent py-3 border-b-2 
          ${error ? "border-red-500" : "border-gray-300"}
          focus:border-sky-500 pb-1 my-3 w-80`}
        style={style}
      />
      <ZodError error={error} />
    </>
  );
}
