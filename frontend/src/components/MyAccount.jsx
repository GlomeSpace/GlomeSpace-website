import { Link } from "react-router-dom";
import {
  Calendar,
  Home,
  TruckElectric,
  BaggageClaim,
  PlaneTakeoff,
  ShoppingCart,
  PackagePlus,
  MessageCircleHeart,
  MessageSquareDot,
  PlaneLanding,
  Combine,
  Settings,
  PhoneCall,
  Bug,
  HandCoins,
} from "lucide-react";

import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { GrLocation } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { TbLocationDollar } from "react-icons/tb";
import { FaPlaneArrival } from "react-icons/fa6";
import { FaCartFlatbedSuitcase } from "react-icons/fa6";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { Button } from "../components/ui/button";
import { useState } from "react";
//import { LoginDialog } from "../pages/RegisterUser";
//import { UseDataFetcher } from "../hooks/UseDataFetcher";

export const MyAccountDialog = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("jwtoken"),
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const userInformation = {};
  const [isSigningOut, setIsSigningOut] = useState(false);
  const onLogoutClick = async () => {
    // await handleUserLogout();
    // After the fetcher finishes clearing the backend/storage,
    // we manually clear this component's state to trigger the UI swap.
    setAccessToken(null);
  };

  return (
    <div className=" h-100 ">
      <div className="flex justify-center w-full h-max text-xl">
        <h1 className="text-blue-900">My Account</h1>
      </div>
      <div className=" h-[1px] w-full rounded-full bg-blue-900 " />

      <div className="flex flex-col items-center text-sm my-3">
        <ul className="font-headerFont">
          <li className="flex items-center gap-2 hover:text-blue-900 hover:font-bold ">
            <RiAccountPinCircleLine size={20} />
            <Link to="/account">Account</Link>
          </li>
          <li className="flex items-center gap-2 hover:text-blue-900 hover:font-bold ">
            <ShoppingCart size={20} />
            <Link to="/account">Shipments</Link>
          </li>
          <li className="flex items-center gap-2 hover:text-blue-900 hover:font-bold ">
            <PlaneLanding size={20} />
            <Link to="/account">Deliveries</Link>
          </li>
          <li className="flex items-center gap-2 hover:text-blue-900 hover:font-bold ">
            <TbLocationDollar className="" size={20} />{" "}
            <Link>Transactions</Link>
          </li>
          <li className="flex items-center gap-2 hover:text-blue-900 hover:font-bold ">
            <MessageSquareDot size={20} />{" "}
            <Link to="/chats">Notifications</Link>
          </li>
          <li className="flex items-center gap-2 hover:text-blue-900 hover:font-bold ">
            <Settings size={20} /> <Link>Settings</Link>
          </li>
        </ul>
      </div>

      <div className=" h-[1px] w-full rounded-full bg-blue-900 " />

      <div className="flex flex-col gap-2 items-center text-sm my-5">
        <ul className="gap-2">
          <li className="flex gap-2 hover:text-blue-900 hover:font-bold ">
            <GrLocation size={20} />
            <Link>Location</Link>
          </li>

          <li className="flex gap-2 hover:text-blue-900 hover:font-bold ">
            <Bug size={20} />
            <Link>Report a Problem</Link>
          </li>
          <li className="flex gap-2 hover:text-blue-900 hover:font-bold ">
            <HandCoins size={20} />
            <Link>Be an Investor</Link>
          </li>
          <li className="flex gap-2 hover:text-blue-900 hover:font-bold ">
            <PhoneCall size={20} />
            <Link>Support</Link>
          </li>
        </ul>
      </div>

      <div className="flex gap-3 items-center text-sm justify-center h-1/4">
        {isSigningOut ? (
          <Button
            disabled
            size="sm"
            className="flex gap-2 bg-blue-900 p-2 text-white rounded-sm"
          >
            Processing <Spinner className="size-6" />
          </Button>
        ) : !accessToken ? (
          <>
            <LoginDialog isOpen={isDialogOpen} onClose={closeDialog} />

            <Button
              onClick={openDialog}
              className="text-[13px] px-2 bg-blue-400"
            >
              Dashboard
            </Button>

            <Link
              to="/register-user"
              className="px-2 py-1 bg-blue-900 rounded-full text-white"
            >
              Create Account
            </Link>
          </>
        ) : (
          <div className="flex flex-col hover:bg-slate-200 items-center gap-3  w-full p-2  rounded-sm">
            {userInformation.firstName && (
              <div className={`flex  gap-2 w-full`}>
                <div className="h-13 aspect-square bg-blue-100 rounded-full">
                  <img
                    src={
                      userInformation?.avatarUrlString ||
                      "/photos/image-placeholder.jpg"
                    }
                    alt="user avatar"
                    className="h-full rounded-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center ">
                  <div className="text-[12px]">
                    <p className="font-bold">
                      {userInformation?.firstName} {userInformation?.otherNames}
                    </p>
                    <p className="text-[10px] text-blue-900">
                      @{userInformation?.username}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={onLogoutClick}
              className="w-5/10 rounded-full text-[13px] px-2 bg-blue-400"
            >
              Sign out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
