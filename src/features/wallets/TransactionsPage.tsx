import { useTransactions } from '@/hooks/useWallets';
import { format } from 'date-fns';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  History, 
  Search,
  RefreshCw,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function TransactionsPage() {
  const { data: transactions, isLoading, error, refetch } = useTransactions();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = transactions?.filter(tx => 
    tx.wallets?.users?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.wallets?.users?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.transaction_id.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <RefreshCw className="h-8 w-8 text-primary animate-spin" />
        <p className="text-muted-foreground font-black italic uppercase tracking-tighter">Syncing Transaction History...</p>
      </div>
    </div>
  );

  if (error) return <div className="p-8 text-center text-destructive bg-destructive/10 border border-destructive/20 rounded-xl">Error loading transactions: {(error as Error).message}</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <h2 className="text-3xl font-black tracking-tighter uppercase italic text-foreground">Transaction Logs</h2>
          </div>
          <p className="text-muted-foreground font-medium max-w-lg leading-snug">
            Immutable audit trail of all financial movements, including recharges, session payments, and manual adjustments.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => refetch()} 
            variant="outline" 
            size="sm" 
            className="h-9 font-bold tracking-tight uppercase text-[11px] border-primary/20 hover:bg-primary/5"
          >
            <RefreshCw className="mr-2 h-3.5 w-3.5" /> Re-Sync
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card/50 p-4 rounded-xl border border-border/50 backdrop-blur-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by user, email or TXID..." 
            className="pl-9 bg-background/50 border-border/50 focus:border-primary/50 transition-all font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="ghost" size="sm" className="h-9 font-bold tracking-tight uppercase text-[10px] text-muted-foreground">
          <Filter className="mr-2 h-3 w-3" /> Advanced Filtering
        </Button>
      </div>

      <div className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-md shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/20 border-b border-border/50 tracking-widest font-black">
              <tr>
                <th className="px-6 py-5 font-black">Transaction ID</th>
                <th className="px-6 py-5 font-black">Timestamp</th>
                <th className="px-6 py-5 font-black">User Account</th>
                <th className="px-6 py-5 font-black">Movement</th>
                <th className="px-6 py-5 font-black text-right">Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-muted-foreground italic font-medium">
                    No transactions recorded in the current scope.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.transaction_id} className="hover:bg-primary/5 transition-all duration-300 group">
                    <td className="px-6 py-5">
                      <span className="text-[10px] font-mono bg-muted/50 px-2 py-1 rounded text-muted-foreground uppercase letter spacing-widest">
                        {tx.transaction_id.substring(0, 12)}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col text-xs font-medium">
                        <span className="text-foreground">{format(new Date(tx.created_at), 'MMM d, yyyy')}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">{format(new Date(tx.created_at), 'HH:mm:ss')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {tx.wallets?.users?.full_name || 'System User'}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-medium">{tx.wallets?.users?.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border
                        ${tx.transaction_type === 'credit' ? 
                          'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                          'bg-rose-500/10 text-rose-500 border-rose-500/20'}
                      `}>
                        {tx.transaction_type === 'credit' ? 
                          <ArrowUpRight className="h-3 w-3" /> : 
                          <ArrowDownRight className="h-3 w-3" />
                        }
                        {tx.transaction_type}
                      </div>
                    </td>
                    <td className={`px-6 py-5 text-right font-black tabular-nums text-lg
                      ${tx.transaction_type === 'credit' ? 'text-emerald-500' : 'text-foreground'}
                    `}>
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
