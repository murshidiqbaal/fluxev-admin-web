import { useMemo } from 'react';
import { useSessions } from '@/hooks/useSessions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

export default function AnalyticsPage() {
  const { data: sessions, isLoading, error } = useSessions();

  const analyticsData = useMemo(() => {
    if (!sessions) return [];

    const grouped = sessions.reduce((acc: any, session) => {
      if (session.status !== 'completed') return acc;
      
      const date = new Date(session.start_time).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { date, revenue: 0, energy: 0 };
      }
      acc[date].revenue += session.total_cost || 0;
      acc[date].energy += session.energy_consumed_kwh || 0;
      return acc;
    }, {});

    const sortedData = Object.values(grouped).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return sortedData as any[];
  }, [sessions]);

  if (isLoading) return <div className="p-8 text-center text-primary">Loading analytics...</div>;
  if (error) return <div className="p-8 text-center text-destructive">Error loading analytics: {(error as Error).message}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">System-wide charging behavior and revenue insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-primary/10">
          <CardHeader>
            <CardTitle>Daily Revenue (₹)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {analyticsData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">No data available</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg border-primary/10">
          <CardHeader>
            <CardTitle>Daily Energy Consumption (kWh)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {analyticsData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">No data available</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
