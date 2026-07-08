import React from "react";
import { useNavigate } from "react-router-dom";
import { Tag, ArrowLeft } from "lucide-react";
import useAddOffer from "../../hooks/offer/useOffer";

const OfferForm: React.FC = () => {
  const navigate = useNavigate();
  const { formik, aircrafts, isLoadingAircrafts } = useAddOffer();

  const labelClass = "block text-gray-700 text-xs font-bold mb-1.5";
  const inputBaseClass =
    "w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-300 placeholder-gray-400 " +
    "text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0a3a8a]/20 focus:border-[#0a3a8a] " +
    "transition duration-200 ease-in-out text-sm";
  const inputErrorClass = "border-red-400 focus:ring-red-100 focus:border-red-500 bg-red-50/30";

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-100 text-gray-900">
      {/* Blue Banner Header */}
      <div className="bg-[#0a3a8a] text-white px-4 sm:px-8 py-8 rounded-2xl mx-4 sm:mx-8 mt-6 shadow-xs">
        <div className="max-w-3xl mx-auto flex items-center gap-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg hover:bg-blue-50 transition"
          >
            <ArrowLeft className="w-5 h-5 text-[#0a3a8a]" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Create Offer</h1>
            <p className="text-blue-200 text-sm mt-1">Create a discount offer for one of your aircrafts</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
          {/* ===== OFFER DETAILS ===== */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <Tag className="w-4 h-4 text-[#0a3a8a]" />
              <h2 className="text-gray-900 font-semibold text-sm">Offer Details</h2>
            </div>

            <div className="p-5 space-y-4">
              {/* Aircraft */}
              <div>
                <label className={labelClass}>Aircraft</label>
                {isLoadingAircrafts ? (
                  <div className={`${inputBaseClass} text-gray-400`}>Loading aircrafts...</div>
                ) : (
                  <select
                    name="aircraftId"
                    value={formik.values.aircraftId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputBaseClass} ${formik.touched.aircraftId && formik.errors.aircraftId ? inputErrorClass : ""}`}
                    style={{ backgroundColor: '#f9fafb' }}
                  >
                    <option value="">Select an aircraft</option>
                    {aircrafts.map((aircraft) => (
                      <option key={aircraft.id} value={aircraft.id}>
                        {aircraft.aircraftName} — {aircraft.aircraftType}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Offer Code */}
              <div>
                <label className={labelClass}>Offer Code</label>
                <input
                  type="text"
                  name="offerCode"
                  value={formik.values.offerCode}
                  onChange={(e) => formik.setFieldValue("offerCode", e.target.value.toUpperCase())}
                  onBlur={formik.handleBlur}
                  placeholder="e.g. SUMMER20"
                  className={`${inputBaseClass} ${formik.touched.offerCode && formik.errors.offerCode ? inputErrorClass : ""}`}
                />
              </div>

              {/* Description */}
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  placeholder="Describe this offer to passengers"
                  rows={3}
                  className={`${inputBaseClass} resize-none`}
                />
              </div>

              {/* Discount + Min Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Discount (%)</label>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={formik.values.discountPercentage}
                    onChange={formik.handleChange}
                    className={inputBaseClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Minimum Amount (₹)</label>
                  <input
                    type="number"
                    name="minimumAmount"
                    value={formik.values.minimumAmount}
                    onChange={formik.handleChange}
                    className={inputBaseClass}
                  />
                </div>
              </div>

              {/* Validity Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Valid From</label>
                  <input type="date" name="validFrom" value={formik.values.validFrom} onChange={formik.handleChange} className={inputBaseClass} />
                </div>
                <div>
                  <label className={labelClass}>Valid To</label>
                  <input type="date" name="validTo" value={formik.values.validTo} onChange={formik.handleChange} className={inputBaseClass} />
                </div>
              </div>

              {/* Usage Limit */}
              <div>
                <label className={labelClass}>Usage Limit (optional)</label>
                <input
                  type="number"
                  name="usageLimit"
                  value={formik.values.usageLimit ?? ""}
                  onChange={(e) => formik.setFieldValue("usageLimit", e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="Leave empty for unlimited"
                  className={inputBaseClass}
                />
              </div>
            </div>
          </div>

          {/* ===== SUBMIT ===== */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full sm:w-auto px-12 py-3.5 bg-[#0a3a8a] text-white rounded-2xl font-semibold text-sm hover:bg-[#082e6f] disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2"
            >
              {formik.isSubmitting ? (
                "Saving..."
              ) : (
                <>
                  <Tag className="w-4 h-4" /> Create Offer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferForm;