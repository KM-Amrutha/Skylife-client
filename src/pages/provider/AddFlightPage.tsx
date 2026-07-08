import React, { useState } from "react";
import FlightForm from "../../components/flight/flightForm";
import RecurringFlightForm from "../../components/flight/RecurringFlightForm";
import ProviderHeaderLayout from '../../layouts/ProviderHeaderLayout';
import ProviderSidebarLayout from '../../layouts/ProviderSidebarLayout';

type ScheduleTab = "single" | "recurring";

const AddFlightPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ScheduleTab>("single");

  return (
    <div className="flex min-h-screen bg-slate-100">
      <ProviderSidebarLayout />
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <ProviderHeaderLayout />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow border border-slate-200 overflow-hidden">
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setActiveTab("single")}
                className={`flex-1 py-4 text-base font-semibold transition-all duration-200 ${
                  activeTab === "single"
                    ? "bg-blue-50 text-blue-700 border-b-2 border-blue-500"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                }`}
              >
                ✈️ Single Flight
              </button>
              <button
                onClick={() => setActiveTab("recurring")}
                className={`flex-1 py-4 text-base font-semibold transition-all duration-200 ${
                  activeTab === "recurring"
                    ? "bg-purple-50 text-purple-700 border-b-2 border-purple-500"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                }`}
              >
                🔁 Recurring Flights
              </button>
            </div>
            {activeTab === "single" ? <FlightForm /> : <RecurringFlightForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFlightPage;