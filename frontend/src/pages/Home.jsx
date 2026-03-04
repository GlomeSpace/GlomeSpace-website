
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { FaLinkedin } from "react-icons/fa6";
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
import { Link } from "react-router-dom";
import CalendlyWidget from "../components/CalendlyWidget";

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
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
            `Server responded with status: ${response.status}`
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

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <a href="/">
                <img src="/photos/glomespaceB.svg" width={200} />
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-900 transition"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-blue-900 transition"
              >
                How It Works
              </a>
              <Link to="/become-an-investor" className="hover:underline">
                Become an Angel Investor
              </Link>

              <a
                href="#waitlist"
                className="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition"
              >
                Join Waitlist
              </a>

              <a target="_blank" href={"https://www.linkedin.com/company/glomespace/"}>
                <FaLinkedin size={30} className="text-blue-900" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-blue-900"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#features"
                className="block text-gray-700 hover:text-blue-900"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block text-gray-700 hover:text-blue-900"
              >
                How It Works
              </a>
               <Link to="/become-an-investor" className="hover:underline">
                Become an Angel Investor
              </Link>
              <a
                href="#waitlist"
                className="block bg-blue-900 text-white px-6 py-2 rounded-full text-center"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-900 mb-6 leading-tight">
                Ship faster, smarter and cheaper
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
                Connect with verified travelers heading to your destination.
                Reduce transit times and costs by up to 70% compared to
                traditional logistics providers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#waitlist"
                  className="bg-blue-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Get Early Access
                </a>
                <a
                  href="#how-it-works"
                  className="bg-white text-blue-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-100 transition border-2 border-blue-900"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition duration-500">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        Package in Transit
                      </p>
                      <p className="text-blue-100 text-sm">
                        Arrives in 2 hours and 27 minutes
                      </p>
                    </div>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full w-3/4 animate-pulse"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <Clock className="w-8 h-8 text-white mx-auto mb-2" />
                    <p className="text-white font-bold text-xl">70%</p>
                    <p className="text-blue-100 text-xs">Faster</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <DollarSign className="w-8 h-8 text-white mx-auto mb-2" />
                    <p className="text-white font-bold text-xl">50%</p>
                    <p className="text-blue-100 text-xs">Cheaper</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <Users className="w-8 h-8 text-white mx-auto mb-2" />
                    <p className="text-white font-bold text-xl">100%</p>
                    <p className="text-blue-100 text-xs">Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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



      {/* Footer */}
      <footer className="bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2">
            <a href="/">
              <img src="/photos/glomespaceB.svg" width={200} />
            </a>
          </div>
          <p className="text-gray-600 mb-4">Ship faster, smarter and cheaper</p>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} GlomeSpace, Inc and its affiliates
          </p>
          <p>251 West 30th Street, New York, NY 10001, US</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
