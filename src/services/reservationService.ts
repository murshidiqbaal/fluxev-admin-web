import { supabase } from '@/core/supabaseClient';
import { type Reservation, type ReservationStatus } from '@/types/reservation';

export const reservationService = {
  getReservations: async () => {
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        users:user_id (full_name, email),
        stations:station_id (station_id, name, address, latitude, longitude),
        connectors:connector_id (connector_id, connector_type, max_power_kw, status)
      `)

      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data as Reservation[];
  },

  updateReservationStatus: async (reservation_id: string, status: ReservationStatus) => {
    const { data, error } = await supabase
      .from('reservations')
      .update({ status })
      .eq('reservation_id', reservation_id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Reservation;
  },

  cancelReservation: async (reservation_id: string, connector_id: string) => {
    // 1. Update reservation status
    const { error: resError } = await supabase
      .from('reservations')
      .update({ status: 'cancelled' })
      .eq('reservation_id', reservation_id);

    if (resError) throw new Error(resError.message);

    // 2. Make connector available again
    const { error: connError } = await supabase
      .from('connectors')
      .update({ status: 'available' })
      .eq('connector_id', connector_id);

    if (connError) throw new Error(connError.message);

    return true;
  }
};
