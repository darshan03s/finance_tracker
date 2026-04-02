import { MonthlyTotals, Transaction } from '@/types';

export function getMonthlyTotals(
  transactions: Transaction[],
  referenceDate: Date = new Date()
): MonthlyTotals {
  const month = referenceDate.getMonth();
  const year = referenceDate.getFullYear();

  let income = 0;
  let expense = 0;

  for (const txn of transactions) {
    const d = new Date(txn.date);

    if (d.getMonth() !== month || d.getFullYear() !== year) continue;

    if (txn.type === 'income') {
      income += txn.amount;
    } else {
      expense += txn.amount;
    }
  }

  return {
    income,
    expense
  };
}
