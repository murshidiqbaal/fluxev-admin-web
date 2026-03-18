import { supabase } from '@/core/supabaseClient';
import { type Wallet, type Transaction } from '@/types/wallet';

export const walletService = {
  getWallets: async () => {
    const { data, error } = await supabase.from('wallets').select('*, users(email)').order('balance', { ascending: false });
    if (error) throw new Error(error.message);
    return data as Wallet[];
  },
  getTransactions: async () => {
    const { data, error } = await supabase.from('transactions').select('*, wallets(user_id, users(email))').order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data as Transaction[];
  }
};
