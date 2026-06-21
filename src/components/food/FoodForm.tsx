import React from "react";
import { useNavigate } from "react-router-dom";
import { Utensils, Upload, X } from "lucide-react";
import useFood from "../../hooks/food/useFood";

const FoodForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    formik,
    aircrafts,
    isLoadingAircrafts,
    imagePreview,
    handleImageChange,
    clearImage,
    foodTypes,
    serveMethods,
  } = useFood();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-white text-3xl font-bold">Add Food Item</h1>
        <p className="text-slate-400 text-sm mt-1">
          Add a new food or beverage item for your aircraft
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">

        {/* Aircraft selector */}
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

        {/* Food name */}
        <div>
          <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
            Food Name
          </label>
          <input
            type="text"
            name="foodName"
            value={formik.values.foodName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="e.g. Chicken Biryani"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 text-sm transition"
          />
          {formik.touched.foodName && formik.errors.foodName && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.foodName}</p>
          )}
        </div>

        {/* Food type + Serve method */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Food Type
            </label>
            <select
              name="foodType"
              value={formik.values.foodType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 text-sm transition appearance-none"
            >
              <option value="" className="bg-[#0a1628]">
                Select type
              </option>
              {foodTypes.map((type) => (
                <option key={type} value={type} className="bg-[#0a1628]">
                  {type}
                </option>
              ))}
            </select>
            {formik.touched.foodType && formik.errors.foodType && (
              <p className="text-red-400 text-xs mt-1">{formik.errors.foodType}</p>
            )}
          </div>

          <div>
            <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Serve Method
            </label>
            <select
              name="serveMethod"
              value={formik.values.serveMethod}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 text-sm transition appearance-none"
            >
              <option value="" className="bg-[#0a1628]">
                Select method
              </option>
              {serveMethods.map((method) => (
                <option key={method} value={method} className="bg-[#0a1628]">
                  {method}
                </option>
              ))}
            </select>
            {formik.touched.serveMethod && formik.errors.serveMethod && (
              <p className="text-red-400 text-xs mt-1">
                {formik.errors.serveMethod}
              </p>
            )}
          </div>
        </div>

        {/* Veg / Non-veg */}
        <div>
          <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
            Veg / Non-Veg
          </label>
          <div className="flex gap-3">
            {(["veg", "non-veg"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => formik.setFieldValue("vegNonveg", option)}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold capitalize transition border flex items-center justify-center gap-2 ${
                  formik.values.vegNonveg === option
                    ? option === "veg"
                      ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-300"
                      : "bg-red-500/20 border-red-400/50 text-red-300"
                    : "bg-white/5 text-white/50 border-white/10 hover:border-white/25"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-sm border-2 flex items-center justify-center ${
                    option === "veg" ? "border-emerald-500" : "border-red-500"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      option === "veg" ? "bg-emerald-500" : "bg-red-500"
                    }`}
                  />
                </div>
                {option}
              </button>
            ))}
          </div>
          {formik.touched.vegNonveg && formik.errors.vegNonveg && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.vegNonveg}</p>
          )}
        </div>

        {/* Complimentary toggle */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold text-sm">Complimentary</p>
              <p className="text-white/40 text-xs mt-0.5">
                Free item — no charge to passengers
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const next = !formik.values.isComplimentary;
                formik.setFieldValue("isComplimentary", next);
                if (next) formik.setFieldValue("foodPrice", 0);
              }}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                formik.values.isComplimentary
                  ? "bg-emerald-500"
                  : "bg-white/20"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  formik.values.isComplimentary
                    ? "translate-x-6"
                    : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Price — only if not complimentary */}
        {!formik.values.isComplimentary && (
          <div>
            <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Price (₹)
            </label>
            <input
              type="number"
              name="foodPrice"
              value={formik.values.foodPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              min={0}
              placeholder="e.g. 250"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 text-sm transition"
            />
            {formik.touched.foodPrice && formik.errors.foodPrice && (
              <p className="text-red-400 text-xs mt-1">
                {formik.errors.foodPrice}
              </p>
            )}
          </div>
        )}

        {/* Image upload */}
        <div>
          <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
            Image (optional)
          </label>
          {imagePreview ? (
            <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10">
              <img
                src={imagePreview}
                alt="Food preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <label className="w-full h-32 border-2 border-dashed border-white/15 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-white/30 transition">
              <Upload className="w-6 h-6 text-white/30" />
              <p className="text-white/30 text-sm">Click to upload image</p>
              <p className="text-white/20 text-xs">PNG, JPG up to 5MB</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/provider/food-list")}
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
                <Utensils className="w-4 h-4" />
                Add Food Item
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodForm;