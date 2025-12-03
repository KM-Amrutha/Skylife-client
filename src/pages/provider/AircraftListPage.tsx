import React from 'react';
import AircraftList from '../../components/aircraft/aircraftListForm';

const AircraftListPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <AircraftList />
    </div>
  );
};

export default AircraftListPage;
