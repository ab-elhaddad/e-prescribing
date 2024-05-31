import { ReactNode } from "react";
import clsx from "clsx";
import LoadingSpinner from "./LoadingSpinner";

export default function Button({
  body,
  onClick,
  style,
  variant,
  type,
  pending,
}: {
  body: string | ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  variant?: "primary" | "secondary";
  type?: "submit" | "reset" | "button";
  pending?: boolean;
}) {
  return (
    <button
      type={type || "submit"}
      disabled={pending || false}
      className={clsx(
        "font-semibold px-3 py-2 rounded-md w-40 mt-3 hover:tracking-wide duration-500 flex justify-center items-center",
        {
          "bg-sky-600 hover:bg-sky-500 text-white":
            variant === undefined || variant === "primary",
        },
        { "bg-gray-50 text-gray-800": variant === "secondary" }
      )}
      onClick={onClick}
      style={style}
    >
      {pending ? <LoadingSpinner /> : body}
    </button>
  );
}
