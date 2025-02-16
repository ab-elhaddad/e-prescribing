import {
  createAssistantAction,
  linkAssistantAndDoctorAction,
} from "@/app/actions/doctor";
import Breadcrumbs from "@/components/Breadcrumbs";
import AddForm from "@/forms/dashboard/addForm";
import CreateUserForm from "@/forms/dashboard/doctor/createUserForm";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Assistants", href: "/dashboard/doctor/assistants" },
          {
            label: "Add Assistant",
            href: "/dashboard/doctor/assistants/add",
            active: true,
          },
        ]}
      />
      <div className="flex flex-col gap-y-12">
        <div className="flex flex-col gap-y-2">
          <h1 className="ml-2 text-gray-800">Add by email</h1>
          <AddForm
            addAction={linkAssistantAndDoctorAction}
            entity="Assistant"
            inputPlaceholder="Write assistant's email address"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h1 className="ml-2 text-gray-800">Create new Assistant</h1>
          <CreateUserForm
            createUserAction={createAssistantAction}
            entity="Assistant"
          />
        </div>
      </div>
    </div>
  );
}
