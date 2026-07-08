import React from "react";
import { Tag, Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useProviderOffer from "../../hooks/offer/useProviderOffer";
import Pagination from "../../layouts/Pagination";

const OfferList: React.FC = () => {
  const navigate = useNavigate();
  const {
    offers,
    pagination,
    isLoading,
    isSubmitting,
    currentPage,
    deletingOfferId,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleToggleStatus,
    handlePageChange,
  } = useProviderOffer();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  const isExpired = (validTo: string) => new Date(validTo) < new Date();

  return (
    <>
      {/* Delete Confirm Modal */}
      {deletingOfferId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm px-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-sm shadow-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-gray-900 text-xl font-bold mb-2">Delete Offer</h2>
            <p className="text-gray-500 text-sm mb-8">Are you sure you want to delete this offer? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={handleDeleteCancel} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition">Cancel</button>
              <button onClick={handleDeleteConfirm} disabled={isSubmitting} className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition disabled:opacity-60">
                {isSubmitting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        
        {/* Header Banner */}
        <div className="bg-[#0a3a8a] text-white px-8 py-8 rounded-2xl shadow-lg flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Manage Offers</h1>
            <p className="text-blue-200 text-sm mt-1">Configure discount codes for your fleet</p>
          </div>
          <Tag className="w-10 h-10 text-blue-400/50" />
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 font-medium">Total: {pagination?.totalCount ?? offers.length} offers</p>
          <button 
            onClick={() => navigate("/provider/add-offer")} 
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#0a3a8a] text-white text-sm font-semibold hover:bg-[#082a66] transition"
          >
            <Plus className="w-4 h-4" /> Add Offer
          </button>
        </div>

        {/* Grid Area */}
        {offers.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">
            <Tag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-800 font-semibold">No offers found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {offers.map((offer) => {
              const expired = isExpired(offer.validTo);
              return (
                <div key={offer.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col overflow-hidden">
                  <div className="p-5 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                          <Tag className="w-4 h-4 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-base">{offer.offerCode}</h3>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase ${expired ? 'bg-red-50 text-red-600' : offer.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}>
                        {expired ? 'Expired' : offer.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <p className="text-gray-500 text-xs mb-5 line-clamp-2">{offer.description}</p>

                   <div className="grid grid-cols-2 gap-2">
  <div className="bg-gray-50 p-2 rounded-lg"><div className="text-[8px] text-gray-400 font-bold uppercase">Discount</div><div className="text-xs font-semibold">{offer.discountPercentage}% OFF</div></div>
  <div className="bg-gray-50 p-2 rounded-lg"><div className="text-[8px] text-gray-400 font-bold uppercase">Min Order</div><div className="text-xs font-semibold">₹{offer.minimumAmount.toLocaleString()}</div></div>
  <div className="bg-gray-50 p-2 rounded-lg"><div className="text-[8px] text-gray-400 font-bold uppercase">Aircraft</div><div className="text-xs font-semibold truncate">{offer.aircraftName}</div></div>
  <div className="bg-gray-50 p-2 rounded-lg"><div className="text-[8px] text-gray-400 font-bold uppercase">Valid From</div><div className="text-xs font-semibold">{formatDate(offer.validFrom)}</div></div>
  <div className="bg-gray-50 p-2 rounded-lg col-span-2"><div className="text-[8px] text-gray-400 font-bold uppercase">Valid To</div><div className="text-xs font-semibold">{formatDate(offer.validTo)}</div></div>
</div>
                  </div>

                  <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <button onClick={() => handleToggleStatus(offer.id)} className="p-1.5 rounded-lg bg-white border border-gray-200 hover:text-blue-600 transition">
                      {offer.isActive ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4 text-gray-400" />}
                    </button>
                    <div className="flex gap-1.5">
                      <button onClick={() => navigate(`/provider/update-offer/${offer.id}/`)} className="p-1.5 rounded-lg bg-white border border-gray-200 text-blue-600 hover:bg-blue-50 transition"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteClick(offer.id)} className="p-1.5 rounded-lg bg-white border border-gray-200 text-red-600 hover:bg-red-50 transition"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pagination && (
          <div className="pt-4">
            <Pagination 
              currentPage={currentPage} 
              totalPages={pagination.totalPages ?? 1} 
              isLoading={isLoading} 
              onPageChange={handlePageChange} 
            />
          </div>
        )}
      </div>
    </>
  );
};

export default OfferList;