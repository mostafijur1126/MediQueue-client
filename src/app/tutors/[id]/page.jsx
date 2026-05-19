import { Button, Card } from "@heroui/react";
import Image from "next/image";
import React from "react";

const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/tutors/${id}`);
  const tutor = await res.json();
  // console.log(tutor);

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto py-20">
        <Card className="">
          <div className="flex gap-6">
            <div className="relative h-80 w-120 overflow-hidden">
              <Image
                src={tutor.photo}
                alt={tutor.tutorName}
                fill
                className="object-cover"
              ></Image>
            </div>
            <div>
              <h1>{tutor.tutorName}</h1>
              <p>{tutor.subject}</p>
              <p>{tutor.Institute}</p>
              <p>{tutor.Experience}</p>
              <p>{tutor.location}</p>
              <p>{tutor.mode}</p>
              <p>Available & Time Slot: {tutor.availableTime}</p>
              <p>Hourly Fee: {tutor.hourlyFee}</p>
              <p>Remaining Slot: {tutor.totalSlots}</p>
              <p>Session Start Date: {tutor.sessionStartDate}</p>
              <Button>Book Session</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TutorDetailsPage;
