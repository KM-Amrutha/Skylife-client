import React from "react";
import {
  Building2,
  Users,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip,
} from "recharts";
import Sidebar from "./Sidebar";
import useAdminDashboard from "../../hooks/admin/useAdminDashboard";



const AdminDashboard: React.FC = () => {
  const {
   
    dashboardStats,
    isLoadingDashboard,
  } = useAdminDashboard()

  const pieData = [
    {
      name: "Total Bookings",
      value: dashboardStats?.totalConfirmedBookings ?? 0,
      color: "#3b82f6",
    },
    {
      name: "Total Revenue",
      value: dashboardStats?.totalRevenue ?? 0,
      color: "#8b5cf6",
    },
    {
      name: "Commission",
      value: dashboardStats?.totalCommission ?? 0,
      color: "#06b6d4",
    },
  ];

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <Sidebar />

      <div className="flex-1 p-4 md:p-8 pt-20 lg:pt-8 relative z-10 overflow-y-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skylife Admin Dashboard
          </h1>
          <p className="text-slate-400 text-sm md:text-lg">
            Complete Business Overview Dashboard
          </p>
        </div>

        {isLoadingDashboard ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl border border-blue-400/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-500/30 rounded-xl">
                    <Building2 className="w-6 h-6 text-blue-300" />
                  </div>
                </div>
                <p className="text-blue-300 text-sm font-medium mb-1">
                  Total Providers
                </p>
                <p className="text-4xl font-bold text-white">
                  {dashboardStats?.totalProviders ?? 0}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-500/30 rounded-xl">
                    <Users className="w-6 h-6 text-purple-300" />
                  </div>
                </div>
                <p className="text-purple-300 text-sm font-medium mb-1">
                  Total Users
                </p>
                <p className="text-4xl font-bold text-white">
                  {dashboardStats?.totalUsers ?? 0}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-xl border border-green-400/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-500/30 rounded-xl">
                    <DollarSign className="w-6 h-6 text-green-300" />
                  </div>
                </div>
                <p className="text-green-300 text-sm font-medium mb-1">
                  Total Revenue
                </p>
                <p className="text-4xl font-bold text-white">
                  {formatCurrency(dashboardStats?.totalRevenue ?? 0)}
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-xl border border-orange-400/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-500/30 rounded-xl">
                    <ShoppingCart className="w-6 h-6 text-orange-300" />
                  </div>
                </div>
                <p className="text-orange-300 text-sm font-medium mb-1">
                  Confirmed Bookings
                </p>
                <p className="text-4xl font-bold text-white">
                  {dashboardStats?.totalConfirmedBookings ?? 0}
                </p>
              </div>
            </div>

            {/* Commission Card */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6 mb-6 hover:scale-[1.01] transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-300 text-sm font-medium mb-1">
                    Total Commission Earned
                  </p>
                  <p className="text-4xl font-bold text-white">
                    {formatCurrency(dashboardStats?.totalCommission ?? 0)}
                  </p>
                </div>
                <div className="p-4 bg-cyan-500/30 rounded-xl">
                  <DollarSign className="w-8 h-8 text-cyan-300" />
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Analytics Pie */}
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Business Analytics
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 23, 42, 0.9)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <p className="text-xs text-slate-400">{item.name}</p>
                        <p className="text-sm font-bold text-white">
                          {typeof item.value === "number" && item.name !== "Total Bookings"
                            ? formatCurrency(item.value)
                            : item.value.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Bookings Chart */}
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Monthly Bookings
                </h3>
                {dashboardStats?.monthlyStats &&
                dashboardStats.monthlyStats.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dashboardStats.monthlyStats}>
                      <XAxis
                        dataKey="month"
                        stroke="#94a3b8"
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis stroke="#3b82f6" style={{ fontSize: "12px" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(15, 23, 42, 0.9)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "12px",
                          color: "#fff",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="bookings"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: "#3b82f6", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-64">
                    <p className="text-slate-400 text-sm">
                      No booking data yet
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Growth Chart */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Revenue Trends
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm text-slate-300">Revenue (₹)</span>
                </div>
              </div>
              {dashboardStats?.monthlyStats &&
              dashboardStats.monthlyStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dashboardStats.monthlyStats}>
                    <XAxis
                      dataKey="month"
                      stroke="#94a3b8"
                      style={{ fontSize: "12px" }}
                    />
                    <YAxis stroke="#10b981" style={{ fontSize: "12px" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 23, 42, 0.9)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                      formatter={(value: number) => [
                        formatCurrency(value),
                        "Revenue",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: "#10b981", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-slate-400 text-sm">No revenue data yet</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;