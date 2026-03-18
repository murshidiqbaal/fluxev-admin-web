import { useQuery } from '@tanstack/react-query';
import { walletService } from '@/services/walletService';

export function useWallets() {
  return useQuery({
    queryKey: ['wallets'],
    queryFn: walletService.getWallets,
  });
}

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: walletService.getTransactions,
  });
}
