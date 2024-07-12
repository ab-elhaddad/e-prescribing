export default function FullBorderGenderSelect({
  defaultValue,
}: {
  defaultValue: string;
}) {
  return (
    <select
      name="gender"
      id="gender"
      defaultValue={defaultValue}
      className="focus:outline-none focus:border-sky-500 focus:border-2 text-md px-3 py-[.65rem] mb-3 mt-1 border rounded-xl bg-white w-80 w-full"
    >
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  );
}
