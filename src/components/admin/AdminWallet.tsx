import React from "react";
import { Wallet, TrendingUp, Clock } from "lucide-react";
import useAdminWallet from "../../hooks/admin/useAdminWallet";
import Sidebar from "./Sidebar";

const AdminWallet: React.FC = () => {
  const { wallet, isLoading, error, formatDate, formatCurrency } =
    useAdminWallet();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 pt-20 lg:pt-8 overflow-y-auto">
        {/* Header */}
        <div className="bg-[#0a3a8a] text-white px-6 py-8 rounded-2xl mt-4 mb-6 shadow-xs">
  <div className="flex items-center gap-5">
    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
      <svg className="w-6 h-6 text-[#0a3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    </div>
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold">Platform Wallet</h1>
      <p className="text-blue-200 text-sm mt-1">Commission earnings from all bookings</p>
    </div>
  </div>
</div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-800 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Loader */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="max-w-3xl">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-100 rounded-2xl p-6 mb-8 shadow-xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-xs">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-blue-700 text-[11px] font-bold uppercase tracking-wider">
                    Total Platform Earnings
                  </p>
                  <p className="text-4xl font-extrabold text-gray-900 mt-0.5">
                    {formatCurrency(wallet?.balance ?? 0)}
                  </p>
                </div>
              </div>
            </div>

            {/* Transactions Header */}
            <h2 className="text-gray-900 font-bold text-base mb-4 flex items-center">
              <span>Commission History</span>
              {wallet && (
                <span className="text-gray-400 font-normal text-xs ml-2 bg-gray-200/60 px-2 py-0.5 rounded-full">
                  {wallet.transactions.length}
                </span>
              )}
            </h2>

            {/* Empty State */}
            {!wallet || wallet.transactions.length === 0 ? (
              <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center shadow-xs">
                <Clock className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-sm font-medium">
                  No commission transactions yet
                </p>
              </div>
            ) : (
              /* Transaction List */
              <div className="flex flex-col gap-3">
                {wallet.transactions.map((tx) => (
                  <div
                    key={tx.transactionId}
                    className="bg-white border border-gray-200 rounded-xl px-4 py-3.5 flex items-center justify-between shadow-xs transition-colors hover:border-gray-300"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-900 text-sm font-semibold truncate">
                          {tx.description}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          {formatDate(tx.createdAt)} ·{" "}
                          <span className="text-blue-700 font-medium">
                            {tx.commissionRate}% commission
                          </span>
                        </p>
                        {tx.bookingId && (
                          <p className="text-gray-400 text-[11px] font-mono mt-0.5 truncate">
                            ID: {tx.bookingId}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-emerald-600 font-extrabold text-sm flex-shrink-0 pl-2">
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