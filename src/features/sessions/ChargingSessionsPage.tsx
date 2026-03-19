import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/core/supabaseClient';
import SessionTable from './SessionTable';
import type { ChargingSession } from '@/types/session';

export default function ChargingSessionsPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const { data: sessions, isLoading } = useQuery({
    queryKey: ['sessions', activeTab],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('charging_sessions')
        .select(`
          *,
          users(email),
          stations:station_id(name),
          connectors:connector_id(connector_type)
        `)
        .eq('status', activeTab === 'active' ? 'active' : 'completed')
        .order('start_time', { ascending: false });

      if (error) throw error;
      return data as ChargingSession[];
    },
    refetchInterval: 5000, // Basic polling for realtime updates if needed, but we'll use actual realtime too
  });

  return (
    <div className="p-6 h-full space-y-6 bg-background text-foreground">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
          Charging Sessions
        </h1>
        <p className="text-muted-foreground">
          Monitor and manage all EV charging activity in your network.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="p-1 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-lg">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'active' 
                  ? 'bg-primary/20 text-cyan-400 border border-primary/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Active Sessions
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'completed' 
                  ? 'bg-primary/20 text-cyan-400 border border-primary/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Completed
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-muted-foreground">Live Feed Active</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <SessionTable sessions={sessions || []} />
      )}
    </div>
  );
}
