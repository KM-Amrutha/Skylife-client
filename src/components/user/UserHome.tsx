import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../redux/auth/authTypes';
import { SearchFlightsRequest, SearchFlightResult } from '../../redux/flight/flightTypes';
import { Destination } from '../../redux/destination/destinationType';
import SearchForm from './SearchForm';
import Pagination from '../../layouts/Pagination';

interface UserHomeProps {
  user: User | null;
  userName: string;
  form: SearchFlightsRequest;
  isSearching: boolean;
  outboundResults: SearchFlightResult[];
  returnResults: SearchFlightResult[];
  filteredOutbound: SearchFlightResult[];
  filteredReturn: SearchFlightResult[];
  searchError: string | null;
  hasSearched: boolean;
  fromResults: Destination[];
  toResults: Destination[];
  fromDisplayName: string;
  toDisplayName: string;
  isDropdownOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  toggleDropdown: () => void;
  handleSignOut: () => Promise<void>;
  goToDashboard: () => void;
  handleFromSearch: (value: string) => void;
  handleToSearch: (value: string) => void;
  selectFrom: (destination: Destination) => void;
  selectTo: (destination: Destination) => void;
  clearFromResults: () => void;
  clearToResults: () => void;
  onChange: (field: keyof SearchFlightsRequest, value: string | number) => void;
  onSearch: () => void;
  onClear: () => void;
  maxPrice: number;
  priceFilter: number;
  baggageFilter: number;
  stopsFilter: "all" | "direct";
  setPriceFilter: (v: number) => void;
  setBaggageFilter: (v: number) => void;
  setStopsFilter: (v: "all" | "direct") => void;
  searchPagination: {
  outbound: { currentPage: number; totalPages: number; totalCount: number };
  return?: { currentPage: number; totalPages: number; totalCount: number };
} | null;
handlePageChange: (page: number) => void;
}

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h${m > 0 ? ` ${m}m` : ''}`;
};

const getLowestFare = (baseFare: SearchFlightResult['baseFare']): number =>
  Math.min(...(Object.values(baseFare).filter(Boolean) as number[]));

const FlightCard: React.FC<{
  flight: SearchFlightResult;
  onSelect: (id: string) => void;
}> = ({ flight, onSelect }) => (
  <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl p-5 hover:bg-white/12 hover:border-white/25 transition-all duration-200">
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="sm:w-36 flex-shrink-0">
        <p className="text-white font-bold text-base leading-tight">{flight.aircraftName}</p>
        <p className="text-white/40 text-xs mt-0.5">{flight.flightNumber}</p>
      </div>

      <div className="flex-1 flex items-center gap-3 min-w-0">
        <div className="text-center flex-shrink-0">
          <p className="text-white font-bold text-xl leading-none">{formatTime(flight.departure.time)}</p>
          <p className="text-white/60 text-xs font-semibold mt-1">{flight.departure.iataCode}</p>
          <p className="text-white/30 text-xs">{flight.departure.name}</p>
        </div>

        <div className="flex-1 flex flex-col items-center gap-1 min-w-0">
          <p className="text-white/40 text-xs">{formatDuration(flight.durationMinutes)}</p>
          <div className="flex items-center w-full gap-1">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-white/50 text-xs">✈</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>
        </div>

        <div className="text-center flex-shrink-0">
          <p className="text-white font-bold text-xl leading-none">{formatTime(flight.arrival.time)}</p>
          <p className="text-white/60 text-xs font-semibold mt-1">{flight.arrival.iataCode}</p>
          <p className="text-white/30 text-xs">{flight.arrival.name}</p>
        </div>
      </div>

      <div className="hidden md:flex flex-wrap gap-1 sm:w-32 justify-center flex-shrink-0">
        {flight.availableClasses.map((cls) => (
          <span key={cls} className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60 capitalize">
            {cls === 'premium_economy' ? 'Prem.Eco' : cls.charAt(0).toUpperCase() + cls.slice(1)}
          </span>
        ))}
      </div>

      <div className="hidden md:block text-center flex-shrink-0 sm:w-20">
        <p className="text-white/40 text-xs">Cabin</p>
        <p className="text-white/70 text-sm font-semibold">{flight.baggageRules?.freeCabinKg ?? 0}kg</p>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:gap-1 flex-shrink-0 sm:w-32">
        <div className="text-right">
          <p className="text-white/40 text-xs">from</p>
          <p className="text-white font-bold text-xl leading-tight">
            ₹{getLowestFare(flight.baseFare).toLocaleString('en-IN')}
          </p>
        </div>
        <button
          onClick={() => onSelect(flight._id)}
          className="bg-white text-[#001233] font-bold text-sm px-5 py-2 rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap"
        >
          Select →
        </button>
      </div>
    </div>
  </div>
);

const FlightSection: React.FC<{
  title: string;
  flights: SearchFlightResult[];
  total: number;
  onSelect: (id: string) => void;
  onResetFilters: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isSearching: boolean;
}> = ({ title, flights, total, onSelect, onResetFilters, currentPage, totalPages, onPageChange, isSearching }) => (
  <div className="mb-8">
    <h3 className="text-white font-bold text-base mb-3">
      {title}
      <span className="text-white/40 font-normal text-sm ml-2">
        {flights.length} of {total}
      </span>
    </h3>
    {flights.length === 0 ? (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
        <p className="text-white/50">No flights match your filters.</p>
        <button onClick={onResetFilters} className="mt-2 text-sm text-white/40 hover:text-white underline">
          Reset filters
        </button>
      </div>
    ) : (
      <div className="flex flex-col gap-3">
        {flights.map((flight) => (
          <FlightCard key={flight._id} flight={flight} onSelect={onSelect} />
        ))}
      </div>
    )}
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      isLoading={isSearching}
      onPageChange={onPageChange}
    />
  </div>
);

const UserHome: React.FC<UserHomeProps> = ({
  userName, form, isSearching,
  outboundResults, returnResults, filteredOutbound, filteredReturn,
  searchError, hasSearched, fromResults, toResults,
  fromDisplayName, toDisplayName, isDropdownOpen, dropdownRef,
  toggleDropdown, handleSignOut, goToDashboard,
  handleFromSearch, handleToSearch, selectFrom, selectTo,
  clearFromResults, clearToResults, onChange, onSearch, onClear,
  maxPrice, priceFilter, baggageFilter, 
  setPriceFilter, setBaggageFilter, setStopsFilter,
  searchPagination,handlePageChange,
}) => {
  const navigate = useNavigate();

  const totalResults = outboundResults.length + returnResults.length;
  const hasResults = totalResults > 0;

  const handleSelect = (id: string) => navigate(`/user/flights/${id}`);

  const resetFilters = () => {
    setPriceFilter(maxPrice);
    setBaggageFilter(0);
    setStopsFilter("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] text-white">

      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-8 py-5 border-b border-white/10">
        <span className="text-lg font-semibold tracking-wide">Skylife</span>
        <div className="flex items-center gap-6">
          <span className="text-sm text-white/60 hidden md:block">Help</span>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 bg-white text-[#001233] px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              <span>Hi, {userName}</span>
              <svg className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                <button onClick={goToDashboard}
                  className="w-full px-4 py-3 text-left text-[#001233] hover:bg-gray-50 text-sm font-medium transition-colors">
                  My Dashboard
                </button>
                <div className="border-t border-gray-100" />
                <button onClick={handleSignOut}
                  className="w-full px-4 py-3 text-left text-red-500 hover:bg-red-50 text-sm font-medium transition-colors">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      {!hasSearched && (
        <div className="text-center mt-14 px-6">
          <div className="flex justify-center items-center gap-3 mb-4">
            <img src="/image/gemlogo.png" alt="Skylife" className="h-10" />
            <h2 className="text-3xl font-bold">Skylife</h2>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Millions of cheap flights.<br />One simple search.
          </h1>
        </div>
      )}

      {/* Search Form */}
      <div className={`px-4 md:px-8 ${hasSearched ? 'mt-6' : 'mt-10'}`}>
        <SearchForm
          form={form} isSearching={isSearching}
          fromResults={fromResults} toResults={toResults}
          fromDisplayName={fromDisplayName} toDisplayName={toDisplayName}
          handleFromSearch={handleFromSearch} handleToSearch={handleToSearch}
          selectFrom={selectFrom} selectTo={selectTo}
          clearFromResults={clearFromResults} clearToResults={clearToResults}
          onChange={onChange} onSearch={onSearch}
        />
      </div>

      {/* Results */}
      {hasSearched && (
        <div className="mt-8 max-w-7xl mx-auto px-4 md:px-8 pb-16">

          {isSearching && (
            <div className="flex flex-col items-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              <p className="text-white/60 text-lg">Searching for flights...</p>
            </div>
          )}

          {!isSearching && searchError && (
            <div className="bg-red-500/20 border border-red-400/30 rounded-2xl p-6 text-center">
              <p className="text-red-300 font-medium">{searchError}</p>
              <button onClick={onClear} className="mt-3 text-sm text-white/50 hover:text-white underline">
                Try again
              </button>
            </div>
          )}

          {!isSearching && !searchError && !hasResults && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <p className="text-5xl mb-4">✈️</p>
              <p className="text-white text-xl font-semibold">No flights found</p>
              <p className="text-white/50 mt-2">Try different dates or destinations</p>
              <button onClick={onClear}
                className="mt-6 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition">
                Clear Search
              </button>
            </div>
          )}

          {!isSearching && !searchError && hasResults && (
            <div className="flex flex-col lg:flex-row gap-6">

              {/* Sidebar */}
              <aside className="w-full lg:w-64 flex-shrink-0">
                <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl p-5 sticky top-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-white text-base">Filters</h3>
                    <button onClick={resetFilters} className="text-xs text-white/40 hover:text-white/70 transition-colors">
                      Reset
                    </button>
                  </div>

                  <div className="mb-6">
                    <p className="text-white/70 text-sm font-semibold mb-3">Max Price</p>
                    <input
                      type="range" min={0} max={maxPrice} step={500}
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(Number(e.target.value))}
                      className="w-full accent-white"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-white/40 text-xs">₹0</span>
                      <span className="text-white font-semibold text-sm">₹{priceFilter.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-white/70 text-sm font-semibold mb-3">Free Cabin Baggage</p>
                    {[0, 5, 7, 10, 15].map((kg) => (
                      <label key={kg} className="flex items-center gap-2 mb-2 cursor-pointer group">
                        <input
                          type="radio" name="baggage"
                          checked={baggageFilter === kg}
                          onChange={() => setBaggageFilter(kg)}
                          className="accent-white"
                        />
                        <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                          {kg === 0 ? 'Any' : `${kg}kg+`}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/40 text-xs text-center">
                      {filteredOutbound.length + filteredReturn.length} of {totalResults} flights
                    </p>
                  </div>
                </div>
              </aside>

              {/* Flight Cards */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-white font-semibold">
                    {totalResults} flight{totalResults !== 1 ? 's' : ''} found
                  </p>
                  <button onClick={onClear} className="text-sm text-white/40 hover:text-white underline transition">
                    Clear
                  </button>
                </div>

               <FlightSection
  title="Outbound Flights"
  flights={filteredOutbound}
  total={searchPagination?.outbound.totalCount ?? outboundResults.length}
  onSelect={handleSelect}
  onResetFilters={resetFilters}
  currentPage={searchPagination?.outbound.currentPage ?? 1}
  totalPages={searchPagination?.outbound.totalPages ?? 1}
  onPageChange={handlePageChange}
  isSearching={isSearching}
/>

{returnResults.length > 0 && (
  <FlightSection
    title="Return Flights"
    flights={filteredReturn}
    total={searchPagination?.return?.totalCount ?? returnResults.length}
    onSelect={handleSelect}
    onResetFilters={resetFilters}
    currentPage={searchPagination?.return?.currentPage ?? 1}
    totalPages={searchPagination?.return?.totalPages ?? 1}
    onPageChange={handlePageChange}
    isSearching={isSearching}
  />
)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hero Banner */}
      {!hasSearched && (
        <div
          className="mt-20 mx-4 md:mx-8 rounded-3xl h-80 md:h-[500px] flex items-center relative overflow-hidden shadow-2xl"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,18,51,0.85), transparent 70%), url(/image/wall2.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="ml-8 md:ml-12 max-w-xl">
            <h2 className="text-5xl md:text-7xl font-bold leading-none">Skylife for Life.</h2>
            <p className="text-lg md:text-2xl mt-6 text-white/80">Your journey starts here.</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 px-6 md:px-8 py-8 text-sm border-t border-white/10">
        <div className="flex flex-wrap justify-between items-center gap-4 max-w-7xl mx-auto text-white/40">
          <span>India · English (UK) · INR</span>
          <div className="flex flex-wrap gap-6">
            <span>Help</span>
            <span>Privacy</span>
            <span>Company</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserHome;