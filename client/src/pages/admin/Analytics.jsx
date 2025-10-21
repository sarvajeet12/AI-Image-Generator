import { useEffect, useState } from "react";
import UsageChart from "@/components/UsageChart.jsx";
import { get } from "@/lib/api.js";
import { toast } from "sonner";

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalImages: 0,
    totalRevenueINR: 0,
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        // summary totals
        const s = await get("/api/admin/stats");
        setSummary(s || {});

        // try to fetch recent images (last 30 days) for series
        // This endpoint may not exist; if it fails we continue with empty series
        try {
          const imgs = await get("/api/admin/images?range=30");
          setItems(imgs.items || []);
        } catch (e) {
          // fallback: leave items empty — chart will render flat
        }
      } catch (e) {
        toast.error(e?.response?.data?.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-gray-50 py-12">
      <section className="container mx-auto px-6 lg:px-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Admin Analytics</h1>
            <p className="text-sm text-slate-600">
              Usage trends and revenue overview
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow border">
            <div className="text-sm text-slate-500">Total users</div>
            <div className="text-2xl font-semibold mt-2">
              {summary.totalUsers}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow border">
            <div className="text-sm text-slate-500">Total images</div>
            <div className="text-2xl font-semibold mt-2">
              {summary.totalImages}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow border">
            <div className="text-sm text-slate-500">Revenue (₹)</div>
            <div className="text-2xl font-semibold mt-2">
              {summary.totalRevenueINR}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow border mb-6">
          <h3 className="font-semibold">Generations (last 30 days)</h3>
          <div className="mt-4 h-64">
            <UsageChart items={items} />
          </div>
        </div>
      </section>
    </main>
  );
}
