"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/inputs/Button";

export default function Error() {
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center justify-center gap-y-3"
      style={{ height: "60vh" }}
    >
      <h1 className="text-2xl text-red-500">Something went wrong!</h1>
      <div className="flex gap-x-5">
        <Button body="Go Back" onClick={() => router.back()} />
        <Button body="Try Again" onClick={() => router.refresh()} />
      </div>
    </div>
  );
}
