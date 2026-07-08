import React from "react";
import { useNavigate } from "react-router-dom";
import { Utensils, Upload, X, ArrowLeft } from "lucide-react";
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
            <h1 className="text-2xl sm:text-3xl font-bold">Add Food Item</h1>
            <p className="text-blue-200 text-sm mt-1">Add a new food or beverage item for your aircraft</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>

          {/* ===== AIRCRAFT & ITEM DETAILS ===== */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <Utensils className="w-4 h-4 text-[#0a3a8a]" />
              <h2 className="text-gray-900 font-semibold text-sm">Item Details</h2>
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
                {formik.touched.aircraftId && formik.errors.aircraftId && (
                  <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.aircraftId}</p>
                )}
              </div>

              {/* Food Name */}
              <div>
                <label className={labelClass}>Food Name</label>
                <input
                  type="text"
                  name="foodName"
                  value={formik.values.foodName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="e.g. Chicken Biryani"
                  className={`${inputBaseClass} ${formik.touched.foodName && formik.errors.foodName ? inputErrorClass : ""}`}
                />
                {formik.touched.foodName && formik.errors.foodName && (
                  <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.foodName}</p>
                )}
              </div>

              {/* Food Type + Serve Method */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Food Type</label>
                  <select
                    name="foodType"
                    value={formik.values.foodType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputBaseClass} ${formik.touched.foodType && formik.errors.foodType ? inputErrorClass : ""}`}
                    style={{ backgroundColor: '#f9fafb' }}
                  >
                    <option value="">Select type</option>
                    {foodTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Serve Method</label>
                  <select
                    name="serveMethod"
                    value={formik.values.serveMethod}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputBaseClass} ${formik.touched.serveMethod && formik.errors.serveMethod ? inputErrorClass : ""}`}
                    style={{ backgroundColor: '#f9fafb' }}
                  >
                    <option value="">Select method</option>
                    {serveMethods.map((method) => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Veg / Non-veg */}
              <div>
                <label className={labelClass}>Veg / Non-Veg</label>
                <div className="flex gap-3">
                  {(["veg", "non-veg"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => formik.setFieldValue("vegNonveg", option)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition border flex items-center justify-center gap-2 ${
                        formik.values.vegNonveg === option
                          ? option === "veg"
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                            : "bg-red-50 border-red-300 text-red-800"
                          : "bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ===== PRICING ===== */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <span className="text-[#0a3a8a] text-sm">₹</span>
              <h2 className="text-gray-900 font-semibold text-sm">Pricing</h2>
            </div>

            <div className="p-5 space-y-4">
              {/* Complimentary toggle */}
              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="text-gray-900 font-semibold text-sm">Complimentary</p>
                  <p className="text-gray-400 text-xs mt-0.5">Free item — no charge to passengers</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const next = !formik.values.isComplimentary;
                    formik.setFieldValue("isComplimentary", next);
                    if (next) formik.setFieldValue("foodPrice", 0);
                  }}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    formik.values.isComplimentary ? "bg-[#0a3a8a]" : "bg-gray-200"
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                    formik.values.isComplimentary ? "translate-x-6" : "translate-x-0.5"
                  }`} />
                </button>
              </div>

              {/* Price */}
              {!formik.values.isComplimentary && (
                <div>
                  <label className={labelClass}>Price (₹)</label>
                  <input
                    type="number"
                    name="foodPrice"
                    value={formik.values.foodPrice}
                    onChange={formik.handleChange}
                    placeholder="e.g. 250"
                    className={inputBaseClass}
                  />
                </div>
              )}
            </div>
          </div>

          {/* ===== IMAGE ===== */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <Upload className="w-4 h-4 text-[#0a3a8a]" />
              <h2 className="text-gray-900 font-semibold text-sm">Image (optional)</h2>
            </div>

            <div className="p-5">
              {imagePreview ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200">
                  <img src={imagePreview} alt="Food" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-900/70 text-white hover:bg-gray-900 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#0a3a8a]/40 hover:bg-blue-50/30 transition">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <p className="text-gray-500 text-sm font-medium">Click to upload image</p>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* ===== SUBMIT ===== */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full sm:w-auto px-12 py-3.5 bg-[#0a3a8a] text-white rounded-2xl font-semibold text-sm hover:bg-[#082e6f] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              {formik.isSubmitting ? "Saving..." : "Add Food Item"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default FoodForm;