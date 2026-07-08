import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import useAddMoneyProvider from "../../hooks/wallet/useAddMoneyProvider";

const AddMoneyProviderModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { isAdding, error, handleAddMoney } = useAddMoneyProvider();
  const [amount, setAmount] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async () => {
    const parsed = Number(amount);
    if (!parsed || parsed < 1) { setLocalError("Enter a valid amount"); return; }
    if (parsed > 500000) { setLocalError("Maximum top-up is ₹5,00,000"); return; }
    setLocalError("");
    await handleAddMoney(parsed);
    setAmount("");
  };

  const handleClose = () => { setAmount(""); setLocalError(""); onClose(); };
  const displayError = localError || error;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 max-w-sm w-full">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-gray-900 font-bold text-base">Add Money</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-700 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-xs text-gray-600 mb-1.5 font-medium">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => { setAmount(e.target.value); setLocalError(""); }}
            placeholder="Enter amount"
            min={1}
            max={500000}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a3a8a]/20 focus:border-[#0a3a8a] transition"
          />
          {displayError && <p className="text-red-500 text-xs mt-1.5">{displayError}</p>}
          <p className="text-gray-400 text-xs mt-1.5">Maximum: ₹5,00,000 per transaction</p>
        </div>

        <div className="flex gap-2 mb-5">
          {[500, 1000, 5000, 10000].map((quick) => (
            <button
              key={quick}
              type="button"
              onClick={() => { setAmount(String(quick)); setLocalError(""); }}
              className="flex-1 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium hover:border-[#0a3a8a] hover:text-[#0a3a8a] transition"
            >
              ₹{quick.toLocaleString("en-IN")}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 py-2.5 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isAdding}
            className="flex-1 py-2.5 rounded-full bg-[#0a3a8a] text-white text-sm font-bold hover:bg-[#082c6b] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isAdding ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : <><Plus className="w-4 h-4" />Add Money</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMoneyProviderModal;