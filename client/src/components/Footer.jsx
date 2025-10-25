import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {

const [email, setEmail] = useState("");

const handleSubscribed = () => {
  // Check if email is empty
  if (!email) {
    toast.error("Please enter your email");
    return;
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Test the email against the regex
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  // Clear the input after successful submission
  setEmail("");
  toast.success("Subscribed successfully");
};

  return (
    <footer
      className="w-full py-20 text-white px-4 md:px-10 lg:px-20 xl:px-40"
      style={{
        background: "linear-gradient(0deg, #064e3b, #000000)",
      }}
    >
      {/* Subscribe Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3">
          Subscribe to Get Special Price
        </h2>
        <p className="text-gray-400 mb-6">
          Don’t wanna miss something? Subscribe right now and get special
          promotion and monthly newsletter
        </p>
        <div className="flex justify-center">
          <div className=" rounded-lg flex flex-col sm:flex-row items-center overflow-hidden w-full max-w-md">
            <input
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              placeholder="Enter Your Email Address"
              className="flex-1 px-4 py-3  w-full rounded-lg sm:rounded-none bg-slate-800  text-gray-300 outline-none placeholder-gray-500"
            />
            <button onClick={()=>handleSubscribed()} className="bg-blue-600 hover:bg-blue-700 rounded-lg  mt-4 sm:mt-0 sm:rounded-none transition text-white px-5 py-3 font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
          <h3 className="text-lg font-semibold">Imago AI</h3>
        </div>
        {/* Center Links */}
        <ul className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
          <li className="hover:text-white">Home</li>
          <li className="hover:text-white">Generate</li>
          <li className="hover:text-white">Dashboard</li>
          <li className="hover:text-white">Pricing</li>
        </ul>
        {/* Right - Social Icons */}
        <div className="flex gap-4 text-gray-400 text-lg">
          <a href="https://www.linkedin.com/in/sarvajeet-lal-shah-928280274" className="hover:text-white" aria-label="LinkedIn" title="linkedin" target="_blank">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
            </svg>
          </a>
          <a href="https://github.com/sarvajeet12" className="hover:text-white" aria-label="GitHub" title="github" target="_blank">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576 4.765-1.588 8.2-6.084 8.2-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a href="https://my-resume-xi-eosin.vercel.app" className="hover:text-white" aria-label="Website" title="website" target="_blank">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm7.938 8h-3.486c-.153-2.33-.803-4.063-1.452-5.093A8.025 8.025 0 0119.938 10zM12 4.062c.876 1.02 1.81 3.01 2.01 5.938h-4.02c.2-2.928 1.134-4.918 2.01-5.938zM4.062 14A7.963 7.963 0 014 12c0-.687.087-1.353.238-2h3.486c-.07.654-.112 1.32-.112 2s.042 1.346.112 2H4.062zm.938 2h3.486c.153 2.33.803 4.063 1.452 5.093A8.025 8.025 0 014.999 16zm3.724 0h4.554c-.197 2.825-1.13 4.81-2.002 5.93-.872-1.12-1.805-3.105-2.002-5.93zm6.277 5.093c.649-1.03 1.299-2.763 1.452-5.093h3.486a8.025 8.025 0 01-4.938 5.093zM16.276 14h-4.554c.197-2.825 1.13-4.81 2.002-5.93.872 1.12 1.805 3.105 2.002 5.93zm-8.276-6H4.062A8.025 8.025 0 017 3.907C7.649 4.937 8.299 6.67 8.452 9zm9.548 0c-.153-2.33-.803-4.063-1.452-5.093A8.025 8.025 0 0119.938 10h-3.486z" />
            </svg>
          </a>
        </div>
      </div>
      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-10">
        {/* Copyright © 2025 ImagoAI.com */}
        Made with passion • Premium  AI-powered
      </div>
    </footer>
  );
}
