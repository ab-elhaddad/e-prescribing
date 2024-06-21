import Divider from "./Divider";

export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="flex justify-center items-center">
      <div className="md:text-5xl text-white font-bold absolute z-20 flex flex-col items-center gap-y-3">
        <h1>
          {title}
        </h1>
        <Divider size={12} />
      </div>
      <div className="absolute w-full md:h-40 bg-sky-700 z-10 opacity-40" />
      <img
        src="/blurred-hospital.jpg"
        // src="/doctors-discuss-2.webp"
        alt="Blurred Hospital"
        className="object-cover w-full md:h-40 brightness-50"
      />
    </div>
  );
}
