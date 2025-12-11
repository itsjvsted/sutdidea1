import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useInventoryStore } from '../store/inventoryStore';
import { Alert } from '../types';

export const AlertsPanel: React.FC = () => {
  const { alerts, acknowledgeAlert } = useInventoryStore();
  
  const unacknowledgedAlerts = alerts.filter(a => !a.acknowledged);

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'out_of_stock': return <XCircle className="w-5 h-5 text-[#DC2626]" />;
      case 'critical': return <AlertTriangle className="w-5 h-5 text-[#DC2626]" />;
      case 'low_stock': return <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />;
      case 'sensor_error': return <AlertTriangle className="w-5 h-5 text-[#6B7280]" />;
    }
  };

  const getPriorityColor = (priority: Alert['priority']) => {
    switch (priority) {
      case 'high': return 'border-l-[#DC2626]';
      case 'medium': return 'border-l-[#F59E0B]';
      case 'low': return 'border-l-[#6B7280]';
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

  return (
    <div className="neumorphic rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#374151]">Active Alerts</h2>
        <span className="neumorphic-flat px-4 py-2 rounded-full text-sm font-semibold text-[#DC2626]">
          {unacknowledgedAlerts.length} Active
        </span>
      </div>

      <div className="space-y-4">
        {unacknowledgedAlerts.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-[#059669] mx-auto mb-4 opacity-50" />
            <p className="text-[#6B7280]">No active alerts</p>
            <p className="text-sm text-[#9CA3AF] mt-1">All inventory levels are normal</p>
          </div>
        ) : (
          unacknowledgedAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`neumorphic-flat rounded-2xl p-4 border-l-4 ${getPriorityColor(alert.priority)} hover:shadow-lg transition-all duration-200`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getAlertIcon(alert.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-[#374151]">{alert.itemName}</h3>
                    <span className="text-xs text-[#9CA3AF] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimestamp(alert.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-[#6B7280] mb-3">{alert.message}</p>
                  
                  <button
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="neumorphic px-4 py-2 rounded-xl text-sm font-medium text-[#374151] hover:neumorphic-pressed transition-all duration-200"
                  >
                    Acknowledge
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
