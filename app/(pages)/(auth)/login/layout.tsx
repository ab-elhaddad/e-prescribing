import AuthProvider from "@/app/context/AuthProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
