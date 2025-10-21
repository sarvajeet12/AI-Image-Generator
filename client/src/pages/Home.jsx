import HeroSection from "../components/home/HeroSection";
import ExperienceCard from "../components/home/ExperienceCard";
import HowItWorks from "../components/home/HowItWorks";
import MeetTheImagoAI from "../components/home/MeetTheImagoAI";
import GallerySection from "../components/home/GallerySection";
import FAQSection from "../components/home/FAQSection";
import PricePlan from "../components/home/PricePlan";

export default function Home() {
  return (
    <div>
      {/* Hero section */}
      <HeroSection />

      {/* Experience power of imagoAi */}
      <ExperienceCard />

      {/* How it works */}
      <HowItWorks />

      {/* Meet The ImagoAI */}
      <MeetTheImagoAI />

      {/* GallerySection */}
      <GallerySection />

      {/* FAQ */}
      <FAQSection />

      {/* Price Plan */}
      <PricePlan section={"Home"}/>
    </div>
  );
}
