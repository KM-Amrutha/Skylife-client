import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserDashboard from '../../hooks/user/useUserDashboard';
import useEditUserProfile from '../../hooks/user/useEditUserProfile';
import useChangePassword from '../../hooks/user/useChangePassword';
import UserEditProfileModal from './UserEditProfileModal';
import ChangePasswordModal from '../user-authentication/ChangePasswordModal';
import UserHeader from './UserHeader';

const UserDashboard: React.FC = () => {
  const { user, isLoading, goToBookings, goToWallet } = useUserDashboard();
  const { formik, handleImageUpload, initForm } = useEditUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { formik: passwordFormik } = useChangePassword(() => setIsChangingPassword(false));
const navaigate = useNavigate();

  const openEdit = () => {
    if (user) initForm(user);
    setIsEditing(true);
  };

  const closeEdit = () => {
    formik.resetForm();
    setIsEditing(false);
  };

  const goHome = () => {
    navaigate('/user/userhome');
  };

  const openChangePassword = () => setIsChangingPassword(true);

  const closeChangePassword = () => {
    passwordFormik.resetForm();
    setIsChangingPassword(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#0a3a8a] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-100 text-gray-900 ">
          <UserHeader />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-2 pb-10">
      
         <div className="bg-[#0a3a8a] text-white px-6 py-8 rounded-2xl mt-4 mb-6 shadow-xs">
  <div className="flex items-center gap-5">
    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
      <svg className="w-6 h-6 text-[#0a3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </div>
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold">My Dashboard</h1>
      <p className="text-blue-200 text-sm mt-1">Manage your profile and bookings</p>
    </div>
  </div>
</div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Profile Card */}
            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col items-center text-center gap-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 bg-blue-50 flex items-center justify-center">
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-[#0a3a8a]">
                    {user?.firstName?.[0]?.toUpperCase() ?? '?'}
                  </span>
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {user?.firstName ? `${user.firstName} ${user.lastName}` : 'Not set'}
                </h2>
                <p className="text-gray-700 text-sm mt-1">{user?.email ?? 'Not set'}</p>
              </div>

              <button
                onClick={openEdit}
                className="w-full mt-2 bg-[#0a3a8a] text-white font-semibold py-2 rounded-full hover:bg-[#082c6b] transition-colors text-sm"
              >
                Edit Profile
              </button>

              <button
                onClick={openChangePassword}
                className="w-full bg-gray-100 border border-gray-200 text-gray-700 font-semibold py-2 rounded-full hover:bg-gray-200 transition-colors text-sm"
              >
                Change Password
              </button>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* Personal Details */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Personal Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">Mobile</p>
                    <p className="font-medium text-gray-900">{user?.mobile ?? 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">Date of Birth</p>
                    <p className="font-medium text-gray-900">{user?.dateOfBirth ?? 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">Gender</p>
                    <p className="font-medium capitalize text-gray-900">{user?.gender ?? 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">Address Line 1</p>
                    <p className="font-medium text-gray-900">{user?.address1 ?? 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">Address Line 2</p>
                    <p className="font-medium text-gray-900">{user?.address2 ?? 'Not set'}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                 <div   onClick={goHome}
                 className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex flex-col items-center gap-3 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#0a3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10.5L12 3l9 7.5M5 9.5V21h14V9.5M9 21v-6h6v6" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Home</p>
                </div>
                <div
                  onClick={goToBookings}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex flex-col items-center gap-3 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#0a3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">My Bookings</p>
                </div>

                <div
                  onClick={goToWallet}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex flex-col items-center gap-3 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#0a3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Wallet</p>
                </div>

               

              </div>

            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <UserEditProfileModal
          formik={formik}
          handleImageUpload={handleImageUpload}
          onClose={closeEdit}
        />
      )}
      {isChangingPassword && (
        <ChangePasswordModal
          formik={passwordFormik}
          onClose={closeChangePassword}
        />
      )}
    </>
  );
};

export default UserDashboard;