import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShipmentComponent } from "../components/ShipmentComponent";
import { FlightDetailsComponent } from "../components/FlightDetailsComponent";
import { motion, AnimatePresence } from "framer-motion";
import { NewsletterForm } from "../components/NewsLetterForm";
import { Link } from "react-router-dom";
import { PhoneCall } from "lucide-react";
import { MdEmail } from "react-icons/md";
import { FaAddressBook, FaAddressCard } from "react-icons/fa6";

export const AboutUs = () => {
  const GLOMESPACE_APP_URL = import.meta.env.VITE_GLOMESPACE_APP_URL;

  return (
    <div className="">
      <section className="pt-20 bg-blue-100 px-4 sm:px-6 lg:px-8 pb-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row md:gap-2 items-center">
            <div className=" w-full md:w-7/10  md:mt-10  text-center lg:text-left">
              <SlotMachine />

              <div>
                <p className=" mt-10 font-bold text-gray-900 text-[20px]">
                  We're the Airbnb for Logistics{" "}
                </p>

                <p className="text-gray-600 italic ">
                  <span className="text-blue-900 font-bold">Mission </span>{" "}
                  Bridging the gap between global demand and local supply by
                  turning every international flight into a delivery lane.
                </p>
              </div>

              <p className="mt-10  ">
                GlomeSpace Corporation is a Delaware-incorporated technology
                company. Founded in 2025, GlomeSpace is on a mission to
                revolutionize the logistics industry by connecting travelers
                with e-commerce sellers & individuals looking to ship items
                globally. <br /> <br />
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
                <Button className="text-[13px] px-2  bg-blue-400">
                  <a
                    href={`${GLOMESPACE_APP_URL}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit our App
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative flex justify-end gap-5 h-50 md:h-100 w-6/10">
              <div className="absolute top-0">
                <img src="/photos/About_glomespace.png" width={500} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col-reverse md:flex-row items-center w-full h-full">
        <div className="md:w-4/10">
          <NewsletterForm />
        </div>
        <div className="md:w-6/10 px-3 mt-10 md:px-20">
          <h2 className=" font-headerFont text-gray-700">
            By leveraging the unused baggage space of travelers, GlomeSpace
            offers a more sustainable, cost-effective, and efficient alternative
            to traditional shipping methods. With a focus on innovation and
            customer satisfaction, GlomeSpace is poised to become a leader in
            the global logistics market.
          </h2>
        </div>
      </div>

      <div className="flex flex-col mx-auto items-center justify-center gap-2 w-max h-100">
        <h1 className="text-blue-900 font-bold">Contact Us</h1>

        <div className="flex flex-col md:flex-row   text-[14px] text-gray-600 gap-4 items-start justify-start">
          {/** <div className="flex flex-row md:flex-col items-center gap-2">
            <PhoneCall size={20} />
            <div>
              <p>+1 (123) 456-7890</p>
              <p>+1 (123) 456-7890</p>
            </div>
          </div>**/}
          <div className="flex flex-row md:flex-col items-center gap-2">
            <MdEmail size={20} />
            <div>
              <p>admin@glomespace.com</p>
              <p>arihoseth@glomespace.com</p>
            </div>
          </div>

          <div className="flex flex-row md:flex-col items-center gap-2">
            <FaAddressCard size={20} />
            <div>
              <p>
                251 West 30th Street
                <br /> New York, NY 10001
                <br /> United States
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const words = [
  "Gift Cards ?",
  "Clothings ?",
  "Electronics ?",
  "Documents ?",
  "Books ?",
  "Toys ?",
  "Sports Equipment ?",
  "Health Products ?",
  "Beauty Products ?",
];

const SlotMachine = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 ">
      <h1 className="text-[20px]  md:text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-900 ">
        Are you looking to ship{" "}
        <span className="inline-flex h-max overflow-hidden px-2 rounded align-bottom ">
          <AnimatePresence mode="wait">
            <motion.div
              key={words[index]}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-blue-900"
            >
              {words[index]}
            </motion.div>
          </AnimatePresence>
        </span>
      </h1>
    </div>
  );
};
