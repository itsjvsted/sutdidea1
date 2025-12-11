export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentWeight: number;
  maxWeight: number;
  unit: string;
  estimatedQuantity: number;
  minThreshold: number;
  shelfId: string;
  lastUpdated: Date;
  status: 'normal' | 'low' | 'critical' | 'out';
  trend: 'stable' | 'decreasing' | 'increasing';
}

export interface Alert {
  id: string;
  itemId: string;
  itemName: string;
  type: 'low_stock' | 'critical' | 'out_of_stock' | 'sensor_error';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface ShelfSensor {
  id: string;
  location: string;
  status: 'online' | 'offline' | 'error';
  batteryLevel: number;
  lastSync: Date;
}
