import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function SalesChart() {
    const data = [
    { name: "Senin", value: 40 },
    { name: "Selasa", value: 60 },
    { name: "Rabu", value: 30 },
    { name: "Kamis", value: 80 },
    { name: "Jumat", value: 80 },
    { name: "Sabtu", value: 80 },
    { name: "Minggu", value: 80 }
    ];
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-5 mx-4">
            <h2 className="font-bold mb-3">Sales Chart</h2>
            <LineChart width={1000} height={200} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" />
            </LineChart>
        </div>
    );
}

