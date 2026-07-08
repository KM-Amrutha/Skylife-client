import React from "react";
import { Plane, ChevronRight, Package, Users,AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useUserBookings from "../../hooks/booking/useUserBookings";
import Pagination from "../../layouts/Pagination";
import UserHeader from "../user/UserHeader";

const UserBookings: React.FC = () => {
  const navigate = useNavigate();
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

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });

  const getDuration = (dep: string, arr: string) => {
    const diff = new Date(arr).getTime() - new Date(dep).getTime();
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    return `${h}h${m > 0 ? ` ${m}m` : ""}`;
  };

  if (isLoadingUserBookings) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#0a3a8a] rounded-full animate-spin" />
          <p className="text-gray-700">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-100 text-gray-900">
      <UserHeader onBack={() => navigate("/user/userdashboard")} backLabel="Dashboard" />

      {/* Blue Banner */}
      <div className="bg-[#0a3a8a] text-white px-6 py-8 rounded-2xl mt-4 mb-6 shadow-xs max-w-3xl mx-auto">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
            <Package className="w-6 h-6 text-[#0a3a8a]" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold">My Bookings</h1>
            <p className="text-blue-200 text-sm mt-1">All your flight bookings in one place</p>
          </div>
          {pagination && (
            <div className="flex-shrink-0 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm font-semibold">
              {pagination.totalPages} total
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 pb-10">
        {userBookingsError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-600 text-sm">{userBookingsError}</p>
          </div>
        )}

        {userBookings.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-12 text-center">
            <Package className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-700 text-base font-medium">No bookings yet</p>
            <p className="text-gray-600 text-sm mt-2">Your flight bookings will appear here</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {userBookings.map((booking) => {
              const activePassengers = booking.passengers.filter(
                (p) => p.status === "active"
              ).length;
              const firstSeg = booking.segments[0];
              const lastSeg = booking.segments[booking.segments.length - 1];

              return (
                <button
                  key={booking.id}
                  onClick={() => handleViewBooking(booking.id)}
                  className="w-full text-left bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md rounded-2xl shadow-sm overflow-hidden transition group"
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Plane className="w-3.5 h-3.5 text-[#0a3a8a]" />
                      <span className="text-xs text-gray-600 font-medium">
                        {booking.segments.map((s) => s.flightNumber).join(" · ")}
                      </span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wide ${getStatusColor(booking.status)}`}>
                      {booking.status.replace("_", " ")}
                    </span>
                    {booking.passengers.some(p =>
                  p.segments.some(s => s.status === "cancelled")
                   ) && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-[10px] font-semibold">
                 <AlertTriangle className="w-3 h-3" />
                   Seat blocked
                  </span>
                 )}
                  </div>

                  {/* Route + times */}
                  <div className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {/* Departure */}
                      <div className="text-left min-w-[70px]">
                        <p className="text-lg font-bold text-gray-900 font-mono">
                          {firstSeg ? formatTime(firstSeg.departureTime) : "—"}
                        </p>
                        <p className="text-[#0a3a8a] font-bold text-sm">{firstSeg?.from}</p>
                        <p className="text-gray-500 text-[11px] mt-0.5">
                          {firstSeg ? formatDate(firstSeg.departureTime) : ""}
                        </p>
                      </div>

                      {/* Duration line */}
                      <div className="flex-1 flex flex-col items-center gap-1">
                        {firstSeg && lastSeg && (
                          <p className="text-gray-500 text-[10px]">
                            {getDuration(firstSeg.departureTime, lastSeg.arrivalTime)}
                          </p>
                        )}
                        <div className="w-full flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0a3a8a]" />
                          <div className="flex-1 border-t border-dashed border-gray-300" />
                          <Plane className="w-3 h-3 text-[#0a3a8a]" />
                          <div className="flex-1 border-t border-dashed border-gray-300" />
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        </div>
                        <p className="text-gray-400 text-[10px]">
                          {booking.segments.length > 1 ? `${booking.segments.length} flights` : "Direct"}
                        </p>
                      </div>

                      {/* Arrival */}
                      <div className="text-right min-w-[70px]">
                        <p className="text-xl font-bold text-gray-900 font-mono">
                          {lastSeg ? formatTime(lastSeg.arrivalTime) : "—"}
                        </p>
                        <p className="text-gray-600 font-bold text-sm">{lastSeg?.to}</p>
                        <p className="text-gray-500 text-[11px] mt-0.5">
                          {lastSeg ? formatDate(lastSeg.arrivalTime) : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                      <Users className="w-3.5 h-3.5" />
                      <span>{activePassengers} passenger{activePassengers !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-900 font-bold text-sm">
                        ₹{booking.grandTotal.toLocaleString("en-IN")}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {pagination && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              isLoading={isLoadingUserBookings}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookings;