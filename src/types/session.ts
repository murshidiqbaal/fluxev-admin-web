export type ChargingSessionStatus = 'active' | 'completed' | 'failed' | 'cancelled';

export interface ChargingSession {
  session_id: string;
  user_id: string;
  station_id: string;
  connector_id: string;
  start_time: string;
  end_time?: string;
  energy_consumed_kwh: number;
  total_cost: number;
  status: ChargingSessionStatus;

  
  // Joined fields
  users?: { 
    full_name: string; 
    email: string; 
  };
  stations?: { 
    name: string; 
  };
  connectors?: { 
    connector_type: string; 
  };
}

