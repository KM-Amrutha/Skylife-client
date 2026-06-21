import React, { useState } from "react";
import useAdminProviders from "../../hooks/admin/useAdminProviders";
import { Provider } from "../../redux/auth/authTypes";
import Pagination from '../../layouts/Pagination';
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl max-w-4xl w-full my-8 border border-white/20 shadow-2xl">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              {provider.logoUrl ? (
                <img
                  src={provider.logoUrl}
                  alt={provider.companyName}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-blue-400/40 shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center border-2 border-blue-400/40">
                  <Building2 className="w-12 h-12 text-white" />
                </div>
              )}
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {provider.companyName}
                </h2>
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-cyan-400" />
                  <p className="text-xl text-cyan-300 font-semibold">
                    {provider.airlineCode}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-400 hover:text-white" />
            </button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mb-8">
            {/* Left Column */}
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-slate-400 mt-1" />
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <p className="text-white text-base">{provider.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-slate-400 mt-1" />
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                    Mobile
                  </p>
                  <p className="text-white text-base">
                    {provider.mobile || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-slate-400 mt-1" />
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                    Headquarters
                  </p>
                  <p className="text-white text-base">
                    {provider.headquartersAddress || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Globe className="w-5 h-5 text-slate-400 mt-1" />
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                    Website
                  </p>
                  {provider.websiteUrl ? (
                    <a
                      href={provider.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 text-base hover:text-cyan-300 underline transition"
                    >
                      {provider.websiteUrl}
                    </a>
                  ) : (
                    <p className="text-slate-500 text-base">Not provided</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <CalendarDays className="w-5 h-5 text-slate-400 mt-1" />
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                    Established
                  </p>
                  <p className="text-white text-base">
                    {provider.establishmentYear || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Calendar className="w-5 h-5 text-slate-400 mt-1" />
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                    Joined Platform
                  </p>
                  <p className="text-white text-base">
                    {new Date(provider.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Building2 className="w-5 h-5 text-slate-400 mt-1" />
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                    Country of Operation
                  </p>
                  <p className="text-white text-base capitalize">
                    {provider.countryOfOperation || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Plane className="w-5 h-5 text-slate-400 mt-1" />
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                    Type of Operation
                  </p>
                  <p className="text-white text-base capitalize">
                    {provider.typeOfOperation || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Document Previews */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4">
              Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Registration Certificate */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-6 h-6 text-orange-400" />
                  <p className="text-slate-300 font-semibold text-sm">
                    Registration Certificate
                  </p>
                </div>
                {provider.registrationCertificateUrl ? (
                  <button
                    onClick={() => window.open(provider.registrationCertificateUrl, '_blank')}
                    className="block w-full h-40 bg-white/10 rounded-lg border-2 border-dashed border-slate-600 flex items-center justify-center hover:border-cyan-500 hover:bg-white/20 transition cursor-pointer"
                  >
                    <span className="text-cyan-400 text-base font-semibold">👁️ View PDF</span>
                  </button>
                ) : (
                  <div className="w-full h-40 bg-red-500/10 rounded-lg border-2 border-dashed border-red-500/30 flex items-center justify-center">
                    <span className="text-red-400 text-base">Not Uploaded</span>
                  </div>
                )}
              </div>

              {/* Insurance Proof */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-6 h-6 text-green-400" />
                  <p className="text-slate-300 font-semibold text-sm">
                    Insurance Proof
                  </p>
                </div>
                {provider.insuranceProofUrl ? (
                  <button
                    onClick={() => window.open(provider.insuranceProofUrl, '_blank')}
                    className="block w-full h-40 bg-white/10 rounded-lg border-2 border-dashed border-slate-600 flex items-center justify-center hover:border-cyan-500 hover:bg-white/20 transition cursor-pointer"
                  >
                    <span className="text-cyan-400 text-base font-semibold">👁️ View PDF</span>
                  </button>
                ) : (
                  <div className="w-full h-40 bg-red-500/10 rounded-lg border-2 border-dashed border-red-500/30 flex items-center justify-center">
                    <span className="text-red-400 text-base">Not Uploaded</span>
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  // Safe guard — never crash if providers is undefined
  if (!providers || providers.length === 0) {
    return (
      <div className="px-8 py-6">
        <div className="bg-white/5 border border-dashed border-slate-500/40 rounded-2xl p-10 text-center">
          <Building2 className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <p className="text-slate-100 text-base mb-2">
            No providers registered yet
          </p>
          <p className="text-slate-400 text-sm">
            Providers will appear here once they sign up
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="px-8 py-6">
        {/* Top header: title + current count (exactly like users) */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-white text-3xl font-bold">All Providers</h2>

          <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-400/20 rounded-xl">
           <span className="text-xs text-blue-300 tracking-widest font-semibold">
            {providers.length} Providers
           </span>
                  </div>
        </div>

        {/* Provider cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{providers.map((provider) => (
  <div
    key={provider.id}
    className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 hover:border-blue-400/40 transition duration-300 group"
  >
    

    <div className="p-5">
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        {provider.logoUrl ? (
          <img
            src={provider.logoUrl}
            alt={provider.companyName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-lg"
          />
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 flex items-center justify-center shadow-lg border-2 border-white/10 shrink-0">
            <Building2 className="w-8 h-8 text-white" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <button onClick={() => openModal(provider)} className="text-left w-full">
            <h3 className="text-white font-bold text-lg truncate hover:text-cyan-300 transition">
              {provider.companyName}
            </h3>
          </button>
          <p className="text-cyan-400 text-xs truncate">{provider.email}</p>
          <span className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
            ${provider.isActive
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30'
              : 'bg-red-500/15 text-red-300 border border-red-400/30'
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${provider.isActive ? 'bg-emerald-400' : 'bg-red-400'}`} />
            {provider.isActive ? 'Active' : 'Blocked'}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/5 mb-4" />

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <div className="bg-white/5 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Hash className="w-3 h-3 text-slate-400" />
            <p className="text-slate-400 text-[10px] uppercase tracking-wider">Airline Code</p>
          </div>
          <p className="text-white text-xs font-medium truncate">{provider.airlineCode || '—'}</p>
        </div>

        <div className="bg-white/5 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            <p className="text-slate-400 text-[10px] uppercase tracking-wider">Joined</p>
          </div>
          <p className="text-white text-xs font-medium">
            {provider.createdAt
              ? new Date(provider.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
              : '—'}
          </p>
        </div>

        <div className="bg-white/5 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-3 h-3 text-slate-400" />
            <p className="text-slate-400 text-[10px] uppercase tracking-wider">Country</p>
          </div>
          <p className="text-white text-xs font-medium capitalize truncate">{provider.countryOfOperation || '—'}</p>
        </div>

        <div className="bg-white/5 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Plane className="w-3 h-3 text-slate-400" />
            <p className="text-slate-400 text-[10px] uppercase tracking-wider">Operation</p>
          </div>
          <p className="text-white text-xs font-medium capitalize truncate">{provider.typeOfOperation || '—'}</p>
        </div>

        <div className="bg-white/5 rounded-xl p-3 col-span-2">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <p className="text-slate-400 text-[10px] uppercase tracking-wider">Headquarters</p>
          </div>
          <p className="text-white text-xs font-medium truncate">{provider.headquartersAddress || '—'}</p>
        </div>
      </div>

      {/* Verification badge */}
      <div className="flex items-center gap-2 mb-4">
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold
          ${provider.isVerified ? 'bg-blue-500/15 text-blue-300 border border-blue-400/20' : 'bg-slate-700/50 text-slate-500 border border-slate-600/30'}`}>
          {provider.isVerified
            ? <CheckCircle className="w-3 h-3" />
            : <XCircle className="w-3 h-3" />}
          Verified
        </div>
        <button
          onClick={() => openModal(provider)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 transition"
        >
          <FileText className="w-3 h-3" />
          View Details
        </button>
      </div>

      {/* Commission Rate */}
<div className="flex items-center gap-2 mb-4">
  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2">
    <span className="text-white/40 text-xs">Commission</span>
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
      className="flex-1 bg-transparent text-white text-sm font-bold focus:outline-none w-12"
    />
    <span className="text-white/40 text-xs">%</span>
  </div>
  <button
    onClick={() =>
      handleSetCommission(
        provider.id,
        Number(commissionEdit[provider.id] ?? provider.commissionRate ?? 10)
      )
    }
    className="px-3 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 transition"
  >
    Set
  </button>
</div>

      {/* Action Button */}
      <button
        onClick={() => handleUpdateProviderStatus(provider.id, !provider.isActive)}
        className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg
          ${provider.isActive
            ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/30 hover:border-red-400/50'
            : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 hover:border-emerald-400/50'
          }`}
      >
        {provider.isActive ? (
          <><ShieldOff className="w-4 h-4" /> Block Provider</>
        ) : (
          <><Shield className="w-4 h-4" /> Activate Provider</>
        )}
      </button>
    </div>
  </div>
))}
         
        </div>

        {/* Bottom: page number + small Prev/Next buttons (exactly like users) */}
        {/* <div className="mt-12 flex flex-col items-center gap-6">
        </div> */}
        <Pagination
  currentPage={currentPage}
  totalPages={pagination?.totalPages ?? 1}
  isLoading={isLoading}
  onPageChange={handlePageChange}
/>
      </div>

      {/* Detail Modal */}
      {selectedProvider && (
        <ProviderDetailModal provider={selectedProvider} onClose={closeModal} />
      )}
    </>
  );
};

export default AllProvidersTable;