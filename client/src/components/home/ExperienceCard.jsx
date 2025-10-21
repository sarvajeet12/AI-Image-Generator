import { useEffect } from "react";
import Messy_Bedroom from "../../assets/experienceThePowerOfImagoAI/Messy_Bedroom.jpeg";
import Astronaut_Sky from "../../assets/experienceThePowerOfImagoAI/Astronaut_Sky.jpeg";
import Finch_Branch from "../../assets/experienceThePowerOfImagoAI/Finch_Branch.jpeg";
import Portrait_3D from "../../assets/experienceThePowerOfImagoAI/Portrait_3D.jpeg";
import Neon_Jungle from "../../assets/experienceThePowerOfImagoAI/Neon_Jungle.jpeg";
import Retro_Futurism from "../../assets/experienceThePowerOfImagoAI/Retro_Futurism.jpeg";
import { Link } from "react-router-dom";

const cardsRow1 = [
  {
    title: "Messy Bedroom",
    description: "A messy bedroom with clothes, books, neon lights, screens.",
    img: Messy_Bedroom,
  },
  {
    title: "Astronaut Sky",
    description: "Astronaut floating in night sky, stars, galaxies, nebulas.",
    img: Astronaut_Sky,
  },
  {
    title: "Finch Branch",
    description: "Colorful finch on branch, sunlight, green leaves background.",
    img: Finch_Branch,
  },
];

const cardsRow2 = [
  {
    title: "Portrait 3D",
    description:
      "Futuristic 3D portrait, cinematic lighting, realistic textures.",
    img: Portrait_3D,
  },
  {
    title: "Neon Jungle",
    description:
      "Neon-lit jungle, glowing plants, futuristic animals, dark sky.",
    img: Neon_Jungle,
  },
  {
    title: "Retro Futurism",
    description:
      "Synthwave retro-futuristic cars, glowing grids, sunset horizon.",
    img: Retro_Futurism,
  },
];

export default function ExperienceCard() {
  // inject animation keyframes once
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes scrollLeft {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes scrollRight {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-bold  text-center mb-16 text-3xl lg:text-4xl xl:text-5xl">
          Experience the Power of{" "}
          <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-3xl lg:text-4xl xl:text-5xl">
            ImagoAI
          </span>
        </h2>

        {/* Row 1 → scroll left */}
        <div className="overflow-hidden mb-10 flex flex-wrap">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "scrollLeft 10s linear infinite" }}
          >
            {[...cardsRow1, ...cardsRow1].map((card, idx) => (
              <div
                key={idx}
                className="w-[30%] sm:w-[40%] bg-white shadow-xl rounded-2xl p-3 flex-shrink-0 mx-4 flex flex-col-reverse sm:flex-row justify-between
            "
              >
                <div className="w-[100%] sm:w-[45%] flex flex-col gap-4 mt-4">
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-slate-700 text-sm break-words whitespace-normal">
                    {card.description}
                  </p>
                  <Link to="/generate">
                    <button className="bg-blue-500 text-xs font-medium text-white px-4 sm:px-6 py-2 sm:py-2 rounded-md">
                      <span>Explore this style</span>
                    </button>
                  </Link>
                </div>
                <div
                  className={`w-[100%] sm:w-[48%] rounded-xl flex items-end justify-end  ${
                    idx === 0
                      ? "bg-[#74b9ff]"
                      : idx === 1
                      ? "bg-[#a29bfe]"
                      : idx === 2
                      ? "bg-[#55efc4]"
                      : ""
                  }`}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-[90%] h-[90%] rounded-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 → scroll right */}
        <div className="overflow-hidden flex flex-wrap">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "scrollRight 15s linear infinite" }}
          >
            {[...cardsRow2, ...cardsRow2].map((card, idx) => (
              <div
                key={idx}
                className="w-[30%] sm:w-[40%] bg-white shadow-xl rounded-2xl p-3 flex-shrink-0 mx-4 flex flex-col-reverse sm:flex-row justify-between
            "
              >
                <div className="w-[100%] sm:w-[45%] flex flex-col gap-4 mt-4">
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-slate-700 text-sm break-words whitespace-normal">
                    {card.description}
                  </p>
                  <Link to="/generate">
                    <button className="bg-blue-500 text-xs font-medium text-white px-4 sm:px-6 py-2 sm:py-2 rounded-md">
                      <span>Explore this style</span>
                    </button>
                  </Link>
                </div>
                <div
                  className={`w-[100%] sm:w-[48%] rounded-xl flex items-end justify-end  ${
                    idx === 0
                      ? "bg-[#fdcb6e]"
                      : idx === 1
                      ? "bg-[#ff7675]"
                      : idx === 2
                      ? "bg-[#fd79a8]"
                      : ""
                  }`}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-[90%] h-[90%] rounded-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
