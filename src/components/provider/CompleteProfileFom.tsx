import React from 'react';
import useCompleteProviderProfile from "../../hooks/provider/useCompleteProviderHook";


const CompleteProfileForm: React.FC = ()=>{ 
   const { formik,
     handleImageUpload,
      handlePdfUpload } = useCompleteProviderProfile();

  return (
    <div 
      className="relative rounded-2xl overflow-hidden p-8 md:p-12"
      style={{
        backgroundImage: 'url(/image/image5.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '600px'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50"></div>
      
      <div className="relative z-10">
        <h1 className="text-5xl font-bold text-white text-center mb-16 drop-shadow-lg">
          Complete your Profile
        </h1>
        
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 max-w-3xl mx-auto">
            
            {/* Company Name */}
            <div className="relative">
              <input
                type="text"
                name="companyName"
                placeholder=" "
                value={formik.values.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full bg-transparent border-0 border-b-2 border-white/60 text-white text-lg placeholder-transparent focus:outline-none focus:border-green-400 transition-all pb-2 pt-5"
              />
              <label className="absolute left-0 -top-3.5 text-white text-sm font-medium transition-all
                  peer-placeholder-shown:text-lg peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/70
                  peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-400 peer-focus:font-semibold">
                Company Name
              </label>
              {formik.touched.companyName && formik.errors.companyName && (
                <p className="text-red-400 text-sm mt-1.5 font-medium">{formik.errors.companyName}</p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder=" "
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full bg-transparent border-0 border-b-2 border-white/60 text-white text-lg placeholder-transparent focus:outline-none focus:border-green-400 transition-all pb-2 pt-5"
              />
              <label className="absolute left-0 -top-3.5 text-white text-sm font-medium transition-all
                  peer-placeholder-shown:text-lg peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/70
                  peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-400 peer-focus:font-semibold">
                Email
              </label>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-400 text-sm mt-1.5 font-medium">{formik.errors.email}</p>
              )}
            </div>

            {/* Mobile */}
            <div className="relative">
              <input
                type="tel"
                name="mobile"
                placeholder=" "
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full bg-transparent border-0 border-b-2 border-white/60 text-white text-lg placeholder-transparent focus:outline-none focus:border-green-400 transition-all pb-2 pt-5"
              />
              <label className="absolute left-0 -top-3.5 text-white text-sm font-medium transition-all
                  peer-placeholder-shown:text-lg peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/70
                  peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-400 peer-focus:font-semibold">
                Mobile
              </label>
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="text-red-400 text-sm mt-1.5 font-medium">{formik.errors.mobile}</p>
              )}
            </div>

            {/* Airline Code */}
            <div className="relative">
              <input
                type="text"
                name="airlineCode"
                placeholder=" "
                value={formik.values.airlineCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full bg-transparent border-0 border-b-2 border-white/60 text-white text-lg placeholder-transparent focus:outline-none focus:border-green-400 transition-all pb-2 pt-5"
              />
              <label className="absolute left-0 -top-3.5 text-white text-sm font-medium transition-all
                  peer-placeholder-shown:text-lg peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/70
                  peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-400 peer-focus:font-semibold">
                Airline Code
              </label>
              {formik.touched.airlineCode && formik.errors.airlineCode && (
                <p className="text-red-400 text-sm mt-1.5 font-medium">{formik.errors.airlineCode}</p>
              )}
            </div>

            {/* Logo Upload - IMAGE */}
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'logoUrl')}
                className="hidden"
                id="logo_upload"
              />
              <label 
                htmlFor="logo_upload"
                className="block w-full cursor-pointer"
              >
                <div className="peer w-full bg-transparent border-0 border-b-2 border-white/60 text-white text-lg pb-2 pt-5 hover:border-green-400 transition-all">
                  {formik.values.logoUrl ? (
                    <span className="text-green-400">✓ Logo Uploaded</span>
                  ) : (
                    <span className="text-white/70">Click to upload logo</span>
                  )}
                </div>
              </label>
              <label className="absolute left-0 -top-3.5 text-white text-sm font-medium pointer-events-none">
                Upload Logo (Image)
              </label>
              {formik.touched.logoUrl && formik.errors.logoUrl && (
                <p className="text-red-400 text-sm mt-1.5 font-medium">{formik.errors.logoUrl}</p>
              )}
            </div>

            {/* Registration Certificate - PDF */}
            <div className="relative">
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => handlePdfUpload(e, 'registrationCertificateUrl')}
                className="hidden"
                id="registration_certificate"
              />
              <label 
                htmlFor="registration_certificate"
                className="block w-full cursor-pointer"
              >
                <div className="peer w-full bg-transparent border-0 border-b-2 border-white/60 text-white text-lg pb-2 pt-5 hover:border-green-400 transition-all">
                  {formik.values.registrationCertificateUrl ? (
                    <span className="text-green-400">✓ Certificate Uploaded</span>
                  ) : (
                    <span className="text-white/70">Click to upload certificate</span>
                  )}
                </div>
              </label>
              <label className="absolute left-0 -top-3.5 text-white text-sm font-medium pointer-events-none">
                Registration Certificate (PDF)
              </label>
              {formik.touched.registrationCertificateUrl && formik.errors.registrationCertificateUrl && (
                <p className="text-red-400 text-sm mt-1.5 font-medium">{formik.errors.registrationCertificateUrl}</p>
              )}
            </div>

            {/* Insurance Proof - PDF */}
            <div className="relative">
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => handlePdfUpload(e, 'insuranceProofUrl')}
                className="hidden"
                id="insurance_proof"
              />
              <label 
                htmlFor="insurance_proof"
                className="block w-full cursor-pointer"
              >
                <div className="peer w-full bg-transparent border-0 border-b-2 border-white/60 text-white text-lg pb-2 pt-5 hover:border-green-400 transition-all">
                  {formik.values.insuranceProofUrl ? (
                    <span className="text-green-400">✓ Insurance Uploaded</span>
                  ) : (
                    <span className="text-white/70">Click to upload insurance</span>
                  )}
                </div>
              </label>
              <label className="absolute left-0 -top-3.5 text-white text-sm font-medium pointer-events-none">
                Insurance Proof (PDF)
              </label>
              {formik.touched.insuranceProofUrl && formik.errors.insuranceProofUrl && (
                <p className="text-red-400 text-sm mt-1.5 font-medium">{formik.errors.insuranceProofUrl}</p>
              )}
            </div>

            {/* Establishment Year */}
            <div className="relative">
              <input
                type="number"
                name="establishmentYear"
                placeholder=" "
                value={formik.values.establishmentYear}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full bg-transparent border-0 border-b-2 border-white/60 text-white text-lg placeholder-transparent focus:outline-none focus:border-green-400 transition-all pb-2 pt-5"
              />
              <label className="absolute left-0 -top-3.5 text-white text-sm font-medium transition-all
                  peer-placeholder-shown:text-lg peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/70
                  peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-400 peer-focus:font-semibold">
                Establishment Year
              </label>
              {formik.touched.establishmentYear && formik.errors.establishmentYear && (
                <p className="text-red-400 text-sm mt-1.5 font-medium">{formik.errors.establishmentYear}</p>
              )}
            </div>

            {/* License Expiry Date */}
            <div className="relative">
              <input
                type="date"
                name="licenseExpiryDate"
                placeholder=" "
                value={formik.values.licenseExpiryDate ? new Date(formik.values.licenseExpiryDate).toISOString().split('T')[0] : ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full bg-transparent border-0 border-b-2 border-white/60 text-white text-lg placeholder-transparent focus:outline-none focus:border-green-400 transition-all pb-2 pt-5"
              />
              <label className="absolute left-0 -top-3.5 text-white text-sm font-medium transition-all
                  peer-placeholder-shown:text-lg peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/70
                  peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-400 peer-focus:font-semibold">
                License Expiry Date
              </label>
              {formik.touched.licenseExpiryDate && formik.errors.licenseExpiryDate && (
                <p className="text-red-400 text-sm mt-1.5 font-medium">
                  {typeof formik.errors.licenseExpiryDate === 'string' ? formik.errors.licenseExpiryDate : 'Invalid date'}
                </p>
              )}
            </div>

            {/* Headquarters Address */}
            <div className="relative">
              <input
                type="text"
                name="headquartersAddress"
                placeholder=" "
                value={formik.values.headquartersAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full bg-transparent border-0 border-b-2 border-white/60 text-white text-lg placeholder-transparent focus:outline-none focus:border-green-400 transition-all pb-2 pt-5"
              />
              <label className="absolute left-0 -top-3.5 text-white text-sm font-medium transition-all
                  peer-placeholder-shown:text-lg peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/70
                  peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-400 peer-focus:font-semibold">
                Headquarters Address
              </label>
              {formik.touched.headquartersAddress && formik.errors.headquartersAddress && (
                <p className="text-red-400 text-sm mt-1.5 font-medium">{formik.errors.headquartersAddress}</p>
              )}
            </div>

            {/* Country of Operation */}
            <div className="relative">
              <input
                type="text"
                name="countryOfOperation"
                placeholder=" "
                value={formik.values.countryOfOperation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full bg-transparent border-0 border-b-2 border-white/60 text-white text-lg placeholder-transparent focus:outline-none focus:border-green-400 transition-all pb-2 pt-5"
              />
              <label className="absolute left-0 -top-3.5 text-white text-sm font-medium transition-all
                  peer-placeholder-shown:text-lg peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/70
                  peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-400 peer-focus:font-semibold">
                Country of Operation
              </label>
              {formik.touched.countryOfOperation && formik.errors.countryOfOperation && (
                <p className="text-red-400 text-sm mt-1.5 font-medium">{formik.errors.countryOfOperation}</p>
              )}
            </div>

            {/* Type of Operation */}
            <div className="relative">
              <input
                type="text"
                name="typeOfOperation"
                placeholder=" "
                value={formik.values.typeOfOperation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full bg-transparent border-0 border-b-2 border-white/60 text-white text-lg placeholder-transparent focus:outline-none focus:border-green-400 transition-all pb-2 pt-5"
              />
              <label className="absolute left-0 -top-3.5 text-white text-sm font-medium transition-all
                  peer-placeholder-shown:text-lg peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/70
                  peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-400 peer-focus:font-semibold">
                Type of Operation
              </label>
              {formik.touched.typeOfOperation && formik.errors.typeOfOperation && (
                <p className="text-red-400 text-sm mt-1.5 font-medium">{formik.errors.typeOfOperation}</p>
              )}
            </div>

            {/* Website URL */}
            <div className="relative">
              <input
                type="text"
                name="websiteUrl"
                placeholder=" "
                value={formik.values.websiteUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full bg-transparent border-0 border-b-2 border-white/60 text-white text-lg placeholder-transparent focus:outline-none focus:border-green-400 transition-all pb-2 pt-5"
              />
              <label className="absolute left-0 -top-3.5 text-white text-sm font-medium transition-all
                  peer-placeholder-shown:text-lg peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/70
                  peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-400 peer-focus:font-semibold">
                Website URL
              </label>
              {formik.touched.websiteUrl && formik.errors.websiteUrl && (
                <p className="text-red-400 text-sm mt-1.5 font-medium">{formik.errors.websiteUrl}</p>
              )}
            </div>

            {/* CEO Name */}
            <div className="relative">
              <input
                type="text"
                name="ceoName"
                placeholder=" "
                value={formik.values.ceoName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full bg-transparent border-0 border-b-2 border-white/60 text-white text-lg placeholder-transparent focus:outline-none focus:border-green-400 transition-all pb-2 pt-5"
              />
              <label className="absolute left-0 -top-3.5 text-white text-sm font-medium transition-all
                  peer-placeholder-shown:text-lg peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/70
                  peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-400 peer-focus:font-semibold">
                CEO Name
              </label>
              {formik.touched.ceoName && formik.errors.ceoName && (
                <p className="text-red-400 text-sm mt-1.5 font-medium">{formik.errors.ceoName}</p>
              )}
            </div>

            {/* Office Contact Number */}
            <div className="relative">
              <input
                type="tel"
                name="officeContactNumber"
                placeholder=" "
                value={formik.values.officeContactNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full bg-transparent border-0 border-b-2 border-white/60 text-white text-lg placeholder-transparent focus:outline-none focus:border-green-400 transition-all pb-2 pt-5"
              />
              <label className="absolute left-0 -top-3.5 text-white text-sm font-medium transition-all
                  peer-placeholder-shown:text-lg peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/70
                  peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-400 peer-focus:font-semibold">
                Contact Number
              </label>
              {formik.touched.officeContactNumber && formik.errors.officeContactNumber && (
                <p className="text-red-400 text-sm mt-1.5 font-medium">{formik.errors.officeContactNumber}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-14">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-green-500 text-white px-16 py-4 rounded-xl text-lg font-bold hover:bg-green-600 hover:shadow-2xl transition-all disabled:bg-gray-500 disabled:cursor-not-allowed shadow-xl"
            >
              {formik.isSubmitting ? 'Completing...' : 'Complete Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfileForm;
