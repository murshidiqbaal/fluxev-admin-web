import { useState } from 'react';
import { useReservations } from '@/hooks/useReservations';
import ReservationTable from './ReservationTable';
import ReservationDetailModal from './ReservationDetailModal';
import { type Reservation } from '@/types/reservation';
import { Bookmark, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReservationsPage() {
  const { data: reservations, isLoading, error, refetch } = useReservations();
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <RefreshCw className="h-8 w-8 text-primary animate-spin" />
        <p className="text-muted-foreground font-medium animate-pulse">Loading reservations...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-8 text-center bg-destructive/10 border border-destructive/20 rounded-xl">
      <div className="max-w-md mx-auto space-y-4">
        <h3 className="text-xl font-bold text-destructive">Failed to load reservations</h3>
        <p className="text-sm text-muted-foreground">{(error as Error).message}</p>
        <Button onClick={() => refetch()} variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
          Try Again
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <h2 className="text-3xl font-black tracking-tighter uppercase italic text-foreground">Reservations</h2>
          </div>
          <p className="text-muted-foreground font-medium max-w-lg leading-snug">
            Manage charging slot bookings, track user activity, and handle cancellations across the network.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col items-end mr-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Bookings</span>
            <span className="text-2xl font-black text-primary leading-none">{reservations?.length || 0}</span>
          </div>
          <Button 
            onClick={() => refetch()} 
            variant="outline" 
            size="sm" 
            className="h-9 font-bold tracking-tight uppercase text-[11px] border-primary/20 hover:bg-primary/5"
          >
            <RefreshCw className="mr-2 h-3.5 w-3.5" /> Refresh List
          </Button>
        </div>
      </div>

      <ReservationTable 
        reservations={reservations || []} 
        onViewDetails={(res) => setSelectedReservation(res)} 
      />

      {selectedReservation && (
        <ReservationDetailModal 
          reservation={selectedReservation} 
          onClose={() => setSelectedReservation(null)} 
        />
      )}
    </div>
  );
}
