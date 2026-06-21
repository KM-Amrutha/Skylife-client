import React from "react";
import { Wallet, TrendingUp, Clock } from "lucide-react";
import useProviderWallet from "../../hooks/provider/useProviderWallet";

const ProviderWallet: React.FC = () => {
  const { wallet, isLoading, error, formatDate } = useProviderWallet();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-white/50 text-xs uppercase tracking-wider">
              Total Earnings
            </p>
            <p className="text-3xl font-bold text-white">
              ₹{(wallet?.balance ?? 0).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
        <p className="text-white/30 text-xs">
          Revenue from confirmed flight bookings
        </p>
      </div>

      {/* Transactions */}
      <div>
        <h2 className="text-white font-semibold mb-4">
          Earnings History
          {wallet && (
            <span className="text-white/30 font-normal text-sm ml-2">
              ({wallet.transactions.length})
            </span>
          )}
        </h2>

        {!wallet || wallet.transactions.length === 0 ? (
          <div className="bg-white/5 border border-dashed border-white/15 rounded-2xl p-10 text-center">
            <Clock className="w-10 h-10 text-white/20 mx-auto mb-3" />
            <p className="text-white/50 text-sm">No earnings yet</p>
            <p className="text-white/30 text-xs mt-1">
              Revenue from confirmed bookings will appear here
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {wallet.transactions.map((tx) => (
              <div
                key={tx.transactionId}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-400/25 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {tx.description}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5">
                      {formatDate(tx.createdAt)}
                    </p>
                    {tx.bookingId && (
                      <p className="text-white/25 text-xs font-mono">
                        {tx.bookingId}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-emerald-400 font-bold text-sm flex-shrink-0">
                  + ₹{tx.amount.toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderWallet;