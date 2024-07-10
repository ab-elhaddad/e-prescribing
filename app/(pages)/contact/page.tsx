import { FaEnvelope, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import PageHeader from "@/app/ui/custom/PageHeader";
import ContactForm from "@/app/ui/forms/contactForm";

export default function Page() {
  return (
    <div>
      <PageHeader title="Contact us" />
      <div className="mx-10 md:mx-24 my-24 flex flex-col md:flex-row gap-5">
        {/* Contact Info */}
        <div className="p-5 pb-8 rounded-lg flex flex-col gap-5 w-full md:w-96 h-fit bg-gray-50">
          <div className="flex items-start mb-2 gap-2">
            <FaLocationArrow className="bg-sky-200 p-1 rounded-full text-sky-600 text-xl mt-1" />
            <div>
              <h4 className="text-md md:text-lg font-semibold text-sky-700">
                Location:
              </h4>
              <p className="text-xs text-gray-600">
                Shiben El-Kom, Menoufia, Egypt
              </p>
            </div>
          </div>

          <div className="flex items-start mb-2 gap-2">
            <FaEnvelope className="bg-sky-200 p-1 rounded-full text-sky-600 text-xl mt-1" />
            <div>
              <h4 className="text-md md:text-lg font-semibold text-sky-700">
                Email:
              </h4>
              <p className="text-xs text-gray-600">
                e_prescriping@menoufia.com
              </p>
            </div>
          </div>

          <div className="flex items-start mb-2 gap-2">
            <FaPhoneAlt className="bg-sky-200 p-1 rounded-full text-sky-600 text-xl mt-1" />
            <div>
              <h4 className="text-md md:text-lg font-semibold text-sky-700">
                Call:
              </h4>
              <p className="text-xs text-gray-600">
                (123) 456-7890
              </p>
            </div>
          </div>
        </div>
        {/* Message Form */}
        <ContactForm />
      </div>
    </div>
  );
}
