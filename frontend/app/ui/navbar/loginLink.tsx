import Link from "next/link";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthProvider";
import { FaUser } from "react-icons/fa6";

export default function LoginLink({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const path = usePathname();
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    Cookies.remove("authorization");
    Cookies.remove("userType");
    if (path === "/profile" || path.startsWith("/dashboard")) {
      location.href = "/home";
    }
  };

  const authComp = (
    <div className="flex items-center gap-x-3 text-sky-900">
      <p
        className="text-sm hover:text-sky-600 duration-300 cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </p>
      <Link href="/profile" className="text-lg hover:text-sky-600 duration-300">
        <FaUser />
      </Link>
    </div>
  );

  const unauthComp =
    path === "/login" || path === "/signup" ? (
      <Link
        href="/home"
        className="text-sm font-semibold text-sky-900 hover:text-sky-600 duration-300"
      >
        <span aria-hidden="true">&larr;</span> Home
      </Link>
    ) : (
      <Link
        href="/login"
        className="text-sm font-semibold text-sky-900 hover:text-sky-600 duration-300"
      >
        Log in <span aria-hidden="true">&rarr;</span>
      </Link>
    );

  return (
    <div
      className={`${
        isSidebarOpen ? "" : "hidden"
      } lg:flex lg:flex-1 lg:justify-end`}
    >
      {user ? authComp : unauthComp}
    </div>
  );
}
