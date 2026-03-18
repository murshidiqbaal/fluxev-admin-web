import { useState } from 'react';
import { useConnectors } from '@/hooks/useConnectors';
import ConnectorTable from './ConnectorTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddConnectorModal from './AddConnectorModal';
import EditConnectorModal from './EditConnectorModal';

export default function ConnectorsPage() {
  const { data: connectors, isLoading, error } = useConnectors();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingConnector, setEditingConnector] = useState<any | null>(null);

  if (isLoading) return <div className="p-8 text-center text-primary">Loading connectors...</div>;
  if (error) return <div className="p-8 text-center text-destructive">Error loading connectors: {(error as Error).message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Connectors</h2>
          <p className="text-muted-foreground">Manage EV connectors and charge points</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Connector
        </Button>
      </div>

      <ConnectorTable 
        connectors={connectors || []} 
        onEdit={(connector) => setEditingConnector(connector)} 
      />

      {isAddModalOpen && (
        <AddConnectorModal onClose={() => setIsAddModalOpen(false)} />
      )}
      
      {editingConnector && (
        <EditConnectorModal connector={editingConnector} onClose={() => setEditingConnector(null)} />
      )}
    </div>
  );
}
