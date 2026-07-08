import React from "react";
import { Utensils, Plus, Pencil, Trash2, ToggleLeft, ToggleRight, DollarSign, Plane } from "lucide-react";
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
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleToggleStatus,
    handlePageChange,
  } = useProviderFood();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  return (
    <>
      {/* Delete Confirm Modal */}
      {deletingFoodId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm px-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-gray-900 text-xl font-bold mb-2">Delete Food Item</h2>
            <p className="text-gray-500 text-sm mb-8">
              Are you sure you want to delete this food item? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition disabled:opacity-60"
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Blue Banner Header Block */}
        <div className="bg-[#0a3a8a] text-white px-4 sm:px-8 py-8 rounded-2xl mx-4 sm:mx-8 mt-6 shadow-xs">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
              <Utensils className="w-8 h-8 text-[#0a3a8a]" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold">Food & Beverage</h1>
              <p className="text-blue-200 text-sm mt-1">
                Manage your in-flight catering menu and pricing
              </p>
            </div>
            <button
              onClick={() => navigate("/provider/add-food")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0a3a8a] hover:bg-blue-50 transition text-sm font-bold shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Add New Item
            </button>
          </div>
        </div>

        {/* Constrained Grid Layout */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-8">
          {foods.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center shadow-xs">
              <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-800 text-base font-semibold mb-1">No food items added</p>
              <p className="text-gray-500 text-sm">Start by adding your first menu item</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.map((food) => (
                <div
                  key={food.id}
                  className="rounded-2xl border border-gray-200 shadow-xs bg-white hover:border-gray-300 transition duration-200 flex flex-col"
                >
                  <div className="h-32 w-full relative rounded-t-2xl overflow-hidden bg-gray-100">
                    {food.image ? (
                      <img src={food.image} alt={food.foodName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Utensils className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${food.vegNonveg === 'veg' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {food.vegNonveg}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1">
                    <h3 className="text-gray-900 font-bold text-base mb-1 truncate">{food.foodName}</h3>
                    <p className="text-gray-500 text-xs mb-4 uppercase tracking-wide font-medium">{food.foodType}</p>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-50/60 rounded-xl p-2.5 border border-gray-100">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <DollarSign className="w-3 h-3 text-gray-400" />
                          <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Price</p>
                        </div>
                        <p className="text-gray-800 text-xs font-semibold">{food.isComplimentary ? 'Free' : `₹${food.foodPrice.toLocaleString()}`}</p>
                      </div>
                      <div className="bg-gray-50/60 rounded-xl p-2.5 border border-gray-100">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <Plane className="w-3 h-3 text-gray-400" />
                          <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Aircraft</p>
                        </div>
                        <p className="text-gray-800 text-xs font-semibold truncate">{food.aircraftName || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions Block */}
                  <div className="p-4 bg-gray-50 rounded-b-2xl border-t border-gray-100 flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${food.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                      {food.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => handleToggleStatus(food.id)} className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-blue-600 transition shadow-xs">
                        {food.isActive ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={() => navigate(`/provider/update-food/${food.id}`)} className="p-2 rounded-xl bg-white border border-blue-100 text-blue-600 hover:bg-blue-50 transition shadow-xs">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteClick(food.id)} className="p-2 rounded-xl bg-white border border-red-100 text-red-600 hover:bg-red-50 transition shadow-xs">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {pagination && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.totalPages ?? 1}
                isLoading={isLoading}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FoodList;