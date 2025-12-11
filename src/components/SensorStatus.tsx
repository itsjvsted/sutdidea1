import React from 'react';
import { Wifi, WifiOff, Battery, BatteryLow, BatteryMedium, BatteryFull } from 'lucide-react';
import { useInventoryStore } from '../store/inventoryStore';

export const SensorStatus: React.FC = () => {
  const sensors = useInventoryStore((state) => state.sensors);

  const getBatteryIcon = (level: number) => {
    if (level > 75) return <BatteryFull className="w-5 h-5 text-[#059669]" />;
    if (level > 40) return <BatteryMedium className="w-5 h-5 text-[#F59E0B]" />;
    return <BatteryLow className="w-5 h-5 text-[#DC2626]" />;
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    return `${Math.floor(diff / 60)}h ago`;
  };

  const onlineSensors = sensors.filter(s => s.status === 'online').length;

  return (
    <div className="neumorphic rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#374151]">Sensor Network</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#059669] animate-pulse"></div>
          <span className="text-sm text-[#6B7280]">{onlineSensors}/{sensors.length} Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sensors.map((sensor) => (
          <div key={sensor.id} className="neumorphic-flat rounded-2xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {sensor.status === 'online' ? (
                  <Wifi className="w-5 h-5 text-[#059669]" />
                ) : (
                  <WifiOff className="w-5 h-5 text-[#DC2626]" />
                )}
                <span className="font-semibold text-[#374151] text-sm">{sensor.id}</span>
              </div>
              
              <div className="flex items-center gap-1">
                {getBatteryIcon(sensor.batteryLevel)}
                <span className="text-xs text-[#6B7280]">{sensor.batteryLevel}%</span>
              </div>
            </div>
            
            <p className="text-xs text-[#6B7280] mb-2">{sensor.location}</p>
            
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded-full ${
                sensor.status === 'online' 
                  ? 'bg-[#D1FAE5] text-[#065F46]' 
                  : 'bg-[#FEE2E2] text-[#991B1B]'
              }`}>
                {sensor.status.toUpperCase()}
              </span>
              <span className="text-xs text-[#9CA3AF]">
                Synced {formatTimestamp(sensor.lastSync)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
