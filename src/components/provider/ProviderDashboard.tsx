import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Wallet, BookOpen, AlertCircle, CheckCircle, Edit3, Lock, Globe, Phone, Mail, MapPin } from 'lucide-react';
import useProviderDashboard from '../../hooks/provider/useProviderDashboard';
import useChangePassword from '../../hooks/user/useChangePassword';

// Importing your custom component directly
import ChangePasswordModal from '../user-authentication/ChangePasswordModal';

const ProviderDashboard: React.FC = () => {
  const { provider, isLoading, goToBookings, goToWallet } = useProviderDashboard();
  const navigate = useNavigate();

  /* ── Change Password Modal Local State ── */
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { formik: passwordFormik } = useChangePassword(() => setIsChangingPassword(false));

  const openChangePassword = () => setIsChangingPassword(true);
  const closeChangePassword = () => {
    passwordFormik.resetForm();
    setIsChangingPassword(false);
  };

  if (isLoading && !provider) {
    return (
      <div className="flex items-center justify-center py-24 w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#0a3a8a]" />
      </div>
    );
  }

  const isRejected = provider?.profileStatus === 'rejected';

  return (
    <div className="w-full relative">
      
      {/* ── Hero Strip ── */}
      <div className="bg-[#0a3a8a] text-white px-4 sm:px-8 py-8 rounded-2xl mx-4 sm:mx-8 mt-6 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
            {provider?.logoUrl ? (
              <img src={provider.logoUrl} alt="logo" className="h-14 object-contain" />
            ) : (
              <Plane className="w-9 h-9 text-[#0a3a8a]" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold truncate">
                {provider?.companyName ?? 'Provider Name'}
              </h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex-shrink-0 ${
                isRejected ? 'bg-red-500/20 text-red-200 border border-red-400/40' : provider?.isActive ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/40' : 'bg-amber-500/20 text-amber-200 border border-amber-400/40'
              }`}>
                {isRejected ? 'Rejected' : provider?.isActive ? 'Active' : 'Blocked'}
              </span>
            </div>
            <p className="text-blue-200 text-sm font-mono">{provider?.airlineCode} · {provider?.countryOfOperation}</p>
          </div>

          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={() => navigate('/provider/complete-profile')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition border ${
                isRejected ? 'bg-orange-500 text-white border-orange-400 hover:bg-orange-600' : 'bg-white text-[#0a3a8a] border-white hover:bg-blue-50'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              {isRejected ? 'Reapply' : 'Edit Profile'}
            </button>
            <button
              onClick={openChangePassword}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition border border-white/30 text-white hover:bg-white/10 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">Change Password</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Workspace Body Elements ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 space-y-6">
        {isRejected && provider?.rejectionReason && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex gap-4 shadow-sm">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 font-semibold text-sm mb-1">Application Rejected</p>
              <p className="text-red-600 text-sm italic">"{provider.rejectionReason}"</p>
            </div>
          </div>
        )}

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Scheduled Flights', value: '45', icon: <Plane className="w-5 h-5" />, color: 'text-[#0a3a8a] bg-blue-50' },
            { label: 'Aircrafts', value: '12', icon: <CheckCircle className="w-5 h-5" />, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'My Bookings', value: '—', icon: <BookOpen className="w-5 h-5" />, color: 'text-purple-600 bg-purple-50', onClick: goToBookings },
            { label: 'Wallet', value: '—', icon: <Wallet className="w-5 h-5" />, color: 'text-amber-600 bg-amber-50', onClick: goToWallet },
          ].map(({ label, value, icon, color, onClick }) => (
            <div key={label} onClick={onClick} className={`bg-white border border-gray-200 rounded-2xl shadow-xs p-5 flex flex-col gap-3 ${onClick ? 'cursor-pointer hover:shadow-md hover:border-gray-300 transition-all' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-600 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Profile Info Details Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xs p-6">
          <h2 className="text-gray-900 font-bold text-base mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#0a3a8a] rounded-full inline-block" />
            Company Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Mail className="w-4 h-4" />, label: 'Email', value: provider?.email ?? 'N/A' },
              { icon: <Phone className="w-4 h-4" />, label: 'Phone', value: provider?.mobile ?? 'N/A' },
              { icon: <Globe className="w-4 h-4" />, label: 'Website', value: provider?.websiteUrl ?? 'N/A' },
              { icon: <MapPin className="w-4 h-4" />, label: 'Country of Operation', value: provider?.countryOfOperation ?? '—' },
              { icon: <Plane className="w-4 h-4" />, label: 'Airline Code', value: provider?.airlineCode ?? '—' },
              { icon: <CheckCircle className="w-4 h-4" />, label: 'Status', value: provider?.isActive ? 'Active' : 'Blocked' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-[#0a3a8a] mt-0.5">{icon}</div>
                <div className="min-w-0">
                  <p className="text-gray-600 text-xs uppercase tracking-wider">{label}</p>
                  <p className="text-gray-900 font-semibold text-sm truncate mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Renders your standalone component here when clicked ── */}
      {isChangingPassword && (
        <ChangePasswordModal formik={passwordFormik} onClose={closeChangePassword} />
      )}

    </div>
  );
};

export default ProviderDashboard;