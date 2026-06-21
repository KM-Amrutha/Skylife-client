import React from "react";
import { Plane, ChevronRight, Package } from "lucide-react";
import useUserBookings from "../../hooks/booking/useUserBookings";
import Pagination from "../../layouts/Pagination";

const UserBookings: React.FC = () => {
  const {
    userBookings,
    isLoadingUserBookings,
    userBookingsError,
    pagination,
    currentPage,
    handlePageChange,
    handleViewBooking,
    getStatusColor,
    formatDate,
  } = useUserBookings();

  if (isLoadingUserBookings) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/60">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] text-white">
      <header className="px-6 md:px-8 py-5 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white">My Bookings</h1>
        <p className="text-white/40 text-sm mt-1">
          All your flight bookings in one place
        </p>
      </header>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        {userBookingsError && (
          <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4 mb-6">
            <p className="text-red-300 text-sm">{userBookingsError}</p>
          </div>
        )}

        {!isLoadingUserBookings && userBookings.length === 0 ? (
          <div className="bg-white/5 border border-dashed border-white/20 rounded-2xl p-12 text-center">
            <Package className="w-14 h-14 text-white/20 mx-auto mb-4" />
            <p className="text-white/60 text-base font-medium">
              No bookings yet
            </p>
            <p className="text-white/30 text-sm mt-2">
              Your flight bookings will appear here
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {userBookings.map((booking) => {
              const activePassengers = booking.passengers.filter(
                (p) => p.status === "active"
              ).length;
              return (
                <button
                  key={booking.id}
                  onClick={() => handleViewBooking(booking.id)}
                  className="w-full text-left bg-white/5 border border-white/10 hover:border-white/25 rounded-2xl p-5 transition group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {booking.segments.map((seg, i) => (
                          <React.Fragment key={seg.flightId}>
                            {i > 0 && (
                              <span className="text-white/30 text-xs">→</span>
                            )}
                            <span className="text-white font-bold text-sm">
                              {seg.from}
                            </span>
                            <span className="text-white/30 text-xs">→</span>
                            <span className="text-white font-bold text-sm">
                              {seg.to}
                            </span>
                          </React.Fragment>
                        ))}
                      </div>
                      <p className="text-white/40 text-xs mt-1">
                        {booking.segments
                          .map((s) => s.flightNumber)
                          .join(" · ")}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition flex-shrink-0 mt-0.5" />
                  </div>

                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {booking.segments.slice(0, 1).map((seg) => (
                      <div
                        key={seg.flightId}
                        className="flex items-center gap-1.5 text-xs text-white/50"
                      >
                        <Plane className="w-3 h-3" />
                        <span>{formatDate(seg.departureTime)}</span>
                      </div>
                    ))}
                    <span className="text-white/20 text-xs">·</span>
                    <span className="text-white/50 text-xs">
                      {activePassengers} passenger
                      {activePassengers !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-1 rounded-full border text-xs font-semibold uppercase tracking-wide ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status.replace("_", " ")}
                    </span>
                    <span className="text-white font-bold">
                      ₹{booking.grandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {pagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            isLoading={isLoadingUserBookings}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default UserBookings;