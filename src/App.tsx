import React from 'react';
import { Package, AlertTriangle, TrendingDown, Activity } from 'lucide-react';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { CategoryFilter } from './components/CategoryFilter';
import { InventoryTable } from './components/InventoryTable';
import { AlertsPanel } from './components/AlertsPanel';
import { SensorStatus } from './components/SensorStatus';
import { useInventoryStore } from './store/inventoryStore';

function App() {
  const { items, alerts } = useInventoryStore();

  const totalItems = items.length;
  const lowStockItems = items.filter(item => item.status === 'low' || item.status === 'critical').length;
  const outOfStockItems = items.filter(item => item.status === 'out').length;
  const activeAlerts = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className="min-h-screen bg-[#E0E5EC] p-6">
      <div className="max-w-[1600px] mx-auto">
        <Header />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Items"
            value={totalItems}
            subtitle="Across all categories"
            icon={Package}
            color="#6B7280"
          />
          <StatsCard
            title="Low Stock"
            value={lowStockItems}
            subtitle="Need restocking soon"
            icon={TrendingDown}
            trend="down"
            color="#F59E0B"
          />
          <StatsCard
            title="Out of Stock"
            value={outOfStockItems}
            subtitle="Immediate attention"
            icon={AlertTriangle}
            trend="down"
            color="#DC2626"
          />
          <StatsCard
            title="Active Alerts"
            value={activeAlerts}
            subtitle="Unacknowledged"
            icon={Activity}
            color="#DC2626"
          />
        </div>

        {/* Category Filter */}
        <CategoryFilter />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <InventoryTable />
          </div>
          <div className="space-y-8">
            <AlertsPanel />
          </div>
        </div>

        {/* Sensor Status */}
        <SensorStatus />
      </div>
    </div>
  );
}

export default App;
