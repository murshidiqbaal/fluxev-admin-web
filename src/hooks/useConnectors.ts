import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { connectorService } from '@/services/connectorService';
import { type ConnectorInsert, type ConnectorUpdate } from '@/types/connector';

export function useConnectors() {
  return useQuery({
    queryKey: ['connectors'],
    queryFn: connectorService.getConnectors,
  });
}

export function useCreateConnector() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (connector: ConnectorInsert) => connectorService.createConnector(connector),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connectors'] });
    },
  });
}

export function useUpdateConnector() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...connector }: { id: string } & ConnectorUpdate) => connectorService.updateConnector(id, connector),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connectors'] });
    },
  });
}

export function useDeleteConnector() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => connectorService.deleteConnector(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connectors'] });
    },
  });
}
