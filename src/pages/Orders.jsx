import { useState } from "react";
import PageHeader from "../components/PageHeader";
import ordersData from "../components/order.JSON";

export default function Orders() {
  const [orders] = useState(ordersData);
  const [showForm, setShowForm] = useState(false);

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
          <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 w-[500px] relative">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Add Orders</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Order ID"
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Customer Name"
                className="border p-2 rounded"
              />

              <select className="border p-2 rounded">
                <option>Pending</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>

              <input
                type="number"
                placeholder="Total Price"
                className="border p-2 rounded"
              />
              <input type="date" className="border p-2 rounded col-span-2" />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-4">
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
              <th className="text-left p-2">Order ID</th>
              <th className="text-left p-2">Customer Name</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Total Price</th>
              <th className="text-left p-2">Order Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="border-b">
                <td className="p-2">{order.orderId}</td>
                <td className="p-2">{order.customerName}</td>
                <td className="p-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-500"
                          : order.status === "Pending"
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
                    Rp {order.totalPrice.toLocaleString("id-ID")}
                  </span>
                </td>
                <td className="p-2">{order.orderDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
