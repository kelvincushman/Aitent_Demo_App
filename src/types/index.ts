export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'electrician';
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface SensorEvent {
  id: string;
  type: 'CABLE_FAULT' | 'CRITICAL_FAULT' | 'CIRCUIT_FAULT' | 'REACTIVATION';
  location: {
    latitude: number;
    longitude: number;
  };
  batteryLevel: number;
  timestamp: string;
}

export interface Booking {
  id: string;
  clientId: string;
  electricianId?: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  location: {
    latitude: number;
    longitude: number;
  };
  sensorEventId?: string;
  timestamp: string;
}