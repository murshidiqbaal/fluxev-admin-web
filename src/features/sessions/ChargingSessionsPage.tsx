import { useSessions } from '@/hooks/useSessions';
import SessionTable from './SessionTable';

export default function ChargingSessionsPage() {
  const { data: sessions, isLoading, error } = useSessions();

  if (isLoading) return <div className="p-8 text-center text-primary">Loading sessions...</div>;
  if (error) return <div className="p-8 text-center text-destructive">Error loading sessions: {(error as Error).message}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Charging Sessions</h2>
        <p className="text-muted-foreground">Monitor real-time and historical EV charging sessions</p>
      </div>

      <SessionTable sessions={sessions || []} />
    </div>
  );
}
