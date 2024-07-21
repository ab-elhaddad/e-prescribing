import { getCurrentUser } from "@/app/data-access/user";
import { redirect } from "next/navigation";

export function protectDashboardRole(
  allowedRole: "doctor" | "patient" | "assistant"
) {
  getCurrentUser().then((user) => {
    if (user.role !== "assistant") {
      redirect("/dashboard");
    }
  });
}
