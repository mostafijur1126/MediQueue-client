import React from "react";
import TutorsCard from "./TutorsCard";
import Link from "next/link";

const TutorSectionHome = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/tutorsHome`);

  const data = await res.json();

  if (!data.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No tutors available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-950   px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Popular Tutors
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Learn from the best – handpicked for you
            </p>
          </div>
          <Link href={"/tutors"}>
            <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm transition-colors">
              View all tutors →
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {data.map((tutor) => (
            <TutorsCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TutorSectionHome;
