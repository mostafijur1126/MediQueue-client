"use client";

import { authClient } from "@/lib/auth-client";
import { error } from "better-auth/api";
import { useState } from "react";
import {
  FiUser,
  FiImage,
  FiBook,
  FiCalendar,
  FiDollarSign,
  FiUsers,
  FiClock,
  FiBriefcase,
  FiMapPin,
  FiMonitor,
  FiChevronDown,
  FiCheck,
  FiUpload,
} from "react-icons/fi";
import { toast } from "react-toastify";

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Science",
  "History",
  "Geography",
];
const MODES = ["Online", "Offline", "Both"];

function SelectField({
  label,
  icon: Icon,
  options,
  value,
  onChange,
  required,
  placeholder,
  name,
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input type="hidden" name={name} value={value} required={required} />
      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="
            flex items-center gap-3 w-full px-4 py-3 rounded-xl cursor-pointer
            bg-white dark:bg-slate-800/60
            border border-slate-200 dark:border-slate-700
            hover:border-cyan-400 dark:hover:border-cyan-500
            focus-within:border-cyan-500 dark:focus-within:border-cyan-400
            transition-all duration-200 select-none
          "
        >
          <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
          <span
            className={`flex-1 text-sm ${value ? "text-slate-800 dark:text-slate-100" : "text-slate-400 dark:text-slate-500"}`}
          >
            {value || placeholder}
          </span>
          <FiChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </div>

        {open && (
          <div
            className="
            absolute z-50 w-full mt-1.5 rounded-xl overflow-hidden
            bg-white dark:bg-slate-800
            border border-slate-200 dark:border-slate-700
            shadow-xl dark:shadow-slate-900/50
          "
          >
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="
                  flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm
                  text-slate-700 dark:text-slate-300
                  hover:bg-cyan-50 dark:hover:bg-cyan-900/20
                  hover:text-cyan-700 dark:hover:text-cyan-300
                  transition-colors duration-150
                "
              >
                {opt}
                {value === opt && <FiCheck className="w-4 h-4 text-cyan-500" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function InputField({
  label,
  icon: Icon,
  type = "text",
  placeholder,
  name,
  required,
  textarea,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div
        className="
        flex items-start gap-3 px-4 py-3 rounded-xl
        bg-white dark:bg-slate-800/60
        border border-slate-200 dark:border-slate-700
        focus-within:border-cyan-500 dark:focus-within:border-cyan-400
        hover:border-slate-300 dark:hover:border-slate-600
        transition-all duration-200
      "
      >
        <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
        {textarea ? (
          <textarea
            name={name}
            placeholder={placeholder}
            rows={4}
            required={required}
            className="
              flex-1 bg-transparent text-sm outline-none resize-none
              text-slate-800 dark:text-slate-100
              placeholder:text-slate-400 dark:placeholder:text-slate-500
            "
          />
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            required={required}
            className="
              flex-1 bg-transparent text-sm outline-none
              text-slate-800 dark:text-slate-100
              placeholder:text-slate-400 dark:placeholder:text-slate-500
            "
          />
        )}
      </div>
    </div>
  );
}

export default function AddTutorsPage() {
  const [subject, setSubject] = useState("");
  const [mode, setMode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login first.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    const formData = new FormData(e.currentTarget);
    const tutorData = Object.fromEntries(formData.entries());
    const newTutorData = {
      ...tutorData,
      hourlyFee: Number(tutorData.hourlyFee),
      totalSlots: Number(tutorData.totalSlots),

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        iamge: user.image,
      },
    };
    // console.log(newTutorData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/tutors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTutorData),
    });
    const data = await res.json();
    if (data) {
      toast.success("tutor add successfully.", {
        position: "top-left",
        autoClose: 5000,
      });
    }
    if (error) {
      toast.error(error.message);
    }
    // console.log(data);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Subtle top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-sky-500 to-cyan-600" />

      <div className="max-w-3xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 mb-4">
            <FiUsers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-300 tracking-wide uppercase">
              Tutor Management
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Add New Tutor
          </h1>
          <p className="mt-1.5 text-slate-500 dark:text-slate-400 text-sm">
            Fill in the details below to register a new tutor profile.
          </p>
        </div>

        {/* Form Card */}
        <div
          className="
          bg-white dark:bg-slate-900
          rounded-2xl
          border border-slate-200 dark:border-slate-800
          shadow-sm dark:shadow-slate-900/50
          overflow-hidden
        "
        >
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            {/* Section: Personal Info */}
            <section>
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-6 h-6 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
                  <FiUser className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Personal Information
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <InputField
                    label="Tutor Name"
                    icon={FiUser}
                    name="tutorName"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <InputField
                    label="Profile Image URL"
                    icon={FiImage}
                    name="photo"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    required
                  />
                </div>
                <InputField
                  label="Institution"
                  icon={FiBriefcase}
                  name="institution"
                  placeholder="e.g. Dhaka University"
                  required
                />
                <InputField
                  label="Location (Area / City)"
                  icon={FiMapPin}
                  name="location"
                  placeholder="e.g. Rajshahi"
                  required
                />
              </div>
            </section>

            {/* Section: Teaching Details */}
            <section>
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-6 h-6 rounded-lg bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center">
                  <FiBook className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                </div>
                <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Teaching Details
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <SelectField
                  name="subject"
                  label="Subject / Category"
                  icon={FiBook}
                  options={SUBJECTS}
                  value={subject}
                  onChange={setSubject}
                  required
                  placeholder="Select a subject"
                />
                <SelectField
                  name="teachingMode"
                  label="Teaching Mode"
                  icon={FiMonitor}
                  options={MODES}
                  value={mode}
                  onChange={setMode}
                  required
                  placeholder="Select mode"
                />
                <div className="sm:col-span-2">
                  <InputField
                    label="Available Days & Time"
                    icon={FiCalendar}
                    name="availableTime"
                    placeholder="Example: Sun - Thu 5:00 PM - 8:00 PM"
                    required
                  />
                </div>
                <InputField
                  label="Session Start Date"
                  icon={FiClock}
                  name="sessionStartDate"
                  type="date"
                  required
                />
                <div className="sm:col-span-2">
                  <InputField
                    label="Experience"
                    icon={FiBriefcase}
                    name="experience"
                    placeholder="Briefly describe your teaching experience..."
                    required
                    textarea
                  />
                </div>
              </div>
            </section>

            {/* Section: Availability & Pricing */}
            <section>
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  <FiDollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Availability & Pricing
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  label="Hourly Fee (৳)"
                  icon={FiDollarSign}
                  name="hourlyFee"
                  type="number"
                  placeholder="e.g. 500"
                  required
                />
                <InputField
                  label="Total Slots"
                  icon={FiUsers}
                  name="totalSlots"
                  type="number"
                  placeholder="e.g. 20"
                  required
                />
              </div>
            </section>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="
                  w-full flex items-center justify-center gap-2.5
                  px-6 py-3.5 rounded-xl
                  bg-gradient-to-r from-cyan-500 to-sky-600
                  hover:from-cyan-400 hover:to-sky-500
                  active:scale-[0.99]
                  text-white font-semibold text-sm
                  shadow-md shadow-cyan-500/25
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900
                "
              >
                {submitted ? (
                  <>
                    <FiCheck className="w-4 h-4" />
                    Tutor Registered!
                  </>
                ) : (
                  <>
                    <FiUpload className="w-4 h-4" />
                    Register Tutor
                  </>
                )}
              </button>
              <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-3">
                All fields marked <span className="text-rose-400">*</span> are
                required
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
