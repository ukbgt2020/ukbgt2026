import { Currency } from '../types/trade';

export const EXCHANGE_RATES: Record<Currency, { rateAgainstUSD: number; symbol: string; name: string; prefix: boolean }> = {
  USD: { rateAgainstUSD: 1.0, symbol: '$', name: 'US Dollar', prefix: true },
  BDT: { rateAgainstUSD: 122.50, symbol: '৳', name: 'Bangladeshi Taka', prefix: true },
  GBP: { rateAgainstUSD: 0.79, symbol: '£', name: 'British Pound', prefix: true },
  EUR: { rateAgainstUSD: 0.92, symbol: '€', name: 'Euro', prefix: true },
  AED: { rateAgainstUSD: 3.67, symbol: 'AED ', name: 'UAE Dirham', prefix: true },
  RMB: { rateAgainstUSD: 7.24, symbol: '¥', name: 'Chinese Yuan', prefix: true },
};

export function convertPrice(amountInUSD: number, targetCurrency: Currency): number {
  const rate = EXCHANGE_RATES[targetCurrency].rateAgainstUSD;
  return amountInUSD * rate;
}

export function formatCurrency(amountInUSD: number, targetCurrency: Currency, decimals: number = 2): string {
  const info = EXCHANGE_RATES[targetCurrency];
  const converted = convertPrice(amountInUSD, targetCurrency);
  
  const formattedNumber = converted.toLocaleString('en-US', {
    minimumFractionDigits: targetCurrency === 'BDT' || targetCurrency === 'RMB' ? 0 : decimals,
    maximumFractionDigits: targetCurrency === 'BDT' || targetCurrency === 'RMB' ? 0 : decimals,
  });

  return `${info.symbol}${formattedNumber}`;
}
