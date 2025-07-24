"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-transparent text-black pt-4 pb-4 pointer-events-none">
      <nav className="flex justify-around items-center h-full text-lg md:text-xl lg:text-2xl font-bold pointer-events-none">
        <div className="flex-1 flex justify-center">
          <Link
            href="/"
            className={`hover:text-gray-400 py-2 pointer-events-auto ${
              isActive("/") ? "underline underline-offset-4" : ""
            }`}
          >
            HOME
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <Link
            href="/work"
            className={`hover:text-gray-400 py-2 pointer-events-auto ${
              isActive("/work") ? "underline underline-offset-4" : ""
            }`}
          >
            WORK
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <Link
            href="/about"
            className={`hover:text-gray-400 py-2 pointer-events-auto ${
              isActive("/about") ? "underline underline-offset-4" : ""
            }`}
          >
            ABOUT
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <Link
            href="/contact"
            className={`hover:text-gray-400 py-2 pointer-events-auto ${
              isActive("/contact") ? "underline underline-offset-4" : ""
            }`}
          >
            CONTACT
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
