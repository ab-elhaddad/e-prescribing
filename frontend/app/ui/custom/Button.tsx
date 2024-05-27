import { ReactNode } from "react";

export default function Button({
  body,
  onClick,
  style,
}: {
  body: string | ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <button
      type="submit"
      className="bg-sky-600 duration-300 hover:bg-sky-500 text-white font-semibold p-3 rounded-md w-40 mt-3 hover:tracking-wide duration-500"
      onClick={onClick}
      style={style}
    >
      {body}
    </button>
  );
}
