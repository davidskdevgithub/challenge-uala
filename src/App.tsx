import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Layout } from './modules/layout/components/layout';
import { TransactionsSummaryPage } from './modules/transactions/pages/transactions-summary-page';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <TransactionsSummaryPage />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
