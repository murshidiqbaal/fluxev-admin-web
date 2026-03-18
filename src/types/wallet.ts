export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  created_at?: string;
  users?: { email: string };
}

export type TransactionType = 'credit' | 'debit';
export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface Transaction {
  id: string;
  wallet_id: string;
  amount: number;
  transaction_type: TransactionType;
  status: TransactionStatus;
  created_at: string;
  wallets?: { user_id: string; users?: { email: string } };
}
