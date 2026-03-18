
import { supabase } from '@/core/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="h-16 border-b flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm sticky top-0 z-10 w-full">
      <div className="md:hidden font-bold tracking-tight text-xl text-primary flex items-center gap-2">
        FluxEV
      </div>
      <div className="hidden md:block text-muted-foreground text-sm font-medium">
        Overview
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-foreground bg-secondary px-3 py-1.5 rounded-full mt-1">
          <User className="w-4 h-4 text-primary" />
          <span className="hidden sm:inline-block">{user?.email}</span>
        </div>
        <Button 
          onClick={handleLogout} 
          className="bg-transparent text-foreground border border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 px-3 py-1.5 h-auto text-xs"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
