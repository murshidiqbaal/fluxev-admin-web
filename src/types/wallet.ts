export interface Wallet {
  wallet_id: string;
  user_id: string;
  balance: number;
  created_at: string;
  updated_at: string;
  users?: { full_name: string; email: string };
}

export type TransactionType = 'credit' | 'debit';
export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface Transaction {
  transaction_id: string;
  wallet_id: string;
  amount: number;
  transaction_type: TransactionType;
  status: TransactionStatus;
  created_at: string;
  wallets?: { user_id: string; users?: { full_name: string; email: string } };
}


