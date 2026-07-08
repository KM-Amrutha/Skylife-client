import React from 'react';
import { createPortal } from 'react-dom';
import { Trash2 } from 'lucide-react';

interface DeleteFlightModalProps {
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

const DeleteFlightModal: React.FC<DeleteFlightModalProps> = ({ onConfirm, onCancel, isLoading }) => {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs px-4">
      {/* Modal Container */}
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-2xl p-6 text-center text-gray-900 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Warning Icon Badge */}
        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-4 border border-red-100 text-red-600">
          <Trash2 className="w-5 h-5" />
        </div>
        
        {/* Descriptive Text */}
        <h2 className="text-gray-900 text-lg font-bold mb-1.5">Delete Flight Schedule</h2>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed px-2">
          Are you sure you want to delete this flight? This action cannot be undone and the assigned aircraft status will be reset back to active.
        </p>
        
        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 order-2 sm:order-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 order-1 sm:order-2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xs"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete Flight</span>
            )}
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};

export default DeleteFlightModal;