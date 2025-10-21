import React from "react";
import { Link } from "react-router-dom";
import ai from "../../assets/ai-icon.png";
import Bike from "../../assets/meetTheImagoAI/bike.jpeg";
import Peacock from "../../assets/meetTheImagoAI/peacock.jpeg";
import Rabbit from "../../assets/meetTheImagoAI/rabbit.jpeg";
import Baby from "../../assets/meetTheImagoAI/baby.jpeg";
import Building from "../../assets/meetTheImagoAI/building.jpeg";

const MeetTheImagoAI = () => {
  return (
    <section
      className="w-full py-20"
      style={{
        background: "linear-gradient(45deg, #064e3b, #000000, #4b2e1e)",
      }}
    >
      <div className="w-full bg-green-black-brown container mx-auto px-4 md:px-10 lg:px-20 xl:px-40 flex justify-between    flex-col-reverse md:flex-row gap-8">
        {/* Heading , description and button */}
        <div className="w-full md:w-[45%] flex flex-col justify-center gap-8 text-left">
          <h1 className="text-white font-bold text-2xl lg:text-3xl xl:text-4xl">
            Meet The ImagoAI
          </h1>
          <p className="text-slate-300  text-xs md:text-sm lg:text-base">
            Using a template or dragging and dropping styles is easy. Designed
            for beginners, but efficient for experience engineers
          </p>
          <Link to="/generate" className="mt-10">
            <button className="bg-blue-500 text-sm font-medium text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center gap-2 justify-center">
              <img src={ai} alt="ai-icon" className="w-4 h-4" />{" "}
              <span>Create With AI</span>
            </button>
          </Link>
        </div>

        {/* Image */}
        <div className="w-full md:w-[40%] h-[500px] grid gap-4 grid-cols-3">
          <div className="flex items-center justify-center pt-40">
            <img src={Bike} alt={Bike} className="w-32 h-40 rounded-xl" />
          </div>
          <div className="flex flex-col justify-end items-center gap-4">
            <img src={Peacock} alt={Peacock} className="w-32 h-40 rounded-xl" />
            <img src={Rabbit} alt={Rabbit} className="w-32 h-40 rounded-xl" />
          </div>

          <div className="flex flex-col gap-4 pt-10 items-center">
            <img src={Baby} alt={Baby} className="w-32 h-40 rounded-xl" />
            <img
              src={Building}
              alt={Building}
              className="w-32 h-40 rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheImagoAI;
