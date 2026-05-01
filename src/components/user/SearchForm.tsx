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

//  console.log('fromResults in SearchForm:', fromResults);
//  console.log('toResults in SearchForm:', toResults);


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
      <div className="flex gap-3 mb-4">
        {(['one-way', 'round-trip'] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange('tripType', type)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
              form.tripType === type
                ? 'bg-white text-[#001233]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {type === 'one-way' ? 'One Way' : 'Round Trip'}
          </button>
        ))}
      </div>

      {/* Search Bar */}
<div className="bg-white rounded-2xl shadow-2xl">
  <div className="grid grid-cols-6">

    {/* FROM */}
    <div className="border-r border-gray-100 relative" ref={fromRef}>
      <div className="px-6 pt-4 pb-1 text-xs font-bold text-gray-400 uppercase tracking-widest">From</div>
      <input
        type="text"
        value={fromDisplayName}
        onChange={(e) => handleFromSearch(e.target.value)}
        placeholder="City or airport"
        autoComplete="off"
        className="w-full px-6 pb-5 text-gray-800 text-base font-medium focus:outline-none focus:bg-blue-50 transition-colors placeholder:text-gray-300"
      />
      {fromResults.length > 0 && (
        <ul className="absolute z-50 w-72 bg-white text-black rounded-xl max-h-60 overflow-auto shadow-2xl border border-gray-100 mt-1">
          {fromResults.map((dest) => (
            <li
              key={dest._id}
              onMouseDown={(e) => { e.preventDefault(); selectFrom(dest); }}
              className="p-3 cursor-pointer hover:bg-blue-50 border-b last:border-b-0"
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
    <div className="border-r border-gray-100 relative" ref={toRef}>
      <div className="px-6 pt-4 pb-1 text-xs font-bold text-gray-400 uppercase tracking-widest">To</div>
      <input
        type="text"
        value={toDisplayName}
        onChange={(e) => handleToSearch(e.target.value)}
        placeholder="City or airport"
        autoComplete="off"
        className="w-full px-6 pb-5 text-gray-800 text-base font-medium focus:outline-none focus:bg-blue-50 transition-colors placeholder:text-gray-300"
      />
      {toResults.length > 0 && (
        <ul className="absolute z-50 w-72 bg-white text-black rounded-xl max-h-60 overflow-auto shadow-2xl border border-gray-100 mt-1">
          {toResults.map((dest) => (
            <li
              key={dest._id}
              onMouseDown={(e) => { e.preventDefault(); selectTo(dest); }}
              className="p-3 cursor-pointer hover:bg-blue-50 border-b last:border-b-0"
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
    <div className="border-r border-gray-100">
      <div className="px-6 pt-4 pb-1 text-xs font-bold text-gray-400 uppercase tracking-widest">Departure</div>
      <input
        type="date"
        value={form.departureDate}
        min={today}
        onChange={(e) => onChange('departureDate', e.target.value)}
        className="w-full px-6 pb-5 text-gray-800 text-base font-medium focus:outline-none focus:bg-blue-50 transition-colors"
      />
    </div>

    {/* RETURN */}
    <div className="border-r border-gray-100">
      <div className="px-6 pt-4 pb-1 text-xs font-bold text-gray-400 uppercase tracking-widest">Return</div>
      <input
        type="date"
        value={form.returnDate ?? ''}
        min={form.departureDate || today}
        onChange={(e) => onChange('returnDate', e.target.value)}
        disabled={form.tripType === 'one-way'}
        className="w-full px-6 pb-5 text-gray-800 text-base font-medium focus:outline-none focus:bg-blue-50 transition-colors disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
      />
    </div>

    {/* PASSENGERS */}
    <div className="border-r border-gray-100">
      <div className="px-6 pt-4 pb-1 text-xs font-bold text-gray-400 uppercase tracking-widest">Passengers</div>
      <div className="flex items-center px-6 pb-5 gap-4 mt-1">
        <button
          type="button"
          onClick={() => onChange('passengers', Math.max(1, form.passengers - 1))}
          className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition flex items-center justify-center text-lg"
        >
          −
        </button>
        <span className="text-gray-800 font-bold text-lg w-4 text-center">
          {form.passengers}
        </span>
        <button
          type="button"
          onClick={() => onChange('passengers', Math.min(9, form.passengers + 1))}
          className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition flex items-center justify-center text-lg"
        >
          +
        </button>
      </div>
    </div>

    {/* SEARCH BUTTON — full height */}
    <button
      type="button"
      onClick={onSearch}
      disabled={isSearching}
      className="relative overflow-hidden bg-gradient-to-br from-[#001233] to-[#0a3a8a] text-white font-bold hover:from-[#0a3a8a] hover:to-[#001233] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-2 rounded-r-2xl group"
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />

      {isSearching ? (
        <>
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span className="text-sm">Searching...</span>
        </>
      ) : (
        <>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </div>
          <span className="text-base tracking-wide font-bold">Search</span>
        </>
      )}
    </button>

  </div>
</div>

     
    </div>
  );
   
};

export default SearchForm;