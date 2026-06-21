import React from "react";
import { Utensils, Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useProviderFood from "../../hooks/food/useProviderFood";
import Pagination from "../../layouts/Pagination";

const FoodList: React.FC = () => {
  const navigate = useNavigate();
  const {
    foods,
    pagination,
    isLoading,
    isSubmitting,
    currentPage,
    deletingFoodId,
    // handleOpenEdit,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleToggleStatus,
    handlePageChange,
  } = useProviderFood();

  // ─── Loading ───────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  return (
    <>
      {/* Delete Confirm Modal */}
      {deletingFoodId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#0a1628] border border-white/20 rounded-2xl w-full max-w-md shadow-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-white text-xl font-bold mb-2">Delete Food Item</h2>
            <p className="text-slate-400 text-sm mb-8">
              Are you sure you want to delete this food item? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 py-3 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-300">
            Total items:{" "}
            <span className="font-semibold text-white">
              {pagination?.totalCount ?? foods.length}
            </span>
          </p>
          <button
            onClick={() => navigate("/provider/add-food")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 hover:bg-blue-500/30 transition text-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            Add Food
          </button>
        </div>

        {/* Empty */}
        {foods.length === 0 && (
          <div className="bg-white/5 border border-dashed border-slate-500/40 rounded-2xl p-10 text-center">
            <Utensils className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-100 text-base mb-2">No food items yet</p>
            <p className="text-slate-400 text-sm">
              Add food and beverages for your flights
            </p>
          </div>
        )}

        {/* Grid */}
        {foods.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {foods.map((food) => (
              <div
                key={food.id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg shadow-black/30 hover:border-blue-400/40 transition duration-150 flex flex-col"
              >
                
                {/* Food image */}
                <div className="w-full h-40 bg-white/5 flex-shrink-0 relative overflow-hidden">
                  {food.image ? (
                    <img
                      src={food.image}
                      alt={food.foodName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Utensils className="w-12 h-12 text-slate-600" />
                    </div>
                  )}
                  {/* Veg/Non-veg badge */}
                  <div className="absolute top-2 left-2">
                    <div
                      className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${
                        food.vegNonveg === "veg"
                          ? "border-emerald-500 bg-white"
                          : "border-red-500 bg-white"
                      }`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          food.vegNonveg === "veg"
                            ? "bg-emerald-500"
                            : "bg-red-500"
                        }`}
                      />
                    </div>
                  </div>
                  {/* Complimentary badge */}
                  {food.isComplimentary && (
                    <div className="absolute top-2 right-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-semibold">
                        Free
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  {/* Name + type */}
                  <div className="mb-3">
                    <h3 className="text-white font-semibold text-base leading-tight">
                      {food.foodName}
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5 capitalize">
                      {food.foodType} · {food.serveMethod}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5 text-xs text-slate-200 mb-4 flex-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Price</span>
                      <span className="font-semibold">
                        {food.isComplimentary
                          ? "Complimentary"
                          : `₹${food.foodPrice.toLocaleString("en-IN")}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Type</span>
                      <span className="font-semibold capitalize">
                        {food.vegNonveg}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Serve method</span>
                      <span className="font-semibold">{food.serveMethod}</span>
                    </div>
                  </div>
                  
                   <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-white/5 border border-white/10">
                   <span className="text-slate-400 text-xs flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                    Aircraft
                  </span>
                    <span className="text-xs font-semibold text-blue-300 tracking-wide">
                   {food.aircraftName ?? "Unknown"}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    {/* Status */}
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide border ${
                        food.isActive
                          ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/40"
                          : "bg-red-500/15 text-red-300 border-red-400/40"
                      }`}
                    >
                      {food.isActive ? "Active" : "Inactive"}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(food.id)}
                        disabled={isSubmitting}
                        className="text-xs px-3 py-1.5 rounded-lg bg-slate-500/20 text-slate-300 border border-slate-400/30 hover:bg-slate-500/30 transition font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                        title={food.isActive ? "Deactivate" : "Activate"}
                      >
                        {food.isActive ? (
                          <ToggleRight className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ToggleLeft className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/provider/update-food/${food.id}`)
                        }
                        className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30 hover:bg-blue-500/30 transition font-medium"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(food.id)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/30 transition font-medium"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages ?? 1}
            isLoading={isLoading}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default FoodList;