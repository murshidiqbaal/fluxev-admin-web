import { useUsers } from '@/hooks/useUsers';
import UserTable from './UserTable';

export default function UsersPage() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <div className="p-8 text-center text-primary">Loading users...</div>;
  if (error) return <div className="p-8 text-center text-destructive">Error loading users: {(error as Error).message}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        <p className="text-muted-foreground">Manage user accounts and administrative roles</p>
      </div>

      <UserTable users={users || []} />
    </div>
  );
}
