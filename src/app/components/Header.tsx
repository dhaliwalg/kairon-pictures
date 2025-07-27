"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-transparent text-black pt-4 pb-4 pointer-events-none">
      <nav className="flex justify-between items-center h-full text-lg md:text-xl lg:text-2xl font-bold pointer-events-none px-8">
        <div className="flex justify-start">
          <Link href="/" className="hover:opacity-80 py-2 pointer-events-auto">
            <Image
              src="/BLACKLOGO.png"
              alt="Home"
              width={120}
              height={40}
              className="h-auto"
            />
          </Link>
        </div>
        <div className="flex justify-center space-x-16">
          <Link
            href="/work"
            className={`hover:text-white py-2 pointer-events-auto ${
              isActive("/work") ? "underline underline-offset-4" : ""
            }`}
          >
            WORK
          </Link>
          <Link
            href="/about"
            className={`hover:text-white py-2 pointer-events-auto ${
              isActive("/about") ? "underline underline-offset-4" : ""
            }`}
          >
            ABOUT
          </Link>
          <Link
            href="/contact"
            className={`hover:text-white py-2 pointer-events-auto ${
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
