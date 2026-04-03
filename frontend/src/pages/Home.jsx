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
import { Button } from "@/components/ui/button";

import CalendlyWidget from "../components/CalendlyWidget";
import Footer from "../components/Footer";
import { ShipmentComponent } from "../components/ShipmentComponent";

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

      {/* Features Section 

      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-900 mb-4">
            Why Choose GlomeSpace?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Revolutionary logistics that connects you with travelers going your
            way
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Lightning Fast",
                desc: "Reduce delivery times by up to 70% with direct traveler connections",
              },
              {
                icon: DollarSign,
                title: "Cost Effective",
                desc: "Save up to 50% on shipping costs compared to traditional carriers",
              },
              {
                icon: Users,
                title: "Verified Travelers",
                desc: "All travelers are thoroughly verified for safety and reliability",
              },
              {
                icon: Package,
                title: "Real-Time Tracking",
                desc: "Track your shipment every step of the way with live updates",
              },
              {
                icon: CheckCircle,
                title: "Secure Delivery",
                desc: "Insurance coverage and secure handoff protocols for peace of mind",
              },
              {
                icon: Send,
                title: "Global Network",
                desc: "Connect with travelers heading to destinations worldwide",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-100 rounded-2xl p-6 hover:shadow-xl transition transform hover:-translate-y-2 duration-300"
              >
                <div className="bg-blue-900 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
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

      {/* Waitlist Section */}
      <section
        id="waitlist"
        className="py-80 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-slate-100"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Join the Revolution
          </h2>
          <p className="text-blue-100 text-lg mb-12">
            Be among the first to experience the future of logistics. Sign up
            for early access today.
          </p>

          <form
            onSubmit={(e) => postFormData(e)}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl"
          >
            <div className="mb-6">
              <input
                type="email"
                name="email"
                value={email}
                required
                className="w-full px-6 py-4 rounded-full border-2 border-slate-100 focus:border-blue-900 focus:outline-none text-lg"
                placeholder="yourname@gmail.com"
                onChange={(e) => handleOnChange(e)}
              />
            </div>

            <div className="mb-6 flex items-center justify-center space-x-3">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={newsletter}
                className="scale-140"
                onChange={handleOnChange}
              />

              <label
                htmlFor="newsletter"
                className="text-gray-700 cursor-pointer"
              >
                Sign up for our newsletter
              </label>
            </div>

            {isLoading ? (
              <button
                disabled
                size="sm"
                className="flex justify-center gap-2 w-full bg-blue-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-900 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Processing
                <Spinner className="size-6 text-white" />
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Join the Waitlist
              </button>
            )}

            <p className="text-gray-500 text-sm mt-4">
              No spam, ever. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </section>

      {/* Calendry */}

      <div className="w-full h-max ">
        <CalendlyWidget />
      </div>
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
