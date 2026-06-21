import React, { useState } from "react";
import ProviderMainLayout from "../../layouts/ProviderMainLayout";
import FlightForm from "../../components/flight/FlightForm";
import RecurringFlightForm from "../../components/flight/RecurringFlightForm";

type ScheduleTab = "single" | "recurring";

const AddFlightPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ScheduleTab>("single");

  return (
    <ProviderMainLayout>
     
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-blue-900/70" />

        <div className="relative z-10 flex flex-col gap-10 items-center justify-start">
          <div className="w-full max-w-6xl bg-[#00001F]/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab("single")}
                className={`flex-1 py-5 text-base font-semibold transition-all duration-200 ${
                  activeTab === "single"
                    ? "bg-blue-600/30 text-white border-b-2 border-blue-400"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                ✈️ Single Flight
              </button>
              <button
                onClick={() => setActiveTab("recurring")}
                className={`flex-1 py-5 text-base font-semibold transition-all duration-200 ${
                  activeTab === "recurring"
                    ? "bg-purple-600/30 text-white border-b-2 border-purple-400"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                🔁 Recurring Flights
              </button>
            </div>
            {activeTab === "single" ? <FlightForm /> : <RecurringFlightForm />}
          </div>
        </div>
      
    </ProviderMainLayout>
  );
};

export default AddFlightPage;