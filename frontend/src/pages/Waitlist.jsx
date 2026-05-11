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

const Waitlist = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_WAITLIST_URL;
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

      <section
        id="waitlist"
        className="py-30 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-slate-100"
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-col items-center">
            <img
              alt="Shopify Logo"
              src="/photos/shopify.png"
              className="w-20 md:w-50"
            />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Our Shopify App is still under review
            </h2>
            <p className="text-blue-100 text-lg mb-12">
              Be among the first to experience the future of logistics. Sign up
              for early access today.
            </p>
          </div>

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
                placeholder="yourname@yourcompany.com"
                onChange={(e) => handleOnChange(e)}
              />
            </div>

            <div className="hidden mb-6 flex items-center justify-center space-x-3">
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
    </div>
  );
};

export default Waitlist;
