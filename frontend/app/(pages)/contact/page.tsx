import { FaEnvelope, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import Header from "@/app/ui/custom/Header";
import ContactForm from "@/app/ui/forms/contactForm";

export default function Page() {
  return (
    <div>
      <Header title="Contact us" />
      <div className="mx-24 my-24 flex gap-5">
        {/* Contact Info */}
        <div
          className="p-5 pb-8 rounded-lg flex flex-col gap-5 w-96 h-fit bg-gray-50"
        >
          <div className="flex items-start mb-2 gap-2">
            <FaLocationArrow className="bg-sky-200 p-1 rounded-full text-sky-600 text-xl mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-sky-700">Location:</h4>
              <p className="text-xs text-gray-600">
                1212 Dhaka, Kazi Nozrul Avenur,
                <br />
                Sylhet, Bangladesh 03214
              </p>
            </div>
          </div>

          <div className="flex items-start mb-2 gap-2">
            <FaEnvelope className="bg-sky-200 p-1 rounded-full text-sky-600 text-xl mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-sky-700">Email:</h4>
              <p className="text-xs text-gray-600">ujjalzaman@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start mb-2 gap-2">
            <FaPhoneAlt className="bg-sky-200 p-1 rounded-full text-sky-600 text-xl mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-sky-700">Call:</h4>
              <p className="text-xs text-gray-600">+88 01751 040425</p>
            </div>
          </div>
        </div>
        {/* Message Form */}
        <ContactForm />
      </div>
    </div>
  );
}