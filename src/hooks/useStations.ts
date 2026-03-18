import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { stationService } from '@/services/stationService';
import { type StationInsert, type StationUpdate } from '@/types/station';

export function useStations() {
  return useQuery({
    queryKey: ['stations'],
    queryFn: stationService.getStations,
  });
}

export function useStation(id: string) {
  return useQuery({
    queryKey: ['stations', id],
    queryFn: () => stationService.getStationById(id),
    enabled: !!id,
  });
}

export function useCreateStation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (station: StationInsert) => stationService.createStation(station),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stations'] });
    },
  });
}

export function useUpdateStation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...station }: { id: string } & StationUpdate) => stationService.updateStation(id, station),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stations'] });
    },
  });
}

export function useDeleteStation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => stationService.deleteStation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stations'] });
    },
  });
}
