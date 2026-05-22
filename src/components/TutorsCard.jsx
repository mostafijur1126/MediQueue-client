import Image from "next/image";
import Link from "next/link";
import React from "react";

const TutorsCard = ({ tutor }) => {
  return (
    <div className="group bg-white dark:bg-transparent rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-800">
      {/* Image Container */}
      <div className="relative w-full h-64 overflow-hidden bg-gray-200 dark:bg-gray-800">
        <Image
          src={tutor.photo}
          alt={tutor.tutorName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-1">
          {tutor.tutorName}
        </h3>

        <div className="space-y-1.5 text-sm">
          <p className="flex justify-between items-baseline">
            <span className="text-gray-500 dark:text-gray-400">Subject</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {tutor.subject}
            </span>
          </p>
          <p className="flex justify-between items-baseline">
            <span className="text-gray-500 dark:text-gray-400">Available</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {tutor.availableTime}
            </span>
          </p>
          <p className="flex justify-between items-baseline">
            <span className="text-gray-500 dark:text-gray-400">Start date</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {tutor.sessionStartDate}
            </span>
          </p>
          <p className="flex justify-between items-baseline pt-1 border-t border-gray-100 dark:border-gray-800">
            <span className="text-gray-500 dark:text-gray-400">Hourly fee</span>
            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
              ৳{tutor.hourlyFee}
            </span>
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-5 pt-0">
        <Link
          href={`/tutors/${tutor._id}`}
          className="block w-full text-center bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/30 dark:hover:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-medium py-2.5 rounded-xl transition-colors border border-purple-200 dark:border-purple-800"
        >
          Book Session →
        </Link>
      </div>
    </div>
  );
};

export default TutorsCard;
