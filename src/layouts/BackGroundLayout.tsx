import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const BackGroundLayout = ({ children } : AuthLayoutProps) => {
  return (
    <div className="relative min-h-screen bg-[#000D2B]">  
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackGroundLayout;
