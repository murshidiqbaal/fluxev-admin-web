import { useMemo } from 'react';
import { useSessions } from '@/hooks/useSessions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAnalyticsMetrics } from '@/hooks/useAnalytics';

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  IndianRupee, 
  Wallet as WalletIcon,
  Activity
} from 'lucide-react';

export default function AnalyticsPage() {
  const { data: sessions, isLoading: sessionsLoading } = useSessions();
  const { data: metrics, isLoading: metricsLoading } = useAnalyticsMetrics();


  const analyticsData = useMemo(() => {
    if (!sessions) return [];

    const grouped = sessions.reduce((acc: any, session: any) => {
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

  if (sessionsLoading || metricsLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <Activity className="h-8 w-8 text-primary animate-spin" />
        <p className="text-muted-foreground font-black italic uppercase tracking-tighter">Calculating Network Metrics...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <h2 className="text-3xl font-black tracking-tighter uppercase italic text-foreground">Network Analytics</h2>
        </div>
        <p className="text-muted-foreground font-medium max-w-lg leading-snug">
          Real-time performance indicators, revenue streams, and user behavioral patterns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl overflow-hidden group hover:border-primary/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-lg bg-primary/10 text-primary mb-4">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Bookings</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black tabular-nums">{metrics?.totalReservations}</h3>
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-tight">+12%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl overflow-hidden group hover:border-primary/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500 mb-4">
                <Activity className="h-5 w-5" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active Slots</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black tabular-nums text-orange-500">{metrics?.activeReservations}</h3>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">Live Now</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl overflow-hidden group hover:border-primary/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 mb-4">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Completed</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black tabular-nums">{metrics?.completedReservations}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl overflow-hidden group hover:border-primary/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 mb-4">
                <IndianRupee className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase tracking-tighter">
                <TrendingUp className="h-3 w-3" /> Growth
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Revenue</p>
              <h3 className="text-3xl font-black tabular-nums text-emerald-500">₹{metrics?.totalRevenue.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl overflow-hidden group hover:border-primary/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 mb-4">
                <WalletIcon className="h-5 w-5" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Network Liquidity</p>
              <h3 className="text-3xl font-black tabular-nums text-cyan-500">₹{metrics?.totalBalance.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>
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
