import React from "react";
import { Plane, Package } from "lucide-react";
import useProviderBookings from "../../hooks/provider/useProviderBookings";
import Pagination from "../../layouts/Pagination";
import {useNavigate} from "react-router-dom";

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
      <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/60">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] text-white">
      <header className="px-6 md:px-8 py-5 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white">Bookings</h1>
        <p className="text-white/40 text-sm mt-1">
          Confirmed bookings for your flights
        </p>
      </header>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        {error && (
          <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4 mb-6">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {!isLoading && providerBookings.length === 0 ? (
          <div className="bg-white/5 border border-dashed border-white/20 rounded-2xl p-12 text-center">
            <Package className="w-14 h-14 text-white/20 mx-auto mb-4" />
            <p className="text-white/60 text-base font-medium">
              No confirmed bookings yet
            </p>
            <p className="text-white/30 text-sm mt-2">
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
                  className="w-full text-left bg-white/5 border border-white/10 hover:border-white/25 rounded-2xl p-5 transition"
                >
                  
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        {booking.segments.map((seg, i) => (
                          <React.Fragment key={seg.flightId}>
                            {i > 0 && (
                              <span className="text-white/30 text-xs">·</span>
                            )}
                            <span className="text-white font-bold text-sm">
                              {seg.from} → {seg.to}
                            </span>
                            <span className="text-white/40 text-xs">
                              ({seg.flightNumber})
                            </span>
                          </React.Fragment>
                        ))}
                      </div>
                      <p className="text-white/40 text-xs font-mono">
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
                        className="flex items-center justify-between bg-white/3 border border-white/8 rounded-xl px-3 py-2"
                      >
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <Plane className="w-3 h-3" />
                          <span className="font-semibold text-white">
                            {seg.flightNumber}
                          </span>
                          <span>
                            {seg.from} → {seg.to}
                          </span>
                        </div>
                        <span className="text-white/50 text-xs">
                          {formatDate(seg.departureTime)}{" "}
                          {formatTime(seg.departureTime)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white/40 text-xs">
                      {activePassengers.length} active passenger
                      {activePassengers.length !== 1 ? "s" : ""}
                    </p>
                    <div className="flex flex-col items-end">
                      {booking.discount > 0 && (
                        <p className="text-emerald-400 text-xs">
                          − ₹{booking.discount.toLocaleString("en-IN")} discount
                        </p>
                      )}
                      <p className="text-white font-bold">
                        ₹{booking.grandTotal.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <p className="text-white/30 text-xs">
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
                          <span className="text-white/60">{p.name}</span>
                          <span className="text-white/40">
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