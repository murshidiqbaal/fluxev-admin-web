import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/core/supabaseClient';
import { sessionService } from '@/services/sessionService';

export function useSessions() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'charging_sessions' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['sessions'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['sessions'],
    queryFn: sessionService.getSessions,
  });
}
