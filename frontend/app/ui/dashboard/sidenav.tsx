import Link from "next/link";
import NavLinks from "./navLinks";
import Logo from "../custom/Logo";

export default function SideNav({ links }: { links: string[] }) {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 justify-center items-center rounded-md bg-sky-600 p-4 md:h-40 pl-2"
        href="/home"
      >
        <Logo size={100} color="white" />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks links={links} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
