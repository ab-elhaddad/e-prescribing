import Breadcrumbs from "@/app/ui/custom/Breadcrumbs";
import ScanForm from "@/app/ui/forms/dashboard/assistant/scanForm";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-5">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/assistant/scan" },
          { label: "Scan", href: "/dashboard/assistant/scan", active: true },
        ]}
      />
      <ScanForm />
    </div>
  );
}
