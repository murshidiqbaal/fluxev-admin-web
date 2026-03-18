import { type ChargingSession } from '@/types/session';

export default function SessionTable({ sessions }: { sessions: ChargingSession[] }) {
  return (
    <div className="rounded-md border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-3 font-medium">User</th>
              <th className="px-6 py-3 font-medium">Station</th>
              <th className="px-6 py-3 font-medium">Connector</th>
              <th className="px-6 py-3 font-medium">Start Time</th>
              <th className="px-6 py-3 font-medium">Energy</th>
              <th className="px-6 py-3 font-medium">Cost</th>
              <th className="px-6 py-3 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {sessions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                  No sessions found
                </td>
              </tr>
            ) : (
              sessions.map((session) => (
                <tr key={session.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{session.users?.email || session.user_id}</td>
                  <td className="px-6 py-4 font-medium text-primary">{session.stations?.name || session.station_id}</td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">{session.connector_id.substring(0, 8)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(session.start_time).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">{session.energy_consumed_kwh.toFixed(2)} kWh</td>
                  <td className="px-6 py-4">₹{session.total_cost.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2.5 py-1 text-xs rounded-full font-medium capitalize
                      ${session.status === 'completed' ? 'bg-green-500/10 text-green-500' : 
                        session.status === 'active' ? 'bg-blue-500/10 text-blue-500' : 
                        session.status === 'failed' ? 'bg-red-500/10 text-red-500' :
                        'bg-yellow-500/10 text-yellow-500'}`}
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
