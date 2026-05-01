import React from 'react';
import { createPortal } from 'react-dom';

interface DeleteFlightModalProps {
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

const DeleteFlightModal: React.FC<DeleteFlightModalProps> = ({ onConfirm, onCancel, isLoading }) => {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#0a1628] border border-white/20 rounded-2xl w-full max-w-md shadow-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h2 className="text-white text-xl font-bold mb-2">Delete Flight</h2>
        <p className="text-slate-400 text-sm mb-8">
          Are you sure you want to delete this flight? This action cannot be undone and the aircraft will be reset to active.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting...
              </>
            ) : 'Delete Flight'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteFlightModal;