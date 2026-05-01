import React, { useEffect, useRef } from 'react';
import { FormikProps } from 'formik';
import { CreateAircraftDTO } from '../../redux/aircraft/aircraftTypes';
import { Destination } from '../../redux/destination/destinationType';

interface EditAircraftFormProps {
  formik: FormikProps<Partial<CreateAircraftDTO>>;
  isLoading: boolean;
  baseStationResults: Destination[];
  currentLocationResults: Destination[];
  baseStationDisplayName: string;
  currentLocationDisplayName: string;
  handleBaseStationSearch: (value: string) => void;
  handleCurrentLocationSearch: (value: string) => void;
  selectBaseStation: (destination: Destination) => void;
  selectCurrentLocation: (destination: Destination) => void;
  clearBaseStationResults: () => void;
  clearCurrentLocationResults: () => void;
}

const EditAircraftForm: React.FC<EditAircraftFormProps> = ({
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
}) => {
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
    <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
      <h2 className="text-white text-3xl font-bold mb-8">Edit Aircraft</h2>

      {/* Aircraft Name */}
      <div>
        <label className="block text-white mb-2">Aircraft Name *</label>
        <input
          type="text"
          name="aircraftName"
          value={formik.values.aircraftName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${inputBaseClass} ${formik.touched.aircraftName && formik.errors.aircraftName ? inputErrorClass : ''}`}
        />
        {formik.touched.aircraftName && formik.errors.aircraftName && (
          <p className="text-red-400 text-xs mt-1">{formik.errors.aircraftName}</p>
        )}
      </div>

      {/* Build Year + Seat Capacity */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white mb-2">Build Year *</label>
          <input
            type="number"
            name="buildYear"
            value={formik.values.buildYear}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${inputBaseClass} ${formik.touched.buildYear && formik.errors.buildYear ? inputErrorClass : ''}`}
          />
          {formik.touched.buildYear && formik.errors.buildYear && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.buildYear}</p>
          )}
        </div>
        <div>
          <label className="block text-white mb-2">Seat Capacity *</label>
          <input
            type="number"
            name="seatCapacity"
            value={formik.values.seatCapacity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${inputBaseClass} ${formik.touched.seatCapacity && formik.errors.seatCapacity ? inputErrorClass : ''}`}
          />
          {formik.touched.seatCapacity && formik.errors.seatCapacity && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.seatCapacity}</p>
          )}
        </div>
      </div>

      {/* Flying Range + Engine Count */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white mb-2">Flying Range (km) *</label>
          <input
            type="number"
            name="flyingRangeKm"
            value={formik.values.flyingRangeKm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${inputBaseClass} ${formik.touched.flyingRangeKm && formik.errors.flyingRangeKm ? inputErrorClass : ''}`}
          />
          {formik.touched.flyingRangeKm && formik.errors.flyingRangeKm && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.flyingRangeKm}</p>
          )}
        </div>
        <div>
          <label className="block text-white mb-2">Engine Count *</label>
          <input
            type="number"
            name="engineCount"
            value={formik.values.engineCount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${inputBaseClass} ${formik.touched.engineCount && formik.errors.engineCount ? inputErrorClass : ''}`}
          />
          {formik.touched.engineCount && formik.errors.engineCount && (
            <p className="text-red-400 text-xs mt-1">{formik.errors.engineCount}</p>
          )}
        </div>
      </div>

      {/* Lavatory Count + Status */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white mb-2">Lavatory Count</label>
          <input
            type="number"
            name="lavatoryCount"
            value={formik.values.lavatoryCount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={inputBaseClass}
          />
        </div>
        <div>
          <label className="block text-white mb-2">Status *</label>
          <select
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            className={`${inputBaseClass} bg-[#00001F]`}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Available From */}
      <div>
        <label className="block text-white mb-2">Available From *</label>
        <input
          type="date"
          name="availableFrom"
          value={formik.values.availableFrom as string}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${inputBaseClass} ${formik.touched.availableFrom && formik.errors.availableFrom ? inputErrorClass : ''}`}
        />
        {formik.touched.availableFrom && formik.errors.availableFrom && (
          <p className="text-red-400 text-xs mt-1">{formik.errors.availableFrom as string}</p>
        )}
      </div>

      {/* Base Station */}
      <div ref={baseStationRef} className="relative">
        <label className="block text-white mb-2">Base Station *</label>
        <input
          type="text"
          placeholder="Type airport name or city..."
          value={baseStationDisplayName}
          onChange={(e) => handleBaseStationSearch(e.target.value)}
          autoComplete="off"
          className={`${inputBaseClass} ${formik.touched.baseStationId && formik.errors.baseStationId ? inputErrorClass : ''}`}
        />
        {baseStationResults.length > 0 && (
          <ul className="absolute z-50 w-full bg-white text-black rounded-b-lg max-h-60 overflow-auto shadow-lg mt-1">
            {baseStationResults.map((dest) => (
              <li
                key={dest._id}
                className="p-3 cursor-pointer hover:bg-gray-200 border-b last:border-b-0"
                onMouseDown={(e) => { e.preventDefault(); selectBaseStation(dest); }}
              >
                <div className="font-medium">{dest.name}</div>
                <div className="text-sm text-gray-700">{dest.iataCode || dest.ident} - {dest.municipality}</div>
              </li>
            ))}
          </ul>
        )}
        {formik.touched.baseStationId && formik.errors.baseStationId && (
          <p className="text-red-400 text-xs mt-1">{formik.errors.baseStationId}</p>
        )}
      </div>

      {/* Current Location */}
      <div ref={currentLocationRef} className="relative">
        <label className="block text-white mb-2">Current Location *</label>
        <input
          type="text"
          placeholder="Type airport name or city..."
          value={currentLocationDisplayName}
          onChange={(e) => handleCurrentLocationSearch(e.target.value)}
          autoComplete="off"
          className={`${inputBaseClass} ${formik.touched.currentLocationId && formik.errors.currentLocationId ? inputErrorClass : ''}`}
        />
        {currentLocationResults.length > 0 && (
          <ul className="absolute z-50 w-full bg-white text-black rounded-b-lg max-h-60 overflow-auto shadow-lg mt-1">
            {currentLocationResults.map((dest) => (
              <li
                key={dest._id}
                className="p-3 cursor-pointer hover:bg-gray-200 border-b last:border-b-0"
                onMouseDown={(e) => { e.preventDefault(); selectCurrentLocation(dest); }}
              >
                <div className="font-medium">{dest.name}</div>
                <div className="text-sm text-gray-700">{dest.iataCode || dest.ident} - {dest.municipality}</div>
              </li>
            ))}
          </ul>
        )}
        {formik.touched.currentLocationId && formik.errors.currentLocationId && (
          <p className="text-red-400 text-xs mt-1">{formik.errors.currentLocationId}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex-1 py-3 border border-white/20 rounded-xl text-white hover:bg-white/10 font-medium transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/50 disabled:opacity-50"
        >
          {formik.isSubmitting ? 'Updating...' : 'Update Aircraft'}
        </button>
      </div>
    </form>
  );
};

export default EditAircraftForm;