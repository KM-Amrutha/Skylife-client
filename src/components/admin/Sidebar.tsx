import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { signOutUser } from "../../redux/auth/authThunk";
import { Menu, X, LogOut } from "lucide-react";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Pending Providers", path: "/admin/pending-providers", icon: "✈️" },
    { name: "Pending Flights", path: "/admin/pending-flights", icon: "🛫" },
    { name: "Flights", path: "/admin/flights", icon: "🛬" },
    { name: "Providers", path: "/admin/providers", icon: "🏢" },
    { name: "Users", path: "/admin/users", icon: "👥" },
    { name: "Wallet", path: "/admin/wallet", icon: "💰" },
  ];

  const handleSignOut = async () => {
    try {
      await dispatch(signOutUser()).unwrap();
      showSuccessToast("Signed out successfully");
      navigate("/sign-in");
    } catch (error: any) {
      showErrorToast(error || "Failed to sign out");
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg border border-gray-200 shadow-sm"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-900" />
        ) : (
          <Menu className="w-6 h-6 text-gray-900" />
        )}
      </button>

      {/* Backdrop overlay for mobile layout */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div>
          {/* Header Branding */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Skylife</h2>
            <p className="text-gray-600 text-xs uppercase tracking-wider font-semibold mt-0.5">
              Admin Panel
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-left ${
                    isActive
                      ? "bg-blue-50 text-[#0a3a8a] font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <span className="truncate">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions / Sign Out */}
        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-left text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="font-bold">Sign out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;