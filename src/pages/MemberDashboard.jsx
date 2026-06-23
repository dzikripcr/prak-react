import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { commerceAPI } from "../services/commerceAPI";
import useAuth from "../hooks/useAuth";

const TIER_DISCOUNT = {
  bronze: 5,
  silver: 10,
  gold: 15,
  platinum: 20,
};

const TIER_COLORS = {
  bronze: "bg-orange-100 text-orange-700",
  silver: "bg-gray-200 text-gray-700",
  gold: "bg-yellow-100 text-yellow-700",
  platinum: "bg-purple-100 text-purple-700",
};

export default function MemberDashboard() {
  const { profile, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const tier = profile?.tier || "bronze";
  const discountPct = TIER_DISCOUNT[tier] || 0;
  const totalPoints = points.reduce((sum, p) => sum + p.points, 0);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [orderData, pointData] = await Promise.all([
          commerceAPI.getOrders(),
          commerceAPI.getMemberPoints(user?.id),
        ]);
        setOrders(orderData);
        setPoints(pointData);
      } catch (err) {
        setError(err.message || "Gagal memuat data.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) loadData();
  }, [user]);

  const recentOrders = orders.slice(0, 5);

  return (
    <div id="dashboard-container">
      <PageHeader title="Dashboard Member" breadcrumb="Dashboard / Member Dashboard" />

      {loading && <p className="p-4 text-gray-500">Loading...</p>}
      {error && <p className="p-4 text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          {/* Cards Ringkasan */}
          <div className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Tier Card */}
            <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
              <div className="bg-hijau rounded-full p-4 text-white text-xl font-bold">
                {tier.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${TIER_COLORS[tier] || TIER_COLORS.bronze}`}>
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}
                </span>
                <span className="text-sm text-gray-500 mt-1">Tier Member</span>
              </div>
            </div>

            {/* Diskon Card */}
            <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
              <div className="bg-biru rounded-full p-4 text-white text-xl font-bold">
                %
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{discountPct}%</span>
                <span className="text-sm text-gray-500">Diskon Pesanan</span>
              </div>
            </div>

            {/* Poin Card */}
            <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
              <div className="bg-kuning rounded-full p-4 text-white text-xl font-bold">
                P
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{totalPoints.toLocaleString("id-ID")}</span>
                <span className="text-sm text-gray-500">Total Poin</span>
              </div>
            </div>

            {/* Total Order Card */}
            <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
              <div className="bg-merah rounded-full p-4 text-white text-xl font-bold">
                #
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{orders.length}</span>
                <span className="text-sm text-gray-500">Total Pesanan</span>
              </div>
            </div>
          </div>

          <div className="p-5 grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* Riwayat Poin */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4">
              <h2 className="font-semibold text-lg mb-4">Riwayat Poin</h2>
              {points.length === 0 ? (
                <p className="text-gray-500 text-sm">Belum ada riwayat poin.</p>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {points.map((p) => (
                    <div key={p.id} className="flex justify-between py-2 border-b last:border-none">
                      <div>
                        <p className="text-sm text-gray-600">{p.description}</p>
                        <p className="text-xs text-gray-400">{new Date(p.created_at).toLocaleDateString("id-ID")}</p>
                      </div>
                      <span className={`font-semibold text-sm ${p.points > 0 ? "text-green-600" : "text-red-600"}`}>
                        {p.points > 0 ? "+" : ""}{p.points}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pesanan Terbaru */}
            <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-4">
              <h2 className="font-semibold text-lg mb-4">Pesanan Terbaru</h2>
              {recentOrders.length === 0 ? (
                <p className="text-gray-500 text-sm">Belum ada pesanan.</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="p-2 text-sm">ID</th>
                      <th className="p-2 text-sm">Status</th>
                      <th className="p-2 text-sm">Total</th>
                      <th className="p-2 text-sm">Diskon</th>
                      <th className="p-2 text-sm">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="p-2 text-xs font-mono">{order.id.slice(0, 8)}...</td>
                        <td className="p-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            order.status === "completed" ? "bg-green-100 text-green-600"
                            : order.status === "pending" ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-2 text-sm font-semibold">
                          Rp {Number(order.total_price).toLocaleString("id-ID")}
                        </td>
                        <td className="p-2 text-sm text-green-600">
                          {Number(order.discount) > 0
                            ? `Rp ${Number(order.discount).toLocaleString("id-ID")}`
                            : "-"}
                        </td>
                        <td className="p-2 text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleDateString("id-ID")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Info Tier & Diskon */}
          <div className="p-5">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="font-semibold text-lg mb-3">Informasi Tier & Diskon</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(TIER_DISCOUNT).map(([t, d]) => (
                  <div
                    key={t}
                    className={`p-3 rounded-lg border text-center ${
                      tier === t ? "ring-2 ring-hijau bg-green-50" : ""
                    }`}
                  >
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${TIER_COLORS[t]}`}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </span>
                    <p className="text-lg font-bold mt-2">{d}%</p>
                    <p className="text-xs text-gray-500">Diskon</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Poin didapat dari setiap pesanan yang selesai (Rp 10.000 = 1 poin). 
                Tier otomatis naik saat poin mencapai batas tertentu.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
