import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: `%s | Dashboard`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
