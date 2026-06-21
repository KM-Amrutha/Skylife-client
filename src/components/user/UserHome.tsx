import React from 'react';
import useFlightSearch from '../../hooks/user/useFlightSearch';
import SearchForm from './SearchForm';
import Pagination from '../../layouts/Pagination';
import UserHeader from '../user/UserHeader';
import { SearchFlightResult } from '../../redux/flight/flightTypes';
import { AMENITY_ICONS, AMENITY_LABELS } from '../../types/amenities';

// ── helpers ──────────────────────────────────────────────────────────────────

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });

const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h${m > 0 ? ` ${m}m` : ''}`;
};

const getLowestFare = (baseFare: SearchFlightResult['baseFare']): number =>
  Math.min(...(Object.values(baseFare).filter(Boolean) as number[]));

// ── sub-components ────────────────────────────────────────────────

const FlightCard: React.FC<{
  flight: SearchFlightResult;
  isSelected: boolean;
  isAddingFlight: boolean;
  onSelect: (id: string) => void;
  onView: () => void;
}> = ({ flight, isSelected, isAddingFlight, onSelect, onView }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200 overflow-hidden">
    <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 min-w-0 w-full">

      <div className="flex items-center gap-2 lg:w-36 lg:flex-shrink-0 min-w-0">
        {flight.providerLogo ? (
          <img src={flight.providerLogo} alt={flight.providerName} className="w-6 h-6 rounded object-cover border border-gray-200 flex-shrink-0" />
        ) : (
          <div className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center flex-shrink-0">
            <span className="text-[#0a3a8a] text-xs">✈</span>
          </div>
        )}
        <div className="min-w-0">
          <p className="text-gray-900 font-bold text-sm leading-tight truncate">
            {flight.providerName ?? flight.aircraftName}
          </p>
          <p className="text-gray-400 text-xs truncate">{flight.flightNumber}</p>
          <p className="text-gray-300 text-xs truncate">{flight.aircraftName}</p>
        </div>
      </div>

      <div className="flex-1 flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="text-center flex-shrink-0 max-w-[110px] sm:max-w-none">
          <p className="text-gray-900 font-bold text-lg sm:text-xl leading-none">{formatTime(flight.departure.time)}</p>
          <p className="text-gray-600 text-xs font-semibold mt-1">{flight.departure.iataCode}</p>
          <p className="text-gray-400 text-[10px] sm:text-xs truncate">{flight.departure.name}</p>
        </div>
        <div className="flex-1 flex flex-col items-center gap-1 min-w-[40px]">
          <p className="text-gray-400 text-[10px] sm:text-xs whitespace-nowrap">{formatDuration(flight.durationMinutes)}</p>
          <div className="flex items-center w-full gap-1">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs flex-shrink-0">✈</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </div>
        <div className="text-center flex-shrink-0 max-w-[110px] sm:max-w-none">
          <p className="text-gray-900 font-bold text-lg sm:text-xl leading-none">{formatTime(flight.arrival.time)}</p>
          <p className="text-gray-600 text-xs font-semibold mt-1">{flight.arrival.iataCode}</p>
          <p className="text-gray-400 text-[10px] sm:text-xs truncate">{flight.arrival.name}</p>
        </div>
      </div>

      <div className="hidden md:flex flex-wrap gap-1 lg:w-32 justify-center flex-shrink-0">
        {flight.availableClasses.map((cls) => (
          <span key={cls} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize">
            {cls === 'premium_economy' ? 'Prem.Eco' : cls.charAt(0).toUpperCase() + cls.slice(1)}
          </span>
        ))}
      </div>

      <div className="hidden md:block text-center flex-shrink-0 lg:w-20">
        <p className="text-gray-400 text-xs">Cabin</p>
        <p className="text-gray-700 text-sm font-semibold">{flight.baggageRules?.freeCabinKg ?? 0}kg</p>
      </div>

      {flight.amenities && flight.amenities.length > 0 && (
        <div className="hidden md:flex flex-wrap gap-1 lg:w-28 flex-shrink-0">
          {flight.amenities.slice(0, 3).map((a) => (
            <span key={a} className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-50 border border-gray-200 text-gray-500">
              {AMENITY_ICONS[a] ?? "✓"} {AMENITY_LABELS[a] ?? a}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between lg:flex-col lg:items-end lg:justify-center gap-3 lg:gap-1 flex-shrink-0 lg:w-32 pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100">
        <div className="text-left lg:text-right">
          <p className="text-gray-400 text-xs">from</p>
          <p className="text-gray-900 font-bold text-lg sm:text-xl leading-tight">
            ₹{getLowestFare(flight.baseFare).toLocaleString('en-IN')}
          </p>
        </div>
        {isSelected ? (
          <button onClick={onView} className="bg-emerald-500 text-white font-bold text-sm px-4 sm:px-5 py-2 rounded-lg hover:bg-emerald-600 transition-colors whitespace-nowrap flex-shrink-0">
            View →
          </button>
        ) : (
          <button onClick={() => onSelect(flight.id)} disabled={isAddingFlight}
            className="bg-[#0a3a8a] text-white font-bold text-sm px-4 sm:px-5 py-2 rounded-lg hover:bg-[#082c6b] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0">
            {isAddingFlight ? 'Adding...' : 'Select →'}
          </button>
        )}
      </div>
    </div>
  </div>
);

const FlightSection: React.FC<{
  title: string;
  flights: SearchFlightResult[];
  total: number;
  onSelect: (id: string) => void;
  onView: () => void;
  onResetFilters: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isSearching: boolean;
  selectedFlightIds: string[];
  isAddingFlight: boolean;
}> = ({ title, flights, total, onSelect, onView, onResetFilters,
  currentPage, totalPages, onPageChange, isSearching, selectedFlightIds, isAddingFlight }) => (
  <div className="mb-8">
    <h3 className="text-gray-900 font-bold text-base mb-3">
      {title}
      <span className="text-gray-400 font-normal text-sm ml-2">{flights.length} of {total}</span>
    </h3>
    {flights.length === 0 ? (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
        <p className="text-gray-500">No flights match your filters.</p>
        <button onClick={onResetFilters} className="mt-2 text-sm text-[#0a3a8a] hover:underline font-medium">
          Reset filters
        </button>
      </div>
    ) : (
      <div className="flex flex-col gap-3">
        {flights.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            isSelected={selectedFlightIds.includes(flight.id)}
            isAddingFlight={isAddingFlight}
            onSelect={onSelect}
            onView={onView}
          />
        ))}
      </div>
    )}
    <Pagination currentPage={currentPage} totalPages={totalPages} isLoading={isSearching} onPageChange={onPageChange} />
  </div>
);

// ── main component ────────────────────────────────────────────────────────────

const UserHome: React.FC = () => {
  const {
    form, handleChange, handleSearch, handleClear,
    outboundResults, returnResults,
    filteredOutbound, filteredReturn,
    isSearching, searchError, hasSearched,
    fromResults, toResults, fromDisplayName, toDisplayName,
    handleFromSearch, handleToSearch, selectFrom, selectTo,
    clearFromResults, clearToResults,
    maxPrice, priceFilter, baggageFilter,
    setPriceFilter, setBaggageFilter, setStopsFilter,
    searchPagination, handlePageChange,
    selectedFlightIds, isAddingFlight, handleSelect, handleViewSegment,
  } = useFlightSearch();

  const totalResults = outboundResults.length + returnResults.length;
  const hasResults = totalResults > 0;

  const cheapest = hasResults
    ? Math.min(...[...outboundResults, ...returnResults].map((f) => getLowestFare(f.baseFare)))
    : 0;
  const fastest = hasResults
    ? [...outboundResults, ...returnResults].reduce((a, b) => (a.durationMinutes < b.durationMinutes ? a : b))
    : null;

  const resetFilters = () => {
    setPriceFilter(maxPrice);
    setBaggageFilter(0);
    setStopsFilter('all');
  };

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-gray-50 text-gray-900">
      <UserHeader />

      {!hasSearched && (
        <div className="text-center mt-14 px-6">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
            Millions of cheap flights.<br />One simple search.
          </h1>
        </div>
      )}

      <div className={`px-4 md:px-8 ${hasSearched ? 'mt-6' : 'mt-8'} max-w-7xl mx-auto`}>
        <SearchForm
          form={form} isSearching={isSearching}
          fromResults={fromResults} toResults={toResults}
          fromDisplayName={fromDisplayName} toDisplayName={toDisplayName}
          handleFromSearch={handleFromSearch} handleToSearch={handleToSearch}
          selectFrom={selectFrom} selectTo={selectTo}
          clearFromResults={clearFromResults} clearToResults={clearToResults}
          onChange={handleChange} onSearch={handleSearch}
        />
      </div>

      {hasSearched && (
        <div className="mt-6 max-w-7xl mx-auto px-4 md:px-8 pb-16">
          {isSearching && (
            <div className="flex flex-col items-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-[#0a3a8a] rounded-full animate-spin" />
              <p className="text-gray-500 text-lg">Searching for flights...</p>
            </div>
          )}

          {!isSearching && searchError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-600 font-medium">{searchError}</p>
              <button onClick={handleClear} className="mt-3 text-sm text-gray-500 hover:text-gray-800 underline">
                Try again
              </button>
            </div>
          )}

          {!isSearching && !searchError && !hasResults && (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
              <p className="text-5xl mb-4">✈️</p>
              <p className="text-gray-900 text-xl font-semibold">No flights found</p>
              <p className="text-gray-500 mt-2">Try different dates or destinations</p>
              <button onClick={handleClear} className="mt-6 px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition">
                Clear Search
              </button>
            </div>
          )}

          {!isSearching && !searchError && hasResults && (
            <>
              {/* Summary strip — Best / Cheapest / Fastest, like real booking sites */}
              <div className="grid grid-cols-3 gap-3 mb-6 max-w-xl">
                <div className="bg-[#0a3a8a] text-white rounded-lg px-4 py-3">
                  <p className="text-xs text-white/70 font-medium">Best</p>
                  <p className="font-bold text-lg">₹{cheapest.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                  <p className="text-xs text-gray-400 font-medium">Cheapest</p>
                  <p className="font-bold text-lg text-gray-900">₹{cheapest.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                  <p className="text-xs text-gray-400 font-medium">Fastest</p>
                  <p className="font-bold text-lg text-gray-900">{fastest ? formatDuration(fastest.durationMinutes) : '-'}</p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                <aside className="w-full lg:w-64 flex-shrink-0">
                  <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-6">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-bold text-gray-900 text-base">Filters</h3>
                      <button onClick={resetFilters} className="text-xs text-[#0a3a8a] hover:underline font-medium">Reset</button>
                    </div>

                    <div className="mb-6">
                      <p className="text-gray-700 text-sm font-semibold mb-3">Max Price</p>
                      <input type="range" min={0} max={maxPrice} step={500} value={priceFilter}
                        onChange={(e) => setPriceFilter(Number(e.target.value))} className="w-full accent-[#0a3a8a]" />
                      <div className="flex justify-between mt-1">
                        <span className="text-gray-400 text-xs">₹0</span>
                        <span className="text-gray-900 font-semibold text-sm">₹{priceFilter.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="mb-2">
                      <p className="text-gray-700 text-sm font-semibold mb-3">Free Cabin Baggage</p>
                      {[0, 5, 7, 10, 15].map((kg) => (
                        <label key={kg} className="flex items-center gap-2 mb-2 cursor-pointer group">
                          <input type="radio" name="baggage" checked={baggageFilter === kg}
                            onChange={() => setBaggageFilter(kg)} className="accent-[#0a3a8a]" />
                          <span className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors">
                            {kg === 0 ? 'Any' : `${kg}kg+`}
                          </span>
                        </label>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-400 text-xs text-center">
                        {filteredOutbound.length + filteredReturn.length} of {totalResults} flights
                      </p>
                    </div>
                  </div>
                </aside>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-gray-900 font-semibold">{totalResults} flight{totalResults !== 1 ? 's' : ''} found</p>
                    <button onClick={handleClear} className="text-sm text-gray-400 hover:text-gray-800 underline transition">Clear</button>
                  </div>

                  <FlightSection
                    title="Outbound Flights"
                    flights={filteredOutbound}
                    total={searchPagination?.outbound.totalCount ?? outboundResults.length}
                    onSelect={handleSelect}
                    onView={handleViewSegment}
                    onResetFilters={resetFilters}
                    currentPage={searchPagination?.outbound.currentPage ?? 1}
                    totalPages={searchPagination?.outbound.totalPages ?? 1}
                    onPageChange={handlePageChange}
                    isSearching={isSearching}
                    selectedFlightIds={selectedFlightIds}
                    isAddingFlight={isAddingFlight}
                  />

                  {returnResults.length > 0 && (
                    <FlightSection
                      title="Return Flights"
                      flights={filteredReturn}
                      total={searchPagination?.return?.totalCount ?? returnResults.length}
                      onSelect={handleSelect}
                      onView={handleViewSegment}
                      onResetFilters={resetFilters}
                      currentPage={searchPagination?.return?.currentPage ?? 1}
                      totalPages={searchPagination?.return?.totalPages ?? 1}
                      onPageChange={handlePageChange}
                      isSearching={isSearching}
                      selectedFlightIds={selectedFlightIds}
                      isAddingFlight={isAddingFlight}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {!hasSearched && (
        <div className="mt-20 mx-4 md:mx-8 rounded-2xl h-80 md:h-[420px] flex items-center relative overflow-hidden shadow-xl max-w-7xl lg:mx-auto"
          style={{ backgroundImage: `linear-gradient(to right, rgba(10,58,138,0.85), transparent 70%), url(/image/wall2.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="ml-8 md:ml-12 max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold leading-none text-white">Skylife for Life.</h2>
            <p className="text-lg md:text-2xl mt-6 text-white/85">Your journey starts here.</p>
          </div>
        </div>
      )}

      <footer className="mt-20 px-6 md:px-8 py-8 text-sm border-t border-gray-200">
        <div className="flex flex-wrap justify-between items-center gap-4 max-w-7xl mx-auto text-gray-400">
          <span>India · English (UK) · INR</span>
          <div className="flex flex-wrap gap-6">
            <span>Help</span><span>Privacy</span><span>Company</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserHome;