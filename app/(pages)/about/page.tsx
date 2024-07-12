import { Metadata } from "next";

import PageHeader from "@/components/PageHeader";
import PurpleHaloGroup from "@/components/PurpleHaloGroup";
import Divider from '@/components/Divider'

export const metadata: Metadata = {
  title: "About us",
};

export default function Page() {
  return (
    <>
      <PurpleHaloGroup />

      <div className="flex-col justify-center relative z-30">
        <PageHeader title="About us" />

        <div className="mx-10 md:mx-20 flex-col justify-center items-center">
          <div className="flex flex-col md:flex-row justify-around my-12 py-4 backdrop-blur-md bg-gray-50 md:bg-white/30 rounded-2xl hover:-translate-y-1 shadow-sm transition duration-500 ease-in-out">
            <div>
              <div className="border-b-4 border-sky-500 w-fit p-3 m-3">
                <h1 className="text-4xl md:text-5xl font-bold text-sky-500">
                  Our <span className="text-gray-700">{`doctors'`}</span>
                  <br /> achievements
                </h1>
              </div>
              <p className="w-[30ch] md:w-[50ch] p-3 text-sm md:text-base">
                Our doctors are the best in the world. They have won many awards
                and have been recognized by many organizations. They are the
                best in the world. We have variety of doctors who are
                specialized in different fields. We have doctors who are
                specialized in heart, brain, kidney, liver, etc. We have doctors
                who are specialized in different diseases. We have doctors who
                are specialized in different age groups.
              </p>
            </div>
            <img
              src="/doctors-discuss.jpg"
              alt="Doctors discuss"
              className="object-cover w-[72vw] md:w-auto md:h-80 m-3 rounded-lg hover:-hue-rotate-30 transition duration-500 ease-in-out"
            />
          </div>

          <div className="flex flex-col items-center justify-center mt-24 md:mt-36">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-700 text-center mb-2">
              Meet our <span className="text-sky-500">doctors</span>
            </h1>
            <Divider size={10} />
            <div className="mt-8 flex flex-col md:flex-row justify-between backdrop-blur-md bg-white/30 rounded-2xl p-3 hover:-translate-y-1 shadow-sm transition duration-500 ease-in-out">
              <DoctorCard
                doctor={{
                  name: "John Doe",
                  description:
                    "Dr. John Doe is a specialist in heart diseases. He has been working in this field for more than 10 years. He has saved many lives. He has won many awards. He is the best in the world.",
                  image: "/doctor-1.jpg",
                }}
              />
              <DoctorCard
                doctor={{
                  name: "Jane Doe",
                  description:
                    "Dr. Jane Doe is a specialist in brain diseases. She has been working in this field for more than 10 years. She has saved many lives. She has won many awards. She is the best in the world.",
                  image: "/doctor-2.jpg",
                }}
              />
              <DoctorCard
                doctor={{
                  name: "John Smith",
                  description:
                    "Dr. John Smith is a specialist in kidney diseases. He has been working in this field for more than 10 years. He has saved many lives. He has won many awards. He is the best in the world.",
                  image: "/doctor-3.jpg",
                }}
              />
            </div>
          </div>

          <div className="flex justify-around mt-20 md:mt-40 my-12 py-4 backdrop-blur-md bg-gray-50 md:bg-white/30 rounded-2xl hover:-translate-y-1 shadow-sm transition duration-500 ease-in-out">
            <img
              src="/medical-survey.jpg"
              alt="Doctors discuss"
              className="hidden md:block object-cover h-80 w-auto m-3 rounded-lg hover:-hue-rotate-30 transition duration-500 ease-in-out"
            />
            <div>
              <div className="border-b-4 border-sky-500 w-fit p-3 m-3">
                <h1 className="text-4xl md:text-5xl font-bold text-sky-500">
                  Why us<span className="text-gray-700">?</span>
                </h1>
              </div>
              <p className="w-fit md:w-inherit text-sm md:text-base p-3 w-[30ch] md:w-[50ch]">
                According to the international health organization, we are the
                best medical e-service in Egypt in the last 3 years. As
                E-Prescribing has won the best medical e-service in Egypt in
                2022, 2023 and 2024. We have a team of doctors who are
                specialized in a variety of fields. We have a team of doctors
                who are specialized in heart, brain, kidney, liver, etc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DoctorCard({
  doctor,
}: {
  doctor: {
    name: string;
    description: string;
    image: string;
  };
}) {
  return (
    <div className="flex justify-center items-center">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="object-cover h-40 w-32 m-3 rounded-lg hover:-hue-rotate-30 transition duration-500 ease-in-out"
      />
      <div className="flex-col justify-center">
        <h1 className="text-md font-bold text-sky-500">
          <span className="text-gray-800">Dr. </span>
          {doctor.name}
        </h1>
        <p className="text-xs md:text-sm w-[20ch] md:w-[30ch]">
          {doctor.description}
        </p>
      </div>
    </div>
  );
}
