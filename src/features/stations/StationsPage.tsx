import { useState } from 'react';
import { useStations } from '@/hooks/useStations';
import StationTable from './StationTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { type Station } from '@/types/station';
import AddStationModal from './AddStationModal';
import EditStationModal from './EditStationModal';

export default function StationsPage() {
  const { data: stations, isLoading, error } = useStations();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStation, setEditingStation] = useState<Station | null>(null);

  if (isLoading) return <div className="p-8 text-center text-primary">Loading stations...</div>;
  if (error) return <div className="p-8 text-center text-destructive">Error loading stations: {(error as Error).message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Stations</h2>
          <p className="text-muted-foreground">Manage your EV charging stations</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Station
        </Button>
      </div>

      <StationTable 
        stations={stations || []} 
        onEdit={(station) => setEditingStation(station)} 
      />

      {isAddModalOpen && (
        <AddStationModal onClose={() => setIsAddModalOpen(false)} />
      )}
      
      {editingStation && (
        <EditStationModal station={editingStation} onClose={() => setEditingStation(null)} />
      )}
    </div>
  );
}
