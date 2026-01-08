import React from "react";
import Sidebar from "../components/admin/Sidebar"; 

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <Sidebar />

      <div className="flex-1 p-4 md:p-8 pt-20 lg:pt-8 relative z-10 overflow-y-auto">
        {title && (
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-slate-400 text-sm md:text-lg">Skylife Admin Panel</p>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default AdminLayout;