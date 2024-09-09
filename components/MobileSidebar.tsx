import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BellDot,
  BlocksIcon,
  Component,
  FolderKanban,
  Menu,
  Podcast,
  Scale,
  Settings,
  ShoppingBag,
  Stamp,
  Tractor,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menus } from "../constants/constants";

interface MenuItem {
  title: string;
  notification?: number;
  icon: JSX.Element;
  gap?: boolean;
  path: string;
}

export function MobileSidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet key="left">
      <SheetTrigger asChild>
        <Menu className="h-6 w-6 pr-1" />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="w-[350px] bg-white border-r border-[#374c69]"
      >
        <div className="flex gap-x-2 items-center border-b border-dashed border-[#6d9ecf] pb-[11px]">
          <Component
            strokeWidth={1.5}
            className={`text-gray-700 pl-1 cursor-pointer duration-500 h-8 w-8`}
          />
          <h1
            className={`text-gray-500 dark:text-white origin-left font-medium text-[22px] duration-200 `}
          >
            Rhyno<span className="text-[#f6ca09]"> Starter</span>
          </h1>
        </div>
        <ul className="pt-6 space-y-3">
          {Menus.map((menu, index) => (
            <div key={index}>
              {menu.gap && (
                <div className="my-4 border-t border-dashed border-[#6d9ecf] dark:border-gray-600" />
              )}
              <li className="group">
                <Link
                  className={`w-full flex items-center space-x-2 hover:bg-gray-700 dark:hover:bg-gray-700 active:bg-gray-300 py-3 px-2 rounded-lg text-gray-400 group-hover:text-white ${
                    isActive(menu.path)
                      ? "bg-gray-700 text-white dark:bg-[#292929]"
                      : ""
                  }`}
                  href={menu.path}
                >
                  {menu.icon && (
                    <span
                      className={`mr-0.5 text-gray-600 group-hover:text-yellow-500  dark:text-[#888888] ${
                        isActive(menu.path) ? " text-yellow-500" : ""
                      }`}
                    >
                      {menu.icon}
                    </span>
                  )}
                  <span
                    className={`${
                      !open && ""
                    } origin-left duration-200 flex items-center w-full`}
                  >
                    <div className="flex relative items-center w-full">
                      <div className="">{menu.title}</div>
                      <div className="absolute right-2 top-1">
                        {!!menu.notification && (
                          <div className="text-xs text-white rounded-[4px] h-4 w-7 flex justify-center items-center">
                            <div
                              className={`${
                                isActive(menu.path)
                                  ? "bg-white text-xs text-[#374c69] rounded-[4px] h-4 w-7 flex justify-center items-center"
                                  : "bg-[#ffffff] text-xs text-white rounded-[4px] h-4 w-7 flex justify-center items-center"
                              }`}
                            >
                              {menu.notification}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </span>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
