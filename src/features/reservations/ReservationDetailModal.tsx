import { type Reservation } from '@/types/reservation';
import { Button } from '@/components/ui/button';
import { X, User, MapPin, Zap, Calendar, CreditCard, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
  reservation: Reservation;
  onClose: () => void;
}

export default function ReservationDetailModal({ reservation, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-2xl rounded-xl border border-border/50 shadow-2xl p-0 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-border/50 bg-muted/30">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold tracking-tight">Reservation Details</h3>
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">{reservation.reservation_id}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <User className="h-3 w-3 text-primary" /> User Information
              </h4>
              <div className="bg-muted/30 p-4 rounded-lg border border-border/50 border-dashed">
                <p className="font-bold text-foreground text-lg">{reservation.users?.full_name}</p>
                <p className="text-sm text-muted-foreground">{reservation.users?.email}</p>
                <p className="text-[10px] text-muted-foreground font-mono mt-1 uppercase">ID: {reservation.user_id}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <MapPin className="h-3 w-3 text-primary" /> Station & Connector
              </h4>
              <div className="bg-muted/30 p-4 rounded-lg border border-border/50 border-dashed">
                <p className="font-bold text-cyan-400 text-lg">{reservation.stations?.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Zap className="h-3 w-3 text-primary" />
                  <span className="text-sm uppercase font-bold tracking-tight text-foreground">{reservation.connectors?.connector_type}</span>
                </div>
                <p className="text-[10px] text-muted-foreground font-mono mt-1 uppercase">CONNECTOR ID: {reservation.connector_id}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Calendar className="h-3 w-3 text-primary" /> Reservation Schedule
              </h4>
              <div className="bg-muted/30 p-4 rounded-lg border border-border/50 border-dashed space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Start Time</span>
                  <span className="font-bold text-foreground">{format(new Date(reservation.reserved_start), 'MMM d, HH:mm')}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">End Time</span>
                  <span className="font-bold text-foreground">{format(new Date(reservation.reserved_end), 'MMM d, HH:mm')}</span>
                </div>
                <div className="pt-2 border-t border-border/50 mt-2 flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Created At</span>
                  <span className="text-[10px] text-muted-foreground uppercase">{format(new Date(reservation.created_at), 'yyyy-MM-dd HH:mm:ss')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="h-3 w-3 text-primary" /> Pricing & Status
              </h4>
              <div className="bg-muted/30 p-4 rounded-lg border border-border/50 border-dashed space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-muted-foreground text-sm uppercase font-semibold">Total Fee</span>
                  <span className="text-2xl font-bold text-emerald-400">₹{reservation.reservation_fee}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border/50">
                  <span className="text-muted-foreground text-xs uppercase font-semibold">Current Status</span>
                  <span className={`px-3 py-1 text-[10px] rounded-full font-black uppercase tracking-widest
                    ${reservation.status === 'active' ? 'bg-green-500 text-black' : 
                      reservation.status === 'completed' ? 'bg-blue-500 text-black' : 
                      reservation.status === 'cancelled' ? 'bg-red-500 text-black' : 
                      'bg-zinc-500 text-black'}`}
                  >
                    {reservation.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border/50 bg-muted/20 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="font-bold tracking-tight uppercase text-xs h-9">Close Panel</Button>
          {reservation.status === 'active' && (
            <div className="flex gap-2">
              <Button className="font-bold tracking-tight uppercase text-xs h-9 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                <ShieldCheck className="h-4 w-4 mr-2" /> Mark as Arrived
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
