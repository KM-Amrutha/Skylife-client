import React from "react";
import useAdminUsers from "../../hooks/admin/useAdminUsers";
import { User } from "../../redux/auth/authTypes";
import Pagination from "../../layouts/Pagination";
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

    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 hover:border-blue-400/40 transition duration-300 group">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-lg"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-lg border-2 border-white/10 shrink-0">
              <span className="text-white text-xl font-bold">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </span>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg truncate">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-cyan-400 text-xs truncate">{user.email}</p>
            <span className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
              ${user.isActive
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30'
                : 'bg-red-500/15 text-red-300 border border-red-400/30'
              }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${user.isActive ? 'bg-emerald-400' : 'bg-red-400'}`} />
              {user.isActive ? 'Active' : 'Blocked'}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 mb-4" />

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div className="bg-white/5 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Phone className="w-3 h-3 text-slate-400" />
              <p className="text-slate-400 text-[10px] uppercase tracking-wider">Mobile</p>
            </div>
            <p className="text-white text-xs font-medium truncate">{user.mobile || '—'}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <p className="text-slate-400 text-[10px] uppercase tracking-wider">Date of Birth</p>
            </div>
            <p className="text-white text-xs font-medium">{user.dateOfBirth || '—'}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <UserIcon className="w-3 h-3 text-slate-400" />
              <p className="text-slate-400 text-[10px] uppercase tracking-wider">Gender</p>
            </div>
            <p className="text-white text-xs font-medium capitalize">{user.gender || '—'}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <p className="text-slate-400 text-[10px] uppercase tracking-wider">Joined</p>
            </div>
            <p className="text-white text-xs font-medium">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                : '—'}
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-3 col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <p className="text-slate-400 text-[10px] uppercase tracking-wider">Address</p>
            </div>
            <p className="text-white text-xs font-medium truncate">
              {user.address1
                ? `${user.address1}${user.address2 ? `, ${user.address2}` : ''}`
                : '—'}
            </p>
          </div>
        </div>

        {/* Verification badges */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold
            ${user.otpVerified ? 'bg-blue-500/15 text-blue-300 border border-blue-400/20' : 'bg-slate-700/50 text-slate-500 border border-slate-600/30'}`}>
            {user.otpVerified
              ? <CheckCircle className="w-3 h-3" />
              : <XCircle className="w-3 h-3" />}
            OTP Verified
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold
            ${user.googleVerified ? 'bg-orange-500/15 text-orange-300 border border-orange-400/20' : 'bg-slate-700/50 text-slate-500 border border-slate-600/30'}`}>
            {user.googleVerified
              ? <CheckCircle className="w-3 h-3" />
              : <XCircle className="w-3 h-3" />}
            Google
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onToggleStatus(user.userId || '', !user.isActive)}
          className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg
            ${user.isActive
              ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/30 hover:border-red-400/50'
              : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 hover:border-emerald-400/50'
            }`}
        >
          {user.isActive ? (
            <><ShieldOff className="w-4 h-4" /> Block User</>
          ) : (
            <><Shield className="w-4 h-4" /> Activate User</>
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="px-8 py-6">
        <div className="bg-white/5 border border-dashed border-slate-500/40 rounded-2xl p-10 text-center">
          <UserIcon className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <p className="text-slate-100 text-base mb-2">No users registered yet</p>
          <p className="text-slate-400 text-sm">Users will appear here once they sign up</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h2 className="text-white text-3xl font-bold">All Users</h2>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-400/20 rounded-xl">
          <span className="text-2xl font-bold text-white">{users.length}</span>
          <span className="text-xs text-blue-300 uppercase tracking-widest font-semibold">Users</span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard
           key={user.userId}
           user={user}
           onToggleStatus={handleUpdateUserStatus}
           />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={pagination?.totalPages ?? 1}
        isLoading={isLoading}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllUsersTable;