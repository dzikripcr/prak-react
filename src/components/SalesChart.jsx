import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SalesChart() {
  const data = [
    { name: "Senin", value: 40 },
    { name: "Selasa", value: 60 },
    { name: "Rabu", value: 30 },
    { name: "Kamis", value: 80 },
    { name: "Jumat", value: 60 },
    { name: "Sabtu", value: 50 },
    { name: "Minggu", value: 100 },
  ];
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm h-full">
      <h2 className="font-semibold text-lg mb-4">Sales Chart</h2>

      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
