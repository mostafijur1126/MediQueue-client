import React from "react";

const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/tutors/${id}`);
  const tutor = await res.json();
  console.log(tutor);

  return <div>TutorDetailsPage</div>;
};

export default TutorDetailsPage;
