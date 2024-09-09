"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Heart, SearchIcon, ShoppingBag } from "lucide-react";

import { MobileSidebar } from "@/components/MobileSidebar";
import UserAvatar from "./UserAvatar";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 flex py-3 items-center border-b  bg-white dark:bg-[#1f1f1f] px-4 md:px-6 z-20">
      <div className="md:hidden ">
        <MobileSidebar />
      </div>

      <Link
        href="#"
        className="relative pl-4 flex items-center gap-2"
        prefetch={false}
      >
        <span className="text-lg font-semibold hidden md:inline-block">
          Dashboard
        </span>
      </Link>

      <div className="ml-auto flex items-center gap-4">
        <form className="flex-1 max-w-[150px]">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 " />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-full bg- dark:bg-[#1c1c1c]"
            />
          </div>
        </form>

        <ThemeToggle />
        <UserAvatar />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Heart className="h-6 w-6 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cart</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ShoppingBag className="h-6 w-6 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cart</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
