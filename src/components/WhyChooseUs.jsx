import React from "react";
import {
  FaChalkboardTeacher,
  FaCalendarCheck,
  FaShieldAlt,
  FaStar,
  FaClock,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    icon: <FaChalkboardTeacher size={28} />,
    title: "Expert Tutors",
    description:
      "All tutors are rigorously vetted with verified credentials, background checks, and subject mastery tests before joining our platform.",
    accent: "blue",
  },
  {
    icon: <FaCalendarCheck size={28} />,
    title: "Flexible Scheduling",
    description:
      "Book sessions that fit your timetable — mornings, evenings, or weekends. Reschedule anytime with zero hassle.",
    accent: "teal",
  },
  {
    icon: <FaShieldAlt size={28} />,
    title: "Money-Back Guarantee",
    description:
      "Not satisfied with your first session? We'll refund you completely — no questions asked. Your progress is our promise.",
    accent: "purple",
  },
  {
    icon: <FaStar size={28} />,
    title: "Personalised Learning",
    description:
      "Each session is crafted around your goals. Whether you're catching up or pushing ahead, your tutor adapts to you.",
    accent: "amber",
  },
  {
    icon: <FaClock size={28} />,
    title: "Instant Booking",
    description:
      "Find and book a qualified tutor in minutes. Live availability, instant confirmation — no long waiting periods.",
    accent: "teal",
  },
  {
    icon: <FaHeadset size={28} />,
    title: "24/7 Support",
    description:
      "Our support team is always here. From technical issues to tutor matching queries, we respond fast, any time of day.",
    accent: "blue",
  },
];

const accentMap = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    icon: "text-blue-600 dark:text-blue-400",
    border: "border-blue-100 dark:border-blue-800",
    badge: "bg-blue-100 dark:bg-blue-800/40 text-blue-700 dark:text-blue-300",
  },
  teal: {
    bg: "bg-teal-50 dark:bg-teal-900/20",
    icon: "text-teal-600 dark:text-teal-400",
    border: "border-teal-100 dark:border-teal-800",
    badge: "bg-teal-100 dark:bg-teal-800/40 text-teal-700 dark:text-teal-300",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    icon: "text-purple-600 dark:text-purple-400",
    border: "border-purple-100 dark:border-purple-800",
    badge:
      "bg-purple-100 dark:bg-purple-800/40 text-purple-700 dark:text-purple-300",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-900/20",
    icon: "text-amber-600 dark:text-amber-400",
    border: "border-amber-100 dark:border-amber-800",
    badge:
      "bg-amber-100 dark:bg-amber-800/40 text-amber-700 dark:text-amber-300",
  },
};

const FeatureCard = ({ icon, title, description, accent }) => {
  const colors = accentMap[accent];
  return (
    <div
      className={`group relative rounded-2xl border ${colors.border} bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4`}
    >
      <div
        className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center ${colors.icon} transition-transform duration-300 group-hover:scale-110`}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-2 leading-snug">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full mb-4">
            Why TutorConnect
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            Everything you need to{" "}
            <span className="text-blue-600 dark:text-blue-400">
              learn better
            </span>
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            We connect students with the right tutors — fast, safely, and with
            the flexibility modern learners deserve.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
