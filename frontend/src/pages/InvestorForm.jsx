import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Menu, X } from "lucide-react";
import { NewsletterForm } from "../components/NewsLetterForm";
import Footer from "../components/Footer";

const InvestorForm = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const { username, email, message, newsletter } = userData;

  const handleOnChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUserData({ ...userData, [e.target.name]: value });
  };

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
        const errorData = await response.json();
        setMessageTitle("Submission Failure");
        setFinalMessage("Failed to add your details");
        //throw new Error(
        // errorData.message ||
        //   `Server responded with status: ${response.status}`
        //);
      }
      await response.json();
      setUserData(INITIAL_STATE);
      setMessageTitle("Submission Complete");
      setFinalMessage("Details added successfully. \n Thank you!");
    } catch (error) {
      setMessageTitle("Submission Failure");
      setFinalMessage("Failed to add your details \n please try again");
      //console.log("Error while posting form data:", error);
    } finally {
      setIsLoading(false);
      setIsDialogOpen(true);
    }
  };

  return (
    <>
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
      <nav className="bg-slate-200 backdrop-blur-md shadow-sm fixed w-full z-50">
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
                href="/#features"
                className="text-gray-700 hover:text-blue-900 transition"
              >
                Features
              </a>
              <a
                href="/#how-it-works"
                className="text-gray-700 hover:text-blue-900 transition"
              >
                How It Works
              </a>
              <Link to="/become-an-investor" className="hover:underline">
                Become an Angel Investor
              </Link>

              <a
                href="/#waitlist"
                className="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition"
              >
                Join Waitlist
              </a>

              <a
                target="_blank"
                href={"https://www.linkedin.com/company/glomespace/"}
              >
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
                href="/#features"
                className="block text-gray-700 hover:text-blue-900"
              >
                Features
              </a>
              <a
                href="/#how-it-works"
                className="block text-gray-700 hover:text-blue-900"
              >
                How It Works
              </a>
              <Link to="/become-an-investor" className="hover:underline">
                Become an Angel Investor
              </Link>

              <a
                href="/#waitlist"
                className="block bg-blue-900 text-white px-6 py-2 rounded-full text-center"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Waitlist Section */}
      <section
        id="waitlist"
        className="py-50 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-slate-100"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Become An Angel Investor
          </h2>
          <p className="text-blue-100 text-lg mb-12">
            We've announced out pre-seed round of funding, which starts on 15th
            of January 2026, Please submit your email and we'll be ready to get
            back to you with the details of our fundraising.
          </p>

          <form
            onSubmit={(e) => postFormData(e)}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl"
          >
            <div className="mb-6">
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                required
                className="w-full px-6 py-4 rounded-full border-2 border-slate-100 focus:border-blue-900 focus:outline-none text-lg"
                placeholder="John Doe"
                onChange={(e) => handleOnChange(e)}
              />
            </div>

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
                Submit
              </button>
            )}

            <p className="text-gray-500 text-sm mt-4">
              We'll contact you right away for a conversation
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default InvestorForm;
