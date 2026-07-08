import React from 'react';
import { Trash2 } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
        onClick={onCancel}
      />

      {/* Modal Box */}
      <div className="relative z-10 bg-white border border-gray-200 rounded-2xl p-6 shadow-xl w-full max-w-sm flex flex-col items-center">
        
        {/* Warning Icon Container */}
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 border border-red-100 mb-4 shrink-0">
          <Trash2 className="w-5 h-5 text-red-600" />
        </div>

        {/* Modal Text Content */}
        <h3 className="text-gray-900 text-lg font-bold text-center tracking-tight mb-1">
          Delete Aircraft Asset
        </h3>
        <p className="text-gray-500 text-xs text-center leading-normal mb-6">
          Are you sure you want to delete this aircraft? This will also remove
          all associated seat layouts and configuration seats. This action cannot be undone.
        </p>

        {/* Action Button Row */}
        <div className="flex gap-3 w-full">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 py-2 rounded-xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider transition disabled:opacity-50 shadow-xs"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition disabled:opacity-50 shadow-xs"
          >
            {isLoading ? 'Removing...' : 'Delete Asset'}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default DeleteConfirmModal;