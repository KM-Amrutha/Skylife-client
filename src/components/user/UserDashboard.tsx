import React from 'react';
import { User } from '../../redux/auth/authTypes';

interface UserDashboardProps {
  user: User | null;
  isLoading: boolean;
  onEditClick: () => void;
  onChangePasswordClick: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, isLoading, onEditClick,onChangePasswordClick }) => {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <p className="text-white/50 mt-1 text-sm">Manage your profile and bookings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Profile Card */}
          <div className="lg:col-span-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center gap-4">

            {/* Avatar */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 bg-white/20 flex items-center justify-center">
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold text-white">
                  {user?.firstName?.[0]?.toUpperCase() ?? '?'}
                </span>
              )}
            </div>

            {/* Name + Email */}
            <div>
              <h2 className="text-xl font-bold">
                {user?.firstName ? `${user.firstName} ${user.lastName}` : 'Not set'}
              </h2>
              <p className="text-white/50 text-sm mt-1">{user?.email ?? 'Not set'}</p>
            </div>

            {/* Edit Button */}
            <button
              onClick={onEditClick}
              className="w-full mt-2 bg-white text-[#001233] font-semibold py-2 rounded-full hover:bg-gray-100 transition-colors text-sm"
            >
              Edit Profile
            </button>

               <button
  onClick={onChangePasswordClick}
  className="w-full bg-white/10 border border-white/20 text-white font-semibold py-2 rounded-full hover:bg-white/20 transition-colors text-sm"
>
  Change Password
</button>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Personal Details */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Mobile</p>
                  <p className="font-medium">{user?.mobile ?? 'Not set'}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Date of Birth</p>
                  <p className="font-medium">{user?.dateOfBirth ?? 'Not set'}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Gender</p>
                  <p className="font-medium capitalize">{user?.gender ?? 'Not set'}</p>
                </div>

               <div>
  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Address Line 1</p>
  <p className="font-medium">{user?.address1 ?? 'Not set'}</p>
</div>
<div>
  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Address Line 2</p>
  <p className="font-medium">{user?.address2 ?? 'Not set'}</p>
</div>

              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer hover:bg-white/15 transition-all">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-sm font-medium">My Bookings</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer hover:bg-white/15 transition-all">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Wallet</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer hover:bg-white/15 transition-all">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Add Money</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;