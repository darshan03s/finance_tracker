import { HexColor } from './types';

export const DOMAIN_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://finance-tracker.darshans.site';

export const HEX_COLORS: Record<HexColor, string> = {
  freelance: '#10b981',
  salary: '#3b82f6',
  food: '#f59e0b',
  rent: '#ef4444',
  misc: '#a855f7',
  balance: '#155dfc',
  income: '#22c55e',
  expense: '#ef4444'
};
