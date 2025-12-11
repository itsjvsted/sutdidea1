import React, { useState } from 'react';
import { TrendingDown, TrendingUp, Minus, AlertTriangle, Trash2 } from 'lucide-react';
import { useInventoryStore } from '../store/inventoryStore';
import { InventoryItem } from '../types';
import { DeleteConfirmModal } from './DeleteConfirmModal';

export const InventoryTable: React.FC = () => {
  const { items, selectedCategory, removeItem } = useInventoryStore();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<InventoryItem | null>(null);
  
  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const getStatusColor = (status: InventoryItem['status']) => {
    switch (status) {
      case 'normal': return 'text-[#059669]';
      case 'low': return 'text-[#F59E0B]';
      case 'critical': return 'text-[#DC2626]';
      case 'out': return 'text-[#991B1B]';
      default: return 'text-[#6B7280]';
    }
  };

  const getStatusBg = (status: InventoryItem['status']) => {
    switch (status) {
      case 'normal': return 'bg-[#D1FAE5]';
      case 'low': return 'bg-[#FEF3C7]';
      case 'critical': return 'bg-[#FEE2E2]';
      case 'out': return 'bg-[#FEE2E2]';
      default: return 'bg-[#F3F4F6]';
    }
  };

  const getTrendIcon = (trend: InventoryItem['trend']) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-[#059669]" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-[#DC2626]" />;
      case 'stable': return <Minus className="w-4 h-4 text-[#6B7280]" />;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const handleDeleteClick = (item: InventoryItem) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      removeItem(itemToDelete.id);
      setDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <>
      <div className="neumorphic rounded-3xl p-6">
        <h2 className="text-xl font-bold text-[#374151] mb-6">Inventory Items</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D1D5DB]">
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B7280]">ITEM</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B7280]">CATEGORY</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B7280]">CURRENT</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B7280]">CAPACITY</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B7280]">STATUS</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B7280]">TREND</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B7280]">SHELF</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B7280]">UPDATED</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#6B7280]">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const percentage = (item.currentWeight / item.maxWeight) * 100;
                
                return (
                  <tr key={item.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {(item.status === 'critical' || item.status === 'out') && (
                          <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
                        )}
                        <span className="font-medium text-[#374151]">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#6B7280]">{item.category}</td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-[#374151]">
                        {item.currentWeight.toFixed(1)} {item.unit}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 neumorphic-inset rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              percentage > 50 ? 'bg-[#059669]' : 
                              percentage > 20 ? 'bg-[#F59E0B]' : 'bg-[#DC2626]'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-[#6B7280] w-12">{percentage.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBg(item.status)} ${getStatusColor(item.status)}`}>
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center">
                        {getTrendIcon(item.trend)}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#6B7280] text-sm">{item.shelfId}</td>
                    <td className="py-4 px-4 text-[#9CA3AF] text-sm">{formatTimestamp(item.lastUpdated)}</td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="neumorphic-button p-2 rounded-xl hover:bg-[#DC2626] hover:text-white transition-all group"
                        title="Delete item"
                      >
                        <Trash2 className="w-4 h-4 text-[#6B7280] group-hover:text-white" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        itemName={itemToDelete?.name || ''}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
        }}
      />
    </>
  );
};
