import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const projectName = process.env.PROJECT_NAME;
const Footer = () => {
  return (
    <footer className="bg-white text-black z-10 sticky top-0 flex justify-center">
      <div className="container mx-auto px-6 mx-10 py-10 border-t-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">About Us</h2>
            <p className="text-gray-400">
              We are committed to delivering the best service and products to
              our customers.
            </p>
          </div>

          {/* <div>
            <h2 className="text-xl font-bold mb-4">Services</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Web Development
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  App Development
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  SEO Services
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Consulting
                </a>
              </li>
            </ul>
          </div> */}

          <div>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <ul>
              <li className="mb-2">Email: info@example.com</li>
              <li className="mb-2">Phone: (123) 456-7890</li>
              <li className="mb-2">Address: 123 Main St, Anytown, USA</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-sky-500 duration-200">
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-500 duration-200">
                  <FaXTwitter />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-500 duration-200">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky-500 duration-200">
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} {projectName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
