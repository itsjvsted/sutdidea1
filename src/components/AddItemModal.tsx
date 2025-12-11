import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useInventoryStore } from '../store/inventoryStore';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose }) => {
  const { addItem, sensors } = useInventoryStore();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Coffee Beans',
    maxWeight: '',
    unit: 'kg',
    minThreshold: '',
    shelfId: sensors[0]?.id || '',
  });

  const categories = ['Coffee Beans', 'Milk & Dairy', 'Syrups', 'Pastries', 'Supplies'];
  const units = ['kg', 'L', 'units', 'pcs'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.maxWeight || !formData.minThreshold || !formData.shelfId) {
      alert('Please fill in all required fields');
      return;
    }

    addItem({
      name: formData.name,
      category: formData.category,
      maxWeight: parseFloat(formData.maxWeight),
      unit: formData.unit,
      minThreshold: parseFloat(formData.minThreshold),
      shelfId: formData.shelfId,
    });

    // Reset form
    setFormData({
      name: '',
      category: 'Coffee Beans',
      maxWeight: '',
      unit: 'kg',
      minThreshold: '',
      shelfId: sensors[0]?.id || '',
    });

    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="neumorphic rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#374151]">Add New Item</h2>
          <button
            onClick={onClose}
            className="neumorphic-button p-2 rounded-xl hover:bg-[#DC2626] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-semibold text-[#6B7280] mb-2">
              Item Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Arabica Coffee Beans"
              className="w-full neumorphic-inset rounded-xl px-4 py-3 text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
              required
            />
          </div>

          {/* Category and Unit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#6B7280] mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full neumorphic-inset rounded-xl px-4 py-3 text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#6B7280] mb-2">
                Unit *
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full neumorphic-inset rounded-xl px-4 py-3 text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                required
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Max Weight and Min Threshold */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#6B7280] mb-2">
                Maximum Capacity *
              </label>
              <input
                type="number"
                name="maxWeight"
                value={formData.maxWeight}
                onChange={handleChange}
                placeholder="e.g., 5.0"
                step="0.1"
                min="0"
                className="w-full neumorphic-inset rounded-xl px-4 py-3 text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#6B7280] mb-2">
                Minimum Threshold *
              </label>
              <input
                type="number"
                name="minThreshold"
                value={formData.minThreshold}
                onChange={handleChange}
                placeholder="e.g., 1.0"
                step="0.1"
                min="0"
                className="w-full neumorphic-inset rounded-xl px-4 py-3 text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                required
              />
            </div>
          </div>

          {/* Shelf Selection */}
          <div>
            <label className="block text-sm font-semibold text-[#6B7280] mb-2">
              Assign to Shelf *
            </label>
            <select
              name="shelfId"
              value={formData.shelfId}
              onChange={handleChange}
              className="w-full neumorphic-inset rounded-xl px-4 py-3 text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
              required
            >
              {sensors.map((sensor) => (
                <option key={sensor.id} value={sensor.id}>
                  {sensor.id} - {sensor.location}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 neumorphic-button rounded-xl py-3 px-6 font-semibold text-[#6B7280] hover:text-[#374151] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 neumorphic-button rounded-xl py-3 px-6 font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Add Item
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
