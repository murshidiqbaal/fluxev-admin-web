import { supabase } from '@/core/supabaseClient';
import { type Connector, type ConnectorInsert, type ConnectorUpdate } from '@/types/connector';

export const connectorService = {
  getConnectors: async () => {
    // We join with stations to show the station name
    const { data, error } = await supabase.from('connectors').select('*, stations(name)').order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  },
  createConnector: async (connector: ConnectorInsert) => {
    const { data, error } = await supabase.from('connectors').insert([connector]).select().single();
    if (error) throw new Error(error.message);
    return data as Connector;
  },
  updateConnector: async (id: string, connector: ConnectorUpdate) => {
    const { data, error } = await supabase.from('connectors').update(connector).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data as Connector;
  },
  deleteConnector: async (id: string) => {
    const { error } = await supabase.from('connectors').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
  }
};
