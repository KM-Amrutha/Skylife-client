import React from "react";
import {
  Building2,
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  BarChart3
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
  } = useAdminDashboard();

  const pieData = [
    {
      name: "Total Bookings",
      value: dashboardStats?.totalConfirmedBookings ?? 0,
      color: "#0a3a8a", // Brand Deep Blue
    },
    {
      name: "Total Revenue",
      value: dashboardStats?.totalRevenue ?? 0,
      color: "#10b981", // Emerald Green
    },
    {
      name: "Commission",
      value: dashboardStats?.totalCommission ?? 0,
      color: "#06b6d4", // Cyan
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
    <div className="flex min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-100 text-gray-900">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 pt-20 lg:pt-8 overflow-y-auto">
        {/* Header Section */}
       <div className="bg-[#0a3a8a] text-white px-6 py-8 rounded-2xl mt-4 mb-6 shadow-xs">
  <div className="flex items-center gap-5">
    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
      <svg className="w-6 h-6 text-[#0a3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    </div>
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold">Skylife Admin Dashboard</h1>
      <p className="text-blue-200 text-sm mt-1">Complete Business Overview Dashboard</p>
    </div>
  </div>
</div>

        {isLoadingDashboard ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-[#0a3a8a] rounded-full animate-spin" />
            <p className="text-gray-700 text-sm">Loading dashboard data...</p>
          </div>
        ) : (
          <>
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
              {/* Total Providers */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-gray-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">
                      Total Providers
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboardStats?.totalProviders ?? 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-[#0a3a8a]" />
                  </div>
                </div>
              </div>

              {/* Total Users */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-gray-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">
                      Total Users
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboardStats?.totalUsers ?? 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-[#0a3a8a]" />
                  </div>
                </div>
              </div>

              {/* Total Revenue */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-gray-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">
                      Total Revenue
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatCurrency(dashboardStats?.totalRevenue ?? 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </div>

              {/* Confirmed Bookings */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-gray-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">
                      Confirmed Bookings
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboardStats?.totalConfirmedBookings ?? 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                    <ShoppingCart className="w-6 h-6 text-[#0a3a8a]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Commission Banner Card */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-8 flex items-center justify-between transition-all duration-200 hover:shadow-md hover:border-gray-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-7 h-7 text-cyan-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-xs uppercase tracking-wider mb-0.5">
                    Total Commission Earned
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(dashboardStats?.totalCommission ?? 0)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Platform Earnings Only</span>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Analytics Pie */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Business Analytics
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={100}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                        color: "#111827",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Custom Legends */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 min-w-0">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-600 truncate">{item.name}</p>
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {typeof item.value === "number" && item.name !== "Total Bookings"
                            ? formatCurrency(item.value)
                            : item.value.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Bookings Line Chart */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Monthly Bookings
                </h3>
                {dashboardStats?.monthlyStats && dashboardStats.monthlyStats.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dashboardStats.monthlyStats}>
                      <XAxis
                        dataKey="month"
                        stroke="#6b7280"
                        style={{ fontSize: "12px" }}
                        tickLine={false}
                      />
                      <YAxis 
                        stroke="#0a3a8a" 
                        style={{ fontSize: "12px" }} 
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="bookings"
                        stroke="#0a3a8a"
                        strokeWidth={3}
                        dot={{ fill: "#0a3a8a", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-300 rounded-2xl">
                    <p className="text-gray-600 text-sm">No booking data yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Revenue Trends Chart */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Revenue Trends
                </h3>
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                  <span className="text-xs font-medium text-emerald-800">Revenue (₹)</span>
                </div>
              </div>
              {dashboardStats?.monthlyStats && dashboardStats.monthlyStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dashboardStats.monthlyStats}>
                    <XAxis
                      dataKey="month"
                      stroke="#6b7280"
                      style={{ fontSize: "12px" }}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#10b981" 
                      style={{ fontSize: "12px" }} 
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
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
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-300 rounded-2xl">
                  <p className="text-gray-600 text-sm">No revenue data yet</p>
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