import React, { useState } from "react";
import useAdminProviders from "../../hooks/admin/useAdminProviders";
import { Provider } from "../../redux/auth/authTypes";
import Pagination from '../../layouts/Pagination';
import Sidebar from "./Sidebar";
import {
  Building2,
  Mail,
  Hash,
  Calendar,
  Shield,
  ShieldOff,
  Globe,
  MapPin,
  Phone,
  CalendarDays,
  FileText,
  X,
  Plane,
  CheckCircle,
  XCircle
} from "lucide-react";

interface ProviderDetailModalProps {
  provider: Provider;
  onClose: () => void;
}

const ProviderDetailModal: React.FC<ProviderDetailModalProps> = ({
  provider,
  onClose,
}) => {
  return (
     
    
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-8 border border-gray-200 shadow-2xl overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              {provider.logoUrl ? (
                <img
                  src={provider.logoUrl}
                  alt={provider.companyName}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border border-gray-200 shadow-xs"
                />
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 shadow-xs">
                  <Building2 className="w-10 h-10 md:w-12 md:h-12 text-blue-600" />
                </div>
              )}
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-1">
                  {provider.companyName}
                </h2>
                <div className="flex items-center gap-1.5">
                  <Hash className="w-4 h-4 text-gray-400" />
                  <p className="text-base text-blue-700 font-bold">
                    {provider.airlineCode}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <X className="w-5 h-5 text-gray-400 group-hover:text-gray-700" />
            </button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    Email
                  </p>
                  <p className="text-gray-900 text-sm font-medium break-all">{provider.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    Mobile
                  </p>
                  <p className="text-gray-900 text-sm font-medium">
                    {provider.mobile || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    Headquarters
                  </p>
                  <p className="text-gray-900 text-sm font-medium">
                    {provider.headquartersAddress || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <Globe className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    Website
                  </p>
                  {provider.websiteUrl ? (
                    <a
                      href={provider.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm font-medium hover:text-blue-800 underline transition break-all"
                    >
                      {provider.websiteUrl}
                    </a>
                  ) : (
                    <p className="text-gray-400 text-sm">Not provided</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <CalendarDays className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    Established
                  </p>
                  <p className="text-gray-900 text-sm font-medium">
                    {provider.establishmentYear || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    Joined Platform
                  </p>
                  <p className="text-gray-900 text-sm font-medium">
                    {new Date(provider.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <Building2 className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    Country of Operation
                  </p>
                  <p className="text-gray-900 text-sm font-medium capitalize">
                    {provider.countryOfOperation || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <Plane className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    Type of Operation
                  </p>
                  <p className="text-gray-900 text-sm font-medium capitalize">
                    {provider.typeOfOperation || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Document Previews */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Registration Certificate */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-amber-500" />
                  <p className="text-gray-800 font-semibold text-sm">
                    Registration Certificate
                  </p>
                </div>
                {provider.registrationCertificateUrl ? (
                  <button
                    onClick={() => window.open(provider.registrationCertificateUrl, '_blank')}
                    className="block w-full h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center hover:border-blue-500 hover:bg-blue-50/40 transition cursor-pointer group"
                  >
                    <span className="text-blue-600 text-sm font-bold group-hover:text-blue-700">👁️ View PDF</span>
                  </button>
                ) : (
                  <div className="w-full h-32 bg-red-50 rounded-lg border-2 border-dashed border-red-100 flex items-center justify-center">
                    <span className="text-red-600 text-sm font-medium">Not Uploaded</span>
                  </div>
                )}
              </div>

              {/* Insurance Proof */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-emerald-500" />
                  <p className="text-gray-800 font-semibold text-sm">
                    Insurance Proof
                  </p>
                </div>
                {provider.insuranceProofUrl ? (
                  <button
                    onClick={() => window.open(provider.insuranceProofUrl, '_blank')}
                    className="block w-full h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center hover:border-blue-500 hover:bg-blue-50/40 transition cursor-pointer group"
                  >
                    <span className="text-blue-600 text-sm font-bold group-hover:text-blue-700">👁️ View PDF</span>
                  </button>
                ) : (
                  <div className="w-full h-32 bg-red-50 rounded-lg border-2 border-dashed border-red-100 flex items-center justify-center">
                    <span className="text-red-600 text-sm font-medium">Not Uploaded</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllProvidersTable: React.FC = () => {
  const { providers, isLoading, pagination, currentPage, handlePageChange, handleUpdateProviderStatus, handleSetCommission } =
    useAdminProviders();
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );
  const [commissionEdit, setCommissionEdit] = useState<Record<string, string>>({});

  const openModal = (provider: Provider) => setSelectedProvider(provider);
  const closeModal = () => setSelectedProvider(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  if (!providers || providers.length === 0) {
    return (
      <div className="px-4 md:px-8 py-6">
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center shadow-xs">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-800 text-base font-semibold mb-1">
            No providers registered yet
          </p>
          <p className="text-gray-500 text-sm">
            Providers will appear here once they sign up
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 min-w-0 overflow-y-auto">
      <div className="px-4 md:px-8 py-6 bg-gray-50 min-h-screen">
        {/* Top Header */}
        <div className="bg-[#0a3a8a] text-white px-6 py-8 rounded-2xl mt-4 mb-6 shadow-xs">
  <div className="flex items-center justify-between gap-5">
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
        <svg className="w-6 h-6 text-[#0a3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">All Providers</h1>
        <p className="text-blue-200 text-sm mt-1">Manage airline providers on the platform</p>
      </div>
    </div>
    <div className="flex-shrink-0 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm font-semibold whitespace-nowrap">
      {providers.length} providers
    </div>
  </div>
</div>

        {/* Provider Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="rounded-2xl border border-gray-200 shadow-xs bg-white hover:border-gray-300 transition duration-200 flex flex-col justify-between"
            >
              <div className="p-5">
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-4">
                  {provider.logoUrl ? (
                    <img
                      src={provider.logoUrl}
                      alt={provider.companyName}
                      className="w-14 h-14 rounded-xl object-cover border border-gray-200 shadow-xs shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-xs shrink-0">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <button onClick={() => openModal(provider)} className="text-left w-full block group">
                      <h3 className="text-gray-900 font-bold text-base truncate group-hover:text-blue-600 transition">
                        {provider.companyName}
                      </h3>
                    </button>
                    <p className="text-gray-500 text-xs truncate mb-1">{provider.email}</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
                      ${provider.isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${provider.isActive ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      {provider.isActive ? 'Active' : 'Blocked'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 my-3" />

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-50/60 rounded-xl p-2.5 border border-gray-100">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Hash className="w-3 h-3 text-gray-400" />
                      <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Airline Code</p>
                    </div>
                    <p className="text-gray-800 text-xs font-semibold truncate">{provider.airlineCode || '—'}</p>
                  </div>

                  <div className="bg-gray-50/60 rounded-xl p-2.5 border border-gray-100">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Joined</p>
                    </div>
                    <p className="text-gray-800 text-xs font-semibold">
                      {provider.createdAt
                        ? new Date(provider.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                        : '—'}
                    </p>
                  </div>

                  <div className="bg-gray-50/60 rounded-xl p-2.5 border border-gray-100">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Globe className="w-3 h-3 text-gray-400" />
                      <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Country</p>
                    </div>
                    <p className="text-gray-800 text-xs font-semibold capitalize truncate">{provider.countryOfOperation || '—'}</p>
                  </div>

                  <div className="bg-gray-50/60 rounded-xl p-2.5 border border-gray-100">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Plane className="w-3 h-3 text-gray-400" />
                      <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Operation</p>
                    </div>
                    <p className="text-gray-800 text-xs font-semibold capitalize truncate">{provider.typeOfOperation || '—'}</p>
                  </div>

                  <div className="bg-gray-50/60 rounded-xl p-2.5 border border-gray-100 col-span-2">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">Headquarters</p>
                    </div>
                    <p className="text-gray-800 text-xs font-semibold truncate">{provider.headquartersAddress || '—'}</p>
                  </div>
                </div>

                {/* Badges / Document Triggers */}
                <div className="flex items-center gap-2 mb-4">
                  <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border
                    ${provider.isVerified ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                    {provider.isVerified ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {provider.isVerified ? 'Verified' : 'Unverified'}
                  </div>
                  <button
                    onClick={() => openModal(provider)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition"
                  >
                    <FileText className="w-3 h-3 text-gray-400" />
                    Details
                  </button>
                </div>

                {/* Commission Setting form */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 flex items-center justify-between gap-1 focus-within:border-blue-400 transition-colors">
                    <span className="text-gray-400 text-[11px] font-bold uppercase">Rate</span>
                    <div className="flex items-center justify-end max-w-[60px]">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={commissionEdit[provider.id] ?? provider.commissionRate ?? 10}
                        onChange={(e) =>
                          setCommissionEdit((prev) => ({
                            ...prev,
                            [provider.id]: e.target.value,
                          }))
                        }
                        className="w-full bg-transparent text-gray-900 text-sm font-bold text-right focus:outline-none"
                      />
                      <span className="text-gray-400 text-xs ml-0.5">%</span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      handleSetCommission(
                        provider.id,
                        Number(commissionEdit[provider.id] ?? provider.commissionRate ?? 10)
                      )
                    }
                    className="px-3 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-xs transition"
                  >
                    Set
                  </button>
                </div>
              </div>

              {/* Action Block/Unblock Bottom Anchor */}
              <div className="p-4 bg-gray-50 rounded-b-2xl border-t border-gray-100">
                <button
                  onClick={() => handleUpdateProviderStatus(provider.id, !provider.isActive)}
                  className={`w-full py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-xs border
                    ${provider.isActive
                      ? 'bg-white hover:bg-red-50 text-red-600 border-red-200 hover:border-red-300'
                      : 'bg-white hover:bg-emerald-50 text-emerald-600 border-emerald-200 hover:border-emerald-300'
                    }`}
                >
                  {provider.isActive ? (
                    <><ShieldOff className="w-3 h-3" /> Block Account</>
                  ) : (
                    <><Shield className="w-3 h-3" /> Activate Account</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Pagination spacer */}
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={pagination?.totalPages ?? 1}
            isLoading={isLoading}
            onPageChange={handlePageChange}
          />
        </div>
          </div>
    </div>
      </div>

      {/* Detail Modal Anchor */}
      {selectedProvider && (
        <ProviderDetailModal provider={selectedProvider} onClose={closeModal} />
      )}
    
    </>
    
  
  );
};

export default AllProvidersTable;