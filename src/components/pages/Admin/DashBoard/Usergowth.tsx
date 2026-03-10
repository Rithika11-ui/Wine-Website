// DashboardContent.jsx

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, AlertTriangle, Star } from "lucide-react";

const chartData = [
  { name: "Wed", newUsers: 0, activeUsers: 0 },
  { name: "Thu", newUsers: 0, activeUsers: 0 },
  { name: "Fri", newUsers: 0, activeUsers: 0 },
  { name: "Sat", newUsers: 0, activeUsers: 0 },
  { name: "Sun", newUsers: 0, activeUsers: 0 },
  { name: "Mon", newUsers: 0, activeUsers: 0 },
  { name: "Tue", newUsers: 0, activeUsers: 0 },
];

const customers = [
  { name: "phe rithika", email: "user1@gmail.com" },
  { name: "Gang", email: "gang@gmail.com" },
  { name: "xeng", email: "xeng@gmail.com" },
  { name: "Admin User", email: "admin@gmail.com" },
];

const DashboardContent = () => {
  return (
    <div className="space-y-6">

      {/* User Growth */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">User Growth</h2>
            <p className="text-sm text-gray-500">
              New user registrations over time
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <span className="text-blue-500">● New Users</span>
            <span className="text-green-500">● Active Users</span>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="newUsers"
                stroke="#3B82F6"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="activeUsers"
                stroke="#22C55E"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Top Selling Products */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold flex items-center gap-2">
              <Star size={18} className="text-yellow-500" />
              Top Selling Products
            </h3>
            <button className="text-blue-500 text-sm">View All →</button>
          </div>

          <div className="flex items-center justify-center h-40 text-gray-400">
            No sales data yet
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-red-500">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertTriangle size={18} className="text-red-500" />
              Low Stock Alert
            </h3>
            <button className="text-blue-500 text-sm">Manage →</button>
          </div>

          <div className="flex flex-col items-center justify-center h-40 text-green-600">
            <span className="text-xl">✔</span>
            <p>All products well stocked!</p>
          </div>
        </div>

        {/* New Customers */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold flex items-center gap-2">
              <Users size={18} className="text-blue-500" />
              New Customers
            </h3>
            <button className="text-blue-500 text-sm">View All →</button>
          </div>

          <div className="space-y-4">
            {customers.map((customer, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold">
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{customer.name}</p>
                    <p className="text-xs text-gray-500">
                      {customer.email}
                    </p>
                  </div>
                </div>
                <button className="text-gray-400">⋮</button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardContent;