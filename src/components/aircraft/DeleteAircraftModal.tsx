import React from 'react';
interface DeleteConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}
const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  onConfirm,
  onCancel,
  isLoading,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative z-10 bg-[#00001F] border border-white/20 rounded-2xl p-8 shadow-2xl w-full max-w-sm mx-4">
        {/* Icon */}
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-500/15 border border-red-400/30 mx-auto mb-5">
          <svg
            className="w-7 h-7 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>

        <h3 className="text-white text-xl font-bold text-center mb-2">
          Delete Aircraft
        </h3>
        <p className="text-slate-300 text-sm text-center mb-6">
          Are you sure you want to delete this aircraft? This will also remove
          all associated seat layouts and seats. This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition disabled:opacity-50"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;