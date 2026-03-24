import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reservationService } from '@/services/reservationService';
import { type ReservationStatus } from '@/types/reservation';
import { useEffect } from 'react';
import { supabase } from '@/core/supabaseClient';

export function useReservations() {
  const queryClient = useQueryClient();

  // Set up realtime subscription
  useEffect(() => {
    const subscription = supabase
      .channel('reservations-realtime')
      .on(
        'postgres_changes',
        { event: '*', table: 'reservations', schema: 'public' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['reservations'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['reservations'],
    queryFn: reservationService.getReservations,
  });
}

export function useUpdateReservationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string, status: ReservationStatus }) => 
      reservationService.updateReservationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
}

export function useCancelReservation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reservation_id, connector_id }: { reservation_id: string, connector_id: string }) => 
      reservationService.cancelReservation(reservation_id, connector_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['connectors'] });
    },
  });
}
