import BookSessionModal from "@/components/BookSessionModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/tutors/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const tutor = await res.json();

  return {
    title: tutor.tutorName,
    description: tutor.subject,
  };
};

const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/tutors/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const tutor = await res.json();
  // console.log(tutor);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
            <div className="relative w-full md:w-80 h-80 md:h-auto md:min-h-[320px] rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 flex-shrink-0">
              <Image
                src={tutor.photo}
                alt={tutor.tutorName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {tutor.tutorName}
                </h1>
                <p className="text-purple-600 dark:text-purple-400 font-medium mt-1">
                  {tutor.subject}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <DetailRow label="Institute" value={tutor.institution} />
                <DetailRow label="Experience" value={tutor.experience} />
                <DetailRow label="Location" value={tutor.location} />
                <DetailRow label="Mode" value={tutor.teachingMode} />
                <DetailRow
                  label="Availability"
                  value={tutor.availableTime}
                  fullWidth
                />
                <DetailRow
                  label="Session Start"
                  value={tutor.sessionStartDate}
                />
                <DetailRow label="Remaining Slots" value={tutor.totalSlots} />
                <DetailRow
                  label="Hourly Fee"
                  value={`৳${tutor.hourlyFee}`}
                  highlight
                />
              </div>

              <div className="pt-4">
                <BookSessionModal tutor={tutor} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, highlight = false, fullWidth = false }) => (
  <div className={fullWidth ? "sm:col-span-2" : ""}>
    <span className="text-gray-500 dark:text-gray-400 block text-xs uppercase tracking-wide">
      {label}
    </span>
    <p
      className={`text-gray-800 dark:text-gray-200 font-medium ${
        highlight ? "text-lg text-purple-600 dark:text-purple-400" : "text-base"
      }`}
    >
      {value || "—"}
    </p>
  </div>
);

export default TutorDetailsPage;
