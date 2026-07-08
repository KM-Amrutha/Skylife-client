import React, { useEffect, useRef } from 'react';
import { Plane, ArrowLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAircraft from '../../hooks/provider/useAircraft';

const AircraftForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    formik,
    isLoading,
    baseStationSearchResults,
    currentLocationSearchResults,
    baseStationDisplayName,
    currentLocationDisplayName,
    handleBaseStationSearch,
    handleCurrentLocationSearch,
    selectBaseStation,
    selectCurrentLocation,
    clearBaseStationResults,
    clearCurrentLocationResults,
  } = useAircraft();

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

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-100 text-gray-900">
      
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
            <h1 className="text-2xl sm:text-3xl font-bold">Add New Aircraft</h1>
            <p className="text-blue-200 text-sm mt-1">Register a new fleet asset into the operational system</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
          
          {/* Main Specifications Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <Plane className="w-4 h-4 text-[#0a3a8a]" />
              <h2 className="text-gray-900 font-semibold text-sm">Aircraft Specifications</h2>
            </div>
            
            <div className="p-5 space-y-4">
              {/* Aircraft Name */}
              <div>
                <label htmlFor="aircraftName" className={labelClass}>
                  Aircraft Name *
                </label>
                <input
                  type="text"
                  id="aircraftName"
                  name="aircraftName"
                  value={formik.values.aircraftName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter aircraft configuration name"
                  className={`${inputBaseClass} ${
                    formik.touched.aircraftName && formik.errors.aircraftName ? inputErrorClass : ''
                  }`}
                />
                {formik.touched.aircraftName && formik.errors.aircraftName && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.aircraftName}</p>
                )}
              </div>

              {/* Grid Wrapper for Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Aircraft Type */}
                <div>
                  <label htmlFor="aircraftType" className={labelClass}>
                    Aircraft Model Type *
                  </label>
                  <input
                    type="text"
                    id="aircraftType"
                    name="aircraftType"
                    value={formik.values.aircraftType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="e.g., Boeing 737-800"
                    className={`${inputBaseClass} ${
                      formik.touched.aircraftType && formik.errors.aircraftType ? inputErrorClass : ''
                    }`}
                  />
                  {formik.touched.aircraftType && formik.errors.aircraftType && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.aircraftType}</p>
                  )}
                </div>

                {/* Manufacturer */}
                <div>
                  <label htmlFor="manufacturer" className={labelClass}>
                    Manufacturer *
                  </label>
                  <input
                    type="text"
                    id="manufacturer"
                    name="manufacturer"
                    value={formik.values.manufacturer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="e.g., Boeing, Airbus"
                    className={`${inputBaseClass} ${
                      formik.touched.manufacturer && formik.errors.manufacturer ? inputErrorClass : ''
                    }`}
                  />
                  {formik.touched.manufacturer && formik.errors.manufacturer && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.manufacturer}</p>
                  )}
                </div>

                {/* Build Year */}
                <div>
                  <label htmlFor="buildYear" className={labelClass}>
                    Build Year *
                  </label>
                  <input
                    type="number"
                    id="buildYear"
                    name="buildYear"
                    value={formik.values.buildYear || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="e.g., 2020"
                    className={`${inputBaseClass} ${
                      formik.touched.buildYear && formik.errors.buildYear ? inputErrorClass : ''
                    }`}
                  />
                  {formik.touched.buildYear && formik.errors.buildYear && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.buildYear}</p>
                  )}
                </div>

                {/* Seat Capacity */}
                <div>
                  <label htmlFor="seatCapacity" className={labelClass}>
                    Total Seat Capacity *
                  </label>
                  <input
                    type="number"
                    id="seatCapacity"
                    name="seatCapacity"
                    value={formik.values.seatCapacity || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Total seats configuration"
                    className={`${inputBaseClass} ${
                      formik.touched.seatCapacity && formik.errors.seatCapacity ? inputErrorClass : ''
                    }`}
                  />
                  {formik.touched.seatCapacity && formik.errors.seatCapacity && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.seatCapacity}</p>
                  )}
                </div>

                {/* Flying Range */}
                <div>
                  <label htmlFor="flyingRangeKm" className={labelClass}>
                    Maximum Flying Range (km) *
                  </label>
                  <input
                    type="number"
                    id="flyingRangeKm"
                    name="flyingRangeKm"
                    value={formik.values.flyingRangeKm || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Range in kilometers"
                    className={`${inputBaseClass} ${
                      formik.touched.flyingRangeKm && formik.errors.flyingRangeKm ? inputErrorClass : ''
                    }`}
                  />
                  {formik.touched.flyingRangeKm && formik.errors.flyingRangeKm && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.flyingRangeKm}</p>
                  )}
                </div>

                {/* Engine Count */}
                <div>
                  <label htmlFor="engineCount" className={labelClass}>
                    Engine Count *
                  </label>
                  <input
                    type="number"
                    id="engineCount"
                    name="engineCount"
                    value={formik.values.engineCount || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Number of active engines"
                    className={`${inputBaseClass} ${
                      formik.touched.engineCount && formik.errors.engineCount ? inputErrorClass : ''
                    }`}
                  />
                  {formik.touched.engineCount && formik.errors.engineCount && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.engineCount}</p>
                  )}
                </div>
              </div>

              {/* Lavatory Count */}
              <div>
                <label htmlFor="lavatoryCount" className={labelClass}>
                  Lavatory Count *
                </label>
                <input
                  type="number"
                  id="lavatoryCount"
                  name="lavatoryCount"
                  value={formik.values.lavatoryCount || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Number of lavatories onboard"
                  className={`${inputBaseClass} ${
                    formik.touched.lavatoryCount && formik.errors.lavatoryCount ? inputErrorClass : ''
                  }`}
                />
                {formik.touched.lavatoryCount && formik.errors.lavatoryCount && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.lavatoryCount}</p>
                )}
              </div>
            </div>
          </div>

          {/* Operational Deployment Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <Info className="w-4 h-4 text-[#0a3a8a]" />
              <h2 className="text-gray-900 font-semibold text-sm">Deployment & Logistics</h2>
            </div>
            
            <div className="p-5 space-y-4">
              {/* Base Station */}
              <div className="relative" ref={baseStationRef}>
                <label htmlFor="baseStationId" className={labelClass}>
                  Base Station Hub *
                </label>
                <input
                  type="text"
                  id="baseStationId"
                  placeholder="Search base airport name or IATA code..."
                  value={baseStationDisplayName}
                  onChange={(e) => handleBaseStationSearch(e.target.value)}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                  className={`${inputBaseClass} ${
                    formik.touched.baseStationId && formik.errors.baseStationId ? inputErrorClass : ''
                  }`}
                />
                {baseStationSearchResults.length > 0 && (
                  <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl max-h-60 overflow-auto shadow-xl mt-1.5 divide-y divide-gray-100">
                    {baseStationSearchResults.map((dest) => (
                      <li
                        key={dest.id}
                        className="p-3 cursor-pointer hover:bg-slate-50 transition"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          selectBaseStation(dest);
                        }}
                      >
                        <div className="font-semibold text-sm text-gray-900">{dest.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {dest.iataCode || dest.ident} — {dest.municipality}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {formik.touched.baseStationId && formik.errors.baseStationId && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.baseStationId}</p>
                )}
              </div>

              {/* Current Location */}
              <div className="relative" ref={currentLocationRef}>
                <label htmlFor="currentLocationId" className={labelClass}>
                  Current Location *
                </label>
                <input
                  type="text"
                  id="currentLocationId"
                  placeholder="Search current terminal location..."
                  value={currentLocationDisplayName}
                  onChange={(e) => handleCurrentLocationSearch(e.target.value)}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                  className={`${inputBaseClass} ${
                    formik.touched.currentLocationId && formik.errors.currentLocationId ? inputErrorClass : ''
                  }`}
                />
                {currentLocationSearchResults.length > 0 && (
                  <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl max-h-60 overflow-auto shadow-xl mt-1.5 divide-y divide-gray-100">
                    {currentLocationSearchResults.map((dest) => (
                      <li
                        key={dest.id}
                        className="p-3 cursor-pointer hover:bg-slate-50 transition"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          selectCurrentLocation(dest);
                        }}
                      >
                        <div className="font-semibold text-sm text-gray-900">{dest.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {dest.iataCode || dest.ident} — {dest.municipality}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {formik.touched.currentLocationId && formik.errors.currentLocationId && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.currentLocationId}</p>
                )}
              </div>

              {/* Grid Wrapper for Fleet Dates & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Available From */}
                <div>
                  <label htmlFor="availableFrom" className={labelClass}>
                    Available From *
                  </label>
                  <input
                    type="date"
                    id="availableFrom"
                    name="availableFrom"
                    value={
                      formik.values.availableFrom
                        ? new Date(formik.values.availableFrom).toISOString().split('T')[0]
                        : ''
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputBaseClass} ${
                      formik.touched.availableFrom && formik.errors.availableFrom ? inputErrorClass : ''
                    }`}
                  />
                  {formik.touched.availableFrom && formik.errors.availableFrom && (
                    <p className="text-red-500 text-xs mt-1">{String(formik.errors.availableFrom)}</p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className={labelClass}>
                    Operational Status *
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputBaseClass} ${
                      formik.touched.status && formik.errors.status ? inputErrorClass : ''
                    }`}
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                  {formik.touched.status && formik.errors.status && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.status}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
        
<div className="flex justify-center mt-4">
  <button
    type="submit"
    disabled={formik.isSubmitting || isLoading}
    className="w-full sm:w-auto px-12 py-3.5 bg-[#0a3a8a] text-white rounded-2xl font-semibold text-sm hover:bg-[#082e6f] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
  >
    {formik.isSubmitting || isLoading ? 'Saving...' : 'Add Aircraft'}
  </button>
</div>
        </form>
      </div>
    </div>
  );
};

export default AircraftForm;