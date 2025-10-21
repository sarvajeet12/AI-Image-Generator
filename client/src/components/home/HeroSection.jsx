import React from "react";
import { Link } from "react-router-dom";
import ai from "../../assets/ai-icon.png";
import HeroSectionCard from "./HeroSectionCard";

const HeroSection = () => {
  return (
    <section className="bg-[#0F0F0F] py-20">
      <div className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-40 flex flex-col gap-10 text-center items-center">
        {/* Heading */}
        <h1 className="text-white font-bold text-3xl lg:text-4xl xl:text-5xl w-[100%] md:w-[90%] lg:w-[70%] xl:w-[50%]">
          Create{" "}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Powerful{" "}
          </span>
          Al art or image in seconds
        </h1>

        {/* Paragraph */}
        <p className="text-slate-300  text-xs md:text-sm lg:text-base w-[100%] lg:w-[90%] xl:w-[60%]">
          Meet ImagoAI, the AI-powered photo generator who will turn anything
          who will turn any image into a unique artwork in seconds.
        </p>

        {/* Get started button and Learn more button*/}
        <div className="flex flex-row gap-4 md:gap-8 lg:gap:12 xl:gap-16">
          <Link to="/generate">
            <button className="bg-blue-500 text-sm font-medium text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center gap-2 justify-center">
              <img src={ai} alt="ai-icon" className="w-4 h-4" />{" "}
              <span>Get Started</span>
            </button>
          </Link>
          <Link to="/about">
            <button className="bg-amber-500 text-sm font-medium text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg">
              Learn More
            </button>
          </Link>
        </div>

        {/* Image */}
        <HeroSectionCard />
      </div>
    </section>
  );
};

export default HeroSection;
