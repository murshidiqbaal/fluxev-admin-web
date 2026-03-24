
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MapPin, 
  PlugZap, 
  BatteryCharging, 
  Users, 
  Wallet, 
  BarChart3, 
  Settings,
  Zap,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Stations', path: '/stations', icon: MapPin },
  { name: 'Connectors', path: '/connectors', icon: PlugZap },
  { name: 'Reservations', path: '/reservations', icon: Calendar },
  { name: 'Sessions', path: '/sessions', icon: BatteryCharging },
  { name: 'Users', path: '/users', icon: Users },
  { name: 'Wallets', path: '/wallets', icon: Wallet },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
];


export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-card/50 hidden md:flex flex-col flex-shrink-0 h-screen sticky top-0">
      <div className="h-16 border-b flex items-center px-6">
        <div className="font-bold tracking-tight text-xl text-primary flex items-center gap-2">
          <Zap className="w-6 h-6 fill-primary" />
          FluxEV Admin
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 outline-none rounded-md transition-all text-sm font-medium",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )
                }
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 outline-none rounded-md transition-all text-sm font-medium",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )
          }
        >
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>
      </div>
    </aside>
  );
}
