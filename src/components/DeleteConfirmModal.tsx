import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  itemName,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="neumorphic rounded-3xl p-8 max-w-md w-full">
        <div className="flex items-start gap-4 mb-6">
          <div className="neumorphic-button p-3 rounded-xl bg-[#FEE2E2]">
            <AlertTriangle className="w-6 h-6 text-[#DC2626]" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#374151] mb-2">Delete Item</h2>
            <p className="text-[#6B7280]">
              Are you sure you want to delete <span className="font-semibold text-[#374151]">"{itemName}"</span>? 
              This action cannot be undone.
            </p>
          </div>
          <button
            onClick={onCancel}
            className="neumorphic-button p-2 rounded-xl hover:bg-[#F3F4F6] transition-colors"
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 neumorphic-button rounded-xl py-3 px-6 font-semibold text-[#6B7280] hover:text-[#374151] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl py-3 px-6 font-semibold text-white bg-[#DC2626] hover:bg-[#B91C1C] transition-colors shadow-lg hover:shadow-xl"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
