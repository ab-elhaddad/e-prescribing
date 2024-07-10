import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
  const userType = cookies().get("userType")?.value;
  redirect(`/dashboard/${userType}`);
}
