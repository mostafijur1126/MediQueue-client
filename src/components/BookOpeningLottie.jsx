"use client";

import Lottie from "lottie-react";
import bookAnimation from "@/lottie/Book-page-opening.json";

const BookOpeningLottie = () => {
  return (
    <div className="w-72 mx-auto">
      <Lottie animationData={bookAnimation} loop={true} />
    </div>
  );
};

export default BookOpeningLottie;
