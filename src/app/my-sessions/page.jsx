import RemoveButton from "@/components/RemoveButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
export const metadata = {
  title: "Mediqueue | My Sessions",
  description: "Tutor Booking platform",
};

const MySessionsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/booking?email=${user.email}`,
    {
      headers: {
        authorization: `Bearer ${token} `,
      },
    },
  );
  const sessions = await res.json();
  return (
    <div>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100">
              My Booked Session
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your enrolled tutors and sessions
            </p>
          </div>

          {/* Desktop Table — hidden on small screens */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  {[
                    "Student Name",
                    "Phone",
                    "Tutor Name",
                    "Email",
                    "Status",
                    "Cancel",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                {sessions.map((session, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
                  >
                    <td className="px-5 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                      {session.user.name}
                    </td>
                    <td className="px-5 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {session.user.phone}
                    </td>
                    <td className="px-5 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {session.tutorName}
                    </td>
                    <td className="px-5 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {session.user.email}
                    </td>
                    <td className="px-5 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                        {session.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <RemoveButton
                        bookingId={session._id}
                        status={session.status}
                      ></RemoveButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards — shown only on small screens */}
          <div className="md:hidden space-y-4">
            {sessions.map((session, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {session.tutorName}
                  </h2>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                    ${session.hourlyFee}/hr
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Subject
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 text-right">
                    {session.subject}
                  </span>

                  <span className="text-gray-500 dark:text-gray-400">
                    Available
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 text-right">
                    {session.availableTime}
                  </span>

                  <span className="text-gray-500 dark:text-gray-400">
                    Total Slots
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 text-right">
                    {session.totalSlots}
                  </span>

                  <span className="text-gray-500 dark:text-gray-400">
                    Registered
                  </span>
                </div>

                <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <RemoveButton
                    bookingId={session._id}
                    status={session.status}
                  ></RemoveButton>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {sessions.length === 0 && (
            <div className="text-center py-16 text-gray-400 dark:text-gray-600">
              <p className="text-lg font-medium">No tutors found</p>
              <p className="text-sm mt-1">
                You haven't enrolled with any tutors yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySessionsPage;
