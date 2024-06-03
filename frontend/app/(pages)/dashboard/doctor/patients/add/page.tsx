import Breadcrumbs from "@/app/ui/custom/Breadcrumbs";
import AddPatientForm from "@/app/ui/forms/dashboard/doctor/addPatientForm";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-5">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Patients", href: "/dashboard/doctor/patients" },
          { label: "Add Patient", href: "/dashboard/doctor/patients/add", active: true },
        ]}
      />

      <AddPatientForm />
    </div>
  );
}
