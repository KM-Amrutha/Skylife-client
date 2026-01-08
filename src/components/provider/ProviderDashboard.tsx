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

  const isRejected = provider?.profileStatus === 'rejected';

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

        {/* NEW: Rejection Banner */}
        {isRejected && provider?.rejectionReason && (
          <div className="mb-8 p-6 bg-red-600/30 backdrop-blur-md border border-red-500/50 rounded-2xl text-center max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-red-300 mb-3">
              Application Rejected
            </h3>
            <p className="text-lg mb-4">
              <span className="font-semibold">Reason:</span>
            </p>
            <p className="text-base italic leading-relaxed bg-red-900/30 p-4 rounded-xl">
              "{provider.rejectionReason}"
            </p>
            <p className="mt-4 text-sm">
              Please review the feedback, make the necessary changes, and reapply.
            </p>
          </div>
        )}

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
            
            {/* Edit Profile / Reapply Button */}
            <button
              onClick={() => navigate('/provider/complete-profile')}
              className={`mt-8 px-8 py-3 rounded-full text-sm font-medium transition-colors ${
                isRejected
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg hover:shadow-red-500/50'
                  : 'bg-[#00001F] hover:bg-blue-900'
              }`}
            >
              {isRejected ? 'Reapply Now' : 'Edit Profile'}
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