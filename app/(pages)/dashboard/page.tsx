import { getCurrentUserController } from "@/app/controllers/user";
import { redirect } from "next/navigation";

export default async function Page() {
  const { data: user } = await getCurrentUserController();
  const role = user?.role;
  redirect(`/dashboard/${role}`);
}
