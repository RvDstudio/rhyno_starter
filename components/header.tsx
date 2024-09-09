import { auth, signOut } from "@/auth";
import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";

const Header = async () => {
  const session = await auth();
  const user = session?.user;

  const logoutAction = async () => {
    "use server";
    await signOut();
  };

  return (
    <>
      <header className="bg-transparent border border-[#dddddd] px-6 h-20">
        <nav className="h-full flex justify-between max-w-7xl mx-auto items-center">
          <div>
            <Link href="/" className="text-gray-700 text-2xl font-semibold">
              Rhyno Starter
            </Link>
          </div>
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="/" className="text-[#888888]">
                Home
              </Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link href="/register" className="text-[#888888]">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-[#888888]">
                    Login
                  </Link>
                </li>
              </>
            )}
            {user && (
              <form action={logoutAction} className="flex">
                <li>
                  <Link href="/client-side" className="text-[#888888]">
                    Client
                  </Link>
                </li>
                <li className="ml-4">
                  <Link href="/profile" className="text-[#888888]">
                    Profile
                  </Link>
                </li>
                <li className="ml-4">
                  <button>Logout</button>
                </li>
              </form>
            )}
          </ul>
          <div className="flex space-x-4 text-[#888888]">
            <Search />
            <User />
            <ShoppingBag />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
