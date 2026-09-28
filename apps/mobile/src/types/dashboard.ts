export type SeverityLevel = 'low' | 'medium' | 'high';

export interface AlertItem {
  id: string;
  severity: SeverityLevel;
  app: string;
  message: string;
  time: string;
  timestamp: number;
}

export interface DeviceInfo {
  id: string;
  name: string;
  isOnline: boolean;
  batteryLevel: number;
  lastSync: string;
}

export interface AppUsage {
  id: string;
  packageName: string;
  appName: string;
  timeUsedMinutes: number;
  limitMinutes: number | null;
}