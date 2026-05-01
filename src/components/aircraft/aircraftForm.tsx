import React, { useEffect, useRef } from 'react';
import useAircraft from '../../hooks/provider/useAircraft';

const AircraftForm: React.FC = () => {
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

  const inputBaseClass =
    'w-full px-3 py-2 rounded-md bg-transparent border border-gray-400 placeholder-gray-400 ' +
    'text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ' +
    'transition duration-200 ease-in-out text-sm';

  const inputErrorClass = 'border-red-500 focus:ring-red-500 focus:border-red-500';

  return (
    <div className="px-8 py-6 max-w-3xl mx-auto">
      <h2 className="text-white text-3xl font-bold mb-8">Add New Aircraft</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
        {/* Aircraft Name */}
        <div>
          <label htmlFor="aircraftName" className="block text-white mb-2">
            Aircraft Name *
          </label>
          <input
            type="text"
            id="aircraftName"
            name="aircraftName"
            value={formik.values.aircraftName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter aircraft name"
            className={`${inputBaseClass} ${
              formik.touched.aircraftName && formik.errors.aircraftName ? inputErrorClass : ''
            }`}
          />
          {formik.touched.aircraftName && formik.errors.aircraftName && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.aircraftName}</p>
          )}
        </div>

        {/* Aircraft Type */}
        <div>
          <label htmlFor="aircraftType" className="block text-white mb-2">
            Aircraft Type *
          </label>
          <input
            type="text"
            id="aircraftType"
            name="aircraftType"
            value={formik.values.aircraftType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="e.g., Boeing 737"
            className={`${inputBaseClass} ${
              formik.touched.aircraftType && formik.errors.aircraftType ? inputErrorClass : ''
            }`}
          />
          {formik.touched.aircraftType && formik.errors.aircraftType && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.aircraftType}</p>
          )}
        </div>

        {/* Manufacturer */}
        <div>
          <label htmlFor="manufacturer" className="block text-white mb-2">
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
            <p className="text-red-400 text-xs mt-1">{formik.errors.manufacturer}</p>
          )}
        </div>

        {/* Build Year */}
        <div>
          <label htmlFor="buildYear" className="block text-white mb-2">
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
            <p className="text-red-400 text-xs mt-1">{formik.errors.buildYear}</p>
          )}
        </div>

        {/* Seat Capacity */}
        <div>
          <label htmlFor="seatCapacity" className="block text-white mb-2">
            Seat Capacity *
          </label>
          <input
            type="number"
            id="seatCapacity"
            name="seatCapacity"
            value={formik.values.seatCapacity || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Total seats"
            className={`${inputBaseClass} ${
              formik.touched.seatCapacity && formik.errors.seatCapacity ? inputErrorClass : ''
            }`}
          />
          {formik.touched.seatCapacity && formik.errors.seatCapacity && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.seatCapacity}</p>
          )}
        </div>

        {/* Flying Range */}
        <div>
          <label htmlFor="flyingRangeKm" className="block text-white mb-2">
            Flying Range (km) *
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
            <p className="text-red-400 text-xs mt-1">{formik.errors.flyingRangeKm}</p>
          )}
        </div>

        {/* Engine Count */}
        <div>
          <label htmlFor="engineCount" className="block text-white mb-2">
            Engine Count *
          </label>
          <input
            type="number"
            id="engineCount"
            name="engineCount"
            value={formik.values.engineCount || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Number of engines"
            className={`${inputBaseClass} ${
              formik.touched.engineCount && formik.errors.engineCount ? inputErrorClass : ''
            }`}
          />
          {formik.touched.engineCount && formik.errors.engineCount && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.engineCount}</p>
          )}
        </div>

        {/* Lavatory Count */}
        <div>
          <label htmlFor="lavatoryCount" className="block text-white mb-2">
            Lavatory Count *
          </label>
          <input
            type="number"
            id="lavatoryCount"
            name="lavatoryCount"
            value={formik.values.lavatoryCount || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Number of lavatories"
            className={`${inputBaseClass} ${
              formik.touched.lavatoryCount && formik.errors.lavatoryCount ? inputErrorClass : ''
            }`}
          />
          {formik.touched.lavatoryCount && formik.errors.lavatoryCount && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.lavatoryCount}</p>
          )}
        </div>

        {/* Base Station */}
        <div className="relative">
          <label htmlFor="baseStationId" className="block text-white mb-2">
            Base Station *
          </label>
          <input
            type="text"
            id="baseStationId"
            placeholder="Type airport name or city..."
            value={baseStationDisplayName}
            onChange={(e) => handleBaseStationSearch(e.target.value)}
            onBlur={formik.handleBlur}
            autoComplete="off"
            className={`${inputBaseClass} ${
              formik.touched.baseStationId && formik.errors.baseStationId ? inputErrorClass : ''
            }`}
          />
          {baseStationSearchResults.length > 0 && (
            <ul className="absolute z-50 w-full bg-white text-black rounded-b-lg max-h-60 overflow-auto shadow-lg mt-1">
              {baseStationSearchResults.map((dest) => (
                <li
                  key={dest._id}
                  className="p-3 cursor-pointer hover:bg-gray-200 border-b last:border-b-0"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectBaseStation(dest);
                  }}
                >
                  <div className="font-medium">{dest.name}</div>
                  <div className="text-sm text-gray-700">
                    {dest.iataCode || dest.ident} - {dest.municipality}
                  </div>
                </li>
              ))}
            </ul>
          )}
          {formik.touched.baseStationId && formik.errors.baseStationId && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.baseStationId}</p>
          )}
        </div>

        {/* Current Location */}
        <div className="relative">
          <label htmlFor="currentLocationId" className="block text-white mb-2">
            Current Location *
          </label>
          <input
            type="text"
            id="currentLocationId"
            placeholder="Type airport name or city..."
            value={currentLocationDisplayName}
            onChange={(e) => handleCurrentLocationSearch(e.target.value)}
            onBlur={formik.handleBlur}
            autoComplete="off"
            className={`${inputBaseClass} ${
              formik.touched.currentLocationId && formik.errors.currentLocationId ? inputErrorClass : ''
            }`}
          />
          {currentLocationSearchResults.length > 0 && (
            <ul className="absolute z-50 w-full bg-white text-black rounded-b-lg max-h-60 overflow-auto shadow-lg mt-1">
              {currentLocationSearchResults.map((dest) => (
                <li
                  key={dest._id}
                  className="p-3 cursor-pointer hover:bg-gray-200 border-b last:border-b-0"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectCurrentLocation(dest);
                  }}
                >
                  <div className="font-medium">{dest.name}</div>
                  <div className="text-sm text-gray-700">
                    {dest.iataCode || dest.ident} - {dest.municipality}
                  </div>
                </li>
              ))}
            </ul>
          )}
          {formik.touched.currentLocationId && formik.errors.currentLocationId && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.currentLocationId}</p>
          )}
        </div>

        {/* Available From */}
        <div>
          <label htmlFor="availableFrom" className="block text-white mb-2">
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
            // <p className="text-red-400 text-xs mt-1">{formik.errors.availableFrom}</p>
            <p className="text-red-400 text-xs mt-1">{String(formik.errors.availableFrom)}</p>

          )}
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-white mb-2">
            Status *
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
            <p className="text-red-400 text-xs mt-1">{formik.errors.status}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting || isLoading}
          className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold text-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {formik.isSubmitting || isLoading ? 'Saving...' : 'Add Aircraft'}
        </button>
      </form>
    </div>
  );
};

export default AircraftForm;
