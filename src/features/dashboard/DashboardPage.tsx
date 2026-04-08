import StatsCards from './StatsCards';
import SystemOverviewChart from './SystemOverviewChart';
import { useSessions } from '@/hooks/useSessions';

export default function DashboardPage() {
  const { data: sessions } = useSessions();
  const recentSessions = sessions?.slice(0, 5) || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome back, here's what's happening today.</p>
      </div>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <div className="col-span-1 lg:col-span-4">
          <SystemOverviewChart />
        </div>
        <div className="col-span-1 lg:col-span-3 border rounded-lg bg-card p-6 shadow-sm overflow-hidden">
          <h3 className="font-semibold text-lg mb-4">Recent Sessions</h3>
          <div className="space-y-4">
            {recentSessions.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-muted-foreground border-dashed border-2 rounded-md">
                No sessions found
              </div>
            ) : (
              recentSessions.map((session) => (
                <div key={session.session_id} className="flex flex-col space-y-1 pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{session.users?.email || 'Guest'}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      session.status === 'active' ? 'bg-cyan-500/10 text-cyan-500' : 'bg-green-500/10 text-green-500'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{session.stations?.name}</span>
                    <span>₹{session.total_cost?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
