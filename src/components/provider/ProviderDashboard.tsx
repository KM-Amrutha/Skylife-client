import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Provider } from '../../redux/auth/authTypes';

interface ProviderDashboardProps {
  provider: Provider | null;
  isLoading: boolean;
  onChangePasswordClick: () => void;
}

const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ 
  provider, 
  isLoading ,
  onChangePasswordClick
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
   <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#1a0b45] via-[#140533] to-[#0f0228] shadow-[0_12px_40px_rgba(0,0,0,0.35)] overflow-hidden">
  <div className="p-8 md:p-10 text-white">
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
    {provider?.logoUrl && (
      <div className="bg-white p-6 rounded-lg mb-6 inline-block">
        <img 
          src={provider.logoUrl} 
          alt="Provider Logo"
          className="h-24"
        />
      </div>
    )}
    
    <h2 className="text-3xl font-bold text-red-400 mb-6">
      {provider?.companyName || 'Provider Name'}
    </h2>
    
    <div className="space-y-2 text-sm leading-relaxed">
      <p><span className="font-semibold">Airline Code :</span> {provider?.airlineCode || '-'}</p>
      <p><span className="font-semibold">Email :</span> {provider?.email || 'N/A'}</p>
      <p><span className="font-semibold">Phone :</span> {provider?.mobile || 'N/A'}</p>
      <p><span className="font-semibold">Website Url :</span> {provider?.websiteUrl || 'N/A'}</p>
      <p><span className="font-semibold">Status :</span> {provider?.isActive ? 'Active' : 'Blocked'}</p>
      <p><span className="font-semibold">Country of Operation :</span> {provider?.countryOfOperation || '-'}</p>
    </div>
    
    <div className="mt-8 flex flex-col items-start gap-3">
      <button
        onClick={() => navigate('/provider/complete-profile')}
        className={`w-40 text-sm px-5 py-2.5 rounded-lg border transition font-medium ${
          isRejected
            ? 'bg-orange-500/20 text-orange-300 border-orange-400/30 hover:bg-orange-500/30'
            : 'bg-blue-500/20 text-blue-300 border-blue-400/30 hover:bg-blue-500/30'
        }`}
      >
        {isRejected ? 'Reapply Now' : 'Edit Profile'}
      </button>

      <button
        onClick={onChangePasswordClick}
        className="w-40 text-sm px-5 py-2.5 rounded-lg border transition font-medium bg-blue-500/20 text-blue-300 border-blue-400/30 hover:bg-blue-500/30"
      >
        Change Password
      </button>
    </div>
  </div>

  {/* Right Column - Stats */}
  <div className="flex-1 flex flex-col justify-center items-end gap-6">
    <div className="bg-[#201042]/70 rounded-full px-8 py-4 text-center min-w-[200px]">
      <p className="text-3xl font-bold">45</p>
      <p className="text-sm">Scheduled Flights</p>
    </div>

    <div className="bg-[#201042]/70 rounded-full px-8 py-4 text-center min-w-[200px]">
      <p className="text-3xl font-bold">27</p>
      <p className="text-sm">Crew Members</p>
    </div>

    <div className="bg-[#201042]/70 rounded-full px-8 py-4 text-center min-w-[200px]">
      <p className="text-3xl font-bold">12</p>
      <p className="text-sm">Aircrafts</p>
    </div>

    <div className="bg-[#201042]/70 rounded-full px-8 py-4 text-center min-w-[200px]">
      <p className="text-3xl font-bold">16</p>
      <p className="text-sm">Monthly Bookings</p>
    </div>

    <div className="bg-[#201042]/70 rounded-full px-8 py-4 text-center min-w-[200px]">
      <p className="text-sm">Wallet</p>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default ProviderDashboard;