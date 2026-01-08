import React, { useState } from "react";
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  Calendar, 
  MapPin, 
  FileText, 
  Award,
  X  // ← Added this for modal close button
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import useAdminDashboard from "../../hooks/useAdminDashboard";

interface Provider {
  _id: string;
  companyName: string;
  email: string;
  airlineCode: string;
  mobile: string;
  logoUrl?: string;
  registrationCertificateUrl?: string;
  insuranceProofUrl?: string;
  establishmentYear?: number;
  licenseExpiryDate?: Date;
  headquartersAddress?: string;
  countryOfOperation?: string;
  typeOfOperation?: string;
  websiteUrl?: string;
  ceoName?: string;
  officeContactNumber?: string;
  isProfileComplete?: boolean;
}

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
  } = useAdminDashboard();

  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [viewingDocument, setViewingDocument] = useState<string | null>(null);

  const toggleExpand = (providerId: string) => {
    setExpandedProvider(expandedProvider === providerId ? null : providerId);
  };

  return (
    <AdminLayout title="Pending Provider Verifications">
      <div className="p-4 md:p-8 pt-20 lg:pt-8">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Pending Verifications</h2>
            <div className="px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium">
              {pendingProviders.length} applications
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-300 text-lg">Loading providers...</p>
            </div>
          ) : pendingProviders.length === 0 ? (
            <div className="text-center py-16">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <p className="text-slate-300 text-lg">All caught up! No pending verifications</p>
            </div>
          ) : (
            <div className="space-y-6">
              {pendingProviders.map((provider) => (
                <div
                  key={provider._id}
                  onMouseEnter={() => setHoveredCard(provider._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 ${
                    hoveredCard === provider._id
                      ? "border-blue-400/50 shadow-2xl shadow-blue-500/20 scale-[1.02]"
                      : "border-white/10"
                  }`}
                >
                  {/* Basic Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {provider.logoUrl ? (
                          <img
                            src={provider.logoUrl}
                            alt={`${provider.companyName} logo`}
                            className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-400/30 shadow-lg"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center border-2 border-blue-400/30">
                            <Building2 className="w-10 h-10 text-white" />
                          </div>
                        )}
                        {provider.isProfileComplete && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                            <Award className="w-3 h-3 text-slate-900" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {provider.companyName}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold">
                            {provider.airlineCode}
                          </span>
                          {provider.countryOfOperation && (
                            <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-sm">
                              {provider.countryOfOperation}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleExpand(provider._id)}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-300 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <Eye className="w-4 h-4" />
                      {expandedProvider === provider._id ? "Show Less" : "View Details"}
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {expandedProvider === provider._id && (
                    <div className="border-t border-white/10 pt-6 space-y-6">
                      {/* Contact Information */}
                      <div>
                        <h4 className="text-sm font-bold text-blue-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Contact Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                            <div className="flex items-center gap-2 mb-2">
                              <Mail className="w-4 h-4 text-slate-400" />
                              <p className="text-xs font-semibold text-slate-400 uppercase">Email</p>
                            </div>
                            <p className="text-sm text-white">{provider.email}</p>
                          </div>
                          <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                            <div className="flex items-center gap-2 mb-2">
                              <Phone className="w-4 h-4 text-slate-400" />
                              <p className="text-xs font-semibold text-slate-400 uppercase">Mobile</p>
                            </div>
                            <p className="text-sm text-white">{provider.mobile}</p>
                          </div>
                          {provider.officeContactNumber && (
                            <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                              <div className="flex items-center gap-2 mb-2">
                                <Building2 className="w-4 h-4 text-slate-400" />
                                <p className="text-xs font-semibold text-slate-400 uppercase">Office Contact</p>
                              </div>
                              <p className="text-sm text-white">{provider.officeContactNumber}</p>
                            </div>
                          )}
                          {provider.websiteUrl && (
                            <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                              <div className="flex items-center gap-2 mb-2">
                                <Globe className="w-4 h-4 text-slate-400" />
                                <p className="text-xs font-semibold text-slate-400 uppercase">Website</p>
                              </div>
                              <a 
                                href={provider.websiteUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                              >
                                {provider.websiteUrl}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Company Details */}
                      <div>
                        <h4 className="text-sm font-bold text-purple-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Company Details
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {provider.ceoName && (
                            <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">CEO Name</p>
                              <p className="text-sm text-white">{provider.ceoName}</p>
                            </div>
                          )}
                          {provider.establishmentYear && (
                            <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                <p className="text-xs font-semibold text-slate-400 uppercase">Established</p>
                              </div>
                              <p className="text-sm text-white">{provider.establishmentYear}</p>
                            </div>
                          )}
                          {provider.typeOfOperation && (
                            <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Operation Type</p>
                              <p className="text-sm text-white">{provider.typeOfOperation}</p>
                            </div>
                          )}
                          {provider.licenseExpiryDate && (
                            <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                              <div className="flex items-center gap-2 mb-2">
                                <FileText className="w-4 h-4 text-slate-400" />
                                <p className="text-xs font-semibold text-slate-400 uppercase">License Expiry</p>
                              </div>
                              <p className="text-sm text-white">
                                {new Date(provider.licenseExpiryDate).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Address */}
                      {provider.headquartersAddress && (
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <p className="text-xs font-semibold text-slate-400 uppercase">Headquarters Address</p>
                          </div>
                          <p className="text-sm text-white">{provider.headquartersAddress}</p>
                        </div>
                      )}

                      {/* Documents */}
                      <div>
                        <h4 className="text-sm font-bold text-green-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Documents
                        </h4>
                        <div className="flex gap-3">
                          {provider.registrationCertificateUrl && (
                            <button
                              onClick={() => setViewingDocument(provider.registrationCertificateUrl!)}
                              className="flex items-center gap-2 px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/50"
                            >
                              <Eye className="w-4 h-4" />
                              View Registration Certificate
                            </button>
                          )}
                          {provider.insuranceProofUrl && (
                            <button
                              onClick={() => setViewingDocument(provider.insuranceProofUrl!)}
                              className="flex items-center gap-2 px-5 py-3 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/50"
                            >
                              <Eye className="w-4 h-4" />
                              View Insurance Proof
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 mt-6 pt-6 border-t border-white/10">
                        <button
                          onClick={() => handleVerifyProvider(provider._id)}
                          className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-105"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Verify Provider
                        </button>
                        <button
                          onClick={() => openRejectModal(provider._id)}
                          className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/50 hover:scale-105"
                        >
                          <XCircle className="w-5 h-5" />
                          Reject
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* PDF Viewer Modal */}
          {viewingDocument && (
            <div 
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setViewingDocument(null)}
            >
              <div 
                className="bg-slate-900 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl border border-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white">Document Viewer</h3>
                  <button
                    onClick={() => setViewingDocument(null)}
                    className="p-2 hover:bg-white/10 rounded-lg"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
                <div className="flex-1 overflow-hidden p-3">
                  <iframe
                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(viewingDocument)}&embedded=true`}
                    className="w-full h-full bg-white rounded"
                    title="Document Viewer"
                  />
                </div>
                <div className="p-4 border-t border-white/10 text-center">
                  <button
                    onClick={() => setViewingDocument(null)}
                    className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Rejection Modal */}
          {rejectModalOpen && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <div className="bg-slate-900 rounded-2xl w-full max-w-md p-8 shadow-2xl border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Reject Provider Application</h3>
                  <button onClick={closeRejectModal} className="p-2 hover:bg-white/10 rounded-lg">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <p className="text-slate-300 mb-6">
                  Please provide a detailed reason for rejection. This will be shown to the provider so they can improve and reapply.
                </p>

                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="e.g., Insurance document expired, missing CEO details, unclear headquarters address..."
                  className="w-full p-4 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-red-400 focus:outline-none resize-none"
                  rows={6}
                />

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={closeRejectModal}
                    className="flex-1 py-3 border border-white/20 rounded-xl text-white hover:bg-white/10 font-medium transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmReject}
                    disabled={!rejectionReason.trim() || rejectionReason.trim().length < 10}
                    className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-red-500/50 transition"
                  >
                    Confirm Reject
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default PendingProvider;