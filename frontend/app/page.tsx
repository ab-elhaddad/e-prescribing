"use client";

import Link from "next/link";
import { ReactNode, CSSProperties, JSXElementConstructor } from "react";

import styles from "./home.module.css";
import Button from "./ui/custom/Button";
import MySwiper from "./ui/custom/MySwiper";
import swiperSlides from "./lib/data/swiperSlides";

import { FaHouseMedical } from "react-icons/fa6";
import { IoChatbox } from "react-icons/io5";
import { FaHeadphonesAlt } from "react-icons/fa";
import Divider from "./ui/custom/Divider";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-between w-full">
        <header className="absolute top-40 left-0 z-10 mx-20">
          <h1 className="text-7xl text-gray-700 font-bold">
            WELCOME TO
            <br />
            <span className="text-sky-600">E-PRESCRIBING</span>
          </h1>
          <p className="mt-5 text-2xl text-gray-700 font-bold">
            YOUR MUST TRUSTED HEALTH PARTNER
          </p>
          <div className="flex mt-10">
            <Link href="/about">
              <Button body="ABOUT US" style={{ marginRight: "3vw" }} />
            </Link>
            <Link href="/contact">
              <Button body="CONTACT US" />
            </Link>
          </div>
        </header>

        <div
          className="flex justify-between absolute left-0 z-20"
          style={{
            top: "75vh",
            marginLeft: "5vw",
            width: "89vw",
          }}
        >
          <BlueCard>
            <h1 className="text-4xl font-bold mb-8">WHY CHOOSE US?</h1>
            <p className="text-md">
              Our doctors are available 24/7 to help you with any medical issues
              you may have, no matter how big or small, we are here to help. We
              would be more than happy to serve you at any time. We have a team
              of doctors who are specialized in a variety of fields. We have a
              team of doctors who are specialized in heart, brain, kidney,
              liver, etc.
            </p>
          </BlueCard>
          <TransparentCard
            Icon={FaHouseMedical}
            title="Appointment"
            describtion="You can book an appointment with our doctors at any time. We are
              available 24/7 to help you with any medical issues you may have."
          />
          <TransparentCard
            Icon={IoChatbox}
            title="Online Help"
            describtion="You can chat with our doctors online to get help with any medical
              issues you may have. We are available 24/7 to help you with any
              medical issues you may have."
          />

          <TransparentCard
            Icon={FaHeadphonesAlt}
            title="Emegency Cases"
            describtion="
            You can call us at any time for emergency cases. We are available 24/7 to help you with any medical issues you may have.
          "
          />
        </div>

        <img
          src="/home-banner.png"
          alt="Doctor holding a medical headphone"
          className="w-full object-cover"
        />

        <div
          className="flex flex-col items-center mb-32"
          style={{ marginTop: "65vh" }}
        >
          <div className="flex flex-col items-center mb-12 z-30">
            <h1 className="text-4xl font-bold text-gray-700 mb-3">
              CLINIC AND SPECIALITIES
            </h1>
            <p className="text-gray-500 font-light text-sm mb-2">
              Our doctors are specialized in a variety of fields.
            </p>
            <Divider size={12} />
          </div>
          <MySwiper slides={swiperSlides} />
        </div>

        <div className="container flex flex-row items-center gap-x-5 rounded-3xl mb-20 z-20">
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
      className="w-96 p-10 bg-sky-600 text-white hover:-translate-y-1 shadow-md transition duration-500 ease-in-out"
      style={{
        height: "55vh",
        width: "28vw",
        ...style,
      }}
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
  Icon: JSXElementConstructor<{ className: string }>;
  title: string;
  describtion: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className="w-96 p-10 backdrop-blur-md bg-white/30 hover:-translate-y-1 shadow-md transition duration-500 ease-in-out flex flex-col items-center text-gray-700 text-center"
      style={{
        borderRadius: "30px",
        height: "55vh",
        width: "19vw",
        ...style,
      }}
    >
      <Icon className="text-6xl mb-5 text-sky-600" />
      <h1 className="text-2xl font-bold mb-5">{title}</h1>
      <p className="text-md">{describtion}</p>
    </div>
  );
}
