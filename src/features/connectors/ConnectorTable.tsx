import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, QrCode } from 'lucide-react';
import { useDeleteConnector } from '@/hooks/useConnectors';
import GenerateQrModal from './GenerateQrModal';

interface Props {
  connectors: any[];
  onEdit: (connector: any) => void;
}

export default function ConnectorTable({ connectors, onEdit }: Props) {
  const [selectedConnector, setSelectedConnector] = useState<any>(null);
  const deleteMutation = useDeleteConnector();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this connector?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <>
      <div className="rounded-md border bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-medium">Station</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Max Power</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {connectors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <p>No connectors found</p>
                      <p className="text-xs">Try adding a new connector to get started.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                connectors.map((connector) => (
                  <tr key={connector.connector_id} className="hover:bg-primary/5 transition-all duration-200">

                    <td className="px-6 py-4 font-medium">
                      <div className="flex flex-col">
                        <span>{connector.stations?.name || 'Unknown Station'}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">{connector.connector_id.slice(0, 8)}...</span>

                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-primary/20 text-cyan-400 font-bold uppercase tracking-wider border border-primary/20">
                        {connector.connector_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-cyan-500/80">
                      {connector.max_power_kw} <span className="text-[10px] text-muted-foreground">kW</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] rounded-full font-bold uppercase tracking-tight
                        ${connector.status === 'available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                          connector.status === 'busy' || connector.status === 'occupied' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 
                          connector.status === 'faulted' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                          'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'}`}
                      >
                        {connector.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button 
                        onClick={() => setSelectedConnector(connector)} 
                        title="Generate QR Code"
                        className="h-8 w-8 p-0 bg-primary/10 text-cyan-400 border border-primary/20 hover:bg-primary/20"
                      >
                        <QrCode className="h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={() => onEdit(connector)} 
                        className="h-8 w-8 p-0 bg-zinc-800/50 text-foreground border border-border/50 hover:bg-zinc-700/50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={() => handleDelete(connector.connector_id)} 
                        disabled={deleteMutation.isPending} 
                        className="h-8 w-8 p-0 bg-destructive/10 text-rose-400 border border-destructive/20 hover:bg-destructive/20"
                      >

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

      {selectedConnector && (
        <GenerateQrModal 
          connector={selectedConnector} 
          onClose={() => setSelectedConnector(null)} 
        />
      )}
    </>
  );
}
