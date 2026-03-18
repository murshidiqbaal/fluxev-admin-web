import { type Station } from '@/types/station';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useDeleteStation } from '@/hooks/useStations';

interface Props {
  stations: Station[];
  onEdit: (station: Station) => void;
}

export default function StationTable({ stations, onEdit }: Props) {
  const deleteMutation = useDeleteStation();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this station?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="rounded-md border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Address</th>
              <th className="px-6 py-3 font-medium">Coordinates</th>
              <th className="px-6 py-3 font-medium">Price/kWh</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stations.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                  No stations found
                </td>
              </tr>
            ) : (
              stations.map((station) => (
                <tr key={station.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{station.name}</td>
                  <td className="px-6 py-4">{station.address}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {station.latitude.toFixed(4)}, {station.longitude.toFixed(4)}
                  </td>
                  <td className="px-6 py-4">₹{station.price_per_kwh}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs rounded-full font-medium capitalize
                      ${station.status === 'active' ? 'bg-green-500/10 text-green-500' : 
                        station.status === 'inactive' ? 'bg-red-500/10 text-red-500' : 
                        'bg-yellow-500/10 text-yellow-500'}`}
                    >
                      {station.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button onClick={() => onEdit(station)} className="h-8 w-8 p-0 bg-transparent text-foreground border border-border hover:bg-secondary">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button onClick={() => handleDelete(station.id)} disabled={deleteMutation.isPending} className="h-8 w-8 p-0 bg-transparent text-destructive border border-border hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
