import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon } from "lucide-react";
import { IoAirplaneSharp } from "react-icons/io5";
import { UseDataFetcher } from "../hooks/UseDataFetcher";
import { FaStar } from "react-icons/fa6";

export const FlightDetailsComponent = () => {
  const { formatTimestamp } = UseDataFetcher();
  return (
    <div
      className={`hidden md:flex h-50 md:h-40  shadow-md rounded-xl hover:bg-slate-100 pb-2 font-headerFont rotate-380 bg-white w-85 `}
    >
      <div className="flex flex-col justify-between  items-center w-full ">
        <div className="flex items-center justify-between bg-slate-100 gap-2 h-10 rounded-t-xl w-full px-3 ">
          <p className="font-bold">Burton Parker</p>

          <ShadeStars starsToShade={4} />
        </div>

        <div className=" flex items-center justify-center px-4 h-max w-full ">
          <div className="flex flex-col  ">
            <div className="flex items-center justify-center gap-1">
              <p className=""> United States </p>
              <IoAirplaneSharp size={25} className="text-blue-900" />
              <p>Australia </p>
            </div>
            <div className="font-bold text-sm text-blue-500">
              <span className="font-normal text-blue-900">
                {formatTimestamp(Date.now() + 9 * 24 * 60 * 60 * 1000)}
              </span>
            </div>
          </div>
        </div>

        <div className=" flex items-center justify-center rounded-full bg-blue-900 text-white dark:bg-blue-600 px-2 text-sm">
          6 days to expire
        </div>

        <div className="flex items-center  justify-center gap-2 px-2">
          <Badge variant="outline" className=" hover:bg-white">
            <p className="text-blue-900 font-semi-bold ">$8.00/kg</p>
          </Badge>

          <Badge variant="outline" className=" hover:bg-white">
            <p className="text-blue-900 font-semi-bold ">12.9kg</p>
          </Badge>
          <Badge
            variant="secondary"
            className="bg-green-500 text-white dark:bg-blue-600"
          >
            <BadgeCheckIcon />
            Verified
          </Badge>
        </div>
      </div>
    </div>
  );
};

const ShadeStars = ({ starsToShade }) => {
  const shadedStars = [];
  const unShadedStars = [];
  const unShadedStarsCount = 5 - starsToShade;

  for (let i = 1; i <= starsToShade; i++) {
    shadedStars.push(<FaStar key={`shaded-${i}`} className="text-blue-900 " />);
  }
  for (let i = 0; i < unShadedStarsCount; i++) {
    unShadedStars.push(
      <FaStar key={`unshaded-${i}`} className="text-gray-400" />,
    );
  }

  return (
    <div className="flex items-center">
      {shadedStars}
      {unShadedStars}
    </div>
  );
};
