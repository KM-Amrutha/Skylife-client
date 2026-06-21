import React from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "lucide-react";
import useAddOffer from "../../hooks/offer/useOffer";

const OfferForm: React.FC = () => {
  const navigate = useNavigate();
  const { formik, aircrafts, isLoadingAircrafts } = useAddOffer();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-white text-3xl font-bold">Create Offer</h1>
        <p className="text-slate-400 text-sm mt-1">
          Create a discount offer for one of your aircrafts
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">

        {/* Aircraft */}
        <div>
          <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
            Aircraft
          </label>
          {isLoadingAircrafts ? (
            <div className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 text-sm">
              Loading aircrafts...
            </div>
          ) : (
            <select
              name="aircraftId"
              value={formik.values.aircraftId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 text-sm transition appearance-none"
            >
              <option value="" className="bg-[#0a1628]">
                Select an aircraft
              </option>
              {aircrafts.map((aircraft) => (
                <option
                  key={aircraft.id}
                  value={aircraft.id}
                  className="bg-[#0a1628]"
                >
                  {aircraft.aircraftName} — {aircraft.aircraftType}
                </option>
              ))}
            </select>
          )}
          {formik.touched.aircraftId && formik.errors.aircraftId && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.aircraftId}</p>
          )}
        </div>

        {/* Offer code */}
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
            placeholder="e.g. SUMMER20"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 text-sm transition uppercase"
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
            placeholder="Describe this offer to passengers"
            rows={3}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 text-sm transition resize-none"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.description}
            </p>
          )}
        </div>

        {/* Discount % + Min amount */}
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
              min={1}
              max={100}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 text-sm transition"
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
              min={1}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 text-sm transition"
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
              min={new Date().toISOString().split("T")[0]}
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
              min={formik.values.validFrom || new Date().toISOString().split("T")[0]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 text-sm transition"
            />
            {formik.touched.validTo && formik.errors.validTo && (
              <p className="text-red-400 text-xs mt-1">{formik.errors.validTo}</p>
            )}
          </div>
        </div>

        {/* Usage limit */}
        <div>
          <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
            Usage Limit{" "}
            <span className="normal-case text-white/20 font-normal">
              (optional — leave empty for unlimited)
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
            min={1}
            placeholder="e.g. 100"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 text-sm transition"
          />
          {formik.touched.usageLimit && formik.errors.usageLimit && (
            <p className="text-red-400 text-xs mt-1">
              {formik.errors.usageLimit}
            </p>
          )}
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
                Creating...
              </>
            ) : (
              <>
                <Tag className="w-4 h-4" />
                Create Offer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OfferForm;