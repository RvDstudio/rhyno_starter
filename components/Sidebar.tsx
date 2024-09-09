"use client";
import {
  ArrowLeftSquareIcon,
  Tractor,
  Milk,
  AudioWaveform,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menus } from "../constants/constants";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div
      className={`${
        open ? "lg:w-72 md:w-64 hidden md:block" : "w-18 hidden md:block"
      } bg-white text-gray-600 dark:bg-[#171717] border-r border-[#dddddd] dark:border-[#2e2e2e] p-4 pt-4 h-screen sticky top-0 duration-300 z-40`}
    >
      <div className="flex gap-x-2 items-center border-b border-gray-200 dark:border-[#2e2e2e] pb-[16px]">
        <Tractor
          strokeWidth={1}
          className={`text-white pl-1 dark:text-white cursor-pointer duration-500 h-8 w-8`}
        />
        <h1
          className={`text-gray-600 dark:text-white origin-left font-medium text-2xl duration-200 ${
            !open && "scale-0 hidden"
          }`}
        >
          Rhyno<span className="text-[#f6ca09]"> Starter</span>
        </h1>
      </div>

      <ul className="pt-4 space-y-3">
        {Menus.map((menu, index) => (
          <div key={index}>
            {menu.gap && (
              <div className="my-4 border-t border-dashed border-[#6699CC] dark:border-gray-600" />
            )}
            <li className="">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      className={`w-full flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-[#292929] active:bg-gray-300 py-3 px-2 rounded-lg text-gray-400 ${
                        isActive(menu.path)
                          ? "bg-gray-100 text-gray-300 dark:bg-[#292929]"
                          : ""
                      }`}
                      href={menu.path}
                    >
                      {menu.icon && (
                        <span className="mr-0.5 text-gray-600 dark:text-[#888888]">
                          {menu.icon}
                        </span>
                      )}
                      <span
                        className={`${
                          !open && "hidden"
                        } origin-left duration-200 flex items-center w-full`}
                      >
                        <div className="flex relative items-center w-full">
                          <div className="">{menu.title}</div>
                          <div className="absolute right-2 top-1">
                            {!!menu.notification && (
                              <div className="text-xs text-white bg-[#f6ca09] rounded-[4px] h-4 w-7 flex justify-center items-center">
                                {menu.notification}
                              </div>
                            )}
                          </div>
                        </div>
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{menu.title}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          </div>
        ))}
      </ul>

      <div className="bg-gray-100 dark:bg-[#292929] absolute bottom-0 left-0 w-full">
        <div
          className={`${
            !open && "justify-center"
          } flex items-center gap-x-4 p-4 border-[#dddddd] dark:border-[#2e2e2e] border-t border-b border-dashed`}
        >
          <AudioWaveform className="text-[#f6ca09] w-8 h-8" />
          <div className={`${!open && "hidden"} text-sm`}>
            <h2 className="text-[#bababa] font-bold">Reinier Varkevisser</h2>
            <p className="text-[#f6ca09] text-[12px] font-bold">
              developer / Admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
