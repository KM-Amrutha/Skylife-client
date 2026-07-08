import React,{useState} from "react";
import { Wallet, TrendingUp, Clock,Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useUserWallet from "../../hooks/user/useUserWallet";
import UserHeader from "./UserHeader";
import AddMoneyModal from "../wallet/AddMoneyModal";

const UserWallet: React.FC = () => {
  const navigate = useNavigate();
  const { wallet, isLoading, error, formatDate } = useUserWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#0a3a8a] rounded-full animate-spin" />
          <p className="text-gray-700">Loading wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-100 text-gray-900">
      <UserHeader onBack={() => navigate("/user/userdashboard")} backLabel="Dashboard" />
<div className="bg-[#0a3a8a] text-white px-6 py-8 rounded-2xl mt-4 mb-6 shadow-xs max-w-2xl mx-auto">
  <div className="flex items-center gap-5">
    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
      <svg className="w-6 h-6 text-[#0a3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    </div>
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold">My Wallet</h1>
      <p className="text-blue-200 text-sm mt-1">Refunds and credits appear here</p>
    </div>
  </div>
</div>

      <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Balance Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-gray-600 text-xs uppercase tracking-wider">
                Available Balance
              </p>
              <p className="text-3xl font-bold text-gray-900">
                ₹{(wallet?.balance ?? 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Credits from refunds only</span>
          </div>
        </div>

        {/* Transactions */}
        <div>
          <h2 className="text-gray-900 font-semibold mb-4">
            Transaction History
            {wallet && (
              <span className="text-gray-600 font-normal text-sm ml-2">
                ({wallet.transactions.length})
              </span>
            )}
          </h2>

          {isModalOpen && <AddMoneyModal onClose={() => setIsModalOpen(false)} />}

          {!wallet || wallet.transactions.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">
              <Clock className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-700 text-sm">No transactions yet</p>
              <p className="text-gray-600 text-xs mt-1">
                Refunds from cancellations will appear here
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {wallet.transactions.map((tx) => (
                <div
                  key={tx.transactionId}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-3.5 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-900 text-sm font-medium truncate">
                        {tx.description}
                      </p>
                      <p className="text-gray-600 text-xs mt-0.5">
                        {formatDate(tx.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="text-emerald-600 font-bold text-sm flex-shrink-0">
                    + ₹{tx.amount.toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
              <button
  onClick={() => setIsModalOpen(true)}
  className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0a3a8a] text-white text-sm font-semibold hover:bg-[#082c6b] transition"
>
  <Plus className="w-4 h-4" />
  Add Money
</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserWallet;