import React from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "lucide-react";
import useEditOffer from "../../hooks/offer/useEditOffer";

const EditOffer: React.FC = () => {
  const navigate = useNavigate();
  const { formik, offer, isLoadingOffer } = useEditOffer();

  if (isLoadingOffer) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="bg-red-500/10 border border-red-400/30 rounded-2xl p-8 text-center">
        <p className="text-red-300 font-medium">Offer not found</p>
        <button
          onClick={() => navigate("/provider/offer-list")}
          className="mt-4 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition"
        >
          Back to Offers
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-white text-3xl font-bold">Edit Offer</h1>
        <p className="text-slate-400 text-sm mt-1">
          Updating{" "}
          <span className="text-white font-semibold">{offer.offerCode}</span>
          {!offer.isEditable && (
            <span className="ml-2 text-amber-400 text-xs">
              — Core fields locked (offer has been used {offer.usageCount} time
              {offer.usageCount !== 1 ? "s" : ""})
            </span>
          )}
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">

        {/* Offer code — locked if not editable */}
        <div>
          <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
            Offer Code
          </label>
          <input
            type="text"
            name="offerCode"
            value={formik.values.offerCode}
            onChange={(e) =>
              formik.setFieldValue("offerCode", e.target.value.toUpperCase())
            }
            onBlur={formik.handleBlur}
            disabled={!offer.isEditable}
            className={`w-full px-4 py-3 border rounded-xl text-white focus:outline-none text-sm transition uppercase ${
              offer.isEditable
                ? "bg-white/5 border-white/10 focus:border-white/30"
                : "bg-white/3 border-white/5 text-white/40 cursor-not-allowed"
            }`}
          />
          {formik.touched.offerCode && formik.errors.offerCode && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.offerCode}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
            Description
          </label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={3}
            placeholder="Describe this offer to passengers"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 text-sm transition resize-none"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.description}
            </p>
          )}
        </div>

        {/* Discount % + Min amount — locked if not editable */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Discount (%)
            </label>
            <input
              type="number"
              name="discountPercentage"
              value={formik.values.discountPercentage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!offer.isEditable}
              min={1}
              max={100}
              className={`w-full px-4 py-3 border rounded-xl text-white focus:outline-none text-sm transition ${
                offer.isEditable
                  ? "bg-white/5 border-white/10 focus:border-white/30"
                  : "bg-white/3 border-white/5 text-white/40 cursor-not-allowed"
              }`}
            />
            {formik.touched.discountPercentage &&
              formik.errors.discountPercentage && (
                <p className="text-red-400 text-xs mt-1">
                  {formik.errors.discountPercentage}
                </p>
              )}
          </div>

          <div>
            <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Minimum Amount (₹)
            </label>
            <input
              type="number"
              name="minimumAmount"
              value={formik.values.minimumAmount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!offer.isEditable}
              min={1}
              className={`w-full px-4 py-3 border rounded-xl text-white focus:outline-none text-sm transition ${
                offer.isEditable
                  ? "bg-white/5 border-white/10 focus:border-white/30"
                  : "bg-white/3 border-white/5 text-white/40 cursor-not-allowed"
              }`}
            />
            {formik.touched.minimumAmount && formik.errors.minimumAmount && (
              <p className="text-red-400 text-xs mt-1">
                {formik.errors.minimumAmount}
              </p>
            )}
          </div>
        </div>

        {/* Valid from + Valid to */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Valid From
            </label>
            <input
              type="date"
              name="validFrom"
              value={formik.values.validFrom}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 text-sm transition"
            />
            {formik.touched.validFrom && formik.errors.validFrom && (
              <p className="text-red-400 text-xs mt-1">
                {formik.errors.validFrom}
              </p>
            )}
          </div>

          <div>
            <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Valid To
            </label>
            <input
              type="date"
              name="validTo"
              value={formik.values.validTo}
              min={formik.values.validFrom}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 text-sm transition"
            />
            {formik.touched.validTo && formik.errors.validTo && (
              <p className="text-red-400 text-xs mt-1">
                {formik.errors.validTo}
              </p>
            )}
          </div>
        </div>

        {/* Usage limit — locked if not editable */}
        <div>
          <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
            Usage Limit{" "}
            <span className="normal-case text-white/20 font-normal">
              (optional)
            </span>
          </label>
          <input
            type="number"
            name="usageLimit"
            value={formik.values.usageLimit ?? ""}
            onChange={(e) =>
              formik.setFieldValue(
                "usageLimit",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            onBlur={formik.handleBlur}
            disabled={!offer.isEditable}
            min={1}
            placeholder="Leave empty for unlimited"
            className={`w-full px-4 py-3 border rounded-xl text-white placeholder-white/20 focus:outline-none text-sm transition ${
              offer.isEditable
                ? "bg-white/5 border-white/10 focus:border-white/30"
                : "bg-white/3 border-white/5 text-white/40 cursor-not-allowed"
            }`}
          />
          {formik.touched.usageLimit && formik.errors.usageLimit && (
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.usageLimit}
            </p>
          )}
        </div>

        {/* Active status */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold text-sm">Active</p>
              <p className="text-white/40 text-xs mt-0.5">
                Visible to users during booking
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                formik.setFieldValue("isActive", !formik.values.isActive)
              }
              className={`relative w-12 h-6 rounded-full transition-colors ${
                formik.values.isActive ? "bg-emerald-500" : "bg-white/20"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  formik.values.isActive ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/provider/offer-list")}
            className="flex-1 py-3.5 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="flex-1 py-3.5 rounded-full bg-white text-[#001233] text-sm font-bold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {formik.isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-[#001233]/30 border-t-[#001233] rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Tag className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOffer;