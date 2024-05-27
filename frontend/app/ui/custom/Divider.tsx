export default function Divider({ size }: { size: number }) {
  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{
        height: size * .3 + "px",
        width: size * 10 + "px",
      }}
    >
      <div
        className="bg-sky-600 absolute rounded"
        style={{
          height: size * .3 + "px",
          width: size * 4 + "px",
        }}
      />
      <div
        className="bg-[#9ca3af85] rounded"
        style={{
          height: "50%",
          width: "100%",
        }}
      />
    </div>
  );
}
