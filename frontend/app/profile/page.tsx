import { Metadata } from "next";

import { FaUserDoctor, FaUserInjured, FaUserNurse } from "react-icons/fa6";

import Header from "../ui/custom/Header";
import ProfileForm from "./../ui/forms/profileForm";
import config from "../lib/config";
import { cookies, headers } from "next/headers";
import { typeShorten } from "../lib/constants";

export const metadata: Metadata = {
  title: "Profile",
};

function getUserIcon(role: string) {
  switch (role) {
    case "doctor":
      return FaUserDoctor;
    case "assistant":
      return FaUserNurse;
    default:
      return FaUserInjured;
  }
}

async function getUser() {
  const userType = cookies().get("userType")?.value || "";

  const user = await fetch(`${config.apiUrl}/${typeShorten[userType]}/`, {
    headers: {
      authorization: cookies().get("authorization")?.value || "",
    },
  }).then((res) => res.json());
  return {
    ...user,
    type: userType,
  };
}

export default async function Page() {
  const user = await getUser();
  const Icon = getUserIcon(user.type);
  return (
    <div>
      <Header title="Your Profile" />
      <Icon className="text-10xl text-sky-100 bg-sky-700 p-5 rounded-full absolute top-64 left-44 z-30" />
      <div className="container mx-auto px-4 py-4">
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
