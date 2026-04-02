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
    if (txn.type === 'balance') continue;
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

export function getMonthlyIncomeExpenseTrend(
  transactions: Transaction[],
  referenceYear: number = new Date().getFullYear()
) {
  const incomeArr: number[] = new Array(12).fill(0);
  const expenseArr: number[] = new Array(12).fill(0);

  for (const txn of transactions) {
    if (txn.type === 'balance') continue;

    const d = new Date(txn.date);

    if (d.getFullYear() !== referenceYear) continue;

    const monthIndex = d.getMonth();

    if (txn.type === 'income') {
      incomeArr[monthIndex] += txn.amount;
    } else {
      expenseArr[monthIndex] += txn.amount;
    }
  }

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  return monthNames.map((month, i) => ({
    month,
    income: incomeArr[i],
    expense: -expenseArr[i]
  }));
}
