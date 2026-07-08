import React from "react";
import { createPortal } from "react-dom";
import { BookingFoodItem } from "../../redux/booking/bookingType";

interface FoodSelectionModalProps {
  flightNumber: string;
  from: string;
  to: string;
  foods: BookingFoodItem[];
  isLoadingFoods: boolean;
  flightId: string;
  getQuantity: (flightId: string, foodId: string) => number;
  incrementFood: (flightId: string, foodId: string) => void;
  decrementFood: (flightId: string, foodId: string) => void;
  getFlightFoodTotal: (flightId: string, aircraftId: string) => number;
  aircraftId: string;
  onClose: () => void;
}

const VegBadge: React.FC<{ vegNonveg: "veg" | "non-veg" }> = ({ vegNonveg }) => (
  <div
    className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center flex-shrink-0 ${
      vegNonveg === "veg"
        ? "border-emerald-500"
        : "border-red-500"
    }`}
  >
    <div
      className={`w-2 h-2 rounded-full ${
        vegNonveg === "veg" ? "bg-emerald-500" : "bg-red-500"
      }`}
    />
  </div>
);

const FoodSelectionModal: React.FC<FoodSelectionModalProps> = ({
  flightNumber,
  from,
  to,
  foods,
  isLoadingFoods,
  flightId,
  getQuantity,
  incrementFood,
  decrementFood,
  getFlightFoodTotal,
  aircraftId,
  onClose,
}) => {
  const vegItems = foods.filter((f) => f.vegNonveg === "veg");
  const nonVegItems = foods.filter((f) => f.vegNonveg === "non-veg");
  const flightTotal = getFlightFoodTotal(flightId, aircraftId);
  const totalItems = foods.reduce(
    (sum, f) => sum + getQuantity(flightId, f.id),
    0
  );

  const renderFoodItem = (food: BookingFoodItem) => {
    const quantity = getQuantity(flightId, food.id);

    return (
      <div
        key={food.id}
        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition"
      >
        {/* Food image */}
        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
          {food.image ? (
            <img
              src={food.image}
              alt={food.foodName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl">
              🍽️
            </div>
          )}
        </div>

        {/* Food info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <VegBadge vegNonveg={food.vegNonveg} />
            <p className="text-gray-900 font-semibold text-sm truncate">
              {food.foodName}
            </p>
          </div>
          <p className="text-gray-600 text-xs capitalize">
            {food.foodType} · {food.serveMethod}
          </p>
          <div className="flex items-center gap-2 mt-1">
            {food.isComplimentary ? (
              <span className="text-emerald-600 text-xs font-semibold">
                Complimentary
              </span>
            ) : (
              <span className="text-gray-900 text-sm font-bold">
                ₹{food.foodPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {quantity === 0 ? (
            <button
              onClick={() => incrementFood(flightId, food.id)}
              className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100 transition"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => decrementFood(flightId, food.id)}
                className="w-7 h-7 rounded-full bg-white border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-100 transition flex items-center justify-center"
              >
                −
              </button>
              <span className="text-gray-900 font-bold text-sm w-4 text-center">
                {quantity}
              </span>
              <button
                onClick={() => incrementFood(flightId, food.id)}
                className="w-7 h-7 rounded-full bg-white border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-100 transition flex items-center justify-center"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 py-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg my-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-20 w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 transition flex items-center justify-center text-sm font-bold shadow-md"
        >
          ✕
        </button>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-gray-900 font-bold text-lg">Select Food</h2>
            <p className="text-gray-700 text-sm mt-0.5">
              {flightNumber} · {from} → {to}
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Food is shared across all passengers on this flight
            </p>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
            {/* Loading */}
            {isLoadingFoods && (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-[#0a3a8a] rounded-full animate-spin" />
              </div>
            )}

            {/* Empty */}
            {!isLoadingFoods && foods.length === 0 && (
              <div className="text-center py-12">
                <p className="text-4xl mb-3">🍽️</p>
                <p className="text-gray-700 text-sm">
                  No food available for this flight
                </p>
              </div>
            )}

            {/* Veg section */}
            {!isLoadingFoods && vegItems.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-sm border-2 border-emerald-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest">
                    Vegetarian
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {vegItems.map(renderFoodItem)}
                </div>
              </div>
            )}

            {/* Non-veg section */}
            {!isLoadingFoods && nonVegItems.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-sm border-2 border-red-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  </div>
                  <p className="text-red-600 text-xs font-bold uppercase tracking-widest">
                    Non-Vegetarian
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {nonVegItems.map(renderFoodItem)}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600 text-xs">
                  {totalItems} item{totalItems !== 1 ? "s" : ""} selected
                </p>
                {flightTotal > 0 && (
                  <p className="text-gray-900 font-bold text-lg">
                    ₹{flightTotal.toLocaleString("en-IN")}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#0a3a8a] text-white text-sm font-bold hover:bg-[#082c6b] transition"
              >
                {totalItems > 0 ? "Done" : "Skip Food"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FoodSelectionModal;