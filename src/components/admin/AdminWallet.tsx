import React from "react";
import { Wallet, TrendingUp, Clock } from "lucide-react";
import useAdminWallet from "../../hooks/admin/useAdminWallet";
import Sidebar from "./Sidebar";

const AdminWallet: React.FC = () => {
  const { wallet, isLoading, error, formatDate, formatCurrency } =
    useAdminWallet();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 pt-20 lg:pt-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">
            Platform Wallet
          </h1>
          <p className="text-slate-400 text-sm">
            Commission earnings from all bookings
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4 mb-6">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : (
          <div className="max-w-3xl">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-cyan-300 text-xs uppercase tracking-wider">
                    Total Platform Earnings
                  </p>
                  <p className="text-4xl font-bold text-white">
                    {formatCurrency(wallet?.balance ?? 0)}
                  </p>
                </div>
              </div>
            </div>

            {/* Transactions */}
            <h2 className="text-white font-semibold mb-4">
              Commission History
              {wallet && (
                <span className="text-white/30 font-normal text-sm ml-2">
                  ({wallet.transactions.length})
                </span>
              )}
            </h2>

            {!wallet || wallet.transactions.length === 0 ? (
              <div className="bg-white/5 border border-dashed border-white/15 rounded-2xl p-10 text-center">
                <Clock className="w-10 h-10 text-white/20 mx-auto mb-3" />
                <p className="text-white/50 text-sm">
                  No commission transactions yet
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
                      <div className="w-8 h-8 rounded-full bg-cyan-500/15 border border-cyan-400/25 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">
                          {tx.description}
                        </p>
                        <p className="text-white/40 text-xs mt-0.5">
                          {formatDate(tx.createdAt)} ·{" "}
                          <span className="text-cyan-400">
                            {tx.commissionRate}% commission
                          </span>
                        </p>
                        {tx.bookingId && (
                          <p className="text-white/25 text-xs font-mono">
                            {tx.bookingId}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-cyan-400 font-bold text-sm flex-shrink-0">
                      + {formatCurrency(tx.amount)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminWallet;