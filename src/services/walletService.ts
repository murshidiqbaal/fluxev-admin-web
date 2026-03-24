import { supabase } from '@/core/supabaseClient';
import { type Wallet, type Transaction } from '@/types/wallet';

export const walletService = {
  getWallets: async () => {
    const { data, error } = await supabase
      .from('wallets')
      .select('*, users(full_name, email)')
      .order('updated_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data as Wallet[];
  },
  updateBalance: async (wallet_id: string, amount: number, type: 'credit' | 'debit') => {
    // 1. Get current balance
    const { data: wallet, error: fetchError } = await supabase
      .from('wallets')
      .select('balance')
      .eq('wallet_id', wallet_id)
      .single();

    if (fetchError) throw new Error(fetchError.message);

    const newBalance = type === 'credit' ? wallet.balance + amount : wallet.balance - amount;

    // 2. Update balance
    const { error: updateError } = await supabase
      .from('wallets')
      .update({ balance: newBalance, updated_at: new Date().toISOString() })
      .eq('wallet_id', wallet_id);

    if (updateError) throw new Error(updateError.message);

    // 3. Create transaction record
    const { error: txError } = await supabase
      .from('transactions')
      .insert({
        wallet_id,
        amount,
        transaction_type: type, // Using transaction_type as I renamed it earlier
        status: 'completed',
        created_at: new Date().toISOString()
      });

    if (txError) throw new Error(txError.message);

    return true;
  },
  getTransactions: async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        wallets (
          user_id,
          users (full_name, email)
        )
      `)
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data as Transaction[];
  }
};
