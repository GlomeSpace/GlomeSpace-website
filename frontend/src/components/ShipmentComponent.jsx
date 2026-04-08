import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import { IoAirplaneSharp } from "react-icons/io5";
import { UseDataFetcher } from "../hooks/UseDataFetcher";

export const ShipmentComponent = () => {
  const { formatTimestamp } = UseDataFetcher();
  return (
    <div
      className={`hidden md:flex h-50 md:h-40 w-85  shadow-md rounded-xl bg-white hover:bg-slate-100 pb-2 font-headerFont rotate-380`}
    >
      <div className=" flex flex-col items-center justify-between w-full  ">
        <div className="flex items-center justify-center bg-slate-100 gap-2 h-10 rounded-t-xl w-full ">
          United States <IoAirplaneSharp size={25} className="text-blue-900" />
          Australia
        </div>

        <div className=" flex items-center justify-center px-4 h-max w-full ">
          <div className="flex flex-col">
            <p className="font-bold"> M4 Macbook Pro 2024 </p>

            <p className="text-sm text-blue-900">
              {formatTimestamp(Date.now() + 9 * 24 * 60 * 60 * 1000)}
            </p>
          </div>
        </div>

        <div className=" flex items-center justify-center rounded-full bg-blue-900 text-white dark:bg-blue-600 px-2 text-sm">
          9 days to expire
        </div>

        <div className=" w-full flex items-center justify-center gap-2 px-2">
          <Badge variant="outline" className=" hover:bg-white">
            <p className=" text-[10px] ">HJ9883GDVS</p>
          </Badge>

          <Badge variant="outline" className=" hover:bg-white">
            <p className="text-blue-900 text-[10px] font-semi-bold ">2.7kg</p>
          </Badge>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="outline"
                  className="h-8 aspect-square hover:bg-blue-200"
                >
                  <p className="font-bold text-[10px] ">4</p>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Number of matches</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
