import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is ImagoAI?",
    answer:
      "ImagoAI is an AI image generator platform that helps you create stunning visuals instantly.",
  },
  {
    question: "Is ImagoAI Free ?",
    answer:
      "ImagoAI offers a free plan with limited credits and paid plans for advanced users.",
  },
  {
    question: "How much does ImagoAI cost?",
    answer:
      "Pricing depends on the plan you choose, starting from a basic free tier.",
  },
  {
    question: "Who can use ImagoAI?",
    answer:
      "Anyone from designers to developers can use ImagoAI to create AI images effortlessly.",
  },
  {
    question: "You have Free trial?",
    answer: "Yes! New users get a free trial with premium features.",
  },

];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="flex flex-col items-center text-center py-20 px-4 lg:px-12 bg-gray-50">
      {/* Heading */}
      <h1 className="font-bold text-3xl lg:text-4xl xl:text-5xl w-[100%] md:w-[90%] lg:w-[70%] xl:w-[50%]">
        Frequently Asked{" "}
        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Questions
        </span>
      </h1>
      <p className="text-gray-500 max-w-2xl mt-5">
        We have put together some commonly asked questions
      </p>

      {/* FAQ Grid */}
      <div className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-40  mt-10 grid grid-cols-1 gap-4 md:gap-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 text-left rounded-xl p-4 md:p-6 bg-white shadow-sm hover:shadow-md transition-all"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between text-left focus:outline-none"
            >
              <span className="text-base md:text-lg font-medium text-gray-900">
                {faq.question}
              </span>
              {openIndex === index ? (
                <Minus className="text-gray-500 w-5 h-5" />
              ) : (
                <Plus className="text-gray-500 w-5 h-5" />
              )}
            </button>

            {/* Answer with smooth transition */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
