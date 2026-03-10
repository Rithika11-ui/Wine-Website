import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const orderData = [
  { name: "Completed", value: 0, color: "#10B981" },
  { name: "Pending", value: 0, color: "#F59E0B" },
  { name: "In Progress", value: 0, color: "#3B82F6" },
  { name: "Cancelled", value: 0, color: "#EF4444" },
];

export const OrdersStatistics = () => {
  const totalOrders = 0;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Orders Statistics
        </h2>
        <p className="text-sm text-gray-500">
          Order status distribution
        </p>
      </div>

      <div className="border-t pt-6 flex flex-col items-center justify-center">
        <div className="relative w-full h-[260px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={orderData}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
              >
                {orderData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-gray-600 text-sm font-medium">
              Total Orders
            </p>
            <p className="text-2xl font-bold text-gray-800">
              {totalOrders}
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-6 mt-6 flex-wrap justify-center text-sm">
          {orderData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};