import React from 'react';
import ProviderHeaderLayout from './ProviderHeaderLayout';
import ProviderSidebarLayout from './ProviderSidebarLayout';

interface ProviderMainLayoutProps {
  children: React.ReactNode;
}

const ProviderMainLayout: React.FC<ProviderMainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <ProviderHeaderLayout />
      
      {/* Sidebar + Main Content */}
      <div className="flex">
        <ProviderSidebarLayout />
        
        {/* Main Content Area */}
        <main className="flex-1 p-4  overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProviderMainLayout;
