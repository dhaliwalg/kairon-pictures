'use client'; // This component uses client-side hooks

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname

const Header = () => {
  const pathname = usePathname(); // Get the current path

  // Helper function to check if a link is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    // Fixed at the top, full width, high z-index.
    // Important: It needs pointer-events-auto so its links are clickable!
    <header className="fixed top-0 left-0 w-full z-40 bg-transparent text-black pt-4 pb-4 pointer-events-auto"> {/* ADDED pointer-events-auto */}
      <nav className="flex justify-around items-center h-full text-lg md:text-xl lg:text-2xl font-bold">
        {/* Links are naturally clickable, but if a parent has pointer-events-none, they stop. */}
        {/* Explicitly adding pointer-events-auto to links is usually good practice in such setups, */}
        {/* though in this case, putting it on the header might be enough as it re-enables for children. */}
        <Link
          href="/"
          className={`flex-1 text-center hover:text-gray-400 py-2 ${
            isActive('/') ? 'underline underline-offset-4' : ''
          }`}
        >
          HOME
        </Link>
        <Link
          href="/work"
          className={`flex-1 text-center hover:text-gray-400 py-2 ${
            isActive('/work') ? 'underline underline-offset-4' : ''
          }`}
        >
          WORK
        </Link>
        <Link
          href="/about"
          className={`flex-1 text-center hover:text-gray-400 py-2 ${
            isActive('/about') ? 'underline underline-offset-4' : ''
          }`}
        >
          ABOUT
        </Link>
                <Link
          href="/contact"
          className={`flex-1 text-center hover:text-gray-400 py-2 ${
            isActive('/contact') ? 'underline underline-offset-4' : ''
          }`}
        >
          CONTACT
        </Link>
      </nav>
    </header>
  );
};

export default Header;