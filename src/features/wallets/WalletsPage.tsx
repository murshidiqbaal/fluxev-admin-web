import { useWallets } from '@/hooks/useWallets';

export default function WalletsPage() {
  const { data: wallets, isLoading, error } = useWallets();

  if (isLoading) return <div className="p-8 text-center text-primary">Loading wallets...</div>;
  if (error) return <div className="p-8 text-center text-destructive">Error loading wallets: {(error as Error).message}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Wallets</h2>
        <p className="text-muted-foreground">Manage user wallet balances</p>
      </div>

      <div className="rounded-md border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">User Email</th>
                <th className="px-6 py-3 font-medium">Wallet ID</th>
                <th className="px-6 py-3 font-medium text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              {wallets?.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                    No wallets found
                  </td>
                </tr>
              ) : (
                wallets?.map((wallet) => (
                  <tr key={wallet.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{wallet.users?.email || wallet.user_id}</td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">{wallet.id.substring(0, 8)}...</td>
                    <td className="px-6 py-4 font-bold text-right text-lg">₹{wallet.balance.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
