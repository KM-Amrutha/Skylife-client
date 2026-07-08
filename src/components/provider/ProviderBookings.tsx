import React from "react";
import { Plane, Package,BookOpen } from "lucide-react";
import useProviderBookings from "../../hooks/provider/useProviderBookings";
import Pagination from "../../layouts/Pagination";
import { useNavigate } from "react-router-dom";

const ProviderBookings: React.FC = () => {
  const {
    providerBookings,
    isLoading,
    error,
    pagination,
    currentPage,
    handlePageChange,
    getStatusColor,
    formatDate,
    formatTime,
  } = useProviderBookings();

  const navigate = useNavigate();

  if (isLoading && providerBookings.length === 0) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#0a3a8a] rounded-full animate-spin" />
          <p className="text-gray-700">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-100 text-gray-900">
       <div className="bg-[#0a3a8a] text-white px-4 sm:px-8 py-8 rounded-2xl mx-4 sm:mx-8 mt-6 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
            <BookOpen className="w-8 h-8 text-[#0a3a8a]" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold">Bookings</h1>
            <p className="text-blue-200 text-sm mt-1">
              Confirmed bookings for your flights
            </p>
          </div>
          {/* Booking count badge */}
          {!isLoading && providerBookings.length > 0 && (
            <div className="flex-shrink-0 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm font-semibold text-white">
              {pagination?.totalPages ?? providerBookings.length} total
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {!isLoading && providerBookings.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-12 text-center shadow-sm">
            <Package className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-700 text-base font-medium">
              No confirmed bookings yet
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Confirmed bookings for your flights will appear here
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {providerBookings.map((booking) => {
              const activePassengers = booking.passengers.filter(
                (p) => p.status === "active"
              );
              return (
                <div
                  key={booking.id}
                  onClick={() => navigate(`/provider/bookings/${booking.id}`)}
                  className="w-full text-left bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md rounded-2xl shadow-sm p-5 transition cursor-pointer min-w-0"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        {booking.segments.map((seg, i) => (
                          <React.Fragment key={seg.flightId}>
                            {i > 0 && (
                              <span className="text-gray-400 text-xs">·</span>
                            )}
                            <span className="text-gray-900 font-bold text-sm">
                              {seg.from} → {seg.to}
                            </span>
                            <span className="text-gray-600 text-xs">
                              ({seg.flightNumber})
                            </span>
                          </React.Fragment>
                        ))}
                      </div>
                      <p className="text-gray-600 text-xs font-mono truncate">
                        {booking.id}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full border text-xs font-semibold uppercase tracking-wide flex-shrink-0 ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status.replace("_", " ")}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 mb-3">
                    {booking.segments.map((seg) => (
                      <div
                        key={seg.flightId}
                        className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 gap-2"
                      >
                        <div className="flex items-center gap-2 text-xs text-gray-700 min-w-0">
                          <Plane className="w-3 h-3 flex-shrink-0 text-[#0a3a8a]" />
                          <span className="font-semibold text-gray-900 flex-shrink-0">
                            {seg.flightNumber}
                          </span>
                          <span className="truncate">
                            {seg.from} → {seg.to}
                          </span>
                        </div>
                        <span className="text-gray-600 text-xs flex-shrink-0">
                          {formatDate(seg.departureTime)}{" "}
                          {formatTime(seg.departureTime)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-3 gap-2">
                    <p className="text-gray-600 text-xs">
                      {activePassengers.length} active passenger
                      {activePassengers.length !== 1 ? "s" : ""}
                    </p>
                    <div className="flex flex-col items-end">
                      {booking.discount > 0 && (
                        <p className="text-emerald-600 text-xs">
                          − ₹{booking.discount.toLocaleString("en-IN")} discount
                        </p>
                      )}
                      <p className="text-gray-900 font-bold">
                        ₹{booking.grandTotal.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 gap-2">
                    <p className="text-gray-600 text-xs">
                      {booking.paymentConfirmedAt
                        ? `Paid ${formatDate(booking.paymentConfirmedAt)}`
                        : formatDate(booking.createdAt)}
                    </p>
                    <div className="flex flex-col gap-1">
                      {activePassengers.map((p) => (
                        <div
                          key={p.passengerId}
                          className="flex items-center justify-between gap-4 text-xs"
                        >
                          <span className="text-gray-700">{p.name}</span>
                          <span className="text-gray-600">
                            ₹{p.passengerTotal.toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {pagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            isLoading={isLoading}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default ProviderBookings;