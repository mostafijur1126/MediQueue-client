"use client";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaBars,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaHome,
  FaMoon,
  FaRegistered,
  FaRegRegistered,
  FaSignInAlt,
  FaSignOutAlt,
  FaTimes,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

const Avatar = ({ name, image }) => {
  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";
  return image ? (
    <Image
      src={image}
      alt={name}
      width={20}
      height={20}
      className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-500/30"
    />
  ) : (
    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 text-sm font-semibold ring-2 ring-purple-500/30">
      {initials}
    </span>
  );
};

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinksPublic = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "Tutors", href: "/tutors", icon: FaChalkboardTeacher },
  ];
  const navLinksPrivate = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "Tutors", href: "/tutors", icon: FaChalkboardTeacher },
    { name: "Add Tutor", href: "/add-tutor", icon: FaUserPlus },
    { name: "My Tutors", href: "/my-tutors", icon: FaUsers },
    { name: "My Sessions", href: "/my-sessions", icon: FaCalendarAlt },
  ];

  const navLinks = user ? navLinksPrivate : navLinksPublic;

  const isActive = (href) => pathname === href;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/login"),
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/70 dark:border-gray-800/70 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 text-xl font-bold tracking-tight text-purple-600 dark:text-purple-400 hover:opacity-80 transition-opacity"
          >
            Mediqueue
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive(href)
                    ? "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                <Icon className="text-base" />
                {name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {theme === "dark" ? (
                  <IoSunnyOutline className="text-lg" />
                ) : (
                  <FaMoon className="text-base" />
                )}
              </button>
            )}

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-2">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <FaSignInAlt className="text-sm" />
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-sm"
                  >
                    <FaRegistered className="text-sm" />
                    Register
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen((v) => !v)}
                    className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                  >
                    <Avatar name={user?.name} image={user?.image} />
                    <span className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-300 pr-1">
                      {user?.name?.split(" ")[0]}
                    </span>
                  </button>

                  {isProfileDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-1.5 z-20 overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-800">
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user?.email}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            handleLogout();
                          }}
                          className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        >
                          <FaSignOutAlt className="text-base" />
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 z-40 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen
            ? "max-h-[calc(100vh-4rem)] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {navLinks.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive(href)
                  ? "bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="text-base" />
              {name}
            </Link>
          ))}

          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            {!user ? (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <FaSignInAlt />
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                >
                  <FaRegRegistered />
                  Register
                </Link>
              </div>
            ) : (
              <div className="pt-2 space-y-1">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <Avatar name={user?.name} image={user?.image} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                >
                  <FaSignOutAlt className="text-base" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
