import { useState } from "react";
import { useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { commerceAPI } from "../services/commerceAPI";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", role: "member", tier: "bronze" });

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setCustomers(await commerceAPI.getCustomers());
      } catch (err) {
        setError(err.message || "Gagal memuat customer.");
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setForm({ name: customer.name, phone: customer.phone || "", role: customer.role, tier: customer.tier });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!selectedCustomer) return;
    try {
      setLoading(true);
      await commerceAPI.updateCustomer(selectedCustomer.id, form);
      setCustomers(customers.map((customer) => customer.id === selectedCustomer.id ? { ...customer, ...form } : customer));
      setShowForm(false);
      setSelectedCustomer(null);
    } catch (err) {
      setError(err.message || "Gagal memperbarui customer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="dashboard-container">
      <PageHeader title="Customers" breadcrumb="Customers / Customer List">
        <button
          onClick={() => { setSelectedCustomer(null); setShowForm(false); setError("Customer dibuat melalui halaman Register agar akun Auth dan profile dibuat dengan aman."); }}
          className="bg-biru text-white px-4 py-2 rounded-lg mr-2"
        >
          Add Customer
        </button>
        <button className="bg-merah text-white px-4 py-2 rounded-lg mr-2">
          Export
        </button>
      </PageHeader>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 w-[500px] relative">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Edit Customer</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={selectedCustomer?.id || ""}
                readOnly
                placeholder="Customer ID"
                className="border p-2 rounded"
              />
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Customer Name"
                className="border p-2 rounded"
              />
              <input
                type="text"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                placeholder="Phone"
                className="border p-2 rounded"
              />

              <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className="border p-2 rounded">
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
              <select value={form.tier} onChange={(event) => setForm({ ...form, tier: event.target.value })} className="border p-2 rounded">
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-5">
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-300 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button onClick={handleSave} disabled={loading} className="bg-biru text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Customer ID</th>
              <th className="text-left p-2">Customer Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Phone</th>
              <th className="text-left p-2">Loyalty</th>
              <th className="text-left p-2">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b">
                <td className="p-2">{customer.id}</td>
                <td className="p-2">{customer.name}</td>
                <td className="p-2">-</td>
                <td className="p-2">{customer.phone || "-"}</td>
                <td className="p-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        customer.tier === "gold"
                          ? "bg-yellow-100 text-yellow-700"
                          : customer.tier === "silver"
                            ? "bg-gray-200 text-gray-700"
                            : "bg-orange-100 text-orange-700"
                      } 
                    `}
                  >
                    {customer.tier}
                  </span>
                </td>
                <td className="p-2"><button onClick={() => handleEdit(customer)} className="text-blue-600">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p className="p-2 text-gray-500">Loading...</p>}
        {!loading && error && <p className="p-2 text-red-600">{error}</p>}
        {!loading && !error && customers.length === 0 && <p className="p-2 text-gray-500">Belum ada customer.</p>}
      </div>
    </div>
  );
}
