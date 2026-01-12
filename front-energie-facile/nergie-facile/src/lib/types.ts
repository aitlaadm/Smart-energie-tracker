/**
 * Types TypeScript pour l'API du backend
 */

export interface EnergyValue {
  value: number;
  unit: string;
  trend: number;
}

export interface CurrentConsumption {
  electricity: EnergyValue;
  water: EnergyValue;
  gas: EnergyValue;
  total: EnergyValue;
}

export interface ConsumptionRecord {
  id: number;
  type: 'ELECTRICITY' | 'WATER' | 'GAS';
  value: number;
  unit: string;
  recordedAt: string;
  notes?: string;
  createdAt: string;
}

export interface DailyConsumption {
  id: number;
  date: string;
  electricityValue: number;
  waterValue: number;
  gasValue: number;
  totalValue: number;
}

export interface MonthlyConsumption {
  id: number;
  year: number;
  month: number;
  monthName: string;
  electricityValue: number;
  waterValue: number;
  gasValue: number;
  totalValue: number;
  trend?: number;
}

export interface Alert {
  id: number;
  type: 'DANGER' | 'WARNING' | 'SUCCESS';
  title: string;
  message: string;
  isActive: boolean;
}

export interface ChartDataPoint {
  name: string;
  electricity?: number;
  water?: number;
  gas?: number;
}
