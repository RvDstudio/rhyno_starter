import {
  BellDot,
  BlocksIcon,
  LayoutDashboard,
  Podcast,
  Scale,
  Settings,
  ShoppingBag,
  Stamp,
  User,
} from "lucide-react";

interface MenuItem {
  title: string;
  notification?: number;
  icon: JSX.Element;
  gap?: boolean;
  path: string;
}

export const Menus: MenuItem[] = [
  {
    title: "Dashboard",
    notification: 0,
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: "/dashboard",
  },
  {
    title: "Profile",
    notification: 0,
    icon: <User className="w-5 h-5" />,
    path: "/dashboard/profile",
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
    gap: false,
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
    gap: false,
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
