import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Provider } from '../../redux/auth/authTypes';

interface ProviderDashboardProps {
  provider: Provider | null;
  isLoading: boolean;
}

const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ 
  provider, 
  isLoading 
}) => {
  const navigate = useNavigate();

  if (isLoading && !provider) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div 
      className="relative rounded-2xl overflow-hidden"
      style={{
        backgroundImage: 'url(/image/airplane-sunset.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '550px'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 to-blue-900/60" />
      
      {/* Content */}
      <div className="relative p-8 text-white">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-12">Dashboard</h1>
        
        {/* Two Column Layout */}
        <div className="flex gap-12 items-start justify-between">
          {/* Left Column - Logo & Details */}
          <div className="flex-1">
            {/* Logo */}
            {provider?.logoUrl && (
              <div className="bg-white p-6 rounded-lg mb-6 inline-block">
                <img 
                  src={provider.logoUrl} 
                  alt="Provider Logo"
                  className="h-24"
                />
              </div>
            )}
            
            {/* Company Name */}
            <h2 className="text-3xl font-bold text-red-400 mb-6">
              {provider?.companyName || 'Provider Name'}
            </h2>
            
            {/* Provider Details */}
            <div className="space-y-2 text-sm leading-relaxed">
              {/* <p>
                <span className="font-semibold">Provider Id:</span> {provider?._id?.slice(-5) || 'N/A'}
              </p> */}
              <p>
                <span className="font-semibold">Airline Code :</span> {provider?.airlineCode || '-'}
              </p>
              <p>
                <span className="font-semibold">Email :</span> {provider?.email || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Phone :</span> {provider?.mobile || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Website Url :</span> {provider?.websiteUrl || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Status :</span> {provider?.isActive ? 'Active' : 'Blocked'}
              </p>
              <p>
                <span className="font-semibold">Country of Operation :</span> {provider?.countryOfOperation || '-'}
              </p>
            </div>
            
            {/* Edit Profile Button */}
            <button
              onClick={() => navigate('/provider/complete-profile')}
              className="mt-8 bg-[#00001F] text-white px-8 py-2 rounded-full text-sm font-medium hover:bg-blue-900 transition-colors"
            >
              Edit Profile
            </button>
          </div>
          
          {/* Right Column - Stats */}
          <div className="flex-1 flex flex-col justify-center items-end gap-6">
            {/* Scheduled Flights */}
            <div className="bg-[#00001F]/80 rounded-full px-8 py-4 text-center min-w-[200px] backdrop-blur">
              <p className="text-3xl font-bold">45</p>
              <p className="text-sm">Scheduled Flights</p>
            </div>
            
            {/* Crew Members */}
            <div className="bg-[#00001F]/80 rounded-full px-8 py-4 text-center min-w-[200px] backdrop-blur">
              <p className="text-3xl font-bold">27</p>
              <p className="text-sm">Crew Members</p>
            </div>
            
            {/* Aircrafts */}
            <div className="bg-[#00001F]/80 rounded-full px-8 py-4 text-center min-w-[200px] backdrop-blur">
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm">Aircrafts</p>
            </div>
            
            {/* Monthly Bookings */}
            <div className="bg-[#00001F]/80 rounded-full px-8 py-4 text-center min-w-[200px] backdrop-blur">
              <p className="text-3xl font-bold">16</p>
              <p className="text-sm">Monthly Bookings</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4 mt-4">
              <button className="bg-[#00001F]/80 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-900 transition-colors backdrop-blur">
                Edit Aircraft
              </button>
              <button className="bg-[#00001F]/80 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-900 transition-colors backdrop-blur">
                Wallets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
