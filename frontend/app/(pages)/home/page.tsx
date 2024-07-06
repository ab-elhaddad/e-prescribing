import Link from "next/link";
import clsx from "clsx";
import { ReactNode, CSSProperties, JSXElementConstructor } from "react";

import Button from "@/app/ui/custom/inputs/Button";
import Divider from "@/app/ui/custom/Divider";
import PurpleHaloGroup from "@/app/ui/custom/PurpleHaloGroup";
import HomeSwipper from "@/app/ui/home/HomeSwipper";

import { IoChatbox } from "react-icons/io5";
import { RiSurveyLine } from "react-icons/ri";

export default function Home() {
  return (
    <main>
      <PurpleHaloGroup hiddenIds={[1]} />
      <div className="flex flex-col items-center justify-between w-full">
        <header
          className={clsx(
            "w-full absolute top-28 md:top-40 left-0 z-10 md:mx-20",
            "flex flex-col justify-center md:items-start",
            "items-center"
          )}
        >
          <h1 className="text-[8vw] md:text-[4.5vw] text-gray-700 font-bold">
            WELCOME TO
            <br />
            <span className="text-sky-600">E-Prescriping</span>
          </h1>
          <p className="mt-5 text-[3vw] md:text-[1.3vw] text-gray-700 font-bold">
            YOUR MUST TRUSTED HEALTH PARTNER
          </p>
          <div className="flex mt-10 flex gap-x-3">
            <Link href="/about">
              <div className="md:w-[10vw] md:text-[1vw]">
                <Button body="ABOUT US" style={{ marginRight: "3vw" }} />
              </div>
            </Link>
            <Link href="/contact">
              <div className="md:w-[10vw] md:text-[1vw]">
                <Button body="CONTACT US" />
              </div>
            </Link>
          </div>
        </header>

        <div
          className={clsx(
            "flex flex-col absolute left-0 top-[60vh] z-20 w-full justify-center items-center gap-y-5",
            "md:flex-row md:gap-x-5 md:top-[80vh]"
          )}
        >
          <BlueCard>
            <h1 className="text-[5vw] md:text-[2vw] font-bold mb-8">
              WHY CHOOSE US?
            </h1>
            <p className="md:text-[1vw]">
              Our doctors are available 24/7 to help you with any medical issues
              you may have, no matter how big or small, we are here to help. We
              would be more than happy to serve you at any time. We have a team
              of doctors who are specialized in a variety of fields. We have a
              team of doctors who are specialized in heart, brain, kidney,
              liver, etc.
            </p>
          </BlueCard>
          <TransparentCard
            title="Welcome to the future of healthcare!"
            describtion="
            Our cutting-edge electronic prescription system is designed to empower doctors and medical staff with an efficient platform to manage patient profiles and create prescriptions.
          "
          />
          <TransparentCard
            Icon={RiSurveyLine}
            title="Prescription"
            describtion="You can get a prescription from our doctors at any time. We are
              available 24/7 to help you with any medical issues you may have."
          />
          <TransparentCard
            Icon={IoChatbox}
            title="Online Help"
            describtion="You can chat with our doctors online to get help with any medical
              issues you may have. We are available 24/7 to help you with any
              medical issues you may have."
          />
        </div>

        <img
          src="/home-banner.png"
          alt="Doctor holding a medical headphone"
          className="hidden md:block w-full object-cover"
        />

        {/* To place the footer at the end of the page in mobile mood*/}
        <div className="md:mt-0 mt-[275vh]" />

        <div className="hidden md:flex flex-col items-center mb-32 md:mt-[65vh] mt-[200vh]">
          <div className="flex flex-col items-center mb-12 z-30">
            <h1 className="text-sm md:text-4xl font-bold text-gray-700 mb-3">
              CLINIC AND SPECIALITIES
            </h1>
            <p className="text-gray-500 font-light text-sm mb-2">
              Our doctors are specialized in a variety of fields.
            </p>
            <Divider size={12} />
          </div>
          <HomeSwipper />
        </div>

        <div className="hidden md:flex container flex flex-row items-center gap-x-5 rounded-3xl mb-20 z-20">
          <div className="flex flex-col gap-y-5">
            <img
              src="/operation-1.jpg"
              alt="Medical Operation"
              className="rounded-xl object-cover hover:-translate-y-1 transition duration-500 ease-in-out"
              style={{
                width: "55vw",
                height: "40vh",
              }}
            />
            <img
              src="/operation-2.jpg"
              alt="Medical Operation"
              className="rounded-xl object-cover hover:-translate-y-1 transition duration-500 ease-in-out"
              style={{
                width: "55vw",
                height: "30vh",
              }}
            />
          </div>

          <div className="flex flex-col items-between justify-between">
            <div
              style={{
                height: "28vh",
              }}
            >
              <h2 className="text-4xl text-sky-700 font-bold mb-3">
                PERSONAL CARE HEALTHY LIVING
              </h2>
              <p className="text-gray-700 text-sm" style={{ width: "50ch" }}>
                Our doctors are available 24/7 to help you with any medical
                issues you may have, no matter how big or small, we are here to
                help. We would be more than happy to serve you at any time. We
                have a team of doctors who are specialized in a variety of
                fields.
              </p>
            </div>
            <img
              src="operation-3.jpg"
              alt="Medical Operation"
              className="rounded-xl object-cover hover:-translate-y-1 transition duration-500 ease-in-out"
              style={{
                width: "55vw",
                height: "45vh",
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function BlueCard({
  children,
  style,
}: {
  children?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      className={clsx(
        "p-10 bg-sky-600 text-white hover:-translate-y-1 shadow-md transition duration-500 ease-in-out",
        "md:h-[55vh] md:w-96",
        "w-[90vw]"
      )}
      style={style}
    >
      {children}
    </div>
  );
}

function TransparentCard({
  Icon,
  title,
  describtion,
  style,
}: {
  Icon?: JSXElementConstructor<{ className: string }>;
  title?: string;
  describtion: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={clsx(
        "p-10 bg-gray-50 md:bg-white/30 md:backdrop-blur-md hover:-translate-y-1 shadow-md transition duration-500 ease-in-out flex flex-col items-center text-gray-700 text-center w-[90vw]",
        "md:h-[55vh] md:w-[19vw] rounded-[30px]"
      )}
      style={style}
    >
      {Icon && <Icon className="text-6xl mb-5 text-sky-600" />}
      <h1 className="text-2xl font-bold mb-5">{title}</h1>
      <p className="text-md">{describtion}</p>
    </div>
  );
}
