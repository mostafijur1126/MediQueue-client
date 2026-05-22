import React from "react";
import { FaBookOpen, FaGraduationCap, FaCertificate } from "react-icons/fa";

const cards = [
  {
    icon: <FaBookOpen size={32} />,
    title: "Learn the latest skills",
    description:
      "Quality education shouldn't break the bank. We offer competitive pricing and flexible payment plans so learning is accessible to everyone.",
  },
  {
    icon: <FaGraduationCap size={32} />,
    title: "Get ready for a career",
    description:
      "Engage in dynamic and interactive learning experiences. Our courses are designed by industry experts to prepare you for real-world success.",
  },
  {
    icon: <FaCertificate size={32} />,
    title: "Earn a Certificate",
    description:
      "Join a vibrant and supportive learning community. Connect with fellow learners and earn recognised certificates to boost your career.",
  },
];

const GrowthSection = () => {
  return (
    <section className="relative bg-white dark:bg-gray-950 overflow-hidden py-20 px-4 sm:px-8 lg:px-16">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-50 dark:bg-blue-950/40 opacity-60" />
        <div className="absolute right-0 top-0 w-72 h-72 rounded-full bg-slate-50 dark:bg-slate-900/40 opacity-50" />
        {/* dot grid bottom-left */}
        <div
          className="absolute bottom-8 left-8 w-28 h-28 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, #f87171 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />
        {/* circle accent bottom-right */}
        <div className="absolute bottom-10 right-6 w-8 h-8 rounded-full border-2 border-orange-400 dark:border-orange-500 opacity-70" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Top: Heading + subtext */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-16">
          <div className="lg:max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
              Build better growth skills, faster.
              <br />
              Ignite Your Learning Journey
            </h2>
          </div>
          <div className="lg:max-w-xs xl:max-w-sm">
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-4">
              Explore new skills, deepen existing passions, and get lost in
              creativity. What you find just might…
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold text-sm hover:gap-2 transition-all duration-200"
            >
              Read More
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(({ icon, title, description }) => (
            <div
              key={title}
              className="group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl px-8 py-10 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Icon circle */}
              <div className="w-20 h-20 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-500 dark:text-purple-400 mb-6 group-hover:scale-105 transition-transform duration-300">
                {icon}
              </div>

              <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-3 leading-snug">
                {title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
                {description}
              </p>

              {/* Bottom dash */}
              <div className="mt-auto w-10 h-0.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowthSection;
