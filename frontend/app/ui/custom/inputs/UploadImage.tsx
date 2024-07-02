"use client";

import { useState } from "react";
import { FaImage } from "react-icons/fa6";
import { ZodError } from "../ZodError";

export default function UploadImage({
  label,
  hint,
  inputName,
  error,
}: {
  label: string;
  hint?: string;
  inputName: string;
  error?: any;
}) {
  const [imageName, setImageName] = useState<string | null>(null);

  const fileUploadHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImageName(file ? file.name : null);
  };

  return (
    <>
      <label htmlFor={inputName} className="text-sm ml-2 text-gray-500">
        {label}
        {" "}
        <span className="text-xs text-gray-400">{hint}</span>
      </label>
      <label
        htmlFor={inputName}
        className="w-full flex justify-center p-[1.4vh] bg-sky-600 hover:bg-sky-500 duration-300 cursor-pointer rounded-lg"
      >
        {imageName ? (
          <p className="text-white text-sm">{imageName}</p>
        ) : (
          <FaImage className="text-white text-xl" />
        )}
      </label>
      <input
        type="file"
        id={inputName}
        name={inputName}
        hidden
        onChange={fileUploadHandler}
      />
      <ZodError error={error} />
    </>
  );
}
