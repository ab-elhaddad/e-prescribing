import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patients",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
