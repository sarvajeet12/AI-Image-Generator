import { useState } from "react";

const categories = [
  "All",
  "Illustration",
  "Photography",
  "Design",
  "3D",
  "Logos",
  "Art",
  "Architecture",
];

// Data for each tab
const allCards = {
  All: [
    {
      title: "Illustration Art",
      author: "Arlana",
      image:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Space 3D Art",
      author: "Gilana",
      image:
        "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Boy Lost Jungle Art",
      author: "James",
      image:
        "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Character Illustration",
      author: "MagI",
      image:
        "https://images.unsplash.com/photo-1741894785509-d87c84bdc275?q=80",
    },
    {
      title: "Digital Sculpture",
      author: "Nora",
      image:
        "https://images.unsplash.com/photo-1730874829217-f7f666e94822?q=80",
    },
    {
      title: "Modern Design Poster",
      author: "Alex",
      image:
        "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?auto=format&fit=crop&w=600&q=80",
    },
  ],
  Illustration: [
    {
      title: "Nature Illustration",
      author: "Eva",
      image:
        "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Fantasy Creature",
      author: "Mark",
      image:
        "https://images.unsplash.com/photo-1572500315263-d19504caa57a?q=80",
    },
  ],
  Photography: [
    {
      title: "City Lights",
      author: "John",
      image:
        "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Mountain View",
      author: "Sophie",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    },
  ],
  Design: [
    {
      title: "UI Dashboard Concept",
      author: "Liam",
      image:
        "https://images.unsplash.com/photo-1575388902449-6bca946ad549?q=80",
    },
    {
      title: "Minimal Poster",
      author: "Ella",
      image:
        "https://images.unsplash.com/photo-1613759007428-9d918fe2d36f?q=80",
    },
  ],
  "3D": [
    {
      title: "3D Robot Model",
      author: "Niko",
      image:
        "https://images.unsplash.com/photo-1712971724897-a9ae95e0ec44?q=80",
    },
    {
      title: "3D Abstract Scene",
      author: "Mia",
      image:
        "https://images.unsplash.com/photo-1645323927890-ebc1462c12c8?q=80",
    },
  ],
  Logos: [
    {
      title: "Brand Identity",
      author: "Oscar",
      image:
        "https://images.unsplash.com/photo-1723220217548-169d91fd1ba3?q=80",
    },
    {
      title: "Tech Logo Concept",
      author: "Sophia",
      image:
        "https://images.unsplash.com/photo-1686140386811-099f53c0dd54?q=80",
    },
  ],
  Art: [
    {
      title: "Oil Painting",
      author: "Emma",
      image:
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80",
    },
    {
      title: "Digital Landscape",
      author: "Noah",
      image:
        "https://images.unsplash.com/photo-1633151188217-7c4c512f7a76?q=80",
    },
  ],
  Architecture: [
    {
      title: "Modern Building",
      author: "Henry",
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Interior Design",
      author: "Grace",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80",
    },
  ],
};

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState("All");
  const [page, setPage] = useState(0);

  const itemsPerPage = 4;
  const data = allCards[activeTab];
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const visibleCards = data.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(0);
  };

  return (
    <section className="flex flex-col items-center text-center py-20 px-4 lg:px-12">
      {/* Heading */}
      <h1 className="font-bold text-3xl lg:text-4xl xl:text-5xl w-[100%] md:w-[90%] lg:w-[70%] xl:w-[50%]">
        ImagoAI Make{" "}
        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Global
        </span>
      </h1>
      <p className="text-gray-500 max-w-2xl mt-5">
        Create consistent assets for you and your team. Brave Hunt makes it
        easier than ever to create, edit, and share Image, art and Illustration.
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleTabChange(cat)}
            className={`px-5 py-2 rounded-full border transition-all duration-200 ${
              activeTab === cat
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 w-full max-w-7xl">
        {visibleCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4 text-left">
              <h3 className="font-semibold text-gray-800">{card.title}</h3>
              <p className="text-sm text-blue-600">{card.author}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <span
              key={i}
              onClick={() => setPage(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                i === page ? "bg-blue-600 scale-110" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      )}
    </section>
  );
}
