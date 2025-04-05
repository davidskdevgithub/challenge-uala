// Format the amount with Spanish formatting (comma as decimal separator)
export const formatCurrencyToEs = (
  currency: number,
): {
  full: string;
  entera: string;
  decimal: string;
} => {
  const formatted = currency.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const [entera, decimal] = formatted.split(',');

  return {
    full: formatted,
    entera,
    decimal,
  };
};
