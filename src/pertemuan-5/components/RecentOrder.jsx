export default function RecentOrders() {
    const orders = [
        { name: "Nasi Goreng", price: "Rp25.000" },
        { name: "Mie Ayam", price: "Rp20.000" },
        { name: "Sate Ayam", price: "Rp30.000" },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mx-4">
            <h2 className="font-bold text-lg mb-3">Recent Orders</h2>
            {orders.map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b">
                    <span>{item.name}</span>
                    <span className="font-semibold">{item.price}</span>
                </div>
            ))}
        </div>
    );
}

