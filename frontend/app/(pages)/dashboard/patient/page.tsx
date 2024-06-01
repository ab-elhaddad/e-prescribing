import { redirect } from "next/navigation";

export default function Page() {
  console.log("Redirecting to /patient/prescribtions");
  redirect("patient/prescribtions");
}
