import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProviderSidebarLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/provider/dashboard', icon: '📊' },
    { name: 'Add aircraft', path: '/provider/add-aircraft', icon: '➕' },
    // { name: 'Aircraft List', path: '/provider/aircraft-list', icon: '✈️' }, 
    { name: 'Scheduled Aircraft', path: '/provider/scheduled-aircraft', icon: '✈️' },
    { name: 'Food & Beverages', path: '/provider/food-beverages', icon: '🍔' },
    { name: 'Offers', path: '/provider/offers', icon: '🎁' },
    { name: 'Orders', path: '/provider/orders', icon: '📦' },
    { name: 'Wallets', path: '/provider/wallets', icon: '💳' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          w-56 bg-[#00001F] text-white min-h-screen pt-6 border-r border-gray-700
          fixed lg:static top-0 left-0 z-40 transform transition-transform duration-300
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <nav>
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors rounded-lg flex items-center gap-3 ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default ProviderSidebarLayout;
