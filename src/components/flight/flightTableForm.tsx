import React from "react";
import useFlights from "../../hooks/useFlight";

const ProviderFlightsTable: React.FC = () => {
  const { flights, isLoading, error } = useFlights();

  if (isLoading && flights.length === 0) {
    return <p className="text-white text-center mt-4">Loading flights...</p>;
  }

  if (error) {
    return <p className="text-red-400 text-center mt-4">{error}</p>;
  }

  return (
    <div className="px-8 py-6">
      <h2 className="text-white text-2xl font-bold mb-4">Your Scheduled Flights</h2>
      {flights.length === 0 ? (
        <p className="text-gray-300">No flights scheduled yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="bg-slate-900 text-xs uppercase text-gray-400">
              <tr>
                <th className="px-4 py-3">Flight</th>
                <th className="px-4 py-3">Route</th>
                <th className="px-4 py-3">Departure</th>
                <th className="px-4 py-3">Arrival</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Approval</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((f) => (
                <tr key={f._id} className="border-b border-slate-800">
                  <td className="px-4 py-3">
                    <div className="font-semibold">{f.flightNumber}</div>
                    <div className="text-xs text-gray-400">{f.aircraftName}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{f.departureDestinationId} → {f.arrivalDestinationId}</div>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(f.departureTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(f.arrivalTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {f.durationMinutes} min
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        f.adminApproval.status === "approved"
                          ? "bg-green-700 text-green-100"
                          : f.adminApproval.status === "rejected"
                          ? "bg-red-700 text-red-100"
                          : "bg-yellow-700 text-yellow-100"
                      }`}
                    >
                      {f.adminApproval.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProviderFlightsTable;
