import { Link, NavLink, useLocation } from "react-router-dom";
import {
  BaggageClaim,
  MessageCircleHeart,
  UserRoundSearch,
  UserStar,
} from "lucide-react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MyAccountDialog } from "./MyAccount";

const Header = () => {
  const GLOMESPACE_APP_URL = import.meta.env.VITE_GLOMESPACE_APP_URL;
  return (
    <>
      <div className="flex   fixed z-100  items-center font-headerFont  bg-blue-200 w-full h-20 md:h-15">
        {/** Mobile Nav bar */}
        <div className="md:hidden font-headerFont flex items-center justify-center w-full  gap-2 h-20  px-3 ">
          <div className="md:hidden z-99 flex items-center justify-between   gap-2 h-20 p-1 ">
            <Link to="/" className="">
              <img src="/photos/glomespaceB.svg" width={150} />
            </Link>
          </div>
        </div>

        <div className="ml-15 hidden md:flex items-center justify-between   mx-5 w-full h-10">
          <div className=" w-1/10  font-bold ">
            <Link to="/">
              <img src="/photos/glomespaceB.svg" width={150} />
            </Link>
          </div>
          <div className="md:hidden"></div>

          <div className="w-5/10 hidden md:flex  items-center justify-center md:gap-2 lg:gap-5 md:text-[11px] lg:text-[15px]">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-blue-900 flex flex-col items-center "
                  : "flex flex-col items-center  hover:text-gray-700"
              }
            >
              <BaggageClaim size={20} />
              Shipment Owners
            </NavLink>
            <NavLink
              to="/travelers"
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-blue-900 flex flex-col items-center "
                  : "flex flex-col items-center hover:text-gray-700"
              }
            >
              <UserRoundSearch size={20} />
              Travelers
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-blue-900 flex flex-col items-center "
                  : "flex flex-col items-center hover:text-gray-700"
              }
            >
              <TbLayoutDashboardFilled size={20} />

              <p className="/blog-posts"> About Us </p>
            </NavLink>
            <NavLink
              to="/blog-posts"
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-blue-900 flex flex-col items-center "
                  : "flex flex-col items-center  hover:text-gray-700"
              }
            >
              <MessageCircleHeart size={20} />
              Our Blog
            </NavLink>
          </div>

          <div className="hidden md:flex items-center justify-end gap-4 w-4/10 ">
            <Button className="text-[13px] px-2  bg-blue-900">
              <a
                href={`${GLOMESPACE_APP_URL}/account`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Create a Shipment
              </a>
            </Button>

            <Button className="text-[13px] px-2  bg-blue-400">
              <a
                href={`${GLOMESPACE_APP_URL}/find-deliverer`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Become a Deliverer
              </a>
            </Button>

            <div className="h-10 aspect-square rounded-full">
              <a href={`${GLOMESPACE_APP_URL}/register-user`}>
                <img
                  src={"/photos/image-placeholder.jpg"}
                  alt="user avatar"
                  className="h-full rounded-full w-full object-cover"
                />
              </a>
            </div>

            {/**
            <Popover>
              <PopoverTrigger>
                <div className="h-10 aspect-square rounded-full">
                  <img
                    src={"/photos/image-placeholder.jpg"}
                    alt="user avatar"
                    className="h-full rounded-full w-full object-cover"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="mt-4 mr-2">
                <MyAccountDialog />
              </PopoverContent>
            </Popover>

            
          <LuLanguages size={20} /> ENG
          
           * <form className="flex justify-between pr-3 w-50 border border-slate-300 rounded-full">
            <input
              className=""
              type="text"

              value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="">
              <CiSearch size={20} />
            </button>
          </form>
           */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
