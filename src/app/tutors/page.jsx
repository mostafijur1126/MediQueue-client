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
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto py-20 px-4">
        <h1 className="text-3xl font-bold mb-6">All Tutors</h1>

        {/* Filter Form - GET method */}
        <form
          method="GET"
          className="mb-8 space-y-4 bg-gray-50 rounded-lg dark:bg-gray-800 p-4"
        >
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search by tutor name..."
            className="w-full border px-4 py-3 rounded-lg"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1">Start Date</label>

              <input
                type="date"
                name="startDate"
                defaultValue={startDate}
                className="w-full border px-4 py-3 rounded-lg"
              />
            </div>

            <div className="flex-1">
              <label className="block mb-1">End Date</label>

              <input
                type="date"
                name="endDate"
                defaultValue={endDate}
                className="w-full border px-4 py-3 rounded-lg"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Filter
            </button>

            <Link href="/tutors">Reset</Link>
          </div>
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
