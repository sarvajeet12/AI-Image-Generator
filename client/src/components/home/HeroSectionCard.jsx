import heroSectionCard1 from "../../assets/heroSectionCardImage/heroSectionCard (1).jpeg"
import heroSectionCard2 from "../../assets/heroSectionCardImage/heroSectionCard (2).jpeg"
import heroSectionCard3 from "../../assets/heroSectionCardImage/heroSectionCard (3).jpeg"
import heroSectionCard4 from "../../assets/heroSectionCardImage/heroSectionCard (4).jpeg"
import heroSectionCard5 from "../../assets/heroSectionCardImage/heroSectionCard (5).jpeg"
import heroSectionCard6 from "../../assets/heroSectionCardImage/heroSectionCard (6).jpeg"

const HeroSectionCard = () => {
  const heroSectionCard = [
    {
      id: 1,
      title: "Space Art",
      description:
        "A breathtaking digital painting of a galaxy filled with colorful nebulas, glowing stars, and futuristic space stations orbiting a distant planet.",
      imageUrl:
        heroSectionCard1,
    },
    {
      id: 2,
      title: "3D Art Image",
      description:
        "A highly detailed 3D render of abstract geometric shapes floating in the air with soft shadows and realistic lighting.",
      imageUrl:
        heroSectionCard6,
    },
    {
      id: 3,
      title: "Anime & Cartoon Styles",
      description:
        "A fun and vibrant cartoon illustration of a cheerful character standing in a fantasy world with bright colors and bold outlines.",
      imageUrl:
        heroSectionCard5,
    },
    {
      id: 4,
      title: "Cyberpunk Planet",
      description:
        "A futuristic cyberpunk planet cityscape with neon lights, holograms, flying cars, and glowing skyscrapers under a dark sky.",
      imageUrl:
        heroSectionCard2,
    },
    {
      id: 5,
      title: "Vintage Art Image",
      description:
        "A retro-style vintage illustration with warm tones, textured paper effect, and classic design elements inspired by 1950s posters.",
      imageUrl:
       heroSectionCard3,
    },
    {
      id: 6,
      title: "3DRealistic",
      description:
        "A hyper-realistic photograph-style image of a serene landscape with mountains, clear skies, and a calm lake reflecting the sunset.",
      imageUrl:
        heroSectionCard4,
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
      {heroSectionCard.map((card) => (
        <div key={card.id} className=" bg-[#1A1C1E] text-white text-left p-4 rounded-3xl flex flex-col gap-4">
          <h2 className="text-xl font-bold">{card.title}</h2>
          <p className="text-slate-300 text-sm">{card.description}</p>
          <img src={card.imageUrl} alt={card.title} className="h-44 w-full rounded-3xl"/>
        </div>
      ))}
    </div>
  );
};

export default HeroSectionCard;
