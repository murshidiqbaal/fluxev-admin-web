import { type ChargingSession } from '@/types/session';

export default function SessionTable({ sessions }: { sessions: ChargingSession[] }) {
  return (
    <div className="rounded-md border bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border/50">
            <tr>
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Station / Connector</th>
              <th className="px-6 py-4 font-medium">Start Time</th>
              <th className="px-6 py-4 font-medium">Energy</th>
              <th className="px-6 py-4 font-medium">Cost</th>
              <th className="px-6 py-4 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {sessions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <p>No sessions found</p>
                  </div>
                </td>
              </tr>
            ) : (
              sessions.map((session) => (
                <tr key={session.session_id} className="hover:bg-primary/5 transition-all duration-200">

                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-foreground font-bold">{session.users?.full_name || 'Guest User'}</span>
                      <span className="text-[10px] text-muted-foreground">{session.users?.email}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-cyan-400 font-semibold">{session.stations?.name || 'Unknown Station'}</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-primary/20 text-cyan-500 uppercase font-bold border border-primary/10">
                          {session.connectors?.connector_type || 'N/A'}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">{session.connector_id.slice(0, 8)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-xs">{new Date(session.start_time).toLocaleDateString()}</span>
                      <span className="text-[10px] text-muted-foreground">{new Date(session.start_time).toLocaleTimeString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-cyan-500 font-bold">{session.energy_consumed_kwh.toFixed(2)}</span>
                    <span className="text-[10px] text-muted-foreground ml-1 font-sans font-normal uppercase">kWh</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-emerald-400 font-bold">₹{session.total_cost.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2.5 py-1 text-[10px] rounded-full font-bold uppercase tracking-tight
                      ${session.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                        session.status === 'active' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 animate-pulse' : 
                        session.status === 'failed' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                        'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'}`}
                    >
                      {session.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
