import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { walletService } from '@/services/walletService';

export function useWallets() {
  return useQuery({
    queryKey: ['wallets'],
    queryFn: walletService.getWallets,
  });
}

export function useUpdateBalance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ wallet_id, amount, type }: { wallet_id: string, amount: number, type: 'credit' | 'debit' }) => 
      walletService.updateBalance(wallet_id, amount, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: walletService.getTransactions,
  });
}
