import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUpdateStation } from '@/hooks/useStations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type Station } from '@/types/station';

const stationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  price_per_kwh: z.coerce.number().min(0),
  status: z.enum(['active', 'inactive', 'maintenance']),
});

type StationFormValues = z.infer<typeof stationSchema>;

export default function EditStationModal({ station, onClose }: { station: Station, onClose: () => void }) {
  const updateMutation = useUpdateStation();
  const { register, handleSubmit, formState: { errors } } = useForm<StationFormValues>({
    resolver: zodResolver(stationSchema),
    defaultValues: { 
      name: station.name,
      address: station.address,
      latitude: station.latitude,
      longitude: station.longitude,
      price_per_kwh: station.price_per_kwh,
      status: station.status,
    },
  });

  const onSubmit = (data: StationFormValues) => {
    updateMutation.mutate({ id: station.id, ...data }, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-lg rounded-lg border shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Edit Station</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input {...register('name')} />
            {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Input {...register('address')} />
            {errors.address && <p className="text-destructive text-sm">{errors.address.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Latitude</Label>
              <Input type="number" step="any" {...register('latitude')} />
              {errors.latitude && <p className="text-destructive text-sm">{errors.latitude.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Longitude</Label>
              <Input type="number" step="any" {...register('longitude')} />
              {errors.longitude && <p className="text-destructive text-sm">{errors.longitude.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Price per kWh (₹)</Label>
              <Input type="number" step="0.01" {...register('price_per_kwh')} />
              {errors.price_per_kwh && <p className="text-destructive text-sm">{errors.price_per_kwh.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <select 
                {...register('status')} 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
              {errors.status && <p className="text-destructive text-sm">{errors.status.message}</p>}
            </div>
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
