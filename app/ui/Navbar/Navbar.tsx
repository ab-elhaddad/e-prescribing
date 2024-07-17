"use client";

import Link from "next/link";
import { useState } from "react";

import NavLinks from "./NavLinks";
import Logo from "@/components/Logo";
import Auth from "./Auth";
import Sidebar from "./Sidbar";

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
        <div className="flex">
          <Link href="/home" className="-m-1.5 p-1.5 flex">
            <Logo size={32} />
            {/* <span className="h-8 w-auto text-blue-500 text-lg font-semibold">
              E-Prescribing
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

        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="hidden lg:flex lg:gap-x-12">
          <NavLinks />
        </div>

        <div className="hidden md:flex items-center gap-x-3">
          <Link href={"/profile"} className="text-sm">Profile</Link>
          <Auth />
        </div>
      </nav>
    </div>
  );
}
