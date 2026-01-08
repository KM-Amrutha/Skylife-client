import React, { useState } from 'react';

const SearchForm: React.FC = () => {
  const [tripType, setTripType] = useState('One way');
  const [from, setFrom] = useState('Kochi (COK)');
  const [to, setTo] = useState('Dubai (DBX)');
  const [departure, setDeparture] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Later: dispatch a flight search thunk or navigate to result
    console.log({ tripType, from, to, departure, returnDate, passengers });
  };

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-full shadow-lg overflow-hidden flex items-center max-w-5xl mx-auto">
      <select
        value={tripType}
        onChange={(e) => setTripType(e.target.value)}
        className="px-6 py-4 text-gray-800 font-medium border-r border-gray-300"
      >
        <option>One way</option>
        <option>Round trip</option>
      </select>

      <input
        type="text"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="From"
        className="px-6 py-4 flex-1 text-gray-800 border-r border-gray-300 focus:outline-none"
      />

      <input
        type="text"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To"
        className="px-6 py-4 flex-1 text-gray-800 border-r border-gray-300 focus:outline-none"
      />

      <input
        type="date"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
        className="px-6 py-4 w-48 text-gray-800 border-r border-gray-300 focus:outline-none"
      />

      <input
        type="date"
        value={returnDate}
        onChange={(e) => setReturnDate(e.target.value)}
        disabled={tripType === 'One way'}
        className="px-6 py-4 w-48 text-gray-800 border-r border-gray-300 focus:outline-none disabled:bg-gray-100"
      />

      <input
        type="number"
        min={1}
        value={passengers}
        onChange={(e) => setPassengers(Number(e.target.value))}
        className="px-6 py-4 w-32 text-gray-800 border-r border-gray-300 focus:outline-none"
        placeholder="No. of passengers"
      />

      <button
        type="submit"
        className="bg-[#001f4d] text-white px-10 py-4 font-bold hover:bg-[#001233] transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;