"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import FullBorderInput from "../custom/FullBorderInput";
import Button from "../custom/Button";

import { updateProfile } from "@/app/lib/actions/profileActions";
import { initialState } from "@/app/ui/forms/auth/signupForm";
import { useAuth } from "@/app/context/AuthProvider";
import FullBorderGenderSelect from "../custom/FullBorderGenderSelect";

export default function ProfileForm({
  user,
}: {
  user: {
    name: string;
    email: string;
    birthday: string;
    phoneNumber: string;
    nationalityId: string;
    address: string;
    gender: "male" | "female";
    department: string;
    type: string
  };
}) {
  const { user: isAuthed } = useAuth();
  const router = useRouter();
  // if (!isAuthed) router.push("/login");

  const updateProfileWithType = updateProfile.bind(null, user.type)

  const [formState, formAction] = useFormState(
    updateProfileWithType,
    initialState
  );
  return (
    <form
      action={formAction}
      className="my-20 pb-10 pt-6 px-10 rounded-lg flex flex-col gap-5 w-full bg-gray-50 relative z-20 shadow-md"
    >
      <div className="flex justify-between items-start mb-5">
        {/* <h1 className="text-3xl text-sky-700 font-bold ml-44">Your Profile</h1> */}
        <Button
          body="Update Profile"
          style={{ margin: "0", marginLeft: "auto", width: "15vw" }}
        />
      </div>
      <div className="flex gap-x-5 w-full">
        <div className="flex justify-between gap-x-3 w-full">
          <div className="w-1/2">
            <FullBorderInput
              type="text"
              placeholder="First Name"
              defaultValue={user.name?.split(" ")[0]}
              name="firstName"
              error={formState.errors?.firstName}
            />
          </div>
          <div className="w-1/2">
            <FullBorderInput
              type="text"
              placeholder="Last Name"
              defaultValue={user.name?.split(" ")[1]}
              name="lastName"
              error={formState.errors?.lastName}
            />
          </div>
        </div>
        <FullBorderInput
          type="text"
          placeholder="Department"
          name="department"
          disabled={user.type !== 'doctor'}
          defaultValue={user.department}
          error={formState.errors?.department}
        />
      </div>

      <div className="flex gap-x-5 w-full">
        <FullBorderInput
          type="email"
          placeholder="E-mail"
          defaultValue={user.email}
          name="email"
          error={formState.errors?.email}
        />

        <FullBorderInput
          type="text"
          placeholder="Phone Number"
          name="phoneNumber"
          defaultValue={user.phoneNumber}
          error={formState.errors?.phoneNumber}
        />
      </div>

      <div className="flex gap-x-5 w-full">
        <FullBorderInput
          type="text"
          placeholder="Nationality ID"
          defaultValue={user.nationalityId}
          name="nationalityId"
          error={formState.errors?.nationalityId}
        />

        <FullBorderInput
          type="text"
          placeholder="Address"
          name="address"
          defaultValue={user.address}
          error={formState.errors?.address}
        />
      </div>

      <div className="flex gap-x-5 w-full">
        <FullBorderGenderSelect defaultValue={user.gender}/>
        <FullBorderInput
          type="date"
          placeholder="Birth Date"
          name="birthDate"
          defaultValue={user.birthday?.split('T')[0]}
          error={formState.errors?.birthDate}
        />
      </div>
    </form>
  );
}
