import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShipmentComponent } from "../components/ShipmentComponent";
import { FlightDetailsComponent } from "../components/FlightDetailsComponent";
import { motion, AnimatePresence } from "framer-motion";
import { NewsletterForm } from "../components/NewsLetterForm";
import { Link } from "react-router-dom";
import { CirclePlus, PhoneCall } from "lucide-react";
import { MdEmail } from "react-icons/md";
import { FaAddressBook, FaAddressCard } from "react-icons/fa6";
import { BlogPostEmbeddable } from "../components/BlogComponent";
import { TrustpilotReviewCard } from "../components/TrustpilotReviewCard";

export const AboutUs = () => {
  const GLOMESPACE_APP_URL = import.meta.env.VITE_GLOMESPACE_APP_URL;

  const [showAnswer, setShowAnswer] = useState(null);

  const questions = [
    {
      index: 1,
      question: "What exactly is GlomeSpace?",
      answer:
        "GlomeSpace is a decentralized logistics marketplace that connects people who need to send items with travelers who have extra space in their luggage or vehicles. We make shipping faster, cheaper, and more sustainable.",
    },
    {
      index: 2,
      question: "How is GlomeSpace different from traditional couriers?",
      answer:
        "Unlike DHL or FedEx, we don’t own planes or trucks. We use existing human movement. This makes us up to 50% cheaper and allows for 1-3 days international delivery on popular travel routes.",
    },
    {
      index: 3,
      question: "Is my data and personal information secure?",
      answer:
        "Security is our priority. We use industry-standard encryption for all data and never share your private contact details. Communication stays within the app until you choose to share more.",
    },
    {
      index: 4,
      question: "Where is GlomeSpace available?",
      answer:
        "While we are incorporated in the US, our marketplace is global. You can find shipment requests and travelers for almost any country, with a high concentration on routes between major international hubs.",
    },
    {
      index: 5,
      question: "How does GlomeSpace make money?",
      answer:
        "We charge a small service fee on every successful transaction. This fee goes toward maintaining the platform, verifying users, and providing 24/7 customer support.",
    },
    {
      index: 6,
      question: "How do I contact GlomeSpace support?",
      answer:
        'You can reach us 24/7 via the "Support" button in the app or by emailing admin@glomespace.com. For urgent delivery disputes, we provide a priority chat line.',
    },
    {
      index: 7,
      question: "How can I trust the reviews on the platform?",
      answer:
        'Our reviews are "Verified Purchase" only. This means a user can only leave a review if a transaction was actually completed and paid for through the GlomeSpace escrow system, preventing fake ratings.',
    },
  ];

  return (
    <div className="">
      <section className="pt-20 bg-blue-100 px-4 sm:px-6 lg:px-8 pb-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row md:gap-2 items-center">
            <div className=" w-full md:w-7/10  md:mt-13  text-center lg:text-left">
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

      <div>
        <h1 className="text-blue-900 font-bold text-center mt-20">
          Frequently Asked Questions (FAQs)
        </h1>
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
          <div className="md:w-4/10">
            <img
              src="/photos/questions1.png"
              alt="FAQs"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="md:w-6/10">
            {questions.map((q) => (
              <div
                key={q.index}
                className="mb-6 shadow-md p-4 rounded-lg bg-slate-50 border-gray-200"
              >
                <div className="flex justify-between ">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {q.question}
                  </h3>
                  <button
                    onClick={() =>
                      setShowAnswer(showAnswer === q.index ? null : q.index)
                    }
                  >
                    <CirclePlus />
                  </button>
                </div>

                {showAnswer === q.index && (
                  <p className="text-gray-600 mt-2">{q.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <BlogPostEmbeddable />

      <TrustpilotReviewCard />

      <div className="flex flex-col  items-center justify-center gap-2 w-full h-max">
        <h1 className="text-blue-900 font-bold">Contact Us</h1>

        <div className="flex flex-col md:flex-row   text-[14px] text-gray-600 gap-4 items-start justify-start">
          {/**
            * 
            <div className="flex flex-row md:flex-col items-center gap-2">
              <PhoneCall size={20} />
              <div>
                <p>+1 (123) 456-7890</p>
                <p>+1 (123) 456-7890</p>
              </div>
            </div>
             */}
          <div className="flex flex-row md:flex-col items-center gap-2">
            <MdEmail size={20} />
            <div>
              <p>admin@glomespace.com</p>
              <p>support@glomespace.com</p>
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
