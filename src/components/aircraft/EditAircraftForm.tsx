import React, { useEffect, useRef } from 'react';
import { Plane, ArrowLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useEditAircraft from '../../hooks/provider/useEditAircraft';

const EditAircraftForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    aircraft,
    isLoading,
    formik,
    baseStationResults,
    currentLocationResults,
    baseStationDisplayName,
    currentLocationDisplayName,
    handleBaseStationSearch,
    handleCurrentLocationSearch,
    selectBaseStation,
    selectCurrentLocation,
    clearBaseStationResults,
    clearCurrentLocationResults,
  } = useEditAircraft();

  const baseStationRef = useRef<HTMLDivElement>(null);
  const currentLocationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (baseStationRef.current && !baseStationRef.current.contains(event.target as Node)) {
        clearBaseStationResults();
      }
      if (currentLocationRef.current && !currentLocationRef.current.contains(event.target as Node)) {
        clearCurrentLocationResults();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [clearBaseStationResults, clearCurrentLocationResults]);

  const labelClass = "block text-gray-700 text-xs font-bold mb-1.5";

  const inputBaseClass =
    'w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-300 placeholder-gray-400 ' +
    'text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0a3a8a]/20 focus:border-[#0a3a8a] ' +
    'transition duration-200 ease-in-out text-sm';

  const inputErrorClass = 'border-red-400 focus:ring-red-100 focus:border-red-500 bg-red-50/30';

  if (isLoading && !aircraft) {
    return (
    
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#0a3a8a] rounded-full animate-spin" />
        </div>
    
    );
  }

  if (!aircraft) {
    return (
  
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-sm shadow-sm">
            <p className="text-red-600 text-sm mb-4">Aircraft not found</p>
            <button
              onClick={() => navigate("/provider/aircrafts")}
              className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition"
            >
              Back to Fleet
            </button>
          </div>
        </div>
    
    );
  }

  return (
    
      <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-100 text-gray-900 pb-12">
        
        {/* Top Header Card */}
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
              <h1 className="text-2xl sm:text-3xl font-bold">Edit Aircraft</h1>
              <p className="text-blue-200 text-sm mt-1">Modify details for {aircraft.aircraftName || "Fleet Asset"}</p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
          <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
            
            {/* Specifications Card */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
                <Plane className="w-4 h-4 text-[#0a3a8a]" />
                <h2 className="text-gray-900 font-semibold text-sm">Aircraft Specifications</h2>
              </div>
              
              <div className="p-5 space-y-4">
                {/* Aircraft Name */}
                <div>
                  <label className={labelClass}>Aircraft Name *</label>
                  <input
                    type="text"
                    name="aircraftName"
                    value={formik.values.aircraftName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputBaseClass} ${formik.touched.aircraftName && formik.errors.aircraftName ? inputErrorClass : ''}`}
                  />
                  {formik.touched.aircraftName && formik.errors.aircraftName && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.aircraftName}</p>
                  )}
                </div>

                {/* Build Year + Seat Capacity Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Build Year *</label>
                    <input
                      type="number"
                      name="buildYear"
                      value={formik.values.buildYear}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputBaseClass} ${formik.touched.buildYear && formik.errors.buildYear ? inputErrorClass : ''}`}
                    />
                    {formik.touched.buildYear && formik.errors.buildYear && (
                      <p className="text-red-500 text-xs mt-1">{formik.errors.buildYear}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Seat Capacity *</label>
                    <input
                      type="number"
                      name="seatCapacity"
                      value={formik.values.seatCapacity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputBaseClass} ${formik.touched.seatCapacity && formik.errors.seatCapacity ? inputErrorClass : ''}`}
                    />
                    {formik.touched.seatCapacity && formik.errors.seatCapacity && (
                      <p className="text-red-500 text-xs mt-1">{formik.errors.seatCapacity}</p>
                    )}
                  </div>
                </div>

                {/* Flying Range + Engine Count Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Flying Range (km) *</label>
                    <input
                      type="number"
                      name="flyingRangeKm"
                      value={formik.values.flyingRangeKm}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputBaseClass} ${formik.touched.flyingRangeKm && formik.errors.flyingRangeKm ? inputErrorClass : ''}`}
                    />
                    {formik.touched.flyingRangeKm && formik.errors.flyingRangeKm && (
                      <p className="text-red-500 text-xs mt-1">{formik.errors.flyingRangeKm}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Engine Count *</label>
                    <input
                      type="number"
                      name="engineCount"
                      value={formik.values.engineCount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputBaseClass} ${formik.touched.engineCount && formik.errors.engineCount ? inputErrorClass : ''}`}
                    />
                    {formik.touched.engineCount && formik.errors.engineCount && (
                      <p className="text-red-500 text-xs mt-1">{formik.errors.engineCount}</p>
                    )}
                  </div>
                </div>

                {/* Lavatory Count */}
                <div>
                  <label className={labelClass}>Lavatory Count</label>
                  <input
                    type="number"
                    name="lavatoryCount"
                    value={formik.values.lavatoryCount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={inputBaseClass}
                  />
                </div>
              </div>
            </div>

            {/* Logistics & Deployment Card */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
                <Info className="w-4 h-4 text-[#0a3a8a]" />
                <h2 className="text-gray-900 font-semibold text-sm">Deployment & Logistics</h2>
              </div>

              <div className="p-5 space-y-4">
                {/* Base Station Search */}
                <div ref={baseStationRef} className="relative">
                  <label className={labelClass}>Base Station Hub *</label>
                  <input
                    type="text"
                    placeholder="Search base airport name or city..."
                    value={baseStationDisplayName}
                    onChange={(e) => handleBaseStationSearch(e.target.value)}
                    autoComplete="off"
                    className={`${inputBaseClass} ${formik.touched.baseStationId && formik.errors.baseStationId ? inputErrorClass : ''}`}
                  />
                  {baseStationResults.length > 0 && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl max-h-60 overflow-auto shadow-xl mt-1.5 divide-y divide-gray-100">
                      {baseStationResults.map((dest) => (
                        <li
                          key={dest.id}
                          className="p-3 cursor-pointer hover:bg-slate-50 transition"
                          onMouseDown={(e) => { e.preventDefault(); selectBaseStation(dest); }}
                        >
                          <div className="font-semibold text-sm text-gray-900">{dest.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{dest.iataCode || dest.ident} - {dest.municipality}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {formik.touched.baseStationId && formik.errors.baseStationId && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.baseStationId}</p>
                  )}
                </div>

                {/* Current Location Search */}
                <div ref={currentLocationRef} className="relative">
                  <label className={labelClass}>Current Location *</label>
                  <input
                    type="text"
                    placeholder="Search current terminal location..."
                    value={currentLocationDisplayName}
                    onChange={(e) => handleCurrentLocationSearch(e.target.value)}
                    autoComplete="off"
                    className={`${inputBaseClass} ${formik.touched.currentLocationId && formik.errors.currentLocationId ? inputErrorClass : ''}`}
                  />
                  {currentLocationResults.length > 0 && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl max-h-60 overflow-auto shadow-xl mt-1.5 divide-y divide-gray-100">
                      {currentLocationResults.map((dest) => (
                        <li
                          key={dest.id}
                          className="p-3 cursor-pointer hover:bg-slate-50 transition"
                          onMouseDown={(e) => { e.preventDefault(); selectCurrentLocation(dest); }}
                        >
                          <div className="font-semibold text-sm text-gray-900">{dest.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{dest.iataCode || dest.ident} - {dest.municipality}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {formik.touched.currentLocationId && formik.errors.currentLocationId && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.currentLocationId}</p>
                  )}
                </div>

                {/* Date & Status Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Available From *</label>
                    <input
                      type="date"
                      name="availableFrom"
                      value={
                        formik.values.availableFrom instanceof Date
                          ? formik.values.availableFrom.toISOString().split('T')[0]
                          : formik.values.availableFrom
                          ? new Date(formik.values.availableFrom as unknown as string).toISOString().split('T')[0]
                          : ''
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputBaseClass} ${formik.touched.availableFrom && formik.errors.availableFrom ? inputErrorClass : ''}`}
                    />
                    {formik.touched.availableFrom && formik.errors.availableFrom && (
                      <p className="text-red-500 text-xs mt-1">{String(formik.errors.availableFrom)}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Operational Status *</label>
                    <select
                      name="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      className={inputBaseClass}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Action Button (Centered & Profile-style Shape) */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full sm:w-auto px-12 py-3.5 bg-[#0a3a8a] text-white rounded-2xl font-semibold text-sm hover:bg-[#082e6f] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
              >
                {formik.isSubmitting ? 'Updating...' : 'Update Aircraft'}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default EditAircraftForm;