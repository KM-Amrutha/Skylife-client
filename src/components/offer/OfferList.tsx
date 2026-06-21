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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const isExpired = (validTo: string) => new Date(validTo) < new Date();

  return (
    <>
      {/* Delete confirm modal */}
      {deletingOfferId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#0a1628] border border-white/20 rounded-2xl w-full max-w-md shadow-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-white text-xl font-bold mb-2">Delete Offer</h2>
            <p className="text-slate-400 text-sm mb-8">
              Are you sure you want to delete this offer? This action cannot be
              undone.
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
            Total offers:{" "}
            <span className="font-semibold text-white">
              {pagination?.totalCount ?? offers.length}
            </span>
          </p>
          <button
            onClick={() => navigate("/provider/add-offer")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 hover:bg-blue-500/30 transition text-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            Add Offer
          </button>
        </div>

        {/* Empty */}
        {offers.length === 0 && (
          <div className="bg-white/5 border border-dashed border-slate-500/40 rounded-2xl p-10 text-center">
            <Tag className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-100 text-base mb-2">No offers yet</p>
            <p className="text-slate-400 text-sm">
              Create discount offers for your flights
            </p>
          </div>
        )}

        {/* Grid */}
        {offers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {offers.map((offer) => {
              const expired = isExpired(offer.validTo);
              return (
                <div
                  key={offer.id}
                  className={`bg-white/5 border rounded-2xl p-5 shadow-lg shadow-black/30 transition duration-150 flex flex-col justify-between ${
                    expired
                      ? "border-red-400/20 hover:border-red-400/40"
                      : "border-white/10 hover:border-blue-400/40"
                  }`}
                >
                  {/* Top */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                          <Tag className="w-4 h-4 text-blue-300" />
                        </div>
                        <span className="text-white font-bold text-lg tracking-wide">
                          {offer.offerCode}
                        </span>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${
                          expired
                            ? "bg-red-500/15 text-red-300 border-red-400/40"
                            : offer.isActive
                            ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/40"
                            : "bg-slate-500/15 text-slate-300 border-slate-400/40"
                        }`}
                      >
                        {expired ? "Expired" : offer.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {offer.description}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-xs mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Discount</span>
                      <span className="text-white font-bold text-sm">
                        {offer.discountPercentage}% off
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Min. amount</span>
                      <span className="text-white font-semibold">
                        ₹{offer.minimumAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Valid from</span>
                      <span className="text-white font-semibold">
                        {formatDate(offer.validFrom)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Valid to</span>
                      <span
                        className={`font-semibold ${
                          expired ? "text-red-400" : "text-white"
                        }`}
                      >
                        {formatDate(offer.validTo)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Usage</span>
                      <span className="text-white font-semibold">
                        {offer.usageCount}
                        {offer.usageLimit ? ` / ${offer.usageLimit}` : " / ∞"}
                      </span>
                    </div>
                    {!offer.isEditable && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span className="text-amber-400 text-[10px]">
                          Core fields locked — offer has been used
                        </span>
                      </div>
                    )}
                  </div>
                      <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-white/5 border border-white/10">
                   <span className="text-slate-400 text-xs flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                    Aircraft
                  </span>
                    <span className="text-xs font-semibold text-blue-300 tracking-wide">
                   {offer.aircraftName ?? "Unknown"}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <button
                      onClick={() => handleToggleStatus(offer.id)}
                      disabled={isSubmitting || expired}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-500/20 text-slate-300 border border-slate-400/30 hover:bg-slate-500/30 transition font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                      title={offer.isActive ? "Deactivate" : "Activate"}
                    >
                      {offer.isActive ? (
                        <ToggleRight className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <ToggleLeft className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          navigate(`/provider/update-offer/${offer.id}/`)
                        }
                        className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30 hover:bg-blue-500/30 transition font-medium"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(offer.id)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/30 transition font-medium"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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
            totalPages={pagination.totalPages ?? 1}
            isLoading={isLoading}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default OfferList;