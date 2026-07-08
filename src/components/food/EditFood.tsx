import React from "react";
import { useNavigate } from "react-router-dom";
import { Utensils, Upload, X, ArrowLeft } from "lucide-react";
import useEditFood from "../../hooks/food/useEditFood";

const FOOD_TYPES = ["Meal", "Snack", "Beverage", "Dessert", "Starter", "Other"];
const SERVE_METHODS = ["Hot", "Cold", "Room Temperature"];

const EditFood: React.FC = () => {
  const navigate = useNavigate();
  const {
    formik,
    food,
    isLoadingFood,
    imagePreview,
    handleImageChange,
    clearImage,
  } = useEditFood();

  const labelClass = "block text-gray-700 text-xs font-bold mb-1.5";
  const inputBaseClass =
    "w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-300 placeholder-gray-400 " +
    "text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0a3a8a]/20 focus:border-[#0a3a8a] " +
    "transition duration-200 ease-in-out text-sm";
  const inputErrorClass = "border-red-400 focus:ring-red-100 focus:border-red-500 bg-red-50/30";

  if (isLoadingFood) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a3a8a]" />
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
        <div className="bg-white border border-red-200 rounded-2xl p-8 text-center shadow-sm">
          <p className="text-red-500 font-medium">Food item not found</p>
          <button
            onClick={() => navigate("/provider/food-list")}
            className="mt-4 px-6 py-2 rounded-xl bg-[#0a3a8a] text-white text-sm font-semibold hover:bg-[#082e6f] transition"
          >
            Back to Food List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-100 text-gray-900">

      {/* Blue Banner Header */}
      <div className="bg-[#0a3a8a] text-white px-4 sm:px-8 py-8 rounded-2xl mx-4 sm:mx-8 mt-6 shadow-xs">
        <div className="max-w-3xl mx-auto flex items-center gap-5">
          <button
            type="button"
            onClick={() => navigate("/provider/food-list")}
            className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg hover:bg-blue-50 transition"
          >
            <ArrowLeft className="w-5 h-5 text-[#0a3a8a]" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Edit Food Item</h1>
            <p className="text-blue-200 text-sm mt-1">
              Update details for <span className="text-white font-semibold">{food.foodName}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>

          {/* ===== ITEM DETAILS ===== */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <Utensils className="w-4 h-4 text-[#0a3a8a]" />
              <h2 className="text-gray-900 font-semibold text-sm">Item Details</h2>
            </div>

            <div className="p-5 space-y-4">

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
                    {FOOD_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {formik.touched.foodType && formik.errors.foodType && (
                    <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.foodType}</p>
                  )}
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
                    {SERVE_METHODS.map((method) => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                  {formik.touched.serveMethod && formik.errors.serveMethod && (
                    <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.serveMethod}</p>
                  )}
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
                      <div className={`w-3.5 h-3.5 rounded-sm border-2 flex items-center justify-center ${
                        option === "veg" ? "border-emerald-500" : "border-red-500"
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          option === "veg" ? "bg-emerald-500" : "bg-red-500"
                        }`} />
                      </div>
                      {option}
                    </button>
                  ))}
                </div>
                {formik.touched.vegNonveg && formik.errors.vegNonveg && (
                  <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.vegNonveg}</p>
                )}
              </div>

            </div>
          </div>

          {/* ===== PRICING ===== */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <span className="text-[#0a3a8a] text-sm font-bold">₹</span>
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
                    onBlur={formik.handleBlur}
                    min={0}
                    placeholder="e.g. 250"
                    className={`${inputBaseClass} ${formik.touched.foodPrice && formik.errors.foodPrice ? inputErrorClass : ""}`}
                  />
                  {formik.touched.foodPrice && formik.errors.foodPrice && (
                    <p className="text-red-500 text-xs mt-1">⚠ {formik.errors.foodPrice}</p>
                  )}
                </div>
              )}

              {/* Active status toggle */}
              <div className="flex items-center justify-between py-1 border-t border-gray-100 pt-4">
                <div>
                  <p className="text-gray-900 font-semibold text-sm">Active</p>
                  <p className="text-gray-400 text-xs mt-0.5">Visible to users during booking</p>
                </div>
                <button
                  type="button"
                  onClick={() => formik.setFieldValue("isActive", !formik.values.isActive)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    formik.values.isActive ? "bg-[#0a3a8a]" : "bg-gray-200"
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                    formik.values.isActive ? "translate-x-6" : "translate-x-0.5"
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* ===== IMAGE ===== */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <Upload className="w-4 h-4 text-[#0a3a8a]" />
              <h2 className="text-gray-900 font-semibold text-sm">Image</h2>
            </div>

            <div className="p-5">
              {imagePreview ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200">
                  <img src={imagePreview} alt="Food preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-900/70 text-white hover:bg-gray-900 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-2 left-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/50 text-white/80">
                      {formik.values.image ? "New image selected" : "Current image"}
                    </span>
                  </div>
                </div>
              ) : (
                <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#0a3a8a]/40 hover:bg-blue-50/30 transition">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <p className="text-gray-500 text-sm font-medium">Click to upload new image</p>
                  <p className="text-gray-400 text-xs">PNG, JPG up to 5MB</p>
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
              className="w-full sm:w-auto px-12 py-3.5 bg-[#0a3a8a] text-white rounded-2xl font-semibold text-sm hover:bg-[#082e6f] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center gap-2"
            >
              {formik.isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Utensils className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditFood;