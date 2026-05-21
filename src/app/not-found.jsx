import React from "react";
import Link from "next/link";
import { TbError404 } from "react-icons/tb";
import { HiArrowLeft } from "react-icons/hi";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        {/* 404 Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-3xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center">
            <TbError404 className="w-14 h-14 text-indigo-500 dark:text-indigo-400" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
          404
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
          Page Not Found
        </h2>
        <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved.
          <br />
          Let's get you back on track.
        </p>

        {/* Divider */}
        <div className="w-12 h-px bg-gray-200 dark:bg-gray-800 mx-auto mb-8" />

        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-xl transition-colors duration-200 shadow-sm"
        >
          <HiArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
