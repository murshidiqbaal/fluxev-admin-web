export type ChargingSessionStatus = 'active' | 'completed' | 'failed' | 'cancelled';

export interface ChargingSession {
  id: string;
  user_id: string;
  station_id: string;
  connector_id: string;
  start_time: string;
  end_time?: string;
  energy_consumed_kwh: number;
  total_cost: number;
  status: ChargingSessionStatus;
  
  // Joined fields
  users?: { email: string };
  stations?: { name: string };
}
