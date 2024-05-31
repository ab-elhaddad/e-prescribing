import { ZodError } from "./ZodError";

export default function FullBorderInput({
  type,
  placeholder,
  name,
  style,
  error,
  defaultValue,
  disabled,
}: {
  type: string;
  placeholder?: string;
  name: string;
  style?: React.CSSProperties;
  error?: any;
  defaultValue?: string;
  disabled?: boolean;
}) {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled === undefined ? false : disabled}
        className={`focus:outline-none text-md px-3 py-2 border rounded-xl bg-white focus:border-sky-500 focus:border-2 my-2 w-80 w-full 
          ${error ? "border-red-500" : "border-gray-200"}
          ${disabled ? "bg-gray-200" : "bg-transparent"}`}
        style={style}
      />
      <ZodError error={error} style={{ width: "fit-content" }} />
    </div>
  );
}
