import { TransactionsResponse } from '../transactions.types';

const MOCKI_API_BASE_URL = 'https://mocki.io/v1';

export const mockiApiQueryKeys = {
  transactions: ['mocki', 'transactions'],
};

export class MockiApiTransactions {
  private async fetchFromMocki<T>(
    endpoint: string,
    errorMessage: string,
  ): Promise<T> {
    try {
      const response = await fetch(`${MOCKI_API_BASE_URL}/${endpoint}`);

      if (!response.ok) {
        throw new Error(
          `Mocki API error: ${response.status} ${response.statusText}`,
        );
      }

      return await response.json();
    } catch (error) {
      console.error(error, errorMessage);
      throw new Error(errorMessage);
    }
  }

  public async getAllData(): Promise<TransactionsResponse> {
    return await this.fetchFromMocki<TransactionsResponse>(
      '20750350-0eb9-4985-a2cf-49cab293cb2d',
      'Error fetching all metadata',
    );
  }
}

const mockiApiTransactions = new MockiApiTransactions();
export default mockiApiTransactions;
