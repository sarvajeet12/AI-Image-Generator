import { useState, useRef, useEffect } from "react";
import { post, get } from "@/lib/api.js";
import { toast } from "sonner";
import { motion } from "framer-motion";


export default function Generate() {
  const [prompt, setPrompt] = useState("");
 
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState("photoreal");
  const [aspect, setAspect] = useState("16:9");
  const [gallery, setGallery] = useState([]);

  const presets = [
    { id: "photoreal", name: "Photoreal" },
    { id: "cinematic", name: "Cinematic" },
    { id: "illustration", name: "Illustration" },
    { id: "fantasy", name: "Fantasy" },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return toast.error("Please enter a prompt");
    
    try {

      const userData = await get("/api/users/me");
      if (userData.freeUsed >= 5 && (!userData.points || userData.points <= 0)) {
        return toast.error("Insufficient points. Please purchase credits.");
      }
      
      setLoading(true);
      setImg(null);
      const data = await post("/api/images/generate", {
        prompt,
        style,
        aspect,
      });
      setImg(data.imageUrl);
      setGallery((g) => [data.imageUrl, ...g].slice(0, 12));
      toast.success("Image generated");
      
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to generate image";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  function AspectSelect({
    value,
    onChange,
    options = ["16:9", "4:3", "1:1", "9:16"],
  }) {
    const [open, setOpen] = useState(false);
    const [highlight, setHighlight] = useState(options.indexOf(value));
    const ref = useRef(null);

    useEffect(() => {
      function onClick(e) {
        if (ref.current && !ref.current.contains(e.target)) setOpen(false);
      }
      window.addEventListener("mousedown", onClick);
      return () => window.removeEventListener("mousedown", onClick);
    }, []);

    useEffect(() => setHighlight(options.indexOf(value)), [value]);

    function onKeyDown(e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
        setHighlight((h) => Math.min(h + 1, options.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setOpen(true);
        setHighlight((h) => Math.max(h - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (open && highlight >= 0) onChange(options[highlight]);
        setOpen((s) => !s);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }

    return (
      <div className="mt-2 relative inline-block text-left w-40" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          onKeyDown={onKeyDown}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="w-full text-left pr-10 pl-4 py-2 rounded-xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-transparent focus:border-slate-200 flex items-center justify-between"
        >
          <span className="truncate">{value}</span>
          <svg
            className={`w-4 h-4 ml-2 text-slate-400 transform transition ${
              open ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 8l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {open && (
          <ul
            role="listbox"
            tabIndex={-1}
            className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border z-50 overflow-hidden py-1"
          >
            {options.map((opt, i) => (
              <li
                key={opt}
                role="option"
                aria-selected={value === opt}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`cursor-pointer px-4 py-2 text-sm ${
                  value === opt
                    ? "bg-amber-50 text-amber-700 font-medium"
                    : highlight === i
                    ? "bg-slate-100"
                    : "text-slate-700"
                }`}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-gray-50 py-12">
      <section className="container mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg border">
              <h1 className="text-3xl font-bold">
                Generate beautiful images from prompts
              </h1>
              <p className="mt-2 text-slate-600">
                Write a short prompt, choose a style and aspect ratio, then
                generate.
              </p>

              <form onSubmit={onSubmit} className="mt-6">
                <label className="block text-sm font-medium text-slate-700">
                  Prompt
                </label>
                <textarea
                  rows={3}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A cozy cabin in the woods, warm cinematic light, 35mm lens"
                  className="mt-2 w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-amber-200 outline-none"
                />

                <div className="mt-4 flex flex-wrap gap-4 items-center">
                  <div>
                    <div className="text-sm font-medium text-slate-700">
                      Style
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {presets.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setStyle(p.id)}
                          className={`px-3 py-2 rounded-lg text-sm border ${
                            style === p.id
                              ? "bg-amber-500 text-white"
                              : "bg-white text-slate-700"
                          }`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-slate-700">
                      Aspect
                    </div>
                    <AspectSelect value={aspect} onChange={setAspect} />
                  </div>

                  <div className="ml-auto flex gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center px-5 py-2 rounded-lg bg-blue-500 text-white shadow hover:scale-[1.01] disabled:opacity-60"
                    >
                      {loading ? "Generating..." : "Generate"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPrompt("");
                        setImg(null);
                      }}
                      className="px-4 py-2 rounded-lg border text-slate-700 bg-white"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-6">
                {loading && (
                  <div className="text-slate-600">
                    Generating image this may take a moment...
                  </div>
                )}

                {img ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    <div className="rounded-2xl overflow-hidden border shadow">
                      <img
                        src={img}
                        alt="Generated"
                        className="w-full object-cover"
                      />
                    </div>
                   
                  </motion.div>
                ) : (
                  <div className="mt-6 rounded-lg border-dashed border-2 border-slate-200 p-8 text-center text-slate-500">
                    Your generated image will appear here.
                  </div>
                )}
              </div>
            </div>

            {/* small tips */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border shadow-sm text-sm">
                <strong>Tip:</strong> Use sensory adjectives (lighting, mood,
                color).
              </div>
              <div className="p-4 bg-white rounded-lg border shadow-sm text-sm">
                <strong>Pro:</strong> Try adding artist names or camera lens for
                style.
              </div>
              <div className="p-4 bg-white rounded-lg border shadow-sm text-sm">
                <strong>Privacy:</strong> Prompts and images are processed
                securely.
              </div>
            </div>
          </div>

          <aside className="sticky top-28">
            <div className="bg-white rounded-2xl p-6 shadow-lg border w-80">
              <h3 className="font-semibold">Recent gallery</h3>
              <p className="text-sm text-slate-500 mt-1">
                Your latest creations (kept for this session)
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {gallery.length === 0 && (
                  <div className="col-span-3 text-sm text-slate-400">
                    No images yet. Try to generate one!
                  </div>
                )}
                {gallery.map((g, i) => (
                  <img
                    key={i}
                    src={g}
                    alt={`gen-${i}`}
                    className="w-full h-20 object-cover rounded"
                  />
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setGallery([])}
                  className="flex-1 text-sm px-3 py-2 rounded-lg border"
                >
                  Clear
                </button>
                <a
                  href="/dashboard"
                  className="flex-1 text-sm px-3 py-2 rounded-lg bg-amber-500 text-white text-center"
                >
                  Open gallery
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
