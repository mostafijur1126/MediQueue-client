// app/tutors/page.tsx (or wherever your file is located)
import TutorsCard from "@/components/TutorsCard";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Mediqueue | Tutors",
  description: "Tutor Booking platform",
};

const TutorsPage = async ({ searchParams }) => {
  // Get parameters from URL
  const { search = "", startDate = "", endDate = "" } = await searchParams;

  // Fetch all tutors
  const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/tutors`, {
    cache: "no-store", // optional: always get fresh data
  });
  const tutors = await res.json();

  // Filtering logic: name + registration date range
  const filteredTutors = tutors.filter((tutor) => {
    // 1. Filter by name (case insensitive)
    const nameMatch = tutor.tutorName
      ?.toLowerCase()
      .includes(search.toLowerCase());

    // 2. Filter by registration date range
    let dateMatch = true;
    const regDate = new Date(tutor.registrationDate);

    if (startDate) {
      const start = new Date(startDate);
      dateMatch = dateMatch && regDate >= start;
    }
    if (endDate) {
      const end = new Date(endDate);
      // To include the entire end day, compare with the next day
      const endNextDay = new Date(end);
      endNextDay.setDate(endNextDay.getDate() + 1);
      dateMatch = dateMatch && regDate < endNextDay;
    }

    return nameMatch && dateMatch;
  });

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto py-20 px-4">
        <h1 className="text-3xl font-bold mb-6">All Tutors</h1>

        {/* Filter Form - GET method */}
        <form className="mb-8 space-y-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
          <div>
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search by tutor name..."
              className="w-full border px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Registration Start Date
              </label>
              <input
                type="date"
                name="startDate"
                defaultValue={startDate}
                className="w-full border px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Registration End Date
              </label>
              <input
                type="date"
                name="endDate"
                defaultValue={endDate}
                className="w-full border px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Filter
            </button>
            <Link
              href="/tutors"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Reset
            </Link>
          </div>
        </form>

        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Found {filteredTutors.length} tutor(s)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map((tutor) => (
            <TutorsCard key={tutor._id} tutor={tutor} />
          ))}
        </div>

        {filteredTutors.length === 0 && (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            No tutors found.
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorsPage;
