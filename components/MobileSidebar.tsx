import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BellDot,
  BlocksIcon,
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
  const Menus: MenuItem[] = [
    {
      title: "Overview",
      notification: 7,
      icon: <FolderKanban className="w-5 h-5" />,
      path: "/dashboard/overview",
    },
    {
      title: "Products",
      notification: 0,
      icon: <ShoppingBag className="w-5 h-5" />,
      path: "/dashboard/products",
    },
    {
      title: "Loyalty Cards",
      icon: <Stamp className="w-5 h-5" />,
      gap: true,
      notification: 0,
      path: "/loyalty-cards",
    },
    {
      title: "Subscriptions",
      notification: 0,
      icon: <Podcast className="w-5 h-5" />,
      path: "/subscriptions",
    },
    {
      title: "Debts",
      notification: 6,
      gap: true,
      icon: <BlocksIcon className="w-5 h-5" />,
      path: "/debts",
    },
    {
      title: "Legal information",
      notification: 3,
      icon: <Scale className="w-5 h-5" />,
      path: "/legal-information",
    },
    {
      title: "Notifications",
      icon: <BellDot className="w-5 h-5" />,
      gap: false,
      notification: 0,
      path: "/notifications",
    },
    {
      title: "Setting",
      notification: 0,
      icon: <Settings className="w-5 h-5" />,
      path: "/settings",
    },
  ];

  return (
    <Sheet key="left">
      <SheetTrigger asChild>
        <Menu className="h-6 w-6 pr-1" />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="w-[300px] sm:w-[540px] bg-[#374c69] border-r border-[#374c69]"
      >
        <div className="flex gap-x-2 items-center border-b border-dashed border-[#6d9ecf] pb-[11px]">
          <Tractor
            className={`text-white dark:text-white cursor-pointer duration-500 h-7 w-7`}
          />
          <h1
            className={`text-white dark:text-white origin-left font-medium text-[22px] duration-200 `}
          >
            Erf1<span className="text-[#6d9ecf]"> Bestellingen</span>
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
                  className={`w-full flex items-center space-x-2 hover:bg-[#6d9ecf] active:bg-[#6d9ecf] py-2 px-2 rounded-lg text-white group-hover:text-white ${
                    isActive(menu.path) ? "bg-[#6d9ecf]" : "bg-[#374c69]"
                  }`}
                  href={menu.path}
                >
                  {menu.icon && (
                    <span
                      className={`mr-0.5 text-[#6d9ecf] group-hover:text-white ${
                        isActive(menu.path) ? "text-white" : ""
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
