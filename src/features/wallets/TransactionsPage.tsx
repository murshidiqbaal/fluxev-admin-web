import { useTransactions } from '@/hooks/useWallets';

export default function TransactionsPage() {
  const { data: transactions, isLoading, error } = useTransactions();

  if (isLoading) return <div className="p-8 text-center text-primary">Loading transactions...</div>;
  if (error) return <div className="p-8 text-center text-destructive">Error loading transactions: {(error as Error).message}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <p className="text-muted-foreground">View wallet recharges and session payments</p>
      </div>

      <div className="rounded-md border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions?.map((tx) => (
                  <tr key={tx.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-muted-foreground">
                      {new Date(tx.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-medium">{tx.wallets?.users?.email || tx.wallets?.user_id}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider ${
                        tx.transaction_type === 'credit' ? 'bg-green-500/10 text-green-500' : 'bg-destructive/10 text-destructive'
                      }`}>
                        {tx.transaction_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 capitalize text-muted-foreground text-xs font-semibold">
                      {tx.status}
                    </td>
                    <td className={`px-6 py-4 font-bold text-right text-lg ${tx.transaction_type === 'credit' ? 'text-green-500' : 'text-foreground'}`}>
                      {tx.transaction_type === 'credit' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                    </td>
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
