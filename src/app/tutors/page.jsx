import TutorsCard from "@/components/TutorsCard";
import React from "react";

const TutorsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/tutors`);
  const tutors = await res.json();

  // console.log(tutors);
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto py-20">
        <h1>All Tutors</h1>
        <div className="grid grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <TutorsCard key={tutor._id} tutor={tutor}></TutorsCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorsPage;
