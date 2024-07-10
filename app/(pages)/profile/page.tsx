import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";

import PageHeader from "@/app/ui/custom/PageHeader";
import ProfileForm from "@/app/ui/forms/profileForm";
import PurpleHaloGroup from "@/app/ui/custom/PurpleHaloGroup";
import InvoicesTableSkeleton from "@/app/ui/skeletons";

import { FaUserDoctor, FaUserInjured, FaUserNurse } from "react-icons/fa6";
import { getUser } from "@/app/lib/data";

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

export default function Page() {
  return (
    <>
      <PurpleHaloGroup hiddenIds={[1, 4, 5]} />
      <div>
        <PageHeader title="Your Profile" />
        <Suspense fallback={<InvoicesTableSkeleton />}>
          <ProfileCard />
        </Suspense>
      </div>
    </>
  );
}

async function ProfileCard() {
  const { user, error } = await getUser(
    cookies().get("authorization")?.value || "",
    cookies().get("userType")?.value || ""
  );
  const Icon = getUserIcon(user.type);
  return (
    <>
      <Icon className="text-10xl text-sky-100 bg-sky-700 p-5 rounded-full absolute top-20 md:top-64 left-28 md:left-44 z-30" />
      <div className="container mx-auto px-4 py-4">
        {error ? (
          <h1 className="text-red-500"> {error} </h1>
        ) : (
          <ProfileForm user={user} />
        )}
      </div>
    </>
  );
}
