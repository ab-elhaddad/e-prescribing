import Link from "next/link";

export default function LoginLink() {
  return (
    <Link
      href="/login"
      className="text-sm font-semibold leading-6 text-gray-900 hover:text-sky-500 duration-300"
    >
      Log in <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}
