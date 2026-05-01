import React from 'react';
import { FormikProps } from 'formik';
import { EditProfileForm } from '../../hooks/user/useEditUserProfile';

interface EditProfileModalProps {
  formik: FormikProps<EditProfileForm>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

const UserEditProfileModal: React.FC<EditProfileModalProps> = ({
  formik,
  handleImageUpload,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#001233] border border-white/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h2 className="text-white text-xl font-bold">Edit Profile</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-5">

          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/30 bg-white/20 flex items-center justify-center">
              {formik.values.profilePicture ? (
                <img src={formik.values.profilePicture} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </div>
            <label className="cursor-pointer text-sm text-white/70 hover:text-white underline transition-colors">
              Change Photo
              <input type="file" accept="image/jpeg,image/png,image/jpg" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>

          {/* First + Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-white/50 text-xs uppercase tracking-wider">First Name</label>
              <input
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange('firstName')}
                onBlur={formik.handleBlur('firstName')}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30"
                placeholder="First name"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-400 text-xs mt-1">{formik.errors.firstName}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white/50 text-xs uppercase tracking-wider">Last Name</label>
              <input
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange('lastName')}
                onBlur={formik.handleBlur('lastName')}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30"
                placeholder="Last name"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-red-400 text-xs mt-1">{formik.errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-white/50 text-xs uppercase tracking-wider">Email</label>
            <input
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30"
              placeholder="Email address"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-400 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Mobile + DOB */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-white/50 text-xs uppercase tracking-wider">Mobile</label>
              <input
                type="tel"
                value={formik.values.mobile}
                onChange={formik.handleChange('mobile')}
                onBlur={formik.handleBlur('mobile')}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30"
                placeholder="Mobile number"
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="text-red-400 text-xs mt-1">{formik.errors.mobile}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white/50 text-xs uppercase tracking-wider">Date of Birth</label>
              <input
                type="date"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange('dateOfBirth')}
                onBlur={formik.handleBlur('dateOfBirth')}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 transition-colors"
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <p className="text-red-400 text-xs mt-1">{formik.errors.dateOfBirth}</p>
              )}
            </div>
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-1">
            <label className="text-white/50 text-xs uppercase tracking-wider">Gender</label>
            <div className="flex gap-4">
              {(['male', 'female'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => formik.setFieldValue('gender', g)}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors border ${
                    formik.values.gender === g
                      ? 'bg-white text-[#001233] border-white'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-400 text-xs mt-1">{formik.errors.gender}</p>
            )}
          </div>

          {/* Address 1 */}
          <div className="flex flex-col gap-1">
            <label className="text-white/50 text-xs uppercase tracking-wider">Address Line 1</label>
            <input
              type="text"
              value={formik.values.address1}
              onChange={formik.handleChange('address1')}
              onBlur={formik.handleBlur('address1')}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30"
              placeholder="Address line 1"
            />
            {formik.touched.address1 && formik.errors.address1 && (
              <p className="text-red-400 text-xs mt-1">{formik.errors.address1}</p>
            )}
          </div>

          {/* Address 2 */}
          <div className="flex flex-col gap-1">
            <label className="text-white/50 text-xs uppercase tracking-wider">Address Line 2 (Optional)</label>
            <input
              type="text"
              value={formik.values.address2}
              onChange={formik.handleChange('address2')}
              onBlur={formik.handleBlur('address2')}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30"
              placeholder="Address line 2"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-white/10 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => formik.handleSubmit()}
            disabled={formik.isSubmitting}
            className="flex-1 py-3 rounded-full bg-white text-[#001233] text-sm font-semibold hover:bg-gray-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {formik.isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-[#001233]/30 border-t-[#001233] rounded-full animate-spin" />
                Saving...
              </>
            ) : 'Save Changes'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserEditProfileModal;