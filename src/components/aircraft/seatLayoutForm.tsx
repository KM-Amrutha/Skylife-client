import React, { useEffect } from "react";
import useSeatLayout from "../../hooks/useSeatLayout";

const SeatLayoutForm: React.FC = () => {
  const {
    seatTypes,
    seatLayouts,
    isLoading,
    error,
    formik,
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
      <div className="mt-6 text-white text-center">
        <p className="mb-2">Total Planned Seats: {totalPlannedSeats}</p>
        <p className="mb-4">Generated Seats: {generatedSeatsCount}</p>
        <button
          onClick={handleGenerateSeats}
          disabled={!canGenerateSeats || isLoading}
          className="py-3 px-6 bg-green-600 rounded text-white font-semibold hover:bg-green-700 disabled:opacity-50 cursor-pointer transition"
        >
          Generate Seats
        </button>
      </div>
    </div>
  );
};

export default SeatLayoutForm;