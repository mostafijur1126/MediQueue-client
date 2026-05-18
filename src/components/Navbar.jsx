"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
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
  FaUserCircle,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "Tutors", href: "/tutors", icon: FaChalkboardTeacher },
    { name: "Add Tutor", href: "/add-tutor", icon: FaUserPlus },
    { name: "My Tutors", href: "/my-tutors", icon: FaUsers },
    { name: "My Booked Sessions", href: "/my-sessions", icon: FaCalendarAlt },
  ];
  const isActive = (href) => pathname === href;
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Mediqueue
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`}
              >
                <link.icon className="text-lg" />
                {link.name}
              </Link>
            ))}
          </div>
          <div className="text-black">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <IoSunnyOutline /> : <FaMoon />}
            </button>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <FaSignInAlt />
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaRegistered />
                Register
              </Link>
            </>
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                {/* <img
                      src={"has"}
                      alt={"sdf"}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 hover:border-blue-500 transition-colors"
                    /> */}

                <FaUserCircle className="w-10 h-10 text-gray-400 hover:text-blue-500 transition-colors" />

                <span className="text-sm font-medium text-gray-700 hidden lg:block">
                  {/* {user?.name?.split(" ")[0]} */}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-20 border border-gray-100">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <FaUserCircle className="text-lg" />
                      My Profile
                    </Link>
                    <hr className="my-1" />
                    <button
                      //   onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <FaSignOutAlt className="text-lg" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none p-2"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-4 py-4 space-y-3 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {/* Navigation Links */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(link.href)
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <link.icon className="text-xl" />
              {link.name}
            </Link>
          ))}

          <hr className="my-2" />

          {/* Mobile Auth Section */}

          <>
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <FaSignInAlt className="text-xl" />
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaRegRegistered className="text-xl" />
              Register
            </Link>
          </>

          <>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              {/* <img 
                    src={user.avatar}
                   alt={user.name}
                   className="w-12 h-12 rounded-full object-cover"
                  /> */}

              <FaUserCircle className="w-12 h-12 text-gray-400" />

              <div>
                <p className="font-medium text-gray-900">name</p>
                <p className="text-sm text-gray-500">email</p>
              </div>
            </div>
            <Link
              href="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <FaUserCircle className="text-xl" />
              My Profile
            </Link>
            <button
              onClick={() => {
                // handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
            >
              <FaSignOutAlt className="text-xl" />
              Logout
            </button>
          </>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
