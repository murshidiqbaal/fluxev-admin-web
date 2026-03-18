import { supabase } from '@/core/supabaseClient';
import { type Station, type StationInsert, type StationUpdate } from '@/types/station';

export const stationService = {
  getStations: async () => {
    const { data, error } = await supabase.from('stations').select('*').order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data as Station[];
  },
  getStationById: async (id: string) => {
    const { data, error } = await supabase.from('stations').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return data as Station;
  },
  createStation: async (station: StationInsert) => {
    const { data, error } = await supabase.from('stations').insert([station]).select().single();
    if (error) throw new Error(error.message);
    return data as Station;
  },
  updateStation: async (id: string, station: StationUpdate) => {
    const { data, error } = await supabase.from('stations').update(station).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data as Station;
  },
  deleteStation: async (id: string) => {
    const { error } = await supabase.from('stations').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
  }
};
