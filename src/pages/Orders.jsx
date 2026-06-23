import { useState } from "react";
import { useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { commerceAPI } from "../services/commerceAPI";
import useAuth from "../hooks/useAuth";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [orderForm, setOrderForm] = useState({ product_id: "", quantity: 1 });
    const { profile, user } = useAuth();
  const isAdmin = profile?.role === "admin";
  const discountPct = profile?.tier === "bronze" ? 5 : profile?.tier === "silver" ? 10 : profile?.tier === "gold" ? 15 : profile?.tier === "platinum" ? 20 : 0;

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");
      setOrders(await commerceAPI.getOrders());
    } catch (err) {
      setError(err.message || "Gagal memuat order.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const [orderData, productData] = await Promise.all([commerceAPI.getOrders(), commerceAPI.getProducts()]);
        setOrders(orderData);
        setProducts(productData);
      } catch (err) {
        setError(err.message || "Gagal memuat order.");
      } finally {
        setLoading(false);
      }
    };

    loadPageData();
  }, []);

  const handleCreateOrder = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await commerceAPI.createOrder([{ product_id: orderForm.product_id, quantity: Number(orderForm.quantity) }]);
      setShowForm(false);
      setOrderForm({ product_id: "", quantity: 1 });
      await loadOrders();
    } catch (err) {
      setError(err.message || "Gagal membuat order.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      setLoading(true);
      await commerceAPI.updateOrderStatus(id, status);
      await loadOrders();
    } catch (err) {
      setError(err.message || "Gagal memperbarui status order.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus order ini?")) return;
    try {
      setLoading(true);
      await commerceAPI.deleteOrder(id);
      await loadOrders();
    } catch (err) {
      setError(err.message || "Gagal menghapus order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="dashboard-container">
      <PageHeader title="Orders" breadcrumb="Orders / Order List">
        <button
          onClick={() => setShowForm(true)}
          className="bg-biru text-white px-4 py-2 rounded-lg mr-2"
        >
          Add Orders
        </button>
        <button className="bg-kuning text-white px-4 py-2 rounded-lg mr-2">
          Export
        </button>
      </PageHeader>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/40 backdrop-blur-sm z-50">
          <form onSubmit={handleCreateOrder} className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 w-[500px] relative">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Add Orders</h2>

            {!isAdmin && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                🎉 Anda mendapat diskon <b>{discountPct}%</b> sebagai member <b>{profile?.tier?.charAt(0).toUpperCase() + profile?.tier?.slice(1) || "Bronze"}</b>!
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <select required value={orderForm.product_id} onChange={(event) => setOrderForm({ ...orderForm, product_id: event.target.value })} className="border p-2 rounded col-span-2">
                <option value="">Pilih Produk</option>
                {products.filter((product) => product.stock > 0).map((product) => <option key={product.id} value={product.id}>{product.name} — Rp {Number(product.price).toLocaleString("id-ID")}</option>)}
              </select>
              <input
                type="number"
                min="1"
                required
                value={orderForm.quantity}
                onChange={(event) => setOrderForm({ ...orderForm, quantity: event.target.value })}
                placeholder="Jumlah"
                className="border p-2 rounded"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-300 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button type="submit" disabled={loading} className="bg-biru text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Order ID</th>
              <th className="text-left p-2">Customer Name</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Total Price</th>
              <th className="text-left p-2">Diskon</th>
              <th className="text-left p-2">Order Date</th>
              {isAdmin && <th className="text-left p-2">Aksi</th>}
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.profiles?.name || "-"}</td>
                <td className="p-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-500"
                          : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-500"
                            : "bg-red-100 text-red-500"
                      }
                    `}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-2">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                  Rp {Number(order.total_price).toLocaleString("id-ID")}
                  </span>
                </td>
                <td className="p-2">
                  {Number(order.discount) > 0 ? (
                    <span className="text-green-600 font-semibold">
                      - Rp {Number(order.discount).toLocaleString("id-ID")}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="p-2">{new Date(order.created_at).toLocaleDateString("id-ID")}</td>
                {isAdmin && <td className="p-2 whitespace-nowrap">
                  <select value={order.status} onChange={(event) => handleStatus(order.id, event.target.value)} className="border rounded p-1 mr-2">
                    <option value="pending">Pending</option><option value="processing">Processing</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
                  </select>
                  <button onClick={() => handleDelete(order.id)} className="text-red-600">Hapus</button>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p className="p-2 text-gray-500">Loading...</p>}
        {!loading && error && <p className="p-2 text-red-600">{error}</p>}
        {!loading && !error && orders.length === 0 && <p className="p-2 text-gray-500">Belum ada order.</p>}
      </div>
    </div>
  );
}
