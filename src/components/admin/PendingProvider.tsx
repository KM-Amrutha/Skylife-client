import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Eye,
  Building2,
  Phone,
  Globe,
  Calendar,
  MapPin,
  FileText,
  Award,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react";
import useProviderVerification from "../../hooks/admin/useProviderVerification";
import Sidebar from "./Sidebar";

const PendingProvider: React.FC = () => {
  const {
    pendingProviders,
    isLoading,
    handleVerifyProvider,
    rejectModalOpen,
    openRejectModal,
    closeRejectModal,
    rejectionReason,
    setRejectionReason,
    handleConfirmReject,
  } = useProviderVerification();

  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);
  const [viewingDocument, setViewingDocument] = useState<string | null>(null);

  const toggleExpand = (providerId: string) => {
    setExpandedProvider(expandedProvider === providerId ? null : providerId);
  };

  return (
    <>
    <div className="flex min-h-screen bg-gray-50">
  <Sidebar />
  <div className="flex-1 min-w-0 overflow-y-auto">
      <div className="p-4 md:p-8 pt-20 lg:pt-8 bg-slate-50 min-h-screen">

        {/* Page Header */}
        
<div className="bg-[#0a3a8a] text-white px-6 py-8 rounded-2xl mt-4 mb-6 shadow-xs">
  <div className="flex items-center justify-between gap-5">
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
        <svg className="w-6 h-6 text-[#0a3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Pending Verifications</h1>
        <p className="text-blue-200 text-sm mt-1">Review and verify airline provider applications</p>
      </div>
    </div>
    <div className="flex-shrink-0 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm font-semibold whitespace-nowrap">
      {pendingProviders.length} pending
    </div>
  </div>
</div>
        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && pendingProviders.length === 0 && (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center shadow-sm">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <p className="text-slate-900 text-base font-semibold mb-1">All caught up!</p>
            <p className="text-slate-500 text-sm">No pending provider verifications</p>
          </div>
        )}

        {/* Provider List */}
        {!isLoading && pendingProviders.length > 0 && (
          <div className="space-y-4">
            {pendingProviders.map((provider) => {
              const isExpanded = expandedProvider === provider.id;
              return (
                <div
                  key={provider.id}
                  className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:border-slate-300"
                >
                  {/* Card Header — always visible */}
                  <div className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1 w-full min-w-0">
                      {/* Logo */}
                      {provider.logoUrl ? (
                        <img
                          src={provider.logoUrl}
                          alt={provider.companyName}
                          className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-sm shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
                          <Building2 className="w-7 h-7 text-slate-600" />
                        </div>
                      )}

                      {/* Left — Company name + email */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">Company</span>
                          <span className="text-slate-900 font-bold text-xl truncate">{provider.companyName}</span>
                          {provider.isProfileComplete && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                              <Award className="w-3 h-3" /> Complete
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-xs mt-0.5 truncate font-medium">
                          Email: <span className="text-blue-600">{provider.email}</span>
                        </p>
                      </div>

                      {/* Centre — Key details */}
                      <div className="flex flex-col items-start sm:items-center gap-1 pt-2 sm:pt-0 border-t border-slate-100 sm:border-none w-full sm:w-auto shrink-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="text-left sm:text-center">
                            <p className="text-slate-500 text-[10px] font-semibold uppercase">Airline Code</p>
                            <p className="text-slate-900 font-bold text-lg">{provider.airlineCode}</p>
                          </div>
                          <div className="w-px h-8 bg-slate-200 hidden sm:block" />
                          <div className="text-left sm:text-center">
                            <p className="text-slate-500 text-[10px] font-semibold uppercase">Est. Year</p>
                            <p className="text-slate-900 font-bold text-lg">{provider.establishmentYear || "—"}</p>
                          </div>
                          <div className="w-px h-8 bg-slate-200 hidden sm:block" />
                          <div className="text-left sm:text-center">
                            <p className="text-slate-500 text-[10px] font-semibold uppercase">Type of Operation</p>
                            <p className="text-slate-900 font-bold text-lg capitalize">{provider.typeOfOperation || "—"}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <p className="text-slate-500 text-[10px]">Country:</p>
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                              {provider.countryOfOperation || "—"}
                            </span>
                          </div>
                          <span className="text-slate-300 hidden sm:inline">·</span>
                          <div className="flex items-center gap-1">
                            <p className="text-slate-500 text-[10px]">Mobile:</p>
                            <span className="text-slate-800 font-semibold text-xs">{provider.mobile || "—"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleExpand(provider.id)}
                      className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition text-sm font-semibold shrink-0 mt-2 md:mt-0"
                    >
                      <Eye className="w-4 h-4" />
                      {isExpanded ? "Hide" : "Review"}
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-slate-200 bg-slate-50/50 px-5 py-5 space-y-5">

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                        {provider.ceoName && (
                          <div className="bg-white border border-slate-200 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Award className="w-3 h-3 text-slate-500" />
                              <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">CEO</p>
                            </div>
                            <p className="text-slate-900 text-xs font-semibold truncate">{provider.ceoName}</p>
                          </div>
                        )}

                        <div className="bg-white border border-slate-200 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Phone className="w-3 h-3 text-slate-500" />
                            <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">Mobile</p>
                          </div>
                          <p className="text-slate-900 text-xs font-semibold">{provider.mobile || "—"}</p>
                        </div>

                        {provider.typeOfOperation && (
                          <div className="bg-white border border-slate-200 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Building2 className="w-3 h-3 text-slate-500" />
                              <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">Operation</p>
                            </div>
                            <p className="text-slate-900 text-xs font-semibold capitalize">{provider.typeOfOperation}</p>
                          </div>
                        )}

                        <div className="bg-white border border-slate-200 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">Joined</p>
                          </div>
                          <p className="text-slate-900 text-xs font-semibold">
                            {new Date(provider.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit", month: "short", year: "numeric"
                            })}
                          </p>
                        </div>

                        {provider.establishmentYear && (
                          <div className="bg-white border border-slate-200 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar className="w-3 h-3 text-slate-500" />
                              <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">Established</p>
                            </div>
                            <p className="text-slate-900 text-xs font-semibold">{provider.establishmentYear}</p>
                          </div>
                        )}

                        {provider.licenseExpiryDate && (
                          <div className="bg-white border border-slate-200 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar className="w-3 h-3 text-slate-500" />
                              <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">License Expiry</p>
                            </div>
                            <p className="text-slate-900 text-xs font-semibold">
                              {new Date(provider.licenseExpiryDate).toLocaleDateString("en-IN", {
                                day: "2-digit", month: "short", year: "numeric"
                              })}
                            </p>
                          </div>
                        )}

                        {provider.headquartersAddress && (
                          <div className="bg-white border border-slate-200 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <MapPin className="w-3 h-3 text-slate-500" />
                              <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">Headquarters</p>
                            </div>
                            <p className="text-slate-900 text-xs font-semibold break-words">{provider.headquartersAddress}</p>
                          </div>
                        )}

                        {provider.websiteUrl && (
                          <div className="bg-white border border-slate-200 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Globe className="w-3 h-3 text-slate-500" />
                              <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">Website</p>
                            </div>
                            <a
                              href={provider.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 text-xs hover:text-blue-800 font-medium transition truncate block"
                            >
                              {provider.websiteUrl}
                            </a>
                          </div>
                        )}

                        {provider.officeContactNumber && (
                          <div className="bg-white border border-slate-200 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Phone className="w-3 h-3 text-slate-500" />
                              <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">Office Contact</p>
                            </div>
                            <p className="text-slate-900 text-xs font-semibold">{provider.officeContactNumber}</p>
                          </div>
                        )}
                      </div>

                      {/* Documents */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <p className="text-slate-700 text-xs uppercase tracking-wider font-bold">Documents:</p>
                        {provider.registrationCertificateUrl ? (
                          <button
                            onClick={() => setViewingDocument(provider.registrationCertificateUrl!)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition"
                          >
                            <FileText className="w-3 h-3" /> Registration Certificate
                          </button>
                        ) : (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-100 text-red-700 text-xs font-semibold">
                            <XCircle className="w-3 h-3" /> No Registration
                          </span>
                        )}
                        {provider.insuranceProofUrl ? (
                          <button
                            onClick={() => setViewingDocument(provider.insuranceProofUrl!)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold hover:bg-purple-100 transition"
                          >
                            <FileText className="w-3 h-3" /> Insurance Proof
                          </button>
                        ) : (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-100 text-red-700 text-xs font-semibold">
                            <XCircle className="w-3 h-3" /> No Insurance
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2 border-t border-slate-200">
                        <button
                          onClick={() => handleVerifyProvider(provider.id)}
                          className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                        >
                          <CheckCircle className="w-4 h-4" /> Verify Provider
                        </button>
                        <button
                          onClick={() => openRejectModal(provider.id)}
                          className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100"
                        >
                          <XCircle className="w-4 h-4" /> Reject
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      {viewingDocument && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h3 className="text-slate-900 font-bold text-lg">Document Viewer</h3>
              <button
                onClick={() => setViewingDocument(null)}
                className="text-slate-500 hover:text-slate-900 transition text-xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-hidden p-4 bg-slate-100">
              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(viewingDocument)}&embedded=true`}
                className="w-full h-full bg-white rounded-xl border border-slate-200"
                title="Document Viewer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="h-1 w-full bg-red-500" />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-lg">Reject Application</h3>
                    <p className="text-slate-500 text-xs">This will notify the provider</p>
                  </div>
                </div>
                <button
                  onClick={closeRejectModal}
                  className="text-slate-500 hover:text-slate-900 transition text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="border-t border-slate-100 mb-4" />

              <p className="text-slate-700 text-sm mb-4">
                Provide a clear reason so the provider knows what to fix before reapplying.
              </p>

              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g., Insurance document expired, missing CEO details, unclear headquarters address..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 resize-none text-sm transition"
                rows={5}
              />

              <div className="flex items-center justify-between mt-2 mb-5">
                <span className="text-slate-500 text-xs">Minimum 10 characters</span>
                <span className={`text-xs font-semibold ${rejectionReason.trim().length >= 10 ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {rejectionReason.trim().length} chars
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeRejectModal}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReject}
                  disabled={!rejectionReason.trim() || rejectionReason.trim().length < 10}
                  className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <XCircle className="w-4 h-4" /> Confirm Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
    </>
  );
};

export default PendingProvider;