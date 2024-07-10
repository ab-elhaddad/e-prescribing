import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Pending Prescriptions",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return {children};
}