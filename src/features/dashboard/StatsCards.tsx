import { MapPin, PlugZap, BatteryCharging, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStations } from '@/hooks/useStations';
import { useConnectors } from '@/hooks/useConnectors';
import { useSessions } from '@/hooks/useSessions';
import { useUsers } from '@/hooks/useUsers';

export default function StatsCards() {
  const { data: stations } = useStations();
  const { data: connectors } = useConnectors();
  const { data: sessions } = useSessions();
  const { data: users } = useUsers();

  const activeSessionsCount = sessions?.filter(s => s.status === 'active').length || 0;

  const stats = [
    { title: 'Total Stations', value: stations?.length || 0, icon: MapPin },
    { title: 'Total Connectors', value: connectors?.length || 0, icon: PlugZap },
    { title: 'Active Sessions', value: activeSessionsCount, icon: BatteryCharging },
    { title: 'Total Users', value: users?.length || 0, icon: Users },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
