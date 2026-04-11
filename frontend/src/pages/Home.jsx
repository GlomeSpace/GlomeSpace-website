import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Send,
  Package,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";
import {
  MdOutlineEco,
  MdOutlineSavings,
  MdOutlineSecurity,
  MdOutlineSpeed,
} from "react-icons/md";

import { Button } from "@/components/ui/button";

import CalendlyWidget from "../components/CalendlyWidget";
import Footer from "../components/Footer";
import { ShipmentComponent } from "../components/ShipmentComponent";
import { CirclePlus } from "lucide-react";
import {
  BlogComponent,
  BlogComponentSkeleton,
  BlogPostEmbeddable,
} from "../components/BlogComponent";

import { TrustpilotReviewCard } from "../components/TrustpilotReviewCard";

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const GLOMESPACE_APP_URL = import.meta.env.VITE_GLOMESPACE_APP_URL;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageTitle, setMessageTitle] = useState();
  const [finalMessage, setFinalMessage] = useState();
  const INITIAL_STATE = {
    username: "",
    email: "",
    message: "",
    newsletter: false,
  };

  const [showAnswer, setShowAnswer] = useState(null);
  const questions = [
    {
      index: 1,
      question: "How do I know my item is safe with a traveler?",
      answer:
        "We verify travelers through ID checks and platform ratings. Additionally, we recommend using our secure payment system, where funds are held in escrow until you confirm the safe delivery of your item.",
    },
    {
      index: 2,
      question: "What items am I prohibited from sending?",
      answer:
        "To ensure safety and legal compliance, we strictly prohibit illegal substances, hazardous materials, weapons, and any items restricted by the customs of the destination country.",
    },
    {
      index: 3,
      question: "How is the shipping price determined?",
      answer:
        "Pricing is decentralized. You can either set a 'bounty' you are willing to pay, or travelers can send you offers based on the size, weight, and urgency of your shipment.",
    },
    {
      index: 4,
      question: "Can I track my shipment in real-time?",
      answer:
        "Yes. Once a traveler accepts your shipment, you can communicate directly through our in-app chat, and travelers are encouraged to provide status updates and photos at key milestones (pickup, transit, arrival).",
    },
    {
      index: 5,
      question: "What happens if my item is damaged or lost?",
      answer:
        "While travelers are vetted, we advise owners to declare the value of their items. In the rare event of a dispute, our support team mediates using the evidence provided in the app. We also offer optional GlomeSpace Protection for high-value items.",
    },
    {
      index: 6,
      question: "Do I have to pay customs duties?",
      answer:
        "Customs duties are generally the responsibility of the Shipment Owner. We recommend discussing potential duties with your traveler beforehand and providing all necessary documentation for a smooth border crossing.",
    },
    {
      index: 7,
      question: "How do I choose the right traveler?",
      answer:
        "You can view a traveler’s profile, which includes their verification status, past delivery history, and reviews from other shipment owners. Choose the one that best fits your timeline and budget.",
    },
  ];

  const features = [
    {
      id: 1,
      icon: Clock,
      title: "Lightning Fast",
      desc: "Reduce delivery times by up to 70% with direct traveler connections",
    },
    {
      id: 2,
      icon: DollarSign,
      title: "Cost Effective",
      desc: "Save up to 50% on shipping costs compared to traditional carriers",
    },
    {
      id: 3,
      icon: Users,
      title: "Verified Travelers",
      desc: "All travelers are thoroughly verified for safety and reliability",
    },
    {
      id: 4,
      icon: Package,
      title: "Real-Time Tracking",
      desc: "Track your shipment every step of the way with live updates",
    },
    {
      id: 5,
      icon: CheckCircle,
      title: "Secure Delivery",
      desc: "Insurance coverage and secure handoff protocols for peace of mind",
    },
    {
      id: 5,
      icon: Send,
      title: "Global Network",
      desc: "Connect with travelers heading to destinations worldwide",
    },
  ];

  const [userData, setUserData] = useState(INITIAL_STATE);

  const handleOnChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUserData({ ...userData, [e.target.name]: value });
  };

  const { username, email, message, newsletter } = userData;

  const postFormData = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/mail-list/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        setMessageTitle("Submission Failure");
        setFinalMessage("Failed to add your details \n please try again");

        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Server responded with status: ${response.status}`,
        );
      }

      await response.json();
      setUserData(INITIAL_STATE);
      setMessageTitle("Submission Complete");
      setFinalMessage("Details added successfully. \n Thank you!");
    } catch (error) {
      setMessageTitle("Submission Failure");
      setFinalMessage("Failed to add your details \n please try again");
      console.log("Error while posting form data:", error);
    } finally {
      setIsLoading(false);
      setIsDialogOpen(true);
    }
  };

  return (
    <div className="min-h-screen font-headerFont bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">
      <AlertDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        className=" "
      >
        <AlertDialogContent className=" w-full md:w-5/10 ">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-blue-900 ">
              {messageTitle}
            </AlertDialogTitle>
            <AlertDialogDescription>{finalMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setIsDialogOpen(false)}
              className="bg-blue-900"
            >
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Hero Section */}
      <section className="pt-20 bg-blue-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row gap-2 items-center">
            <div className="md:w-7/10  text-center lg:text-left">
              <SlotMachine />

              <p className=" mt-10 font-bold text-gray-900 md:text-[20px]">
                Stop Losing customers due to Cart Abandonment at Checkout.
              </p>
              <p className="mt-10 ">
                Connect with verified GlomeSpace travelers heading to locations
                where your clients are. Get your products delivered faster and
                more affordably than ever before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
                <Button className="text-[13px] px-2  bg-blue-900">
                  <a
                    href={`${GLOMESPACE_APP_URL}/account`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Create a Shipment
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-center  md:gap-5 h-50 md:h-100 w-6/10">
              <div className="absolute top-1 md:left-90 ">
                <ShipmentComponent />
              </div>
              <div className="absolute w-60 mt-6 md:w-full">
                <img src="/photos/Ecommerce_seller.png" className=" md:w-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/**
       *  <div className=" flex w-full bg-red h-100 w-full h-80 overflow-hidden flex items-center justify-center rounded-xl">
        <div className=" flex  justify-center items-center w-3/10">
          <h className="font-fancyFont  font-bold text-[50px]">
            Why GlomeSpace?
          </h>
        </div>
        <div className="relative flex h-full  w-7/10 "></div>
      </div>
      *  <div className="w-full bg-blue-900 h-100">
        <div className="flex items-center justify-center h-full w-8/10 mx-auto">
          <div className="flex text-[40px] text-white">
            <p>Are you struggling with cart abadonment at Checkout?</p>
          </div>

          <div className="flex flex-col">
            <p className="text-white text-lg">
              We're the Airbnb for Logistics. We connect e-commerce sellers and
              individual shoppers with verified GlomeSpace travelers heading to
              their locations, enabling faster and more affordable deliveries.
            </p>

            <p className="text-green-">
              Install GlomeSpace natively in your Shopify store and get access
              to a global network of travelers ready.
            </p>
          </div>
        </div>
      </div>
      */}

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-900 mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "1",
                title: "Post Your Shipment",
                desc: "List what you need delivered and where it's going",
              },
              {
                num: "2",
                title: "Match with Travelers",
                desc: "Get connected with verified travelers heading your way",
              },
              {
                num: "3",
                title: "Track & Receive",
                desc: "Monitor your shipment in real-time until delivery",
              },
            ].map((step, idx) => (
              <div key={idx} className="text-center relative">
                <div className="bg-blue-900 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {step.num}
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-900/30"></div>
                )}
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-2 w-full md:h-200 px-5 md:px-30">
        <div className="flex flex-col md:flex-row gap-2  md:h-1/2">
          <div className="flex flex-col p-5 md:p-10 justify-center  bg-slate-200 text-black w-full md:w-4/10 rounded-md ">
            <div>
              <MdOutlineSpeed size={45} className="" />
              <h2 className="font-primaryFont text-left font-bold text-[30px] md:text-[40px]">
                Unmatched Velocity
              </h2>
            </div>

            <p className="text-[17px] md:text-[15px]">
              Traditional logistics relies on warehouses and hub-and-spoke
              sorting that adds days to your timeline. GlomeSpace leverages the
              'Next-Flight' advantage. By connecting you with travelers already
              moving toward your destination, we enable international deliveries
              in hours, not weeks—turning global shipping into a local-speed
              experience.
            </p>
          </div>
          <div className="flex flex-col p-10 justify-center  bg-slate-200 text-black w-full md:w-6/10 rounded-md ">
            <div className="mb-2 md:mb-0">
              <MdOutlineSavings size={45} className="text-" />
              <h2 className="font-primaryFont text-left font-bold text-[30px] md:text-[40px]">
                Zero Infrastructure Costs
              </h2>
            </div>

            <p className="text-[17px] md:text-[15px]">
              We’ve eliminated the overhead of massive fleets and expensive fuel
              surcharges. By utilizing existing, unused luggage capacity,
              GlomeSpace reduces shipping costs by up to 50%. We pass those
              savings directly to you, making premium international shipping
              accessible to small businesses and individuals alike.
            </p>
          </div>
        </div>
        <div className="flex flex-col  md:flex-row h-1/2 gap-2">
          <div className="flex flex-col p-10 justify-center  bg-slate-200 text-black w-full md:w-6/10 rounded-md ">
            <div className="mb-2 md:mb-0">
              <MdOutlineEco size={45} className="text-" />
              <h2 className="font-primaryFont text-left font-bold text-[30px] md:text-[40px]">
                Eco-Friendly Logistics
              </h2>
            </div>

            <p className="text-[17px] md:text-[15px]">
              The greenest delivery is the one already happening. GlomeSpace is
              built on the principles of the circular economy, utilizing the
              carbon footprint of journeys that are already in motion. We move
              more goods with fewer vehicles, significantly reducing the
              environmental impact per package compared to traditional freight.
            </p>
          </div>

          <div className="flex flex-col p-10 justify-center  bg-blue-900 text-white w-full md:w-4/10 rounded-md ">
            <div className="mb-2 md:mb-0">
              <MdOutlineSecurity size={45} className="text-white" />
              <h2 className="font-primaryFont text-left font-bold text-[30px] md:text-[40px]">
                Security
              </h2>
            </div>

            <p className="text-[17px] md:text-[15px]">
              Beyond mandatory ID verification, GlomeSpace utilizes advanced
              fraud mitigation and a secure escrow protocol to protect both
              shipment owners and travelers. We’ve redesigned logistics to be
              decentralized, but we’ve kept security centralized at the heart of
              everything we do—ensuring your items and your earnings are always
              in safe hands.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Section */}
      <div className="">
        <h1 className="text-blue-900 font-bold text-center px-2 md:px-0 mt-20">
          Frequently Asked Questions (FAQs) by Shipment Owners
        </h1>
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
          <div className="md:w-4/10">
            <img
              src="/photos/questions2.png"
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

      {/* Blogs Section */}
      
      <BlogPostEmbeddable />

      <TrustpilotReviewCard />
    </div>
  );
};

export default Home;

const words = [
  " Shopify ?",
  " Amazon ?",
  " eBay ?",
  " Etsy ?",
  " WooCommerce ?",
  " BigCommerce ?",
  " Magento ?",
  " Wix ?",
  "Squarespace ?",
  "PrestaShop ?",
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
    <div className="flex items-center gap-2 font-bold">
      <h1 className="text-[20px]  md:text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-900 ">
        Are you an e-commerce seller on{" "}
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
