// app/tutors/page.tsx (or wherever your file is located)
import TutorsCard from "@/components/TutorsCard";
import Link from "next/link";

export const metadata = {
  title: "Mediqueue | Tutors",
  description: "Tutor Booking platform",
};

const TutorsPage = async ({ searchParams }) => {
  const { search = "", startDate = "", endDate = "" } = await searchParams;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/tutors?search=${search}&startDate=${startDate}&endDate=${endDate}`,
  );
  const tutors = await res.json();
  // console.log(tutors);
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto py-20 px-4">
        <h1 className="text-3xl font-bold mb-6">All Tutors</h1>

        <form
          method="GET"
          className="mb-6 flex flex-wrap items-center gap-2 rounded-lg bg-gray-50 p-2 shadow-sm dark:bg-gray-800/90 sm:flex-nowrap sm:gap-3 sm:p-3"
        >
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search by tutor name..."
            className="min-w-[140px] flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />

          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
            <span className="hidden xs:inline">From:</span>
            <input
              type="date"
              name="startDate"
              defaultValue={startDate}
              aria-label="Start Date"
              className="w-32 rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:w-36"
            />
          </div>

          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
            <span className="hidden xs:inline">To:</span>
            <input
              type="date"
              name="endDate"
              defaultValue={endDate}
              aria-label="End Date"
              className="w-32 rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:w-36"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-purple-500 dark:hover:bg-purple-600"
          >
            Filter
          </button>

          <Link
            href="/tutors"
            className="text-sm font-medium text-purple-600 transition hover:text-purple-800 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
          >
            Reset
          </Link>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <TutorsCard key={tutor._id} tutor={tutor} />
          ))}
        </div>

        {tutors.length === 0 && (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            No tutors found.
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorsPage;
