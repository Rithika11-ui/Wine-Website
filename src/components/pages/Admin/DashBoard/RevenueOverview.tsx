import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Oct", revenue: 0 },
  { month: "Nov", revenue: 0 },
  { month: "Dec", revenue: 0 },
  { month: "Jan", revenue: 0 },
  { month: "Feb", revenue: 0 },
  { month: "Mar", revenue: 0 },
];

export const RevenueOverview = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm w-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Revenue Overview
          </h2>
          <p className="text-sm text-gray-500">
            Monthly revenue for the last 6 months
          </p>
        </div>

        <select className="border rounded-xl px-4 py-2 text-sm text-gray-600 bg-gray-50 focus:outline-none">
            <option>Last Year</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>Last 9 Months</option>
            <option>Last 12 Months</option>
            <option>This Year</option>

        </select>
      </div>

      <div className="border-t pt-6">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#6366F1"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};