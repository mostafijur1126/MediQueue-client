import BookSessionModal from "@/components/BookSessionModal";
import { auth } from "@/lib/auth";
import { Button, Card } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/tutors/${id}`, {
    headers: {
      authorization: `Bearer ${token} `,
    },
  });
  const tutor = await res.json();
  // console.log(tutor);

  return {
    title: tutor.tutorName,
    description: tutor.subject,
  };
};

const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/tutors/${id}`, {
    headers: {
      authorization: `Bearer ${token} `,
    },
  });
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
              <BookSessionModal tutor={tutor}></BookSessionModal>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TutorDetailsPage;
