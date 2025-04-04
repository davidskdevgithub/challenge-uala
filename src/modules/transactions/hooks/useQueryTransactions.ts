import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { TransactionsResponse } from '../transactions.types';
import mockiApiTransactions, {
  mockiApiQueryKeys,
} from '../services/mocki-api-transactions';

export const useQueryTransactions = <T = TransactionsResponse>(
  options?: Partial<UseQueryOptions<TransactionsResponse, Error, T>>,
) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: mockiApiQueryKeys.transactions,
    queryFn: () => mockiApiTransactions.getAllData(),
    ...options,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
