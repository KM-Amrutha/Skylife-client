import React from "react";
import useAdminUsers from "../../hooks/admin/useAdminUsers";
import { User } from "../../redux/auth/authTypes";
import Pagination from "../../layouts/Pagination";
import Sidebar from "./Sidebar";
import {
  User as UserIcon,
  Calendar,
  Shield,
  ShieldOff,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
} from "lucide-react";

const UserCard: React.FC<{
  user: User;
  onToggleStatus: (userId: string, isActive: boolean) => void;
}> = ({ user, onToggleStatus }) => {
  return (
    <div className="rounded-2xl border border-gray-200 shadow-xs bg-white hover:border-gray-300 transition duration-200 flex flex-col justify-between overflow-hidden">
      <div className="p-5">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-4">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-14 h-14 rounded-xl object-cover border border-gray-200 shadow-xs shrink-0"
            />
          ) : (
            <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-xs shrink-0">
              <span className="text-blue-600 text-lg font-bold">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </span>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 font-bold text-base truncate">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-gray-500 text-xs truncate mb-1">{user.email}</p>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
              ${user.isActive
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${user.isActive ? 'bg-emerald-500' : 'bg-red-500'}`} />
              {user.isActive ? 'Active' : 'Blocked'}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100 my-3" />

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50/60 rounded-xl p-2.5 border border-gray-100">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Phone className="w-3 h-3 text-gray-400" />
              <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Mobile</p>
            </div>
            <p className="text-gray-800 text-xs font-semibold truncate">{user.mobile || '—'}</p>
          </div>

          <div className="bg-gray-50/60 rounded-xl p-2.5 border border-gray-100">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Calendar className="w-3 h-3 text-gray-400" />
              <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">DOB</p>
            </div>
            <p className="text-gray-800 text-xs font-semibold truncate">{user.dateOfBirth || '—'}</p>
          </div>

          <div className="bg-gray-50/60 rounded-xl p-2.5 border border-gray-100">
            <div className="flex items-center gap-1.5 mb-0.5">
              <UserIcon className="w-3 h-3 text-gray-400" />
              <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Gender</p>
            </div>
            <p className="text-gray-800 text-xs font-semibold capitalize truncate">{user.gender || '—'}</p>
          </div>

          <div className="bg-gray-50/60 rounded-xl p-2.5 border border-gray-100">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Calendar className="w-3 h-3 text-gray-400" />
              <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Joined</p>
            </div>
            <p className="text-gray-800 text-xs font-semibold">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                : '—'}
            </p>
          </div>

          <div className="bg-gray-50/60 rounded-xl p-2.5 border border-gray-100 col-span-2">
            <div className="flex items-center gap-1.5 mb-0.5">
              <MapPin className="w-3 h-3 text-gray-400" />
              <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Address</p>
            </div>
            <p className="text-gray-800 text-xs font-semibold truncate">
              {user.address1
                ? `${user.address1}${user.address2 ? `, ${user.address2}` : ''}`
                : '—'}
            </p>
          </div>
        </div>

        {/* Verification Status Indicators */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border
            ${user.otpVerified ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
            {user.otpVerified ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
            OTP Verified
          </div>
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border
            ${user.googleVerified ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
            {user.googleVerified ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
            Google Link
          </div>
        </div>
      </div>

      {/* Action Block/Unblock Bottom Anchor */}
      <div className="p-4 bg-gray-50 rounded-b-2xl border-t border-gray-100">
        <button
          onClick={() => onToggleStatus(user.userId || '', !user.isActive)}
          className={`w-full py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-xs border
            ${user.isActive
              ? 'bg-white hover:bg-red-50 text-red-600 border-red-200 hover:border-red-300'
              : 'bg-white hover:bg-emerald-50 text-emerald-600 border-emerald-200 hover:border-emerald-300'
            }`}
        >
          {user.isActive ? (
            <><ShieldOff className="w-3 h-3" /> Block Account</>
          ) : (
            <><Shield className="w-3 h-3" /> Activate Account</>
          )}
        </button>
      </div>
    </div>
  );
};

const AllUsersTable: React.FC = () => {
  const { users, isLoading, handleUpdateUserStatus, pagination, currentPage, handlePageChange } = useAdminUsers();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="px-4 md:px-8 py-6">
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center shadow-xs">
          <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-800 text-base font-semibold mb-1">No users registered yet</p>
          <p className="text-gray-500 text-sm">Users will appear here once they sign up</p>
        </div>
      </div>
    );
  }

  return (
     <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 min-w-0 overflow-y-auto">
    <div className="px-4 md:px-8 py-6 bg-gray-50 min-h-screen">
      {/* Top Header */}
      <div className="bg-[#0a3a8a] text-white px-6 py-8 rounded-2xl mt-4 mb-6 shadow-xs">
  <div className="flex items-center justify-between gap-5">
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
        <svg className="w-6 h-6 text-[#0a3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">All Users</h1>
        <p className="text-blue-200 text-sm mt-1">Manage registered users on the platform</p>
      </div>
    </div>
    <div className="flex-shrink-0 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm font-semibold whitespace-nowrap">
      {users.length} users
    </div>
  </div>
</div>
      {/* Grid Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard
            key={user.userId}
            user={user}
            onToggleStatus={handleUpdateUserStatus}
          />
        ))}
      </div>

      {/* Footer Navigation Spacer */}
      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={pagination?.totalPages ?? 1}
          isLoading={isLoading}
          onPageChange={handlePageChange}
        />
      </div>
      </div>
      </div>
    </div>
  );
};

export default AllUsersTable;