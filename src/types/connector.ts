export type ConnectorType = 'ccs2' | 'chademo' | 'type2' | 'tesla';
export type ConnectorStatus = 'available' | 'occupied' | 'faulted' | 'offline';

export interface Connector {
  connector_id: string;
  station_id: string;
  connector_type: ConnectorType;
  max_power_kw: number;
  status: ConnectorStatus;
  created_at?: string;
}

export type ConnectorInsert = Omit<Connector, 'connector_id' | 'created_at'>;

export type ConnectorUpdate = Partial<ConnectorInsert>;
