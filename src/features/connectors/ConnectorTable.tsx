import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useDeleteConnector } from '@/hooks/useConnectors';

interface Props {
  connectors: any[];
  onEdit: (connector: any) => void;
}

export default function ConnectorTable({ connectors, onEdit }: Props) {
  const deleteMutation = useDeleteConnector();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this connector?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="rounded-md border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-3 font-medium">Station</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Max Power</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {connectors.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  No connectors found
                </td>
              </tr>
            ) : (
              connectors.map((connector) => (
                <tr key={connector.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{connector.stations?.name || 'Unknown Station'}</td>
                  <td className="px-6 py-4 uppercase font-semibold text-primary">{connector.connector_type}</td>
                  <td className="px-6 py-4">{connector.max_power_kw} kW</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs rounded-full font-medium capitalize
                      ${connector.status === 'available' ? 'bg-green-500/10 text-green-500' : 
                        connector.status === 'occupied' ? 'bg-blue-500/10 text-blue-500' : 
                        connector.status === 'faulted' ? 'bg-red-500/10 text-red-500' :
                        'bg-yellow-500/10 text-yellow-500'}`}
                    >
                      {connector.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button onClick={() => onEdit(connector)} className="h-8 w-8 p-0 bg-transparent text-foreground border border-border hover:bg-secondary">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button onClick={() => handleDelete(connector.id)} disabled={deleteMutation.isPending} className="h-8 w-8 p-0 bg-transparent text-destructive border border-border hover:bg-destructive/10">
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
