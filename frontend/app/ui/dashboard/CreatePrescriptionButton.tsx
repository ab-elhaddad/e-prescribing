import Link from "next/link";
import { RiSurveyLine } from "react-icons/ri";

export default function CreatePrescriptionButton({
  patientId,
}: {
  patientId: string;
}) {
  return (
    <Link href={`./patients/${patientId}/add-prescription`}>
      <button className="border border-gray-200 text-gray-700 text-2xl h-9 w-8 rounded-md hover:bg-sky-100 hover:text-sky-600 flex justify-center items-center">
        <RiSurveyLine />
      </button>
    </Link>
  );
}
