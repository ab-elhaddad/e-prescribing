import CircelItem from "@/app/ui/custom/CircleItem";
import PurpleHaloGroup from "@/app/ui/custom/PurpleHaloGroup";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
