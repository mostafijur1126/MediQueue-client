import React from "react";
import TutorsCard from "./TutorsCard";

const TutorSectionHome = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/tutorsHome`);
  const data = await res.json();
  //   console.log(data);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <div>
        <h1>Popular Tutors</h1>
        <div className="grid grid-cols-3 gap-6">
          {data.map((tutor) => (
            <TutorsCard key={tutor._id} tutor={tutor}></TutorsCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorSectionHome;
