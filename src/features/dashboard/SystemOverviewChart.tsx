import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSessions } from '@/hooks/useSessions';

export default function SystemOverviewChart() {
  const { data: sessions } = useSessions();

  const chartData = useMemo(() => {
    if (!sessions) return [];

    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toLocaleDateString('en-US', { weekday: 'short' });
    });

    const counts = sessions.reduce((acc: any, s) => {
      const day = new Date(s.start_time).toLocaleDateString('en-US', { weekday: 'short' });
      if (!acc[day]) acc[day] = { sessions: 0, revenue: 0 };
      acc[day].sessions += 1;
      acc[day].revenue += s.total_cost || 0;
      return acc;
    }, {});

    return last7Days.map(day => ({
      name: day,
      sessions: counts[day]?.sessions || 0,
      revenue: counts[day]?.revenue || 0,
    }));
  }, [sessions]);

  return (
    <Card className="col-span-4 border">
      <CardHeader>
        <CardTitle>System Overview</CardTitle>
        <CardDescription>Charging sessions over the last 7 days.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
              />
              <Line 
                type="monotone" 
                dataKey="sessions" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ r: 4, fill: "hsl(var(--primary))" }}
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
