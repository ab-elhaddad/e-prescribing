import SideNav from "@/app/ui/dashboard/SideNav";
import { protectDashboardRole } from "../utility";

export default function Layout({ children }: { children: React.ReactNode }) {
  protectDashboardRole("assistant");
  return (
    <div className="flex flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav links={["Scan"]} />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
