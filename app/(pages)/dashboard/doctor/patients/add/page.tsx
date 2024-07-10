import { addPatientAction, createPatientAction } from "@/app/lib/actions/patientsActions";
import Breadcrumbs from "@/app/ui/custom/Breadcrumbs";
import AddForm from "@/app/ui/forms/dashboard/addForm";
import CreateUserForm from "@/app/ui/forms/dashboard/doctor/createUserForm";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Patients", href: "/dashboard/doctor/patients" },
          {
            label: "Add Patient",
            href: "/dashboard/doctor/patients/add",
            active: true,
          },
        ]}
      />
      <div className="flex flex-col gap-y-12">
        <div className="flex flex-col gap-y-2">
          <h1 className="ml-2 text-gray-800">Add by email</h1>
          <AddForm
            addAction={addPatientAction}
            entity="Patient"
            inputPlaceholder="Write patient's email address"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h1 className="ml-2 text-gray-800">Create new patient</h1>
          <CreateUserForm
            entity="Patient"
            createUserAction={createPatientAction}
          />
        </div>
      </div>
    </div>
  );
}
