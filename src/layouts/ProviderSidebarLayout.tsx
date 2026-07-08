import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Plane, 
  CalendarDays, 
  Utensils, 
  Percent, 
  Package, 
  Wallet, 
  Menu, 
  X 
} from "lucide-react";

const ProviderSidebarLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Keeps your white layout but injects distinct vibrant colors into the icons
  const menuItems = [
    { name: 'Dashboard', path: '/provider/dashboard', icon: LayoutDashboard, color: 'text-pink-500 bg-pink-50' },
    { name: 'Add Aircraft', path: '/provider/add-aircraft', icon: PlusCircle, color: 'text-emerald-600 bg-emerald-50' },
    { name: 'Aircraft List', path: '/provider/aircraft-list', icon: Plane, color: 'text-cyan-600 bg-cyan-50' }, 
    { name: 'Schedule Aircraft', path: '/provider/add-flight', icon: CalendarDays, color: 'text-indigo-600 bg-indigo-50' },
    { name: 'Flight List', path: '/provider/flight-list', icon: Plane, color: 'text-sky-600 bg-sky-50' }, 
    { name: 'Food & Beverages', path: '/provider/food-list', icon: Utensils, color: 'text-amber-600 bg-amber-50' },
    { name: 'Offers', path: '/provider/offer-list', icon: Percent, color: 'text-violet-600 bg-violet-50' },
    { name: 'Bookings', path: '/provider/bookings', icon: Package, color: 'text-orange-600 bg-orange-50' },
    { name: 'Wallets', path: '/provider/wallet', icon: Wallet, color: 'text-rose-600 bg-rose-50' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white border border-gray-200 text-gray-700 p-2.5 rounded-xl shadow-sm hover:bg-gray-50 transition-all"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Backdrop Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40 animate-in fade-in duration-150"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Back to the clean white/gray base layout style */}
      <aside
        className={`
          w-64 bg-white text-gray-900 min-h-screen pt-6 border-r border-gray-200
          fixed lg:static top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Skylife Brand Section */}
        <div className="px-6 mb-6">
          <span className="text-xl font-bold tracking-tight bg-linear-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            Skylife Portal
          </span>
        </div>

        <nav>
          <ul className="space-y-1.5 px-3">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.path);
              
              return (
                <li key={item.path}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 text-sm font-semibold transition-all rounded-xl flex items-center gap-3 group ${
                      active
                        ? 'bg-blue-50/70 text-blue-700 border-l-4 border-blue-600 rounded-l-none pl-2'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {/* Vibrant dynamic colored block wrapper for the icon inside your clean UI */}
                    <div className={`p-2 rounded-xl transition-transform duration-200 group-hover:scale-105 shrink-0 ${item.color}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    
                    <span className="truncate">{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default ProviderSidebarLayout;