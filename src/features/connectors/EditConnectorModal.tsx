import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUpdateConnector } from '@/hooks/useConnectors';
import { useStations } from '@/hooks/useStations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const schema = z.object({
  station_id: z.string().min(1, 'Station is required'),
  connector_type: z.enum(['ccs2', 'chademo', 'type2', 'tesla']),
  max_power_kw: z.coerce.number().min(1),
  status: z.enum(['available', 'occupied', 'faulted', 'offline']),
});

type FormValues = z.infer<typeof schema>;

export default function EditConnectorModal({ connector, onClose }: { connector: any, onClose: () => void }) {
  const updateMutation = useUpdateConnector();
  const { data: stations } = useStations();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { 
      station_id: connector.station_id,
      connector_type: connector.connector_type, 
      max_power_kw: connector.max_power_kw,
      status: connector.status 
    },
  });

  const onSubmit = (data: FormValues) => {
    updateMutation.mutate({ id: connector.id, ...data }, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-lg rounded-lg border shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Edit Connector</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Station</Label>
            <select 
              {...register('station_id')} 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select a Station...</option>
              {stations?.map((s) => <option key={s.station_id} value={s.station_id}>{s.name} - {s.address}</option>)}

            </select>
            {errors.station_id && <p className="text-destructive text-sm">{errors.station_id.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Connector Type</Label>
              <select {...register('connector_type')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="ccs2">CCS2</option>
                <option value="chademo">CHAdeMO</option>
                <option value="type2">Type 2</option>
                <option value="tesla">Tesla</option>
              </select>
              {errors.connector_type && <p className="text-destructive text-sm">{errors.connector_type.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Max Power (kW)</Label>
              <Input type="number" {...register('max_power_kw')} />
              {errors.max_power_kw && <p className="text-destructive text-sm">{errors.max_power_kw.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <select {...register('status')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="faulted">Faulted</option>
              <option value="offline">Offline</option>
            </select>
            {errors.status && <p className="text-destructive text-sm">{errors.status.message}</p>}
          </div>
          <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
            <Button type="button" onClick={onClose} className="bg-secondary text-secondary-foreground hover:bg-secondary/80">Cancel</Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
