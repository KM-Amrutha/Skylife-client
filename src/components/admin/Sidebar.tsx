import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { signOutUser } from "../../redux/auth/authThunk";
import { Menu, X } from "lucide-react";
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
      localStorage.removeItem("accessToken");
      showSuccessToast("Signed out successfully");
      navigate("/sign-in");
    } catch (error: any) {
      showErrorToast(error || "Failed to sign out");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 rounded-lg border border-slate-700"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-slate-900 border-r border-slate-700 p-6
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">Skylife</h2>
          <p className="text-slate-400 text-sm">Admin Panel</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-semibold">{item.name}</span>
            </button>
          ))}

          {/* Sign out as button — not a nav item */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-red-400 hover:bg-red-500/10"
          >
            <span className="text-2xl">🚪</span>
            <span className="font-semibold">Sign out</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;