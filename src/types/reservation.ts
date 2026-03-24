export type ReservationStatus = 'active' | 'completed' | 'cancelled' | 'expired';

export interface Reservation {
  reservation_id: string;
  user_id: string;
  station_id: string;
  connector_id: string;
  reserved_start: string;
  reserved_end: string;
  reservation_fee: number;
  status: ReservationStatus;
  created_at: string;
  
  // Joined fields
  users?: {
    full_name: string;
    email: string;
  };
  stations?: {
    station_id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  connectors?: {
    connector_id: string;
    connector_type: string;
    max_power_kw: number;
    status: string;
  };
}

