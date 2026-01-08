import React from "react";
import { 
  Building2, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";

import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import Sidebar from "./Sidebar";

const AdminDashboard: React.FC = () => {
  // Mock data for top providers
  const topProviders = [
    { name: "AeroSwift Airlines", revenue: 2450000, growth: 12.5 },
    { name: "Pacific Wings", revenue: 1890000, growth: 8.3 },
    { name: "SkyLink Express", revenue: 1650000, growth: -2.1 },
    { name: "Global Air Services", revenue: 1420000, growth: 15.7 },
    { name: "Swift Cargo", revenue: 1180000, growth: 5.4 },
  ];

  // Mock data for pie chart
  const pieData = [
    { name: "Total Orders", value: 1247, color: "#3b82f6" },
    { name: "Customer Growth", value: 892, color: "#8b5cf6" },
    { name: "New Bookings", value: 654, color: "#06b6d4" },
    { name: "Cancellations", value: 123, color: "#ef4444" },
  ];

  // Mock data for growth chart
  const growthData = [
    { month: "Jan", customers: 420, revenue: 180000 },
    { month: "Feb", customers: 510, revenue: 220000 },
    { month: "Mar", customers: 680, revenue: 290000 },
    { month: "Apr", customers: 750, revenue: 340000 },
    { month: "May", customers: 920, revenue: 410000 },
    { month: "Jun", customers: 1150, revenue: 520000 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <Sidebar />

      <div className="flex-1 p-4 md:p-8 pt-20 lg:pt-8 relative z-10 overflow-y-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skylife Admin Dashboard
          </h1>
          <p className="text-slate-400 text-sm md:text-lg">Complete Business Overview Dashboard</p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl border border-blue-400/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/30 rounded-xl">
                <Building2 className="w-6 h-6 text-blue-300" />
              </div>
              <span className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                <ArrowUpRight className="w-4 h-4" />
                8.2%
              </span>
            </div>
            <p className="text-blue-300 text-sm font-medium mb-1">Total Providers</p>
            <p className="text-4xl font-bold text-white">248</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/30 rounded-xl">
                <Users className="w-6 h-6 text-purple-300" />
              </div>
              <span className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                <ArrowUpRight className="w-4 h-4" />
                12.5%
              </span>
            </div>
            <p className="text-purple-300 text-sm font-medium mb-1">Total Customers</p>
            <p className="text-4xl font-bold text-white">15.2K</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-xl border border-green-400/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/30 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-300" />
              </div>
              <span className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                <ArrowUpRight className="w-4 h-4" />
                15.3%
              </span>
            </div>
            <p className="text-green-300 text-sm font-medium mb-1">Total Revenue</p>
            <p className="text-4xl font-bold text-white">$8.4M</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-xl border border-orange-400/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/30 rounded-xl">
                <ShoppingCart className="w-6 h-6 text-orange-300" />
              </div>
              <span className="flex items-center gap-1 text-red-400 text-sm font-semibold">
                <ArrowDownRight className="w-4 h-4" />
                2.1%
              </span>
            </div>
            <p className="text-orange-300 text-sm font-medium mb-1">Active Bookings</p>
            <p className="text-4xl font-bold text-white">1,247</p>
          </div>
        </div>

        {/* Charts and Top Providers Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Providers by Revenue */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Top Providers</h3>
              <div className="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-xs font-semibold">
                By Revenue
              </div>
            </div>
            <div className="space-y-4">
              {topProviders.map((provider, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{provider.name}</p>
                        <p className="text-slate-400 text-sm">{formatCurrency(provider.revenue)}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-semibold ${provider.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {provider.growth >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      {Math.abs(provider.growth)}%
                    </div>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${(provider.revenue / topProviders[0].revenue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Overview */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Business Analytics</h3>
            
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
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400">{item.name}</p>
                    <p className="text-sm font-bold text-white">{item.value.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Growth Trends</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-slate-300">Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-300">Revenue</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis yAxisId="left" stroke="#3b82f6" style={{ fontSize: '12px' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Line yAxisId="left" type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;