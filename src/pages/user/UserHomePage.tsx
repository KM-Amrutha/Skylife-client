import React from 'react';
import useUserDashboard from '../../hooks/user/useUserDashboard';
import useFlightSearch from '../../hooks/user/useFlightSearch';
import UserHome from '../../components/user/UserHome';

const UserHomePage: React.FC = () => {
  const { user, isLoading, isDropdownOpen, dropdownRef, toggleDropdown, handleSignOut, goToDashboard } = useUserDashboard();
  const userName = user?.firstName?.toLowerCase() || 'there';
  const {
    form, handleChange, handleSearch, handleClear,
    outboundResults, returnResults,
    filteredOutbound, filteredReturn,
    isSearching, searchError, hasSearched,
    fromResults, toResults, fromDisplayName, toDisplayName,
    handleFromSearch, handleToSearch, selectFrom, selectTo,
    clearFromResults, clearToResults,
    maxPrice, priceFilter, baggageFilter, stopsFilter,
    setPriceFilter, setBaggageFilter, setStopsFilter,
     searchPagination,
    handlePageChange,
  } = useFlightSearch();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <UserHome
      user={user}
      userName={userName}
      form={form}
      isSearching={isSearching}
      outboundResults={outboundResults}
      returnResults={returnResults}
      filteredOutbound={filteredOutbound}
      filteredReturn={filteredReturn}
      searchError={searchError}
      hasSearched={hasSearched}
      fromResults={fromResults}
      toResults={toResults}
      fromDisplayName={fromDisplayName}
      toDisplayName={toDisplayName}
      isDropdownOpen={isDropdownOpen}
      dropdownRef={dropdownRef}
      toggleDropdown={toggleDropdown}
      handleSignOut={handleSignOut}
      goToDashboard={goToDashboard}
      handleFromSearch={handleFromSearch}
      handleToSearch={handleToSearch}
      selectFrom={selectFrom}
      selectTo={selectTo}
      clearFromResults={clearFromResults}
      clearToResults={clearToResults}
      onChange={handleChange}
      onSearch={handleSearch}
      onClear={handleClear}
      maxPrice={maxPrice}
      priceFilter={priceFilter}
      baggageFilter={baggageFilter}
      stopsFilter={stopsFilter}
      setPriceFilter={setPriceFilter}
      setBaggageFilter={setBaggageFilter}
      setStopsFilter={setStopsFilter}
        searchPagination={searchPagination}
      handlePageChange={handlePageChange}
    />
  );
};

export default UserHomePage;