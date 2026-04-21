export default function RecentOrders() {
  const orders = [
    { name: "Nasi Goreng", price: "Rp25.000" },
    { name: "Mie Ayam", price: "Rp20.000" },
    { name: "Sate Ayam", price: "Rp30.000" },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm h-full">
      <h2 className="font-semibold text-lg mb-4">Recent Orders</h2>

      {orders.map((item, index) => (
        <div
          key={index}
          className="flex justify-between py-3 border-b last:border-none"
        >
          <span className="text-gray-600">{item.name}</span>
          <span className="font-semibold">{item.price}</span>
        </div>
      ))}
    </div>
  );
}
