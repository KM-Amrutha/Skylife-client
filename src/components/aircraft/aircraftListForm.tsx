import React from 'react';
import useAircraft from '../../hooks/useAircraft';

const AircraftList: React.FC = () => {
  const { aircrafts, isLoading, error } = useAircraft();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p className="text-lg font-medium">Error loading aircrafts</p>
        <p className="text-sm mt-2">{error}</p>
      </div>
    );
  }

  if (aircrafts.length === 0) {
    return (
      <div className="text-center p-12 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-lg mb-4">No aircrafts added yet</p>
        <p className="text-gray-400 text-sm">Add your first aircraft to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">My Aircrafts</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aircrafts.map((aircraft) => (
          <div 
            key={aircraft._id} 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            {/* Aircraft Name & Type */}
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {aircraft.aircraftName}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{aircraft.aircraftType}</p>

            {/* Aircraft Details */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Manufacturer:</span>
                <span className="font-medium">{aircraft.manufacturer}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Build Year:</span>
                <span className="font-medium">{aircraft.buildYear}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Seat Capacity:</span>
                <span className="font-medium">{aircraft.seatCapacity}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Flying Range:</span>
                <span className="font-medium">{aircraft.flyingRangeKm} km</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Engines:</span>
                <span className="font-medium">{aircraft.engineCount}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Lavatories:</span>
                <span className="font-medium">{aircraft.lavatoryCount}</span>
              </div>

              {/* Status Badge */}
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-600">Status:</span>
                <span 
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    aircraft.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : aircraft.status === 'maintenance'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {aircraft.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AircraftList;
