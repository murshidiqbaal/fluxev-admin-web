import { useState } from 'react';
import { useWallets, useUpdateBalance } from '@/hooks/useWallets';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Minus, 
  History, 
  Search,
  ArrowUpRight,
  ArrowDownRight,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function WalletsPage() {
  const { data: wallets, isLoading, error } = useWallets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'credit' | 'debit' | null>(null);
  const [amount, setAmount] = useState('');
  
  const updateBalanceMutation = useUpdateBalance();

  const filteredWallets = wallets?.filter(w => 
    w.users?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.users?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.wallet_id.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleAction = async () => {
    if (!selectedWallet || !actionType || !amount) return;
    
    updateBalanceMutation.mutate({
      wallet_id: selectedWallet,
      amount: parseFloat(amount),
      type: actionType
    }, {
      onSuccess: () => {
        setSelectedWallet(null);
        setActionType(null);
        setAmount('');
      }
    });
  };

  if (isLoading) return <div className="p-8 text-center text-primary animate-pulse font-bold tracking-tighter uppercase italic">Initializing Wallets...</div>;
  if (error) return <div className="p-8 text-center text-destructive bg-destructive/10 border border-destructive/20 rounded-xl">Error: {(error as Error).message}</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <h2 className="text-3xl font-black tracking-tighter uppercase italic text-foreground">Wallet Management</h2>
          </div>
          <p className="text-muted-foreground font-medium max-w-lg leading-snug">
            Manage user balances, oversee recharge history, and handle manual credit/debit adjustments.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card/50 p-4 rounded-xl border border-border/50 backdrop-blur-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name, email or wallet ID..." 
            className="pl-9 bg-background/50 border-border/50 focus:border-primary/50 transition-all font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link to="/transactions">
          <Button variant="outline" size="sm" className="h-9 font-bold tracking-tight uppercase text-[11px] border-primary/20 hover:bg-primary/5">
            <History className="mr-2 h-3.5 w-3.5" /> Transaction Logs
          </Button>
        </Link>
      </div>

      <div className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-md shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/20 border-b border-border/50 tracking-widest font-black">
              <tr>
                <th className="px-6 py-5 font-black">User Account</th>
                <th className="px-6 py-5 font-black">Identifier</th>
                <th className="px-6 py-5 font-black text-right">Balance Status</th>
                <th className="px-6 py-5 font-black text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filteredWallets.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-muted-foreground italic font-medium">
                    No matching wallets located in the system.
                  </td>
                </tr>
              ) : (
                filteredWallets.map((wallet) => (
                  <tr key={wallet.wallet_id} className="hover:bg-primary/5 transition-all duration-300 group">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground group-hover:text-primary transition-colors">{wallet.users?.full_name || 'Anonymous User'}</span>
                        <span className="text-[10px] text-muted-foreground font-medium">{wallet.users?.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[10px] font-mono bg-muted/50 px-2 py-1 rounded text-muted-foreground uppercase letter spacing-widest">
                        {wallet.wallet_id.substring(0, 12)}...
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="text-xl font-black text-foreground tabular-nums">
                        ₹{wallet.balance.toFixed(2)}
                      </span>
                      <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter mt-1">
                        Updated: {format(new Date(wallet.updated_at), 'MMM d, HH:mm')}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-emerald-500 hover:bg-emerald-500/10 font-bold uppercase text-[10px] tracking-tight"
                          onClick={() => { setSelectedWallet(wallet.wallet_id); setActionType('credit'); }}
                        >
                          <Plus className="mr-1 h-3 w-3" /> Add
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-rose-500 hover:bg-rose-500/10 font-bold uppercase text-[10px] tracking-tight"
                          onClick={() => { setSelectedWallet(wallet.wallet_id); setActionType('debit'); }}
                        >
                          <Minus className="mr-1 h-3 w-3" /> Deduct
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Modal */}
      {(selectedWallet && actionType) && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-sm rounded-2xl border border-border/50 shadow-2xl p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${actionType === 'credit' ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
                  {actionType === 'credit' ? 
                    <ArrowUpRight className="h-5 w-5 text-emerald-500" /> : 
                    <ArrowDownRight className="h-5 w-5 text-rose-500" />
                  }
                </div>
                <div>
                  <h3 className="font-black uppercase italic tracking-tighter text-lg leading-none">
                    {actionType === 'credit' ? 'Add Balance' : 'Deduct Balance'}
                  </h3>
                  <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">WALLET RECHARGE</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => { setSelectedWallet(null); setActionType(null); }} className="rounded-full h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Adjustment Amount (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg text-muted-foreground cursor-default underline decoration-primary decoration-4 underline-offset-4 decoration-primary/30">₹</span>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="pl-10 h-14 text-2xl font-black bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/50"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <Button 
                  className={`w-full h-12 font-black uppercase italic tracking-tighter text-lg shadow-lg ${
                    actionType === 'credit' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20' : 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/20'
                  }`}
                  onClick={handleAction}
                  disabled={updateBalanceMutation.isPending || !amount}
                >
                  {updateBalanceMutation.isPending ? 'Processing...' : 'Confirm Update'}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full text-xs font-bold uppercase tracking-tight text-muted-foreground"
                  onClick={() => { setSelectedWallet(null); setActionType(null); }}
                >
                  Cancel Operation
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
