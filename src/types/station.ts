export type StationStatus = 'active' | 'inactive' | 'maintenance';

export interface Station {
  station_id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  price_per_kwh: number;
  status: StationStatus;
  created_at?: string;
}

export type StationInsert = Omit<Station, 'station_id' | 'created_at'>;

export type StationUpdate = Partial<StationInsert>;
