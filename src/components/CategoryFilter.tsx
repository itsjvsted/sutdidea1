import React from 'react';
import { useInventoryStore } from '../store/inventoryStore';

export const CategoryFilter: React.FC = () => {
  const { items, selectedCategory, setSelectedCategory } = useInventoryStore();
  
  const categories = ['All', ...Array.from(new Set(items.map(item => item.category)))];
  
  return (
    <div className="neumorphic rounded-3xl p-6 mb-8">
      <h3 className="text-sm font-semibold text-[#6B7280] mb-4">FILTER BY CATEGORY</h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'neumorphic-pressed text-[#374151]'
                : 'neumorphic text-[#6B7280] hover:text-[#374151]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
