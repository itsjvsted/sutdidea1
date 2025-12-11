import React, { useState } from 'react';
import { Package, Plus } from 'lucide-react';
import { AddItemModal } from './AddItemModal';

export const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="neumorphic rounded-3xl p-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="neumorphic-button p-4 rounded-2xl">
              <Package className="w-8 h-8 text-[#6366F1]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#374151]">Smart Inventory</h1>
              <p className="text-[#6B7280] mt-1">Real-time weight-based tracking system</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="neumorphic-button rounded-xl py-3 px-6 font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Item
            </div>
          </button>
        </div>
      </div>

      <AddItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
