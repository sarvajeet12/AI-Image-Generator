import { useEffect, useState } from "react";
import UsageChart from "@/components/UsageChart.jsx";
import { get, post } from "@/lib/api.js";
import { useAuth } from "@/context/AuthContext.jsx";
import { toast } from "sonner";
import { openCheckout } from "@/lib/razorpay.js";

export default function Dashboard() {
  const { user, refresh } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await get("/api/images/my");
      setItems(data.items || []);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const gettingUserData = async () =>{
    try {
      const userData = await get("/api/users/me",{ withCredentials: true });
      setUserData(userData)
    } catch (error) {
      toast.error(err?.response?.data?.message || "Failed to load history");
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
    gettingUserData()
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setSelectedImage(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Add this effect to manage body scroll
useEffect(() => {
  if (selectedImage) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
  
  // Cleanup function to re-enable scrolling when component unmounts
  return () => {
    document.body.style.overflow = 'unset';
  };
}, [selectedImage]);

  async function downloadImage(url, filename = "imago-image.jpg") {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch image for download");
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      toast.error(err?.message || "Download failed");
    }
  }

  const buyPoints = async (points) => {
    // Step 1: Create order
    let data;
    try {
      data = await post("/api/payments/order", { points });
    } catch (err) {
      return toast.error(
        err?.response?.data?.message || "Unable to create order"
      );
    }

    // Step 2: Open Razorpay checkout
    try {
      const onSuccess = async (response) => {
        try {
          await post("/api/payments/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          toast.success("Points credited");
          await refresh();
        } catch (e) {
          toast.error(e?.response?.data?.message || "Verification failed");
        }
      };

      const rzp = await openCheckout({
        orderId: data.orderId,
        amount: data.amount,
        email: user?.email,
        onSuccess,
      });
      rzp.on("payment.failed", (e) => {
        toast.error(e?.error?.description || "Payment failed");
      });
      rzp.open();
    } catch (e) {
      toast.error(e?.message || "Failed to open checkout");
    }
  };

  

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-gray-50 py-12">
      <section className="container mx-auto px-6 lg:px-20">
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold">
                  Welcome back, {user?.name || "Creator"}
                </h1>
                <p className="text-sm text-slate-600">
                  A snapshot of your account and recent creations.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm text-slate-500">Free used</div>
                  <div className="text-lg font-semibold">
                    {userData?.freeUsed ?? 0} / 5
                  </div>
                </div>
                <div className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow">
                  <div className="text-sm">Points</div>
                  <div className="text-lg font-semibold">
                    {userData?.points ?? 0}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats / chart area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Usage overview</h3>
                  <div className="text-sm text-slate-500">Last 30 days</div>
                </div>
                <div className="mt-6 h-40 rounded-lg bg-white/40 border border-slate-100 p-2">
                  <UsageChart items={items} />
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-lg border shadow-sm text-center">
                    <div className="text-sm text-slate-500">Generations</div>
                    <div className="text-xl font-semibold">{items.length}</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border shadow-sm text-center">
                    <div className="text-sm text-slate-500">Avg per day</div>
                    <div className="text-xl font-semibold">
                      {Math.max(1, Math.round(items.length / 7))}
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border shadow-sm text-center">
                    <div className="text-sm text-slate-500">Saved</div>
                    <div className="text-xl font-semibold">
                      {items.filter((i) => i.saved).length}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow border">
                <h4 className="font-semibold">Quick actions</h4>
                <div className="mt-4 grid gap-3">
                  <button
                    onClick={() => buyPoints(10)}
                    className="w-full px-4 py-2 rounded-lg bg-amber-500 text-white"
                  >
                    Buy 10 (₹50)
                  </button>
                  <button
                    onClick={() => buyPoints(25)}
                    className="w-full px-4 py-2 rounded-lg border"
                  >
                    Buy 25 (₹100)
                  </button>
                  <a
                    href="/generate"
                    className="w-full inline-block text-center px-4 py-2 rounded-lg bg-blue-500 text-white"
                  >
                    Generate now
                  </a>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-2xl p-6 shadow border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Your images</h3>
                <div className="text-sm text-slate-500">
                  {items.length} items
                </div>
              </div>

              {loading ? (
                <div className="mt-6 text-slate-500">
                  Loading your creations…
                </div>
              ) : items.length === 0 ? (
                <div className="mt-6 text-slate-500">
                  No generations yet. Try creating one on the Generate page.
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map((g) => (
                    <div
                      key={g._id}
                      className="rounded-xl overflow-hidden border hover:shadow-lg transition-shadow bg-white"
                    >
                      <img
                        src={g.imageUrl}
                        alt={g.prompt}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-3">
                        <p className="text-sm text-slate-700 line-clamp-2">
                          {g.prompt}
                        </p>
                        <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                          <div>
                            {new Date(g.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => downloadImage(g.imageUrl)}
                              className="px-3 py-1 rounded bg-slate-100 text-slate-600 text-sm"
                            >
                              Download
                            </button>
                            <button
                              onClick={() => setSelectedImage(g.imageUrl)}
                              className="px-3 py-1 rounded bg-amber-50 text-amber-600 text-sm"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="w-80 hidden lg:block">
            <div className="bg-white rounded-2xl p-6 shadow border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center text-white font-bold">
                  {(user?.name || "U")[0]}
                </div>
                <div>
                  <div className="font-semibold">{user?.name || "Creator"}</div>
                  <div className="text-sm text-slate-500">{user?.email}</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm text-slate-500">Account</div>
                <div className="mt-2 grid gap-2">
                  <div className="text-sm">
                  Plan: <strong>{(user?.points ?? 0) >= 25 ? "Team" : (user?.points ?? 0) >= 10 ? "Pro" : "Free"}</strong>
                  </div>
                  <div className="text-sm">
                    Member since:{" "}
                    <strong>
                      {new Date(
                        user?.createdAt || Date.now()
                      ).toLocaleDateString()}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
        {/* Image preview modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setSelectedImage(null)}
            />
            <div className="relative max-w-4xl w-full mx-4">
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                <div className="p-3 flex items-center justify-between border-b">
                  <div className="text-sm font-medium">Preview</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => downloadImage(selectedImage)}
                      className="px-3 py-1 rounded bg-slate-100 text-slate-700 text-sm"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="px-3 py-1 rounded bg-amber-50 text-amber-700 text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 flex items-center justify-center">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="max-h-[70vh] object-contain w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
