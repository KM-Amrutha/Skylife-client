import React,{useState} from "react";
import { Wallet, TrendingUp, Clock,Plus } from "lucide-react";
import useProviderWallet from "../../hooks/provider/useProviderWallet";
import AddMoneyProviderModal from "../wallet/AddMoneyProviderModal";

const ProviderWallet: React.FC = () => {
  const { wallet, isLoading, error, formatDate } = useProviderWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#0a3a8a] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

<div className="bg-[#0a3a8a] text-white px-4 sm:px-8 py-8 rounded-2xl mx-4 sm:mx-8 mt-6 shadow-xs">
  <div className="max-w-6xl mx-auto flex items-center gap-5">
    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
      <Wallet className="w-8 h-8 text-[#0a3a8a]" />
    </div>
    <div>
      <p className="text-2xl sm:text-3xl font-bold">Total Earnings</p>
      <p className="text-blue-200 text-sm mt-1">₹{(wallet?.balance ?? 0).toLocaleString("en-IN")} · Revenue from confirmed flight bookings</p>
    </div>
  </div>
</div>

      {/* Transactions */}
<div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 space-y-6">
  <h2 className="text-gray-900 font-semibold">
    Earnings History
    {wallet && (
      <span className="text-gray-400 font-normal text-sm ml-2">
        ({wallet.transactions.length})
      </span>
    )}
  </h2>
  {isModalOpen && <AddMoneyProviderModal onClose={() => setIsModalOpen(false)} />}

  {!wallet || wallet.transactions.length === 0 ? (
    <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">
      <Clock className="w-10 h-10 text-gray-300 mx-auto mb-3" />
      <p className="text-gray-500 text-sm">No earnings yet</p>
      <p className="text-gray-400 text-xs mt-1">
        Revenue from confirmed bookings will appear here
      </p>
    </div>
  ) : (
    <div className="flex flex-col gap-3">
      {wallet.transactions.map((tx) => (
        <div
          key={tx.transactionId}
          className="bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-3.5 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-gray-900 text-sm font-medium">{tx.description}</p>
              <p className="text-gray-400 text-xs mt-0.5">{formatDate(tx.createdAt)}</p>
              {tx.bookingId && (
                <p className="text-gray-400 text-xs font-mono">{tx.bookingId}</p>
              )}
            </div>
          </div>
          <p className="text-emerald-600 font-bold text-sm flex-shrink-0">
            + ₹{tx.amount.toLocaleString("en-IN")}
          </p>
        </div>
            ))}
           </div>
        )}
              <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0a3a8a] text-white text-sm font-semibold hover:bg-[#082c6b] transition"
        >
          <Plus className="w-4 h-4" />
          Add Money
        </button>
      </div>
    </div>
  );
};

export default ProviderWallet;