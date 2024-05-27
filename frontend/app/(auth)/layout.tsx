import CircelItem from "@/app/ui/custom/CircleItem";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:mx-20 flex justify-center md:justify-around">
      {children}
      <CircelItem />
    </div>
  );
}
