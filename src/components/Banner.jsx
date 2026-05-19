"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Video,
} from "lucide-react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Find Your Perfect Tutor Today",
      description:
        "Connect with expert tutors across various subjects and start your learning journey with personalized online sessions.",
      icon: <Users className="w-12 h-12 text-amber-500 dark:text-amber-400" />,
      emoji: "📚",
      gradient:
        "bg-gradient-to-br from-amber-600 via-amber-500 to-purple-700 dark:from-amber-800 dark:via-amber-700 dark:to-purple-900",
    },
    {
      id: 2,
      title: "Book Sessions Hassle-Free",
      description:
        "Easy scheduling, no conflicts. Choose your preferred time slots and get instant confirmation for your tutoring sessions.",
      icon: (
        <Calendar className="w-12 h-12 text-emerald-500 dark:text-emerald-400" />
      ),
      emoji: "📅",
      gradient:
        "bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-600 dark:from-purple-800 dark:via-fuchsia-700 dark:to-pink-900",
    },
    {
      id: 3,
      title: "Learn from Anywhere",
      description:
        "Access quality education from the comfort of your home with our online learning platform and digital session tokens.",
      icon: <Video className="w-12 h-12 text-rose-500 dark:text-rose-400" />,
      emoji: "💻",
      gradient:
        "bg-gradient-to-br from-rose-500 via-orange-500 to-amber-600 dark:from-rose-800 dark:via-orange-700 dark:to-amber-900",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Slides Container */}
      <div
        className="relative w-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        <div className="flex w-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`w-full flex-shrink-0 ${slide.gradient} transition-all duration-500`}
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">
                  {/* Text Content */}
                  <div className="flex-1 text-center lg:text-left space-y-4 md:space-y-6">
                    <div className="inline-flex items-center justify-center lg:justify-start">
                      <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                        {slide.icon}
                      </div>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                      {slide.title}
                    </h1>

                    <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-lg mx-auto lg:mx-0">
                      {slide.description}
                    </p>

                    <div className="pt-2 md:pt-4">
                      <a
                        href="/tutors"
                        className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Browse Tutors
                        <svg
                          className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Illustration Area */}
                  <div className="flex-1 flex justify-center items-center">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl border border-white/20 dark:border-white/10">
                      <div className="text-center text-white">
                        <div className="text-7xl md:text-8xl mb-4 drop-shadow-lg">
                          {slide.emoji}
                        </div>
                        <p className="text-sm md:text-base font-medium bg-white/20 dark:bg-white/10 px-4 py-1.5 rounded-full inline-block backdrop-blur-sm">
                          Learning Made Easy
                        </p>
                      </div>
                      {/* Decorative ring */}
                      <div className="absolute inset-0 rounded-3xl border-2 border-white/20 dark:border-white/10 pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Enhanced visibility */}
      <button
        onClick={prevSlide}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 bg-white/20 dark:bg-gray-900/40 hover:bg-white/30 dark:hover:bg-gray-900/60 backdrop-blur-md text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 bg-white/20 dark:bg-gray-900/40 hover:bg-white/30 dark:hover:bg-gray-900/60 backdrop-blur-md text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 flex space-x-2 md:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              currentSlide === index
                ? "w-8 md:w-10 h-2.5 bg-white shadow-lg"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70 dark:bg-white/30 dark:hover:bg-white/60"
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 md:top-6 right-4 md:right-6 bg-black/40 dark:bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-medium tracking-wide shadow-md">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Banner;
