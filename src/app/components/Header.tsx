"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Header = () => {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-transparent text-black pt-4 pb-4 pointer-events-none">
      <nav className="flex justify-between items-center h-full text-lg md:text-xl lg:text-2xl font-bold pointer-events-none px-8 w-full">
        {/* Logo on far left */}
        <div className="flex-shrink-0">
          <Link href="/" className="hover:opacity-80 py-2 pointer-events-auto">
            <Image
              src="/BLACKKP.png"
              alt="Home"
              width={30}
              height={30}
              className="h-auto"
            />
          </Link>
        </div>

        {/* Navigation Links in center space */}
        <div className="flex space-x-60 flex-1 justify-center">
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

        {/* Social Icons stuck to right corner */}
        <div className="flex items-center space-x-4 pointer-events-auto flex-shrink-0">
            <Link
              href="https://www.instagram.com/kaironpictures/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaInstagram size={24} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/kairon-pictures-llc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaLinkedinIn size={24} />
            </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;