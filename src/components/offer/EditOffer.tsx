import React from "react";
import { useNavigate } from "react-router-dom";
import { Tag, ArrowLeft } from "lucide-react";
import useEditOffer from "../../hooks/offer/useEditOffer";

const EditOffer: React.FC = () => {
  const navigate = useNavigate();
  const { formik, offer, isLoadingOffer } = useEditOffer();

  const labelClass = "block text-gray-700 text-xs font-bold mb-1.5";
  const inputBaseClass =
    "w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-300 placeholder-gray-400 " +
    "text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0a3a8a]/20 focus:border-[#0a3a8a] " +
    "transition duration-200 ease-in-out text-sm";
  const inputDisabledClass = "bg-gray-100 text-gray-500 cursor-not-allowed";

  if (isLoadingOffer) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a3a8a]" />
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
        <div className="bg-white border border-red-200 rounded-2xl p-8 text-center shadow-sm">
          <p className="text-red-500 font-medium">Offer not found</p>
          <button
            onClick={() => navigate("/provider/offer-list")}
            className="mt-4 px-6 py-2 rounded-xl bg-[#0a3a8a] text-white text-sm font-semibold hover:bg-[#082e6f] transition"
          >
            Back to Offers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-100 text-gray-900">
      {/* Blue Banner Header */}
      <div className="bg-[#0a3a8a] text-white px-4 sm:px-8 py-8 rounded-2xl mx-4 sm:mx-8 mt-6 shadow-xs">
        <div className="max-w-3xl mx-auto flex items-center gap-5">
          <button
            type="button"
            onClick={() => navigate("/provider/offer-list")}
            className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg hover:bg-blue-50 transition"
          >
            <ArrowLeft className="w-5 h-5 text-[#0a3a8a]" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Edit Offer</h1>
            <p className="text-blue-200 text-sm mt-1">
              Updating <span className="text-white font-semibold">{offer.offerCode}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
          {/* Offer Details Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <Tag className="w-4 h-4 text-[#0a3a8a]" />
              <h2 className="text-gray-900 font-semibold text-sm">Offer Details</h2>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className={labelClass}>Offer Code</label>
                <input
                  type="text"
                  name="offerCode"
                  value={formik.values.offerCode}
                  disabled={!offer.isEditable}
                  onChange={(e) => formik.setFieldValue("offerCode", e.target.value.toUpperCase())}
                  className={`${inputBaseClass} ${!offer.isEditable ? inputDisabledClass : ""}`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Discount (%)</label>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={formik.values.discountPercentage}
                    disabled={!offer.isEditable}
                    onChange={formik.handleChange}
                    className={`${inputBaseClass} ${!offer.isEditable ? inputDisabledClass : ""}`}
                  />
                </div>
                <div>
                  <label className={labelClass}>Minimum Amount (₹)</label>
                  <input
                    type="number"
                    name="minimumAmount"
                    value={formik.values.minimumAmount}
                    disabled={!offer.isEditable}
                    onChange={formik.handleChange}
                    className={`${inputBaseClass} ${!offer.isEditable ? inputDisabledClass : ""}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Settings Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 font-semibold text-sm">Active</p>
                <p className="text-gray-400 text-xs mt-0.5">Visible to users during booking</p>
              </div>
              <button
                type="button"
                onClick={() => formik.setFieldValue("isActive", !formik.values.isActive)}
                className={`relative w-12 h-6 rounded-full transition-colors ${formik.values.isActive ? "bg-[#0a3a8a]" : "bg-gray-200"}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${formik.values.isActive ? "translate-x-6" : "translate-x-0.5"}`} />
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full sm:w-auto px-12 py-3.5 bg-[#0a3a8a] text-white rounded-2xl font-semibold text-sm hover:bg-[#082e6f] disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2"
            >
              {formik.isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOffer;