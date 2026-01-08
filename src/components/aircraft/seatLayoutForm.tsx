import React, { useEffect } from "react";
import useSeatLayout from "../../hooks/useSeatLayout";

const SeatLayoutForm: React.FC = () => {
  const {
    seatTypes,
    seatLayouts,
    isLoading,
    error,
    formik,
    aircraftCapacity,
    totalPlannedSeats,
    canGenerateSeats,
    generatedSeatsCount,
    handleGenerateSeats,
    handleDeleteLayout,
    clearError
  } = useSeatLayout();

  useEffect(() => {
    if (error) {
      alert(error);
      clearError();
    }
  }, [error, clearError]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#00001F] rounded-xl">
      <h2 className="text-white text-2xl mb-6 font-semibold text-center">Configure Seat Layout</h2>

      {/* Seat Layout Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-5">

        {/* Cabin Class */}
        <div>
          <label className="block text-white mb-1">Cabin Class *</label>
          <select
            name="cabinClass"
            value={formik.values.cabinClass}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 rounded border border-gray-400 bg-white text-black"
          >
            <option value="">Select cabin class</option>
            {seatTypes.map((type) => (
              <option key={type._id} value={type.cabinClass}>
                {type.seatTypeName}
              </option>
            ))}
          </select>
          {formik.touched.cabinClass && formik.errors.cabinClass && (
            <p className="text-red-500 text-sm">{formik.errors.cabinClass}</p>
          )}
        </div>

        {/* Layout */}
        <div>
          <label className="block text-white mb-1">Layout *</label>
          <select
            name="layout"
            value={formik.values.layout}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 rounded border border-gray-400 bg-white text-black"
          >
            <option value="">Select layout</option>
            <option value="2-2">2-2</option>
            <option value="2-3-2">2-3-2</option>
            <option value="2-4-2">2-4-2</option>
            <option value="3-3">3-3</option>
            <option value="3-3-3">3-3-3</option>
          </select>
          {formik.touched.layout && formik.errors.layout && (
            <p className="text-red-500 text-sm">{formik.errors.layout}</p>
          )}
        </div>

        {/* Start Row */}
        <div>
          <label className="block text-white mb-1">Start Row *</label>
          <input
            type="number"
            name="startRow"
            value={formik.values.startRow}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 rounded border border-gray-400 bg-white text-black"
            min={1}
          />
          {formik.touched.startRow && formik.errors.startRow && (
            <p className="text-red-500 text-sm">{formik.errors.startRow}</p>
          )}
        </div>

        {/* End Row */}
        <div>
          <label className="block text-white mb-1">End Row *</label>
          <input
            type="number"
            name="endRow"
            value={formik.values.endRow}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 rounded border border-gray-400 bg-white text-black"
            min={formik.values.startRow || 1}
          />
          {formik.touched.endRow && formik.errors.endRow && (
            <p className="text-red-500 text-sm">{formik.errors.endRow}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting || isLoading}
          className="w-full py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 cursor-pointer transition"
        >
          {formik.isSubmitting || isLoading ? "Saving..." : "Add Seat Layout"}
        </button>
      </form>

      {/* Display Seat Layouts */}
      <div className="mt-8 text-white">
        <h3 className="text-xl font-semibold mb-4">Current Seat Layouts ({seatLayouts.length})</h3>
        {seatLayouts.length === 0 && <p>No seat layouts yet. Create one above.</p>}
        {seatLayouts.map((layout) => (
          <div key={layout._id} className="mb-3 p-3 bg-gray-800 rounded flex justify-between items-start">
            <div className="flex-1">
              <p><strong>Cabin Class:</strong> {layout.cabinClass}</p>
              <p><strong>Layout:</strong> {layout.layout}</p>
              <p><strong>Rows:</strong> {layout.startRow} - {layout.endRow}</p>
              <p><strong>Seats per Row:</strong> {layout.seatsPerRow}</p>
            </div>
            <button
              onClick={() => handleDeleteLayout(layout._id)}
              disabled={isLoading}
              className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Seat Generation */}
            {/* Seat Generation */}
      <div className="mt-6 text-white text-center space-y-4">
        <div>
          <p className="text-gray-400 text-sm">Aircraft Maximum Capacity</p>
          <p className="text-3xl font-bold text-blue-300">{aircraftCapacity}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Total Planned Seats</p>
          <p className="text-2xl font-bold">{totalPlannedSeats}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Generated Seats</p>
          <p className="text-2xl font-bold text-green-300">{generatedSeatsCount}</p>
        </div>

        <button
          onClick={handleGenerateSeats}
          disabled={!canGenerateSeats || isLoading || totalPlannedSeats > aircraftCapacity}
          className="py-3 px-8 bg-green-600 rounded text-white font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isLoading ? "Generating..." : "Generate Seats"}
        </button>

        {totalPlannedSeats > aircraftCapacity && (
          <p className="text-red-400 text-sm mt-3">
            Cannot generate: exceeds aircraft capacity ({aircraftCapacity} seats)
          </p>
        )}
      </div>
    </div>
  );
};

export default SeatLayoutForm;