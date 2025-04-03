// Format a date in ISO format to a readable format in Spanish
export const formatDateToEs = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES');
};
