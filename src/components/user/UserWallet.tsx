import React from "react";
import { Wallet, TrendingUp, Clock } from "lucide-react";
import useUserWallet from "../../hooks/user/useUserWallet";

const UserWallet: React.FC = () => {
  const { wallet, isLoading, error, formatDate } = useUserWallet();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/60">Loading wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001233] to-[#001f4d] text-white">
      <header className="px-6 md:px-8 py-5 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white">My Wallet</h1>
        <p className="text-white/40 text-sm mt-1">
          Refunds and credits appear here
        </p>
      </header>

      <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
        {error && (
          <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4 mb-6">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wider">
                Available Balance
              </p>
              <p className="text-3xl font-bold text-white">
                ₹{(wallet?.balance ?? 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/30">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Credits from refunds only</span>
          </div>
        </div>

        {/* Transactions */}
        <div>
          <h2 className="text-white font-semibold mb-4">
            Transaction History
            {wallet && (
              <span className="text-white/30 font-normal text-sm ml-2">
                ({wallet.transactions.length})
              </span>
            )}
          </h2>

          {!wallet || wallet.transactions.length === 0 ? (
            <div className="bg-white/5 border border-dashed border-white/15 rounded-2xl p-10 text-center">
              <Clock className="w-10 h-10 text-white/20 mx-auto mb-3" />
              <p className="text-white/50 text-sm">No transactions yet</p>
              <p className="text-white/30 text-xs mt-1">
                Refunds from cancellations will appear here
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
    </div>
  );
};

export default UserWallet;