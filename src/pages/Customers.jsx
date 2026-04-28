import { useState } from "react";
import PageHeader from "../components/PageHeader";
import customersData from "../components/customer.JSON";

export default function Customers() {
  const [customers] = useState(customersData);
  const [showForm, setShowForm] = useState(false);

  return (
    <div id="dashboard-container">
      <PageHeader title="Customers" breadcrumb="Customers / Customer List">
        <button
          onClick={() => setShowForm(true)}
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

            <h2 className="text-xl font-bold mb-4">Add Customer</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Customer ID"
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Customer Name"
                className="border p-2 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                className="border p-2 rounded"
              />

              <select className="border p-2 rounded col-span-2">
                <option>Bronze</option>
                <option>Silver</option>
                <option>Gold</option>
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
              <button className="bg-biru text-white px-4 py-2 rounded">
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
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customerId} className="border-b">
                <td className="p-2">{customer.customerId}</td>
                <td className="p-2">{customer.customerName}</td>
                <td className="p-2">{customer.email}</td>
                <td className="p-2">{customer.phone}</td>
                <td className="p-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        customer.loyalty === "Gold"
                          ? "bg-yellow-100 text-yellow-700"
                          : customer.loyalty === "Silver"
                            ? "bg-gray-200 text-gray-700"
                            : "bg-orange-100 text-orange-700"
                      } 
                    `}
                  >
                    {customer.loyalty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
