import { useLocation, Link, useNavigate } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import {
  BaggageClaimIcon,
  MessageCircleHeart,
  UserRoundSearch,
} from "lucide-react";
import { useEffect, useState } from "react";
import { TbLayoutDashboard } from "react-icons/tb";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TbBrandBlogger } from "react-icons/tb";
import { FaBloggerB } from "react-icons/fa";
import { IoAirplaneSharp } from "react-icons/io5";
import { IoAirplaneOutline } from "react-icons/io5";

const Footer = () => {
  const location = useLocation();
  const isSpecificChatOpen =
    location.pathname.split("/").filter(Boolean).length > 1 &&
    location.pathname.startsWith("/chats");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlFooter = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling Down - Hide
        setIsVisible(false);
      } else {
        // Scrolling Up - Show
        setIsVisible(true);
      }

      // Update last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlFooter);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("scroll", controlFooter);
    };
  }, [lastScrollY]);
  return (
    <div className="">
      {!isSpecificChatOpen && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 md:hidden flex bg-slate-100 h-20 transition-transform duration-300 ease-in-out ${
            isVisible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <MobileFooter />
        </div>
      )}

      <div className=" md:flex flex-col h-180 w-full mt-5  font-headerFont ">
        <div className="flex flex-col gap-5 justify-center md:flex-row h-2/10 bg-slate-100">
          <div className="flex justify-center items-center w-full md:w-4/10 gap-5 ">
            <Link to="/legal/terms-of-service">
              <p className="text-sm">Terms of Service</p>
            </Link>

            <Link to="/legal/privacy-policy">
              <p className="text-sm">Privacy Policy</p>
            </Link>

            <Link to="">
              <p className="text-sm">Cookie Policy</p>
            </Link>

            {/**
             * 
             * <Link to="">
              <p className="text-sm">Settings</p>
            </Link>
            <Link to="">
              <p className="text-sm">Account</p>
            </Link> **/}
          </div>

          <div className="hidden md:flex justify-center items-center w-3/10 gap-10 ">
            <a
              href="https://www.linkedin.com/company/glomespace/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-900"
            >
              <FaLinkedin />
            </a>
            <Link to="" className="text-pink-800">
              <FaInstagram />
            </Link>

            <Link to="">
              <FaXTwitter />
            </Link>

            <Link to="">
              <FaTiktok />
            </Link>

            <a
              href="https://www.youtube.com/@glomespace"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500"
            >
              <FaYoutube size={25} />
            </a>
          </div>

          <div className="hidden md:flex justify-center items-center w-3/10 gap-5 ">
            <Link to="">
              <p className="text-sm">Currency</p>
            </Link>

            <Link to="">
              <p className="text-sm">Languages</p>
            </Link>

            <Link to="">
              <p className="text-sm">Location</p>
            </Link>

            <Link to="">
              <p className="text-sm"> GlomeSpace</p>
            </Link>
          </div>
        </div>
        <div className="flex justify-center h-8/10 bg-slate-200">
          <div className=" flex justify-between w-full px-3 md:w-8/10 ">
            <div className="flex flex-col md:pl-5 justify-center gap-2 w-3/10">
              <h2 className="font-bold">GlomeSpace</h2>
              <Link to="">
                <p className="text-sm">Careers</p>
              </Link>

              <Link to="/blog-posts">
                <p className="text-sm">Newsletter</p>
              </Link>

              <Link to="/blog-posts">
                <p className="text-sm">Blogs</p>
              </Link>

              <Link to="">
                <p className="text-sm">Mobile Apps</p>
              </Link>

              <Link to="">
                <p className="text-sm">Become an Investor</p>
              </Link>
            </div>

            {/** Middle div */}

            <div className="flex flex-col md:pl-5 justify-center gap-2 md:gap-5 w-3/10">
              <h2 className="font-bold">Services</h2>
              <Link to="">
                <p className="text-sm">Become a Deliverer</p>
              </Link>

              <Link to="">
                <p className="text-sm">Create Shipment</p>
              </Link>

              <Link to="">
                <p className="text-sm">Refer a Deliverer</p>
              </Link>

              <Link to="">
                <p className="text-sm">Book Flights in advance</p>
              </Link>

              <Link to="">
                <p className="text-sm">Promote your shipments</p>
              </Link>

              <Link to="">
                <p className="text-sm">Notifications</p>
              </Link>
            </div>

            {/** Right most div */}

            <div className="flex flex-col md:pl-5 justify-center gap-2 md:gap-5 w-3/10">
              <h2 className="font-bold">Support</h2>
              <Link to="">
                <p className="text-sm">Help Center</p>
              </Link>

              <Link to="">
                <p className="text-sm">Join our subscription plan</p>
              </Link>

              <Link to="">
                <p className="text-sm">Cancellation Options</p>
              </Link>

              <Link to="">
                <p className="text-sm">Review our platform</p>
              </Link>

              <p className="text-sm">Report a Problem</p>

              <Link to="/about-us">
                <p className="text-sm">Frequently Asked Questions (FAQs)</p>
              </Link>

              <Link to="">
                <p className="text-sm">Customer service</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:hidden py-5 flex flex-row justify-center bg-slate-200 items-center gap-10 ">
          <a
            href="https://www.linkedin.com/company/glomespace/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-900"
          >
            <FaLinkedin size={25} />
          </a>
          <Link to="" className="text-pink-800">
            <FaInstagram size={25} />
          </Link>
          <Link to="">
            <FaXTwitter size={25} />
          </Link>
          <Link to="">
            <FaTiktok size={25} />
          </Link>

          <a
            href="https://www.youtube.com/@glomespace"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500"
          >
            <FaYoutube size={25} />
          </a>
        </div>

        <div className="flex flex-col text-[12px] py-10 gap-1  items-center justify-center bg-slate-300 w-full h-1/10 pb-30">
          <p className="text-gray-600">Ship faster, smarter and cheaper</p>

          <p className="text-[12px] text-blue-900">
            &copy;{new Date().getFullYear()} GlomeSpace.com, Inc. All rights
            reserved.
          </p>

          <p>251 West 30th Street, New York, NY 10001, US</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;

export const MobileFooter = () => {
  const [activePage, setActivePage] = useState("shipment_owner");
  const navigate = useNavigate();

  const handleOnClickEvent = (parameter) => {
    setActivePage(parameter);
    if (parameter == "shipment_owner") {
      navigate("/");
    } else if (parameter == "traveler") {
      navigate("/travelers");
    } else if (parameter === "about-us") {
      navigate("/about-us");
    } else if (parameter === "blog-posts") {
      navigate("/blog-posts");
    }
  };

  return (
    <div className="w-full flex items-center justify-between text-[12px] px-10">
      <div
        className={`flex flex-col items-center justify-center ${
          activePage === "shipment_owner" && "text-blue-900 font-bold"
        }`}
        onClick={() => handleOnClickEvent("shipment_owner")}
      >
        <BaggageClaimIcon size={20} />
        <p> Shipment owner </p>
      </div>
      <div
        className={`flex flex-col items-center justify-center ${
          activePage === "traveler" && "text-blue-900 font-bold"
        }`}
        onClick={() => handleOnClickEvent("traveler")}
      >
        {activePage === "traveler" ? (
          <IoAirplaneSharp size={20} />
        ) : (
          <IoAirplaneOutline size={20} />
        )}

        <p> Traveler </p>
      </div>
      <div
        className={`flex flex-col items-center justify-center ${
          activePage === "about-us" && "text-blue-900 font-bold"
        }`}
        onClick={() => handleOnClickEvent("about-us")}
      >
        <MessageCircleHeart size={20} />
        <p> About Us </p>
      </div>

      <div
        className={`flex flex-col items-center justify-center ${
          activePage === "blog-posts" && "text-blue-900 font-bold"
        }`}
        onClick={() => handleOnClickEvent("blog-posts")}
      >
        {activePage === "blog-posts" ? (
          <FaBloggerB size={20} />
        ) : (
          <TbBrandBlogger size={20} />
        )}

        <p className="text-[10px]"> Blog </p>
      </div>
    </div>
  );
};
