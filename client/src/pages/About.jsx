import { Link } from "react-router-dom";
import AboutImage from "../assets/about-image.png";
import ProfilePic from "../assets/profile-pic.jpg";
import ai from "../assets/ai-icon.png";
import PricePlan from "../components/home/PricePlan";

export default function About() {
  return (
    <main className="bg-gradient-to-b py-20 from-white via-slate-50 to-gray-50 min-h-screen text-slate-800">
      <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-40 flex flex-col gap-10 items-center">
        {/* Hero */}
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <p className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
              Premium • AI-powered
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ImagoAI{" "}
              </span>
              Create stunning images from words
            </h1>
            <p className="text-lg text-slate-600 max-w-xl">
              We turn your imagination into high-fidelity images powered by the
              latest generative models. Fast, secure, and crafted for creators,
              designers and teams who demand beautiful results.
            </p>

            <div className="flex flex-row gap-4">
              <Link to="/generate">
                <button className="bg-blue-500 text-sm font-medium text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center gap-2 justify-center">
                  <img src={ai} alt="ai-icon" className="w-4 h-4" />{" "}
                  <span>Try it now</span>
                </button>
              </Link>
              <a href="#price">
                <button className="bg-amber-500 text-sm font-medium text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg">
                  View pricing
                </button>
              </a>
            </div>

            <div className="mt-4 text-sm text-slate-500">
              New users receive{" "}
              <strong className="text-slate-800">5 free generations</strong>.
              Purchase points anytime to continue creating.
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-white/60 backdrop-blur-md ring-1 ring-slate-100 shadow-2xl p-6">
              <img
                src={AboutImage}
                alt="ai-image-generation-sample"
                className="w-full rounded-md object-cover h-64 lg:h-80"
              />
              <div className="mt-4">
                <h4 className="font-semibold">Sample generation</h4>
                <p className="text-sm text-slate-500">
                  A glimpse of what ImagoAI can produce from a single prompt.
                </p>
              </div>
            </div>
            <div className="absolute -right-6 -bottom-6 w-40 h-40 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 opacity-30 blur-3xl"></div>
          </div>
        </div>

        {/* Features */}
        <section className="mt-16 grid gap-8 lg:grid-cols-3">
          <div className="p-6 bg-white rounded-2xl shadow-md border">
            <h3 className="font-semibold text-lg">Photoreal & Artistic</h3>
            <p className="mt-2 text-slate-600 text-sm">
              Choose styles from photorealistic to painterly and hyper-stylized.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md border">
            <h3 className="font-semibold text-lg">Granular Controls</h3>
            <p className="mt-2 text-slate-600 text-sm">
              Fine-tune aspect ratio, color grading, and composition controls.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md border">
            <h3 className="font-semibold text-lg">Secure & Fast</h3>
            <p className="mt-2 text-slate-600 text-sm">
              Your prompts and images are private and processed quickly at
              scale.
            </p>
          </div>
        </section>

        {/* Values & Story */}
        <section className="mt-16 bg-gradient-to-r from-white to-slate-50 p-10 rounded-2xl border">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold">Our mission</h2>
              <p className="mt-3 text-slate-600">
                We believe creativity should be accessible. ImagoAI empowers
                creators to iterate faster and produce professional-grade
                visuals without expensive tooling or long render times.
              </p>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                <li>Human-centered design</li>
                <li>Transparent pricing</li>
                <li>Responsible AI practices</li>
                <li>High-quality output</li>
              </ul>
            </div>

            <div className="mt-6 lg:mt-0 lg:ml-8">
              <blockquote className="p-6 bg-slate-900 text-white rounded-xl shadow-lg">
                <p className="text-sm">
                  “ImagoAI lets me prototype visuals in minutes it changed the
                  way I work.”
                </p>
                <div className="mt-4 text-xs opacity-80">
                  — Sarvajeet Lal Shah, Developer
                </div>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Team & CTA */}
        <section className="mt-16 grid gap-8 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold">Meet the creator</h3>
            <p className="mt-2 text-slate-600 text-sm max-w-xl">
              ImagoAI is a solo project, built from the ground up by a
              passionate developer who loves the intersection of design.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
                <img
                  src={ProfilePic}
                  alt="Founder"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">Sarvajeet Lal Shah</div>
                  <div className="text-sm text-slate-500">
                    Founder & Developer
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
                <svg
                  className="w-14 h-14 rounded-full bg-slate-100 p-2"
                  fill="none"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="20" cy="20" r="20" fill="#F1F5F9" />
                  <path
                    d="M20 22c3.866 0 7 1.343 7 3v2H13v-2c0-1.657 3.134-3 7-3z"
                    fill="#94A3B8"
                  />
                  <circle cx="20" cy="15" r="5" fill="#94A3B8" />
                </svg>
                <div>
                  <div className="font-semibold">You!</div>
                  <div className="text-sm text-slate-500">Supporter & User</div>
                </div>
              </div>
            </div>
          </div>

          <aside className="p-6 bg-gradient-to-b from-amber-50 to-white rounded-2xl border shadow-sm">
            <h4 className="font-semibold">Get started</h4>
            <p className="mt-2 text-slate-600 text-sm">
              Create an account and claim your free generations today.
            </p>
            <a
              href="/signup"
              className="mt-4 inline-block bg-amber-500 text-white px-4 py-2 rounded-lg shadow"
            >
              Create account
            </a>
          </aside>
        </section>
        <section className="mt-10">
          <PricePlan />
        </section>
      </section>
    </main>
  );
}
