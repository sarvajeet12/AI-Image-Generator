import DescribeImage from "../../assets/howItWorks/describe.jpeg";
import GenerateImage from "../../assets/howItWorks/progress.png";
import DownloadImage from "../../assets/howItWorks/download.jpeg";
import TypingIcon from "../../assets/howItWorks/typing_icon.png";
import GenerateIcon from "../../assets/howItWorks/generate_icon.png";
import DownloadIcon from "../../assets/howItWorks/download_icon.png";

const steps = [
  {
    title: "Describe",
    description:
      "Start by entering a detailed and imaginative description of the image you wish to generate. The more specific and creative you are, the better the results will be. You can mention colors, styles, objects, moods, or any other details that help bring your vision to life. This step allows you to fully customize the outcome and ensures the AI understands exactly what you want.",
    image: DescribeImage,
    icon: TypingIcon,
    bgColor: "#e3f2fd",
    reverse: false,
  },
  {
    title: "Generate",
    description:
      "Once you submit your description, our advanced AI model processes your input and begins creating a unique image tailored to your specifications. The generation process is quick and seamless, transforming your words into a visual masterpiece. You can watch as your ideas are instantly brought to life, making it easy to experiment and refine your creative concepts.",
    image: GenerateImage,
    icon: GenerateIcon,
    bgColor: "#fce4ec",
    reverse: true,
  },
  {
    title: "Download",
    description:
      "After your image is generated, you can easily download it to your device with just a single click. This allows you to save your creation for future use, share it with friends, or post it on social media. The download feature ensures you have full access to your generated images, making it simple to showcase your creativity and inspire others.",
    image: DownloadImage,
    icon: DownloadIcon,
    bgColor: "#e8f5e9",
    reverse: false,
  },
];

const HowItWorks = () => {
  return (
    <div className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-40 flex flex-col gap-10 text-center items-center py-20">
      <section>
        <h2 className="font-bold text-center mb-16 text-3xl lg:text-4xl xl:text-5xl">
          How{" "}
          <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-3xl lg:text-4xl xl:text-5xl">
            ImagoAI
          </span>
          {" "}Works
        </h2>
        <div>
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className={`flex flex-col ${
                step.reverse ? "sm:flex-row-reverse" : "sm:flex-row"
              } justify-between items-center rounded-xl my-8 p-8 gap-4 shadow-md`}
              style={{ background: step.bgColor }}
            >
              <div className="text-left w-full sm:w-[45%] flex flex-col gap-6 order-2 sm:order-1">
                <div className="flex items-center gap-2"><img src={step.icon} alt="" className="size-7" /><h3 className="font-bold text-2xl md:text-3xl">{step.title}</h3></div>
                <p className="text-slate-700 text-sm font-medium">
                  {step.description}
                </p>
              </div>
              <div className="w-full sm:w-[45%] flex justify-center order-1 sm:order-2">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full rounded-lg shadow h-[300px] object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
