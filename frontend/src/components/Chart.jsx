import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", price: 1.1 },
  { name: "Feb", price: 1.2 },
  { name: "Mar", price: 1.15 },
];

export default function Chart({ title }) {
  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#3B82F6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
