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
import AdminLayout from "../../layouts/AdminLayout";
import useProviderVerification from "../../hooks/admin/useProviderVerification";

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
    <AdminLayout title="Pending Provider Verifications">
      <div className="p-4 md:p-8 pt-20 lg:pt-8">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl font-bold">Pending Verifications</h1>
            <p className="text-slate-400 text-sm mt-1">Review and verify airline provider applications</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-400/20 rounded-xl">
            <span className="text-2xl font-bold text-white">{pendingProviders.length}</span>
            <span className="text-xs text-amber-300 uppercase tracking-widest font-semibold">Pending</span>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
          </div>
        )}

        {/* Empty */}
        {!isLoading && pendingProviders.length === 0 && (
          <div className="bg-white/5 border border-dashed border-slate-500/40 rounded-2xl p-10 text-center">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <p className="text-slate-100 text-base mb-2">All caught up!</p>
            <p className="text-slate-400 text-sm">No pending provider verifications</p>
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
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl overflow-hidden transition-all duration-300 hover:border-blue-400/30"
                >
                  {/* Card Header — always visible */}
<div className="p-5 flex items-center justify-between gap-4">
  <div className="flex items-center gap-4 flex-1">
    {/* Logo */}
    {provider.logoUrl ? (
      <img
        src={provider.logoUrl}
        alt={provider.companyName}
        className="w-14 h-14 rounded-xl object-cover border-2 border-white/10 shadow-lg shrink-0"
      />
    ) : (
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 flex items-center justify-center border-2 border-white/10 shrink-0">
        <Building2 className="w-7 h-7 text-white" />
      </div>
    )}

    {/* Left — Company name + email */}
    <div className="min-w-0">
      <div className="flex items-center gap-2">
        <span className="text-slate-400 text-[10px] uppercase tracking-wider">Company</span>
        <span className="text-white font-bold text-xl truncate">{provider.companyName}</span>
        {provider.isProfileComplete && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
            <Award className="w-3 h-3" /> Complete
          </span>
        )}
      </div>
      <p className="text-slate-500 text-xs mt-0.5">
        Email: <span className="text-cyan-400">{provider.email}</span>
      </p>
    </div>

    {/* Centre — Key details */}
    <div className="flex-1 flex flex-col items-center gap-1">
      <div className="flex items-center gap-3">
        <div className="text-center">
          <p className="text-slate-400 text-[10px]">Airline Code</p>
          <p className="text-white font-bold text-lg">{provider.airlineCode}</p>
        </div>
        <div className="w-px h-8 bg-slate-700" />
        <div className="text-center">
          <p className="text-slate-400 text-[10px]">Est. Year</p>
          <p className="text-white font-bold text-lg">{provider.establishmentYear || '—'}</p>
        </div>
        <div className="w-px h-8 bg-slate-700" />
        <div className="text-center">
           <p className="text-slate-400 text-[10px]"> Type of Operation</p>
          <p className="text-white font-bold text-lg capitalize">{provider.typeOfOperation || '—'}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-1">
         <div className="text-center">
        <p className="text-slate-400 text-[10px]"> Country of Operation: </p>
        <span className="px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-[10px] font-bold uppercase tracking-wider">
          {provider.countryOfOperation || '—'}
        </span>
        </div>
        <span className="text-slate-600">·</span>
        <div className="text-center">
        <p className="text-slate-400 text-[10px]"> Mobile:  </p>
        <span className="text-white font-medium">{provider.mobile || '—'}</span>
        </div>
      </div>
    </div>
  </div>

  <button
    onClick={() => toggleExpand(provider.id)}
    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition text-sm font-medium shrink-0"
  >
    <Eye className="w-4 h-4" />
    {isExpanded ? 'Hide' : 'Review'}
    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
  </button>
</div>                 

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-white/10 px-5 py-5 space-y-5">

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                         {provider.ceoName && (
                          <div className="bg-white/5 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Award className="w-3 h-3 text-slate-400" />
                              <p className="text-slate-400 text-[10px] uppercase tracking-wider">CEO</p>
                            </div>
                            <p className="text-white text-xs font-medium truncate">{provider.ceoName}</p>
                          </div>
                        )}

                        <div className="bg-white/5 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <p className="text-slate-400 text-[10px] uppercase tracking-wider">Mobile</p>
                          </div>
                          <p className="text-white text-xs font-medium">{provider.mobile || '—'}</p>
                        </div>
                        
                          {provider.typeOfOperation && (
                          <div className="bg-white/5 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Building2 className="w-3 h-3 text-slate-400" />
                              <p className="text-slate-400 text-[10px] uppercase tracking-wider">Operation</p>
                            </div>
                            <p className="text-white text-xs font-medium capitalize">{provider.typeOfOperation}</p>
                          </div>
                        )}

                                           
                        <div className="bg-white/5 rounded-xl p-3">
  <div className="flex items-center gap-2 mb-1">
    <Calendar className="w-3 h-3 text-slate-400" />
    <p className="text-slate-400 text-[10px] uppercase tracking-wider">Joined</p>
  </div>
  <p className="text-white text-xs font-medium">
    {new Date(provider.createdAt).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    })}
  </p>
</div>
                       
                        {provider.establishmentYear && (
                          <div className="bg-white/5 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              <p className="text-slate-400 text-[10px] uppercase tracking-wider">Established</p>
                            </div>
                            <p className="text-white text-xs font-medium">{provider.establishmentYear}</p>
                          </div>
                        )}

{provider.licenseExpiryDate && (
  <div className="bg-white/5 rounded-xl p-3">
    <div className="flex items-center gap-2 mb-1">
      <Calendar className="w-3 h-3 text-slate-400" />
      <p className="text-slate-400 text-[10px] uppercase tracking-wider">License Expiry</p>
    </div>
    <p className="text-white text-xs font-medium">
      {new Date(provider.licenseExpiryDate).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric'
      })}
    </p>
  </div>
)}

                           {provider.headquartersAddress && (
                          <div className="bg-white/5 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <p className="text-slate-400 text-[10px] uppercase tracking-wider">Headquarters</p>
                            </div>
                            <p className="text-white text-xs font-medium">{provider.headquartersAddress}</p>
                          </div>
                        )}

                        {provider.websiteUrl && (
                          <div className="bg-white/5 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Globe className="w-3 h-3 text-slate-400" />
                              <p className="text-slate-400 text-[10px] uppercase tracking-wider">Website</p>
                            </div>
                            <a
                              href={provider.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 text-xs hover:text-cyan-300 transition truncate block"
                            >
                              {provider.websiteUrl}
                            </a>
                          </div>
                        )}

{provider.officeContactNumber && (
  <div className="bg-white/5 rounded-xl p-3">
    <div className="flex items-center gap-2 mb-1">
      <Phone className="w-3 h-3 text-slate-400" />
      <p className="text-slate-400 text-[10px] uppercase tracking-wider">Office Contact</p>
    </div>
    <p className="text-white text-xs font-medium">{provider.officeContactNumber}</p>
  </div>
)}
                       
                      </div>

                      {/* Documents */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Documents:</p>
                        {provider.registrationCertificateUrl ? (
                          <button
                            onClick={() => setViewingDocument(provider.registrationCertificateUrl!)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold hover:bg-blue-500/25 transition"
                          >
                            <FileText className="w-3 h-3" /> Registration Certificate
                          </button>
                        ) : (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-400/20 text-red-400 text-xs font-semibold">
                            <XCircle className="w-3 h-3" /> No Registration
                          </span>
                        )}
                        {provider.insuranceProofUrl ? (
                          <button
                            onClick={() => setViewingDocument(provider.insuranceProofUrl!)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/15 border border-purple-400/30 text-purple-300 text-xs font-semibold hover:bg-purple-500/25 transition"
                          >
                            <FileText className="w-3 h-3" /> Insurance Proof
                          </button>
                        ) : (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-400/20 text-red-400 text-xs font-semibold">
                            <XCircle className="w-3 h-3" /> No Insurance
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2 border-t border-white/10">
                        <button
                          onClick={() => handleVerifyProvider(provider.id)}
                          className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 hover:border-emerald-400/50"
                        >
                          <CheckCircle className="w-4 h-4" /> Verify Provider
                        </button>
                        <button
                          onClick={() => openRejectModal(provider.id)}
                          className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/30 hover:border-red-400/50"
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a1628] border border-white/20 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h3 className="text-white font-bold text-lg">Document Viewer</h3>
              <button
                onClick={() => setViewingDocument(null)}
                className="text-slate-400 hover:text-white transition text-xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-hidden p-4">
              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(viewingDocument)}&embedded=true`}
                className="w-full h-full bg-white rounded-xl"
                title="Document Viewer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a1628] border border-white/20 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            {/* Red top bar */}
            <div className="h-1 w-full bg-gradient-to-r from-red-500 to-rose-400" />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-400/30 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Reject Application</h3>
                    <p className="text-slate-400 text-xs">This will notify the provider</p>
                  </div>
                </div>
                <button
                  onClick={closeRejectModal}
                  className="text-slate-400 hover:text-white transition text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-white/5 mb-5" />

              <p className="text-slate-300 text-sm mb-4">
                Provide a clear reason so the provider knows what to fix before reapplying.
              </p>

              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g., Insurance document expired, missing CEO details, unclear headquarters address..."
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-red-400/50 focus:outline-none focus:ring-1 focus:ring-red-400/30 resize-none text-sm transition"
                rows={5}
              />

              <div className="flex items-center justify-between mt-2 mb-5">
                <span className="text-slate-500 text-xs">Minimum 10 characters</span>
                <span className={`text-xs font-medium ${rejectionReason.trim().length >= 10 ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {rejectionReason.trim().length} chars
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeRejectModal}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-slate-300 border border-white/10 hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReject}
                  disabled={!rejectionReason.trim() || rejectionReason.trim().length < 10}
                  className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/30 hover:border-red-400/50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <XCircle className="w-4 h-4" /> Confirm Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default PendingProvider;