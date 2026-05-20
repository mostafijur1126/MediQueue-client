import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TutorsCard = ({ tutor }) => {
  //   console.log(tutor);
  return (
    <Card className="rounded-2xl">
      <div className="relative w-full h-80 overflow-hidden">
        <Image
          src={tutor.photo}
          alt={tutor.tutorName}
          fill
          className="object-cover"
        ></Image>
      </div>
      <div>
        <h1>Name: {tutor.tutorName}</h1>
        <p>Subjuct: {tutor.subject}</p>
        <p>AvailableTime: {tutor.availableTime}</p>
        <p>SessionStartDate:{tutor.sessionStartDate}</p>
        <p>Fee: {tutor.hourlyFee} TK</p>
      </div>
      <Link href={`/tutors/${tutor._id}`}>
        <Button variant="outline" className="rounded-none w-full">
          Book Session
        </Button>
      </Link>
    </Card>
  );
};

export default TutorsCard;
