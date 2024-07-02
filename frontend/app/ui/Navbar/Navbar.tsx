"use client";

import Link from "next/link";
import { useState } from "react";

import NavLinks from "./NavLinks";
import LoginLink from "./LoginLink";
import Logo from "../custom/Logo";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="bg-white w-full fixed z-50">
      <nav
        className="flex items-center justify-between p-5 lg:px-8 bg-white border-b-2"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/home" className="-m-1.5 p-1.5 flex">
            <Logo size={32} />
            {/* <span className="h-8 w-auto text-blue-500 text-lg font-semibold">
              E-Prescriping
            </span> */}
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="hidden lg:flex lg:gap-x-12">
          <NavLinks />
        </div>

        <LoginLink isSidebarOpen={isSidebarOpen} />
      </nav>
    </div>
  );
}

function Sidebar({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <>
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white text-white transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="p-4 flex justify-between items-center bg-sky-600">
          <div className="text-lg">Menu</div>
          <button onClick={toggleSidebar} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <nav className="flex flex-col justify-between">
          <div className="flex flex-col p-4 space-y-3">
            <NavLinks />
          </div>
          {/* <div className="mt-96 text-5xl">
            <LoginLink isSidebarOpen={isSidebarOpen} />
          </div> */}
        </nav>
      </div>
      {/* Overlay to close sidebar when clicking outside */}
      {/* {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-20"
            onClick={toggleSidebar}
            ></div>
          )} */}
    </>
  );
}
