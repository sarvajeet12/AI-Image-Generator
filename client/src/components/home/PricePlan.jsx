import React from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description:
      "Perfect for new users exploring AI-powered creativity. Start generating AI images using the ImagoAI API with limited daily access.",
    features: [
      "Includes 5 free image generations for new users",
      "After that, buy points/credits for more generations:",
      "Resolution up to 1080×1080",
      "Standard model styles",
    ],
    button: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹50",
    description:
      "Great for individuals who want to generate high-quality AI images with faster results and no watermark.",
    features: [
      "Generate up to 10 AI images",
      "No watermark on generated images",
      "Faster image generation speed",
      "Access to advanced image styles",
    ],
    button: "Upgrade Now",
    highlighted: true,
  },
  {
    name: "Team",
    price: "₹100",
    description:
      "Best for small teams or creators who need to generate more AI images with better quality and faster processing.",
    features: [
      "Generate up to 25 AI images",
      "High-resolution image output",
      "No watermark on images",
      "Faster image generation speed",
      "Shared access for team members",
    ],
    button: "Upgrade Now",
    highlighted: false,
  },
];

export default function PricePlan({ section }) {
  const navigate = useNavigate();

  const handleUpgradeClick = (id) => {
    if (id === 0) {
      navigate("/generate");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div
      className={`${
        section === "Home" ? "bg-white px-4 py-20" : "bg-gray-50 px-0"
      } text-gray-900 flex flex-col items-center `}
      id="price"
    >
      <div
        className={`${section === "Home" ? "max-w-5xl" : "w-full"} text-center`}
      >
        <div
          className={`${
            section === "Home"
              ? "flex flex-col items-center"
              : "flex flex-col items-start"
          } `}
        >
          {/* Heading */}
          <h1
            className={`font-bold text-3xl lg:text-4xl xl:text-5xl ${
              section === "Home" ? "text-center" : "text-left"
            }`}
          >
            Choose Your{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Plan
            </span>
          </h1>
          <p
            className={`text-gray-500 max-w-2xl  mt-5 ${
              section === "Home" ? "text-center" : "text-left"
            }`}
          >
            Unlock the power of AI image generation using the{" "}
            <strong>ImagoAI</strong>. Upgrade anytime to access advanced
            features and higher limits.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`border rounded-2xl p-6 flex flex-col justify-between shadow-sm transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-xl ${
                plan.highlighted
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div>
                <div
                  className={`text-sm font-medium mb-3 ${
                    plan.highlighted ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {plan.name}
                </div>
                <h2 className="text-4xl font-semibold mb-4">{plan.price}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <svg
                        className="w-5 h-5 text-green-500 mt-0.5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleUpgradeClick(index)}
                className={`w-full py-2.5 rounded-lg font-medium transition ${
                  plan.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
