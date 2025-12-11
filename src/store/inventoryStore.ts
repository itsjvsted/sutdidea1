import { create } from 'zustand';
import { InventoryItem, Alert, ShelfSensor } from '../types';

interface InventoryStore {
  items: InventoryItem[];
  alerts: Alert[];
  sensors: ShelfSensor[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  acknowledgeAlert: (alertId: string) => void;
  updateItem: (itemId: string, data: Partial<InventoryItem>) => void;
  addItem: (data: Omit<InventoryItem, 'id' | 'currentWeight' | 'estimatedQuantity' | 'lastUpdated' | 'status' | 'trend'>) => void;
  removeItem: (itemId: string) => void;
}

// Mock data generator
const generateMockData = (): { items: InventoryItem[], alerts: Alert[], sensors: ShelfSensor[] } => {
  const categories = ['Coffee Beans', 'Milk & Dairy', 'Syrups', 'Pastries', 'Supplies'];
  const items: InventoryItem[] = [
    {
      id: '1',
      name: 'Arabica Coffee Beans',
      category: 'Coffee Beans',
      currentWeight: 3.2,
      maxWeight: 5.0,
      unit: 'kg',
      estimatedQuantity: 64,
      minThreshold: 1.0,
      shelfId: 'SHELF-A1',
      lastUpdated: new Date(Date.now() - 1000 * 60 * 15),
      status: 'normal',
      trend: 'decreasing'
    },
    {
      id: '2',
      name: 'Robusta Coffee Beans',
      category: 'Coffee Beans',
      currentWeight: 0.8,
      maxWeight: 5.0,
      unit: 'kg',
      estimatedQuantity: 16,
      minThreshold: 1.0,
      shelfId: 'SHELF-A2',
      lastUpdated: new Date(Date.now() - 1000 * 60 * 8),
      status: 'low',
      trend: 'decreasing'
    },
    {
      id: '3',
      name: 'Whole Milk',
      category: 'Milk & Dairy',
      currentWeight: 8.5,
      maxWeight: 12.0,
      unit: 'L',
      estimatedQuantity: 8,
      minThreshold: 2.0,
      shelfId: 'SHELF-B1',
      lastUpdated: new Date(Date.now() - 1000 * 60 * 5),
      status: 'normal',
      trend: 'stable'
    },
    {
      id: '4',
      name: 'Oat Milk',
      category: 'Milk & Dairy',
      currentWeight: 1.2,
      maxWeight: 8.0,
      unit: 'L',
      estimatedQuantity: 1,
      minThreshold: 2.0,
      shelfId: 'SHELF-B2',
      lastUpdated: new Date(Date.now() - 1000 * 60 * 3),
      status: 'critical',
      trend: 'decreasing'
    },
    {
      id: '5',
      name: 'Almond Milk',
      category: 'Milk & Dairy',
      currentWeight: 0,
      maxWeight: 8.0,
      unit: 'L',
      estimatedQuantity: 0,
      minThreshold: 2.0,
      shelfId: 'SHELF-B3',
      lastUpdated: new Date(Date.now() - 1000 * 60 * 45),
      status: 'out',
      trend: 'decreasing'
    },
    {
      id: '6',
      name: 'Vanilla Syrup',
      category: 'Syrups',
      currentWeight: 2.8,
      maxWeight: 4.0,
      unit: 'L',
      estimatedQuantity: 2,
      minThreshold: 0.5,
      shelfId: 'SHELF-C1',
      lastUpdated: new Date(Date.now() - 1000 * 60 * 12),
      status: 'normal',
      trend: 'stable'
    },
    {
      id: '7',
      name: 'Caramel Syrup',
      category: 'Syrups',
      currentWeight: 3.5,
      maxWeight: 4.0,
      unit: 'L',
      estimatedQuantity: 3,
      minThreshold: 0.5,
      shelfId: 'SHELF-C2',
      lastUpdated: new Date(Date.now() - 1000 * 60 * 20),
      status: 'normal',
      trend: 'decreasing'
    },
    {
      id: '8',
      name: 'Hazelnut Syrup',
      category: 'Syrups',
      currentWeight: 0.4,
      maxWeight: 4.0,
      unit: 'L',
      estimatedQuantity: 0,
      minThreshold: 0.5,
      shelfId: 'SHELF-C3',
      lastUpdated: new Date(Date.now() - 1000 * 60 * 7),
      status: 'low',
      trend: 'decreasing'
    },
    {
      id: '9',
      name: 'Croissants',
      category: 'Pastries',
      currentWeight: 1.8,
      maxWeight: 3.0,
      unit: 'kg',
      estimatedQuantity: 24,
      minThreshold: 0.5,
      shelfId: 'SHELF-D1',
      lastUpdated: new Date(Date.now() - 1000 * 60 * 2),
      status: 'normal',
      trend: 'stable'
    },
    {
      id: '10',
      name: 'Muffins',
      category: 'Pastries',
      currentWeight: 2.2,
      maxWeight: 3.0,
      unit: 'kg',
      estimatedQuantity: 18,
      minThreshold: 0.5,
      shelfId: 'SHELF-D2',
      lastUpdated: new Date(Date.now() - 1000 * 60 * 10),
      status: 'normal',
      trend: 'decreasing'
    },
    {
      id: '11',
      name: 'Paper Cups (12oz)',
      category: 'Supplies',
      currentWeight: 2.5,
      maxWeight: 5.0,
      unit: 'kg',
      estimatedQuantity: 180,
      minThreshold: 1.0,
      shelfId: 'SHELF-E1',
      lastUpdated: new Date(Date.now() - 1000 * 60 * 18),
      status: 'normal',
      trend: 'stable'
    },
    {
      id: '12',
      name: 'Napkins',
      category: 'Supplies',
      currentWeight: 0.9,
      maxWeight: 3.0,
      unit: 'kg',
      estimatedQuantity: 450,
      minThreshold: 0.8,
      shelfId: 'SHELF-E2',
      lastUpdated: new Date(Date.now() - 1000 * 60 * 25),
      status: 'low',
      trend: 'decreasing'
    }
  ];

  const alerts: Alert[] = [
    {
      id: 'a1',
      itemId: '5',
      itemName: 'Almond Milk',
      type: 'out_of_stock',
      message: 'Almond Milk is out of stock',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      acknowledged: false,
      priority: 'high'
    },
    {
      id: 'a2',
      itemId: '4',
      itemName: 'Oat Milk',
      type: 'critical',
      message: 'Oat Milk is critically low (1.2L remaining)',
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      acknowledged: false,
      priority: 'high'
    },
    {
      id: 'a3',
      itemId: '2',
      itemName: 'Robusta Coffee Beans',
      type: 'low_stock',
      message: 'Robusta Coffee Beans below minimum threshold',
      timestamp: new Date(Date.now() - 1000 * 60 * 8),
      acknowledged: false,
      priority: 'medium'
    },
    {
      id: 'a4',
      itemId: '8',
      itemName: 'Hazelnut Syrup',
      type: 'low_stock',
      message: 'Hazelnut Syrup running low (0.4L remaining)',
      timestamp: new Date(Date.now() - 1000 * 60 * 7),
      acknowledged: false,
      priority: 'medium'
    },
    {
      id: 'a5',
      itemId: '12',
      itemName: 'Napkins',
      type: 'low_stock',
      message: 'Napkins approaching minimum threshold',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      acknowledged: false,
      priority: 'low'
    }
  ];

  const sensors: ShelfSensor[] = [
    {
      id: 'SHELF-A1',
      location: 'Storage Room - Shelf A1',
      status: 'online',
      batteryLevel: 87,
      lastSync: new Date(Date.now() - 1000 * 60 * 2)
    },
    {
      id: 'SHELF-A2',
      location: 'Storage Room - Shelf A2',
      status: 'online',
      batteryLevel: 92,
      lastSync: new Date(Date.now() - 1000 * 60 * 1)
    },
    {
      id: 'SHELF-B1',
      location: 'Refrigerator - Shelf B1',
      status: 'online',
      batteryLevel: 78,
      lastSync: new Date(Date.now() - 1000 * 60 * 3)
    },
    {
      id: 'SHELF-B2',
      location: 'Refrigerator - Shelf B2',
      status: 'online',
      batteryLevel: 65,
      lastSync: new Date(Date.now() - 1000 * 60 * 1)
    },
    {
      id: 'SHELF-B3',
      location: 'Refrigerator - Shelf B3',
      status: 'online',
      batteryLevel: 71,
      lastSync: new Date(Date.now() - 1000 * 60 * 5)
    },
    {
      id: 'SHELF-C1',
      location: 'Counter - Shelf C1',
      status: 'online',
      batteryLevel: 94,
      lastSync: new Date(Date.now() - 1000 * 60 * 2)
    },
    {
      id: 'SHELF-C2',
      location: 'Counter - Shelf C2',
      status: 'online',
      batteryLevel: 88,
      lastSync: new Date(Date.now() - 1000 * 60 * 4)
    },
    {
      id: 'SHELF-C3',
      location: 'Counter - Shelf C3',
      status: 'online',
      batteryLevel: 45,
      lastSync: new Date(Date.now() - 1000 * 60 * 1)
    },
    {
      id: 'SHELF-D1',
      location: 'Display Case - Shelf D1',
      status: 'online',
      batteryLevel: 82,
      lastSync: new Date(Date.now() - 1000 * 60 * 1)
    },
    {
      id: 'SHELF-D2',
      location: 'Display Case - Shelf D2',
      status: 'online',
      batteryLevel: 76,
      lastSync: new Date(Date.now() - 1000 * 60 * 3)
    },
    {
      id: 'SHELF-E1',
      location: 'Back Storage - Shelf E1',
      status: 'online',
      batteryLevel: 91,
      lastSync: new Date(Date.now() - 1000 * 60 * 2)
    },
    {
      id: 'SHELF-E2',
      location: 'Back Storage - Shelf E2',
      status: 'online',
      batteryLevel: 68,
      lastSync: new Date(Date.now() - 1000 * 60 * 6)
    }
  ];

  return { items, alerts, sensors };
};

const mockData = generateMockData();

export const useInventoryStore = create<InventoryStore>((set) => ({
  items: mockData.items,
  alerts: mockData.alerts,
  sensors: mockData.sensors,
  selectedCategory: 'All',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  acknowledgeAlert: (alertId) =>
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      ),
    })),
  updateItem: (itemId, data) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, ...data } : item
      ),
    })),
  addItem: (data) =>
    set((state) => {
      const newItem: InventoryItem = {
        ...data,
        id: `item-${Date.now()}`,
        currentWeight: 0,
        estimatedQuantity: 0,
        lastUpdated: new Date(),
        status: 'out',
        trend: 'stable',
      };
      return { items: [...state.items, newItem] };
    }),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
      alerts: state.alerts.filter((alert) => alert.itemId !== itemId),
    })),
}));
