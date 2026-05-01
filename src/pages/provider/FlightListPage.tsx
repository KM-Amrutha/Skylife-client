import React from "react";
import ProviderMainLayout from "../../layouts/ProviderMainLayout";
import FlightList from "../../components/flight/FlightList";

const FlightListPage: React.FC = () => {
  return (
    <ProviderMainLayout>
      <div
        className="relative rounded-2xl p-8"
        style={{
          backgroundImage: "url(/image/airplane-sunset.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-blue-900/70" />
        <div className="relative z-10 flex flex-col items-center justify-start">
          <div className="w-full max-w-6xl bg-[#00001F]/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
             <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white text-3xl font-bold">My Flights</h2>
                <p className="text-sm text-slate-300 mt-1">
                  View and manage your fleet, locations and availability
                </p>
              </div>
              {/* edit or delete or nay buttons
               */}
            </div>
            <FlightList />
          </div>
        </div>
      </div>
    </ProviderMainLayout>
  );
};

export default FlightListPage;