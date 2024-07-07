import { MdOutlineChangeCircle } from "react-icons/md";
import { ZodError } from "../ZodError";
import { clsx } from "clsx";

export default function FullBorderInput({
  type,
  placeholder,
  name,
  style,
  error,
  defaultValue,
  disabled,
  label,
  onChange,
}: {
  type: string;
  placeholder?: string;
  name: string;
  style?: React.CSSProperties;
  error?: any;
  defaultValue?: string;
  disabled?: boolean;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="text-sm ml-2 text-gray-500 mt-1">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled === undefined ? false : disabled}
        className={clsx(
          "focus:outline-none focus:border-sky-500 focus:border-2 px-3 py-2 mb-3 mt-1 border rounded-xl bg-white w-80 w-full",
          error ? "border-red-500" : "border-gray-200",
          disabled ? "bg-gray-200" : "bg-transparent"
        )}
        style={style}
        onChange={onChange}
      />
      <ZodError error={error} style={{ width: "fit-content" }} />
    </div>
  );
}
