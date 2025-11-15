import React, { useState } from "react";
import { CheckCircle, XCircle, Eye, Building2, Mail, Phone, Globe, Calendar, MapPin, FileText, Award, Users,
   DollarSign, ShoppingCart, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import Sidebar from "./Sidebar";

interface Provider {
  _id: string;
  companyName: string;
  email: string;
  airlineCode: string;
  mobile: string;
  logoUrl?: string;
  registrationCertificateUrl?: string;
  insuranceProofUrl?: string;
  establishmentYear?: number;
  licenseExpiryDate?: Date;
  headquartersAddress?: string;
  countryOfOperation?: string;
  typeOfOperation?: string;
  websiteUrl?: string;
  ceoName?: string;
  officeContactNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isProfileComplete?: boolean;
}

interface AdminDashboardProps {
  pendingProviders: Provider[];
  onVerifyProvider: (providerId: string) => void;
  onRejectProvider: (providerId: string) => void;
  isLoading: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  pendingProviders,
  onVerifyProvider,
  onRejectProvider,
  isLoading,
}) => {
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [viewingDocument, setViewingDocument] = useState<string | null>(null);

  const toggleExpand = (providerId: string) => {
    setExpandedProvider(expandedProvider === providerId ? null : providerId);
  };

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
            <p className="text-orange-300 text-sm font-medium mb-1">Pending Verifications</p>
            <p className="text-4xl font-bold text-white">{pendingProviders.length}</p>
          </div>
        </div>

        {/* Charts and Top Providers Row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
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
            
            {/* Pie Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
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
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-3">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
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
            <div className="bg-white/10 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/20 mb-6 md:mb-8">
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
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={growthData}>
              <XAxis
                dataKey="month"
                stroke="#94a3b8"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                yAxisId="left"
                stroke="#3b82f6"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#10b981"
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="customers"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* REAL DATA - Provider Verification Section */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">
              Pending Verifications
            </h2>
            <div className="px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium">
              {pendingProviders.length} applications
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-300 text-lg">Loading providers...</p>
            </div>
          ) : pendingProviders.length === 0 ? (
            <div className="text-center py-16">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <p className="text-slate-300 text-lg">All caught up! No pending verifications</p>
            </div>
          ) : (
            <div className="space-y-6">
              {pendingProviders.map((provider) => (
                <div
                  key={provider._id}
                  onMouseEnter={() => setHoveredCard(provider._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 ${
                    hoveredCard === provider._id
                      ? "border-blue-400/50 shadow-2xl shadow-blue-500/20 scale-[1.02]"
                      : "border-white/10"
                  }`}
                >
                  {/* Basic Info - Always Visible */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {provider.logoUrl ? (
                          <img
                            src={provider.logoUrl}
                            alt={`${provider.companyName} logo`}
                            className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-400/30 shadow-lg"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center border-2 border-blue-400/30">
                            <Building2 className="w-10 h-10 text-white" />
                          </div>
                        )}
                        {provider.isProfileComplete && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                            <Award className="w-3 h-3 text-slate-900" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {provider.companyName}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold">
                            {provider.airlineCode}
                          </span>
                          {provider.countryOfOperation && (
                            <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-sm">
                              {provider.countryOfOperation}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleExpand(provider._id)}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-300 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <Eye className="w-4 h-4" />
                      {expandedProvider === provider._id ? "Show Less" : "View Details"}
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {expandedProvider === provider._id && (
                    <div className="border-t border-white/10 pt-6 space-y-6 animate-in fade-in slide-in-from-top duration-300">
                      {/* Contact Information */}
                      <div>
                        <h4 className="text-sm font-bold text-blue-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Contact Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                            <div className="flex items-center gap-2 mb-2">
                              <Mail className="w-4 h-4 text-slate-400" />
                              <p className="text-xs font-semibold text-slate-400 uppercase">Email</p>
                            </div>
                            <p className="text-sm text-white">{provider.email}</p>
                          </div>
                          <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                            <div className="flex items-center gap-2 mb-2">
                              <Phone className="w-4 h-4 text-slate-400" />
                              <p className="text-xs font-semibold text-slate-400 uppercase">Mobile</p>
                            </div>
                            <p className="text-sm text-white">{provider.mobile}</p>
                          </div>
                          {provider.officeContactNumber && (
                            <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                              <div className="flex items-center gap-2 mb-2">
                                <Building2 className="w-4 h-4 text-slate-400" />
                                <p className="text-xs font-semibold text-slate-400 uppercase">Office Contact</p>
                              </div>
                              <p className="text-sm text-white">{provider.officeContactNumber}</p>
                            </div>
                          )}
                          {provider.websiteUrl && (
                            <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                              <div className="flex items-center gap-2 mb-2">
                                <Globe className="w-4 h-4 text-slate-400" />
                                <p className="text-xs font-semibold text-slate-400 uppercase">Website</p>
                              </div>
                              <a 
                                href={provider.websiteUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                              >
                                {provider.websiteUrl}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Company Details */}
                      <div>
                        <h4 className="text-sm font-bold text-purple-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Company Details
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {provider.ceoName && (
                            <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">CEO Name</p>
                              <p className="text-sm text-white">{provider.ceoName}</p>
                            </div>
                          )}
                          {provider.establishmentYear && (
                            <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                <p className="text-xs font-semibold text-slate-400 uppercase">Established</p>
                              </div>
                              <p className="text-sm text-white">{provider.establishmentYear}</p>
                            </div>
                          )}
                          {provider.typeOfOperation && (
                            <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Operation Type</p>
                              <p className="text-sm text-white">{provider.typeOfOperation}</p>
                            </div>
                          )}
                          {provider.licenseExpiryDate && (
                            <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                              <div className="flex items-center gap-2 mb-2">
                                <FileText className="w-4 h-4 text-slate-400" />
                                <p className="text-xs font-semibold text-slate-400 uppercase">License Expiry</p>
                              </div>
                              <p className="text-sm text-white">
                                {new Date(provider.licenseExpiryDate).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Address */}
                      {provider.headquartersAddress && (
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <p className="text-xs font-semibold text-slate-400 uppercase">Headquarters Address</p>
                          </div>
                          <p className="text-sm text-white">{provider.headquartersAddress}</p>
                        </div>
                      )}

                      {/* Documents */}
                      
<div>
  <h4 className="text-sm font-bold text-green-300 uppercase tracking-wide mb-3 flex items-center gap-2">
    <FileText className="w-4 h-4" />
    Documents
  </h4>
  <div className="flex gap-3">
    {provider.registrationCertificateUrl && (
      <button
        onClick={() => setViewingDocument(provider.registrationCertificateUrl!)}
        className="flex items-center gap-2 px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/50"
      >
        <Eye className="w-4 h-4" />
        View Registration Certificate
      </button>
    )}
    {provider.insuranceProofUrl && (
      <button
        onClick={() => setViewingDocument(provider.insuranceProofUrl!)}
        className="flex items-center gap-2 px-5 py-3 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/50"
      >
        <Eye className="w-4 h-4" />
        View Insurance Proof
      </button>
    )}
  </div>
</div>

                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-6 pt-6 border-t border-white/10">
                    <button
                      onClick={() => onVerifyProvider(provider._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-105"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Verify Provider
                    </button>
                    <button
                      onClick={() => onRejectProvider(provider._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/50 hover:scale-105"
                    >
                      <XCircle className="w-5 h-5" />
                      Reject
                    </button>
                  </div>

                  
                </div>
              ))}
            </div>
          )}
        </div>

{/* PDF Viewer Modal */}
{/* PDF Viewer Modal */}
{viewingDocument && (
  <div 
    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
    onClick={() => setViewingDocument(null)}
  >
    <div 
      className="bg-slate-900 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl border border-white/20"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="text-xl font-bold text-white">Document Viewer</h3>
        <button
          onClick={() => setViewingDocument(null)}
          className="p-2 hover:bg-white/10 rounded-lg"
        >
          <XCircle className="w-5 h-5 text-slate-400" />
        </button>
      </div>
      
      {/* PDF Viewer */}
      <div className="flex-1 overflow-hidden p-3">
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(viewingDocument)}&embedded=true`}
          className="w-full h-full bg-white rounded"
          title="Document Viewer"
        />
      </div>
      
      {/* Modal Footer */}
      <div className="p-4 border-t border-white/10 text-center">
        <button
          onClick={() => setViewingDocument(null)}
          className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default AdminDashboard;
