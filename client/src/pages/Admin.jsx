import { useEffect, useState, useMemo } from "react";
import { get, post, api } from "@/lib/api.js";
import { toast } from "sonner";

export default function Admin() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalImages: 0,
    totalRevenueINR: 0,
  });
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyUserId, setBusyUserId] = useState(null);
  const [filter, setFilter] = useState("all");

  const loadAll = async () => {
    try {
      setLoading(true);
      const [s, u, p] = await Promise.all([
        get("/api/admin/stats"),
        get("/api/admin/users"),
        get("/api/admin/payments"),
      ]);
      setStats(s);
      setUsers(u.users || []);
      setPayments(p.payments || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  // const adjustPoints = async (userId, delta) => {
  //   try {
  //     setBusyUserId(userId);
  //     await post(`/api/admin/users/${userId}/points`, { delta });
  //     toast.success("Points updated");
  //     await loadAll();
  //   } catch (e) {
  //     toast.error(e?.response?.data?.message || "Failed to update points");
  //   } finally {
  //     setBusyUserId(null);
  //   }
  // };

  const filteredUsers = useMemo(() => {
    if (filter === "all") return users;
    if (filter === "free-used") return users.filter((u) => u.freeUsed > 0);
    if (filter === "low-points")
      return users.filter((u) => (u.points || 0) < 10);
    return users;
  }, [users, filter]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-gray-50 py-20">
      <section className="container mx-auto px-6 lg:px-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-sm text-slate-600">
              Overview of users, payments and quick controls
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={loadAll} className="px-4 py-2 rounded-lg border">
              Refresh
            </button>
            <button
              onClick={async () => {
                try {
                  const res = await api.get("/api/admin/export", {
                    responseType: "blob",
                  });

                  // axios returns status and headers
                  if (!res || res.status !== 200)
                    throw new Error("Export failed");

                  const contentType =
                    (res.headers &&
                      (res.headers["content-type"] ||
                        res.headers["Content-Type"])) ||
                    "";
                  const blob = res.data;
                  if (!blob || blob.size === 0)
                    throw new Error("Export returned empty file");

                  let filename = "imago-admin-export.xlsx";
                  const cd =
                    res.headers &&
                    (res.headers["content-disposition"] ||
                      res.headers["Content-Disposition"]);
                  if (cd) {
                    const m = cd.match(
                      /filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/
                    );
                    if (m) filename = decodeURIComponent(m[1] || m[2]);
                  } else {
                    if (contentType.includes("spreadsheetml"))
                      filename = "imago-admin-export.xlsx";
                    else if (contentType.includes("zip"))
                      filename = "imago-admin-export.zip";
                  }

                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = filename;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  window.URL.revokeObjectURL(url);
                } catch (e) {
                  console.error(e);
                  if (e?.response?.data) {
                    try {
                      const reader = new FileReader();
                      reader.onload = () => {
                        const txt = reader.result;
                        toast.error(
                          typeof txt === "string" ? txt : "Export failed"
                        );
                      };
                      reader.readAsText(e.response.data);
                    } catch (inner) {
                      toast.error(e?.message || "Export failed");
                    }
                  } else {
                    toast.error(e?.message || "Export failed");
                  }
                }
              }}
              className="px-4 py-2 rounded-lg bg-amber-500 text-white"
            >
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow border">
            <div className="text-sm text-slate-500">Total users</div>
            <div className="text-2xl font-semibold mt-2">
              {stats.totalUsers}
            </div>
            <div className="mt-3 text-xs text-slate-400">All users</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow border">
            <div className="text-sm text-slate-500">Total images</div>
            <div className="text-2xl font-semibold mt-2">
              {stats.totalImages}
            </div>
            <div className="mt-3 text-xs text-slate-400">Generated</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow border">
            <div className="text-sm text-slate-500">Revenue (₹)</div>
            <div className="text-2xl font-semibold mt-2">
              {stats.totalRevenueINR}
            </div>
            <div className="mt-3 text-xs text-slate-400">All-time</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow border mb-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Users</h3>
                <div className="flex items-center gap-3">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="rounded border px-3 py-2 text-sm"
                  >
                    <option value="all">All users</option>
                    <option value="free-used">Used free</option>
                    <option value="low-points">Low points (&lt;10)</option>
                  </select>
                  {loading && (
                    <span className="text-sm text-slate-400">Loading…</span>
                  )}
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="p-3">User</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Free used</th>
                      <th className="p-3">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr
                        key={u._id || u.id}
                        className="border-b hover:bg-slate-50"
                      >
                        <td className="p-3">
                          <div className="font-medium">{u.name || "—"}</div>
                          <div className="text-xs text-slate-400">
                            {u.loginType}
                          </div>
                        </td>
                        <td className="p-3">{u.email}</td>
                        <td className="p-3">{u.role}</td>
                        <td className="p-3">{u.freeUsed}</td>
                        <td className="p-3">{u.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow border">
              <h3 className="font-semibold">Payments</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="p-2">Order</th>
                      <th className="p-2">Payment</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Amount (₹)</th>
                      <th className="p-2">Points</th>
                      <th className="p-2">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map(
                      (p) =>
                        p.status === "paid" && (
                          <tr
                            key={p._id}
                            className="border-b hover:bg-slate-50"
                          >
                            <td className="p-2">{p.orderId}</td>
                            <td className="p-2">{p.paymentId || "—"}</td>
                            <td className="p-2">{p.userId?.email || "—"}</td>
                            <td className="p-2">
                              {p.status === "paid" && "paid"}
                            </td>
                            <td className="p-2">{(p.amount || 0) / 100}</td>
                            <td className="p-2">{p.pointsPurchased}</td>
                            <td className="p-2">
                              {new Date(p.createdAt).toLocaleString()}
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow border">
              <h4 className="font-semibold">Quick filters</h4>
              <div className="mt-3 grid gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`text-left px-3 py-2 rounded ${
                    filter === "all" ? "bg-blue-500 text-white" : "bg-white"
                  }`}
                >
                  All users
                </button>
                <button
                  onClick={() => setFilter("free-used")}
                  className={`text-left px-3 py-2 rounded ${
                    filter === "free-used"
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                >
                  Used free
                </button>
                <button
                  onClick={() => setFilter("low-points")}
                  className={`text-left px-3 py-2 rounded ${
                    filter === "low-points"
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                >
                  Low points
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow border">
              <h4 className="font-semibold">Actions</h4>
              <div className="mt-3 grid gap-2">
                {/* <button
                  onClick={() => loadAll()}
                  className="px-3 py-2 rounded-lg border"
                >
                  Reload data
                </button> */}
                <a
                  href="/admin/analytics"
                  className="px-3 py-2 rounded-lg bg-amber-500 text-white text-center"
                >
                  Open analytics
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
