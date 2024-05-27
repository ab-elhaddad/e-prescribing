import { ZodError } from "./ZodError";

export default function FullBorderInput({
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
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className={`focus:outline-none bg-transparent p-3 border-2 rounded-xl shadow-sm focus:border-sky-500 my-2 w-80 w-full text-start text-left
          ${error ? "border-red-500" : "border-gray-200"}`}
        style={style}
      />
      <ZodError error={error} style={{width: "fit-content"}}/>
    </div>
  );
}
