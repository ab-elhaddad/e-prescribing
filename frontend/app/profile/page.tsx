import { Metadata } from "next";

import { FaUserDoctor } from "react-icons/fa6";

import Header from "../ui/custom/Header";
import ProfileForm from './../ui/forms/profileForm';


export const metadata: Metadata = {
  title: "Profile",
};

export default function Page() {
  return (
    <div>
      <Header title="Your Profile" />
      <FaUserDoctor className="text-10xl text-sky-100 bg-sky-700 p-5 rounded-full absolute top-64 left-44 z-30"/>
      <div className="container mx-auto px-4 py-4">
        <ProfileForm/>
      </div>
    </div>
  );
}
