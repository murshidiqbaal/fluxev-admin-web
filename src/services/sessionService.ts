import { supabase } from '@/core/supabaseClient';
import { type ChargingSession } from '@/types/session';

export const sessionService = {
  getSessions: async () => {
    const { data, error } = await supabase
      .from('charging_sessions')
      .select('*, users(email), stations(name)')
      .order('start_time', { ascending: false });
      
    if (error) throw new Error(error.message);
    return data as ChargingSession[];
  }
};
