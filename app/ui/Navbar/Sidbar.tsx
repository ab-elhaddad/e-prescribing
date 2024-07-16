"use client";

import Auth from "./Auth";
import NavLinks from "./NavLinks";

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (state: boolean) => void;
  toggleSidebar: () => void;
}) {
  const closeSidenav = () => setIsSidebarOpen(false);

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
            <Auth />
            <NavLinks closeSidenav={closeSidenav} />
          </div>
        </nav>
      </div>
    </>
  );
}