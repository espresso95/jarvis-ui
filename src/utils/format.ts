export const formatCurrency = (
  value: number,
  maximumFractionDigits = 0,
): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits,
  }).format(value);

export const formatPercentage = (value: number): string =>
  `${value.toFixed(0)}% ARR`;
