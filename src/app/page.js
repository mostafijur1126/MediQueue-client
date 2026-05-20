import Banner from "@/components/Banner";
import GrowthSection from "@/components/GroughtSection";
import TutorSectionHome from "@/components/TutorSectionHome";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Banner></Banner>
      <TutorSectionHome></TutorSectionHome>
      <WhyChooseUs></WhyChooseUs>
      <GrowthSection></GrowthSection>
    </div>
  );
}
