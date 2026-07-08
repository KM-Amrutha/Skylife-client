import React from 'react';
import { Building2, Mail, Phone, Calendar, FileText, Globe, User, ShieldCheck, MapPin,Plane } from 'lucide-react';
import useCompleteProviderProfile from "../../hooks/provider/useCompleteProviderHook";

const CompleteProfileForm: React.FC = () => {
  const { formik, handleImageUpload, handlePdfUpload } = useCompleteProviderProfile();

  // Helper function to safely format the date string without throwing a RangeError
  const getSafeDateValue = (dateVal: any): string => {
    if (!dateVal) return '';
    const parsed = new Date(dateVal);
    return isNaN(parsed.getTime()) ? '' : parsed.toISOString().split('T')[0];
  };

  return (
    <div>
  {/* Top Heading */}
  <div className="bg-[#0a3a8a] text-white px-4 sm:px-8 py-8 rounded-2xl mx-4 sm:mx-8 mt-6 shadow-xs">
    <div className="max-w-3xl mx-auto flex items-center gap-5">
      <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
        <Building2 className="w-8 h-8 text-[#0a3a8a]" />
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Complete your Profile</h1>
        <p className="text-blue-200 text-sm mt-1">
          Provide your airline business credentials and operations details to verify your account.
        </p>
      </div>
    </div>
  </div>


      <form onSubmit={formik.handleSubmit} className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-6">
        {/* Main Card Content Grid */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xs p-6 md:p-8">
          <h2 className="text-gray-900 font-bold text-base mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#0a3a8a] rounded-full inline-block" />
            Company Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {/* Company Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 text-xs uppercase tracking-wider font-semibold">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="companyName"
                  value={formik.values?.companyName || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#0a3a8a] transition-colors"
                  placeholder="Enter company legal name"
                />
              </div>
              {formik.touched.companyName && formik.errors.companyName && (
                <p className="text-red-500 text-xs font-medium mt-0.5">{formik.errors.companyName as string}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 text-xs uppercase tracking-wider font-semibold">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formik.values?.email || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#0a3a8a] transition-colors"
                  placeholder="business@company.com"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs font-medium mt-0.5">{formik.errors.email as string}</p>
              )}
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 text-xs uppercase tracking-wider font-semibold">Mobile</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  name="mobile"
                  value={formik.values?.mobile || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#0a3a8a] transition-colors"
                  placeholder="Enter operational mobile number"
                />
              </div>
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="text-red-500 text-xs font-medium mt-0.5">{formik.errors.mobile as string}</p>
              )}
            </div>

            {/* Airline Code */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 text-xs uppercase tracking-wider font-semibold">Airline Code</label>
              <div className="relative">
                <Plane className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="airlineCode"
                  value={formik.values?.airlineCode || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#0a3a8a] transition-colors font-mono"
                  placeholder="e.g. EK, BA, AI"
                />
              </div>
              {formik.touched.airlineCode && formik.errors.airlineCode && (
                <p className="text-red-500 text-xs font-medium mt-0.5">{formik.errors.airlineCode as string}</p>
              )}
            </div>

            {/* Establishment Year */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 text-xs uppercase tracking-wider font-semibold">Establishment Year</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  name="establishmentYear"
                  value={formik.values?.establishmentYear || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#0a3a8a] transition-colors"
                  placeholder="YYYY"
                />
              </div>
              {formik.touched.establishmentYear && formik.errors.establishmentYear && (
                <p className="text-red-500 text-xs font-medium mt-0.5">{formik.errors.establishmentYear as string}</p>
              )}
            </div>

            {/* License Expiry Date (CRASH FIXED) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 text-xs uppercase tracking-wider font-semibold">License Expiry Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  name="licenseExpiryDate"
                  value={getSafeDateValue(formik.values?.licenseExpiryDate)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#0a3a8a] transition-colors"
                />
              </div>
              {formik.touched.licenseExpiryDate && formik.errors.licenseExpiryDate && (
                <p className="text-red-500 text-xs font-medium mt-0.5">
                  {formik.errors.licenseExpiryDate as string}
                </p>
              )}
            </div>

            {/* Headquarters Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 text-xs uppercase tracking-wider font-semibold">Headquarters Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="headquartersAddress"
                  value={formik.values?.headquartersAddress || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#0a3a8a] transition-colors"
                  placeholder="Main corporate office address"
                />
              </div>
              {formik.touched.headquartersAddress && formik.errors.headquartersAddress && (
                <p className="text-red-500 text-xs font-medium mt-0.5">{formik.errors.headquartersAddress as string}</p>
              )}
            </div>

            {/* Country of Operation */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 text-xs uppercase tracking-wider font-semibold">Country of Operation</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="countryOfOperation"
                  value={formik.values?.countryOfOperation || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#0a3a8a] transition-colors"
                  placeholder="Primary operations base country"
                />
              </div>
              {formik.touched.countryOfOperation && formik.errors.countryOfOperation && (
                <p className="text-red-500 text-xs font-medium mt-0.5">{formik.errors.countryOfOperation as string}</p>
              )}
            </div>

            {/* Type of Operation */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 text-xs uppercase tracking-wider font-semibold">Type of Operation</label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="typeOfOperation"
                  value={formik.values?.typeOfOperation || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#0a3a8a] transition-colors"
                  placeholder="e.g. Commercial, Cargo, Charter"
                />
              </div>
              {formik.touched.typeOfOperation && formik.errors.typeOfOperation && (
                <p className="text-red-500 text-xs font-medium mt-0.5">{formik.errors.typeOfOperation as string}</p>
              )}
            </div>

            {/* Website URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 text-xs uppercase tracking-wider font-semibold">Website URL</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="websiteUrl"
                  value={formik.values?.websiteUrl || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#0a3a8a] transition-colors"
                  placeholder="https://example.com"
                />
              </div>
              {formik.touched.websiteUrl && formik.errors.websiteUrl && (
                <p className="text-red-500 text-xs font-medium mt-0.5">{formik.errors.websiteUrl as string}</p>
              )}
            </div>

            {/* CEO Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 text-xs uppercase tracking-wider font-semibold">CEO Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="ceoName"
                  value={formik.values?.ceoName || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#0a3a8a] transition-colors"
                  placeholder="Executive Chief Name"
                />
              </div>
              {formik.touched.ceoName && formik.errors.ceoName && (
                <p className="text-red-500 text-xs font-medium mt-0.5">{formik.errors.ceoName as string}</p>
              )}
            </div>

            {/* Office Contact Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-700 text-xs uppercase tracking-wider font-semibold">Contact Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  name="officeContactNumber"
                  value={formik.values?.officeContactNumber || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#0a3a8a] transition-colors"
                  placeholder="Corporate contact line"
                />
              </div>
              {formik.touched.officeContactNumber && formik.errors.officeContactNumber && (
                <p className="text-red-500 text-xs font-medium mt-0.5">{formik.errors.officeContactNumber as string}</p>
              )}
            </div>
          </div>

          {/* Verification Documentation Row */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-gray-900 font-bold text-sm mb-4">Verification Documentation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Logo Image Upload */}
              <div>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'logoUrl')} className="hidden" id="logo_upload" />
                <label htmlFor="logo_upload" className="block cursor-pointer">
                  <div className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors hover:bg-blue-50/40 flex flex-col items-center justify-center gap-2 ${formik.values?.logoUrl ? 'border-emerald-300 bg-emerald-50/20' : 'border-gray-200'}`}>
                    <FileText className={`w-5 h-5 ${formik.values?.logoUrl ? 'text-emerald-600' : 'text-gray-400'}`} />
                    <span className={`text-xs font-semibold ${formik.values?.logoUrl ? 'text-emerald-700' : 'text-gray-600'}`}>
                      {formik.values?.logoUrl ? '✓ Logo Added' : 'Upload Company Logo'}
                    </span>
                  </div>
                </label>
                {formik.touched.logoUrl && formik.errors.logoUrl && <p className="text-red-500 text-xs mt-1">{formik.errors.logoUrl as string}</p>}
              </div>

              {/* Registration Certificate Upload */}
              <div>
                <input type="file" accept=".pdf,application/pdf" onChange={(e) => handlePdfUpload(e, 'registrationCertificateUrl')} className="hidden" id="registration_certificate" />
                <label htmlFor="registration_certificate" className="block cursor-pointer">
                  <div className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors hover:bg-blue-50/40 flex flex-col items-center justify-center gap-2 ${formik.values?.registrationCertificateUrl ? 'border-emerald-300 bg-emerald-50/20' : 'border-gray-200'}`}>
                    <FileText className={`w-5 h-5 ${formik.values?.registrationCertificateUrl ? 'text-emerald-600' : 'text-gray-400'}`} />
                    <span className={`text-xs font-semibold ${formik.values?.registrationCertificateUrl ? 'text-emerald-700' : 'text-gray-600'}`}>
                      {formik.values?.registrationCertificateUrl ? '✓ PDF Certificate Attached' : 'Registration Certificate'}
                    </span>
                  </div>
                </label>
                {formik.touched.registrationCertificateUrl && formik.errors.registrationCertificateUrl && <p className="text-red-500 text-xs mt-1">{formik.errors.registrationCertificateUrl as string}</p>}
              </div>

              {/* Insurance Proof Upload */}
              <div>
                <input type="file" accept=".pdf,application/pdf" onChange={(e) => handlePdfUpload(e, 'insuranceProofUrl')} className="hidden" id="insurance_proof" />
                <label htmlFor="insurance_proof" className="block cursor-pointer">
                  <div className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors hover:bg-blue-50/40 flex flex-col items-center justify-center gap-2 ${formik.values?.insuranceProofUrl ? 'border-emerald-300 bg-emerald-50/20' : 'border-gray-200'}`}>
                    <FileText className={`w-5 h-5 ${formik.values?.insuranceProofUrl ? 'text-emerald-600' : 'text-gray-400'}`} />
                    <span className={`text-xs font-semibold ${formik.values?.insuranceProofUrl ? 'text-emerald-700' : 'text-gray-600'}`}>
                      {formik.values?.insuranceProofUrl ? '✓ PDF Liability Proof Attached' : 'Insurance Liability Proof'}
                    </span>
                  </div>
                </label>
                {formik.touched.insuranceProofUrl && formik.errors.insuranceProofUrl && <p className="text-red-500 text-xs mt-1">{formik.errors.insuranceProofUrl as string}</p>}
              </div>

            </div>
          </div>
        </div>

        {/* Action Button Footer */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full sm:w-auto bg-[#0a3a8a] text-white px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-[#082c6b] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            {formik.isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving Verification Profiles...</span>
              </>
            ) : (
              'Complete Profile Setup'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteProfileForm;