import CircelItem from "@/components/CircleItem";
import PurpleHaloGroup from "@/components/PurpleHaloGroup";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (auth().userId) redirect("/dashboard");
  return (
    <>
    <PurpleHaloGroup hiddenIds={[3, 4, 5]} />
    <div className="md:mx-20 flex justify-center md:justify-around">
      {children}
      <CircelItem />
    </div>
    </>
  );
}
