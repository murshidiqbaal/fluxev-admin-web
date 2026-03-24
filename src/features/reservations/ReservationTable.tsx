import { useState } from 'react';
import { type Reservation } from '@/types/reservation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  CheckCircle, 
  XCircle, 
  Search,
  ChevronRight
} from 'lucide-react';
import { useCancelReservation, useUpdateReservationStatus } from '@/hooks/useReservations';
import { format } from 'date-fns';


interface Props {
  reservations: Reservation[];
  onViewDetails: (reservation: Reservation) => void;
}

export default function ReservationTable({ reservations, onViewDetails }: Props) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const cancelMutation = useCancelReservation();
  const updateStatusMutation = useUpdateReservationStatus();

  const filteredReservations = reservations.filter((res) => {
    const matchesStatus = statusFilter === 'all' || res.status === statusFilter;
    const matchesSearch = 
      res.stations?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.users?.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.users?.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2.5 py-1 text-[10px] rounded-full font-bold uppercase tracking-tight bg-green-500/10 text-green-500 border border-green-500/20">Active</span>;
      case 'completed':
        return <span className="px-2.5 py-1 text-[10px] rounded-full font-bold uppercase tracking-tight bg-blue-500/10 text-blue-500 border border-blue-500/20">Completed</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 text-[10px] rounded-full font-bold uppercase tracking-tight bg-red-500/10 text-red-500 border border-red-500/20">Cancelled</span>;
      case 'expired':
        return <span className="px-2.5 py-1 text-[10px] rounded-full font-bold uppercase tracking-tight bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">Expired</span>;
      default:
        return <span className="px-2.5 py-1 text-[10px] rounded-full font-bold uppercase tracking-tight bg-zinc-500/10 text-zinc-400">{status}</span>;
    }
  };

  const handleCancel = (res: Reservation) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      cancelMutation.mutate({ 
        reservation_id: res.reservation_id, 
        connector_id: res.connector_id 
      });
    }
  };

  const handleComplete = (reservation_id: string) => {
    if (window.confirm('Mark this reservation as completed?')) {
      updateStatusMutation.mutate({ id: reservation_id, status: 'completed' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card/50 p-4 rounded-lg border">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search user or station..." 
            className="pl-9 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto">
          {['all', 'active', 'completed', 'cancelled', 'expired'].map((s) => (
            <Button
              key={s}
              variant={statusFilter === s ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(s)}
              className="capitalize h-8 text-[11px] px-3 font-semibold"
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-md border bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Station</th>
                <th className="px-6 py-4 font-medium">Time Slot</th>
                <th className="px-6 py-4 font-medium">Fee</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No reservations found
                  </td>
                </tr>
              ) : (
                filteredReservations.map((res) => (
                  <tr key={res.reservation_id} className="hover:bg-primary/5 transition-all duration-200">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{res.users?.full_name}</span>
                        <span className="text-[10px] text-muted-foreground">{res.users?.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-cyan-400 font-semibold">{res.stations?.name}</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                          {res.connectors?.connector_type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-xs">
                        <span className="font-medium">{format(new Date(res.reserved_start), 'MMM d, HH:mm')}</span>
                        <span className="text-[10px] text-muted-foreground">to {format(new Date(res.reserved_end), 'HH:mm')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-emerald-400">
                      ₹{res.reservation_fee}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(res.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 hover:bg-primary/10 hover:text-cyan-400"
                          onClick={() => onViewDetails(res)}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        
                        {res.status === 'active' && (
                          <>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-8 w-8 text-emerald-500 hover:bg-emerald-500/10"
                              onClick={() => handleComplete(res.reservation_id)}
                              title="Mark Completed"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-8 w-8 text-rose-500 hover:bg-rose-500/10"
                              onClick={() => handleCancel(res)}
                              title="Cancel Reservation"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
