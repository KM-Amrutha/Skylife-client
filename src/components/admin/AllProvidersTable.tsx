import React, { useState } from "react";
import useAdminProviders from "../../hooks/useAdminProviders";
import { Provider } from "../../redux/auth/authTypes";
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
  const { providers, isLoading, handleUpdateProviderStatus } =
    useAdminProviders();
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );

  const openModal = (provider: Provider) => setSelectedProvider(provider);
  const closeModal = () => setSelectedProvider(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  if (providers.length === 0) {
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
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white text-3xl font-bold">All Providers</h2>
          <div className="px-5 py-2 bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-300 text-base font-semibold">
            {providers.length} {providers.length === 1 ? "Provider" : "Providers"}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <div
              key={provider._id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg shadow-black/30 hover:border-blue-400/60 hover:shadow-blue-500/20 transition duration-300"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                {provider.logoUrl ? (
                  <img
                    src={provider.logoUrl}
                    alt={provider.companyName}
                    className="w-14 h-14 rounded-xl object-cover border-2 border-blue-400/30"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center border-2 border-blue-400/30">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => openModal(provider)}
                    className="text-left w-full"
                  >
                    <h3 className="text-xl font-bold text-white mb-1 hover:text-cyan-300 transition truncate">
                      {provider.companyName}
                    </h3>
                  </button>
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-slate-400" />
                    <p className="text-base text-cyan-300 font-medium">
                      {provider.airlineCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <p className="text-slate-200 text-sm truncate">
                    {provider.email}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <p className="text-slate-300 text-sm">
                    Joined {new Date(provider.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-sm">Status:</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      provider.isActive
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {provider.isActive ? "Active" : "Blocked"}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() =>
                  handleUpdateProviderStatus(provider._id, !provider.isActive)
                }
                className={`w-full py-3 font-bold rounded-xl transition-all shadow-lg hover:scale-105 flex items-center justify-center gap-2 ${
                  provider.isActive
                    ? "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white hover:shadow-red-500/50"
                    : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white hover:shadow-green-500/50"
                }`}
              >
                {provider.isActive ? (
                  <>
                    <ShieldOff className="w-5 h-5" />
                    Block Provider
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Activate Provider
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProvider && (
        <ProviderDetailModal provider={selectedProvider} onClose={closeModal} />
      )}
    </>
  );
};

export default AllProvidersTable;