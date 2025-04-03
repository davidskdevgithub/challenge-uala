// Format the amount with Spanish formatting (comma as decimal separator)
export const formatCurrencyToEs = (currency: number): string => {
  return currency.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
