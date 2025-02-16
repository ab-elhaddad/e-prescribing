export default function PurpleHalo({ style, id, hiddenIds }: { style: React.CSSProperties, id: number,hiddenIds?: number[]}) {
  return (
    <div className="md:block" id={String(id)} style={{display: hiddenIds?.includes(id) ? "none": "block"}}>
      <div
        className="absolute z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"
        style={style}
      ></div>
    </div>
  );
}
