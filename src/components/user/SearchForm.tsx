import React, { useRef, useEffect } from 'react';
import { SearchFlightsRequest } from '../../redux/flight/flightTypes';
import { Destination } from '../../redux/destination/destinationType';

interface SearchFormProps {
  form: SearchFlightsRequest;
  isSearching: boolean;
  fromResults: Destination[];
  toResults: Destination[];
  fromDisplayName: string;
  toDisplayName: string;
  handleFromSearch: (value: string) => void;
  handleToSearch: (value: string) => void;
  selectFrom: (destination: Destination) => void;
  selectTo: (destination: Destination) => void;
  clearFromResults: () => void;
  clearToResults: () => void;
  onChange: (field: keyof SearchFlightsRequest, value: string | number) => void;
  onSearch: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  form,
  isSearching,
  fromResults,
  toResults,
  fromDisplayName,
  toDisplayName,
  handleFromSearch,
  handleToSearch,
  selectFrom,
  selectTo,
  clearFromResults,
  clearToResults,
  onChange,
  onSearch,
}) => {
  const today = new Date().toISOString().split('T')[0];
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(e.target as Node)) {
        clearFromResults();
      }
      if (toRef.current && !toRef.current.contains(e.target as Node)) {
        clearToResults();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [clearFromResults, clearToResults]);

  return (
    <div className="w-full">
      {/* Trip Type Toggle */}
      <div className="flex gap-2 mb-3">
        {(['one-way', 'round-trip'] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange('tripType', type)}
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all border ${
              form.tripType === type
                ? 'bg-[#0a3a8a] text-white border-[#0a3a8a]'
                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
            }`}
          >
            {type === 'one-way' ? 'One Way' : 'Round Trip'}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 divide-y sm:divide-y-0 divide-gray-100">
          {/* FROM */}
          <div className="lg:border-r border-gray-200 relative px-4 py-2.5 lg:col-span-1" ref={fromRef}>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">From</label>
            <input
              type="text"
              value={fromDisplayName}
              onChange={(e) => handleFromSearch(e.target.value)}
              placeholder="City or airport"
              autoComplete="off"
              className="w-full text-gray-900 text-sm font-semibold focus:outline-none placeholder:text-gray-300 placeholder:font-normal"
            />
            {fromResults.length > 0 && (
              <ul className="absolute z-50 left-0 w-72 bg-white text-black rounded-lg max-h-60 overflow-auto shadow-xl border border-gray-200 mt-2">
                {fromResults.map((dest) => (
                  <li
                    key={dest.id}
                    onMouseDown={(e) => { e.preventDefault(); selectFrom(dest); }}
                    className="p-3 cursor-pointer hover:bg-blue-50 border-b last:border-b-0 border-gray-100"
                  >
                    <div className="font-semibold text-sm">{dest.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {dest.iataCode} — {dest.municipality}, {dest.isoCountry}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* TO */}
          <div className="lg:border-r border-gray-200 relative px-4 py-2.5 lg:col-span-1" ref={toRef}>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">To</label>
            <input
              type="text"
              value={toDisplayName}
              onChange={(e) => handleToSearch(e.target.value)}
              placeholder="City or airport"
              autoComplete="off"
              className="w-full text-gray-900 text-sm font-semibold focus:outline-none placeholder:text-gray-300 placeholder:font-normal"
            />
            {toResults.length > 0 && (
              <ul className="absolute z-50 left-0 w-72 bg-white text-black rounded-lg max-h-60 overflow-auto shadow-xl border border-gray-200 mt-2">
                {toResults.map((dest) => (
                  <li
                    key={dest.id}
                    onMouseDown={(e) => { e.preventDefault(); selectTo(dest); }}
                    className="p-3 cursor-pointer hover:bg-blue-50 border-b last:border-b-0 border-gray-100"
                  >
                    <div className="font-semibold text-sm">{dest.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {dest.iataCode} — {dest.municipality}, {dest.isoCountry}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* DEPARTURE */}
          <div className="lg:border-r border-gray-200 px-4 py-2.5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">Departure</label>
            <input
              type="date"
              value={form.departureDate}
              min={today}
              onChange={(e) => onChange('departureDate', e.target.value)}
              className="w-full text-gray-900 text-sm font-semibold focus:outline-none"
            />
          </div>

          {/* RETURN */}
          <div className="lg:border-r border-gray-200 px-4 py-2.5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">Return</label>
            <input
              type="date"
              value={form.returnDate ?? ''}
              min={form.departureDate || today}
              onChange={(e) => onChange('returnDate', e.target.value)}
              disabled={form.tripType === 'one-way'}
              className="w-full text-gray-900 text-sm font-semibold focus:outline-none disabled:text-gray-300 disabled:cursor-not-allowed"
            />
          </div>

          {/* PASSENGERS */}
          <div className="lg:border-r border-gray-200 px-4 py-2.5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">Passengers</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onChange('passengers', Math.max(1, form.passengers - 1))}
                className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition flex items-center justify-center text-sm"
              >
                −
              </button>
              <span className="text-gray-900 font-bold text-sm w-3 text-center">
                {form.passengers}
              </span>
              <button
                type="button"
                onClick={() => onChange('passengers', Math.min(9, form.passengers + 1))}
                className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition flex items-center justify-center text-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <button
            type="button"
            onClick={onSearch}
            disabled={isSearching}
            className="relative overflow-hidden bg-[#0a3a8a] text-white font-bold hover:bg-[#082c6b] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-4 lg:py-0 lg:rounded-r-xl rounded-b-xl lg:rounded-bl-none"
          >
            {isSearching ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="text-sm">Searching...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <span className="text-sm tracking-wide font-bold">Search</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;