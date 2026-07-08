import React from "react";
import { Trash2, Plus, CalendarRange, AlertCircle,ArrowLeft } from "lucide-react";
import useSeatLayout from "../../hooks/provider/useSeatLayout";
import { useNavigate } from "react-router-dom";

const SeatLayoutForm: React.FC = () => {
  const {
    seatTypes,
    seatLayouts,
    isLoading,
  
    formik,
    aircraftCapacity,
    totalPlannedSeats,
    canGenerateSeats,
    generatedSeatsCount,
    handleGenerateSeats,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    deletingLayoutId,
  } = useSeatLayout();
const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-8">

      {/* ── Delete Confirm Modal ── */}
      {deletingLayoutId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs px-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-xl p-6 flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-4 shrink-0">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-gray-900 text-lg font-bold text-center tracking-tight mb-1">Delete Seat Layout</h2>
            <p className="text-gray-500 text-xs text-center leading-normal mb-6">
              Are you sure you want to delete this seat layout? This action cannot be undone.
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 py-2 rounded-xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider transition shadow-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isLoading}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xs"
              >
                {isLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

     <div className="bg-[#0a3a8a] text-white px-4 sm:px-8 py-8 rounded-2xl mx-4 sm:mx-8 mt-6 shadow-xs">
             <div className="max-w-3xl mx-auto flex items-center gap-5">
               <button
                 type="button"
                 onClick={() => navigate("/provider/aircrafts")}
                 className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg hover:bg-blue-50 transition"
               >
                 <ArrowLeft className="w-5 h-5 text-[#0a3a8a]" />
               </button>
               <div>
                 <h1 className="text-2xl sm:text-3xl font-bold">Seat Configuration</h1>
                 <p className="text-blue-200 text-sm mt-1">Configure the seats of your aircraft</p>
               </div>
             </div>
           </div>

      {/* ── Form ── */}
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-50/50 border border-gray-100 rounded-2xl p-5 md:p-6">
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-1.5">Cabin Class *</label>
          <select
            name="cabinClass"
            value={formik.values.cabinClass}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 bg-white text-gray-800 shadow-xs focus:outline-hidden focus:border-blue-500 transition"
          >
            <option value="">Select cabin class</option>
            {seatTypes.map((type) => (
              <option key={type.id} value={type.cabinClass}>
                {type.seatTypeName}
              </option>
            ))}
          </select>
          {formik.touched.cabinClass && formik.errors.cabinClass && (
            <p className="text-red-500 text-xs font-medium mt-1">{formik.errors.cabinClass}</p>
          )}
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-1.5">Layout *</label>
          <select
            name="layout"
            value={formik.values.layout}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 bg-white text-gray-800 shadow-xs focus:outline-hidden focus:border-blue-500 transition"
          >
            <option value="">Select layout</option>
            <option value="2-2">2-2</option>
            <option value="2-3-2">2-3-2</option>
            <option value="2-4-2">2-4-2</option>
            <option value="3-3">3-3</option>
            <option value="3-3-3">3-3-3</option>
          </select>
          {formik.touched.layout && formik.errors.layout && (
            <p className="text-red-500 text-xs font-medium mt-1">{formik.errors.layout}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-1.5">Start Row *</label>
          <input
            type="number"
            name="startRow"
            value={formik.values.startRow}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 bg-white text-gray-800 shadow-xs focus:outline-hidden focus:border-blue-500 transition"
          />
          {formik.touched.startRow && formik.errors.startRow && (
            <p className="text-red-500 text-xs font-medium mt-1">{formik.errors.startRow}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-1.5">End Row *</label>
          <input
            type="number"
            name="endRow"
            value={formik.values.endRow}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 bg-white text-gray-800 shadow-xs focus:outline-hidden focus:border-blue-500 transition"
          />
          {formik.touched.endRow && formik.errors.endRow && (
            <p className="text-red-500 text-xs font-medium mt-1">{formik.errors.endRow}</p>
          )}
        </div>

        <div className="col-span-1 md:col-span-2 pt-2">
          <button
            type="submit"
            disabled={formik.isSubmitting || isLoading}
            className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-700 disabled:opacity-50 cursor-pointer transition shadow-xs flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {formik.isSubmitting || isLoading ? "Saving..." : "Add Seat Layout"}
          </button>
        </div>
      </form>

      {/* ── Layouts List ── */}
      <div className="space-y-4">
        <h3 className="text-gray-900 text-lg font-bold tracking-tight">Current Seat Layouts ({seatLayouts.length})</h3>
        
        {seatLayouts.length === 0 && (
          <div className="border border-dashed border-gray-300 rounded-2xl p-6 text-center">
            <p className="text-gray-500 text-sm">No seat layouts yet. Create one above.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {seatLayouts.map((layout) => (
            <div key={layout.id} className="p-4 bg-white border border-gray-200 rounded-2xl shadow-xs flex flex-col justify-between hover:border-gray-300 transition">
              <div className="space-y-1.5 text-sm mb-4">
                <div className="flex justify-between items-center pb-1 border-b border-gray-100">
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Cabin Class</span>
                  <span className="text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md text-xs font-bold">{layout.cabinClass}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Layout:</span>
                  <span className="text-gray-800 font-semibold">{layout.layout}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Rows:</span>
                  <span className="text-gray-800 font-semibold">{layout.startRow} - {layout.endRow}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Seats per Row:</span>
                  <span className="text-gray-800 font-semibold">{layout.seatsPerRow}</span>
                </div>
              </div>
              <button
                onClick={() => handleDeleteClick(layout.id)}
                disabled={isLoading}
                className="w-full py-1.5 bg-white border border-red-200 hover:border-red-300 text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold transition disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Seat Generation Metrics Dashboard ── */}
      <div className="border border-gray-200 rounded-2xl bg-gray-50/70 p-6 flex flex-col items-center space-y-6">
        
        <div className="grid grid-cols-3 gap-4 w-full text-center">
          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Aircraft Maximum Capacity</p>
            <p className="text-xl md:text-2xl font-bold text-blue-600 mt-1">{aircraftCapacity}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Total Planned Seats</p>
            <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{totalPlannedSeats}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Generated Seats</p>
            <p className="text-xl md:text-2xl font-bold text-emerald-600 mt-1">{generatedSeatsCount}</p>
          </div>
        </div>

        <div className="w-full flex flex-col items-center">
          <button
            onClick={handleGenerateSeats}
            disabled={!canGenerateSeats || isLoading || totalPlannedSeats > aircraftCapacity}
            className="w-full sm:w-auto px-8 py-2.5 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-xs flex items-center justify-center gap-2"
          >
            <CalendarRange className="w-4 h-4" />
            {isLoading ? "Generating..." : "Generate Seats"}
          </button>

          {totalPlannedSeats > aircraftCapacity && (
            <div className="flex items-center gap-1.5 text-red-600 mt-4 bg-red-50 border border-red-100 rounded-xl px-4 py-2 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>
                Cannot generate: exceeds aircraft capacity ({aircraftCapacity} seats)
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default SeatLayoutForm;