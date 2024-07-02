type PropsTypes = {
  label: string;
  content: string;
  name: string;
};

export default function FullBorderParagraph(props: PropsTypes) {
  const { label, content, name } = props;
  return (
    <div className="w-full">
      <label htmlFor={name} className="text-sm ml-2 text-gray-500 mt-1">
        {label}
      </label>
      <p
        className="text-sm px-3 py-2 mb-3 mt-1 border rounded-xl bg-white h-fit min-h-[5vh] w-full"
      >
        {content}
      </p>
    </div>
  );
}
