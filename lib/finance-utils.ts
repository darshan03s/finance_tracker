import { MonthlyTotals, Transaction } from '@/types';

export function getTodaysIncome(transactions: Transaction[], referenceDate: Date = new Date()) {
  const day = referenceDate.getDate();
  const month = referenceDate.getMonth();
  const year = referenceDate.getFullYear();

  let income = 0;

  for (const txn of transactions) {
    if (txn.type !== 'income') continue;

    const d = new Date(txn.date);

    if (d.getDate() === day && d.getMonth() === month && d.getFullYear() === year) {
      income += txn.amount;
    }
  }

  return income;
}

export function getTodaysExpense(transactions: Transaction[], referenceDate: Date = new Date()) {
  const day = referenceDate.getDate();
  const month = referenceDate.getMonth();
  const year = referenceDate.getFullYear();

  let expense = 0;

  for (const txn of transactions) {
    if (txn.type !== 'expense') continue;

    const d = new Date(txn.date);

    if (d.getDate() === day && d.getMonth() === month && d.getFullYear() === year) {
      expense += txn.amount;
    }
  }

  return expense;
}

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

export function getDailyIncomeExpenseTrend(
  transactions: Transaction[],
  referenceDate: Date = new Date()
) {
  const month = referenceDate.getMonth();
  const year = referenceDate.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const incomeArr: number[] = new Array(daysInMonth).fill(0);
  const expenseArr: number[] = new Array(daysInMonth).fill(0);

  for (const txn of transactions) {
    if (txn.type === 'balance') continue;

    const d = new Date(txn.date);

    if (d.getMonth() !== month || d.getFullYear() !== year) continue;

    const dayIndex = d.getDate() - 1;

    if (txn.type === 'income') {
      incomeArr[dayIndex] += txn.amount;
    } else {
      expenseArr[dayIndex] += txn.amount;
    }
  }

  const maxDay =
    month === referenceDate.getMonth() && year === referenceDate.getFullYear()
      ? referenceDate.getDate()
      : daysInMonth;

  return Array.from({ length: maxDay }, (_, i) => ({
    day: String(i + 1),
    income: incomeArr[i],
    expense: -expenseArr[i]
  }));
}

export function getMonthlyCategoryBreakdown(
  transactions: Transaction[],
  categories: string[],
  type: 'income' | 'expense' = 'expense',
  referenceYear: number = new Date().getFullYear()
) {
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

  const result = monthNames.map((month) => {
    const base: Record<string, number | string> = { month };

    for (const cat of categories) {
      base[cat] = 0;
    }

    return base;
  });

  for (const txn of transactions) {
    if (txn.type !== type) continue;

    const d = new Date(txn.date);
    if (d.getFullYear() !== referenceYear) continue;

    const monthIndex = d.getMonth();

    if (txn.category in result[monthIndex]) {
      (result[monthIndex][txn.category] as number) += txn.amount;
    }
  }

  return result;
}

export function getHighestExpenseCategory(
  transactions: Transaction[],
  categories: string[],
  referenceDate: Date = new Date()
) {
  const month = referenceDate.getMonth();
  const year = referenceDate.getFullYear();

  const totals: Record<string, number> = {};

  for (const cat of categories) {
    totals[cat] = 0;
  }

  for (const txn of transactions) {
    if (txn.type !== 'expense') continue;

    const d = new Date(txn.date);

    if (d.getMonth() !== month || d.getFullYear() !== year) continue;

    if (txn.category in totals) {
      totals[txn.category] += txn.amount;
    }
  }

  let maxCategory = '';
  let maxAmount = 0;

  for (const cat of categories) {
    if (totals[cat] > maxAmount) {
      maxAmount = totals[cat];
      maxCategory = cat;
    }
  }

  return {
    category: maxCategory,
    amount: maxAmount
  };
}

export function getMonthlyExpenseComparison(
  transactions: Transaction[],
  referenceDate: Date = new Date()
) {
  const month = referenceDate.getMonth();
  const year = referenceDate.getFullYear();

  let prevMonth = month - 1;
  let prevYear = year;

  if (month === 0) {
    prevMonth = 11;
    prevYear = year - 1;
  }

  let currentExpense = 0;
  let previousExpense = 0;

  for (const txn of transactions) {
    if (txn.type !== 'expense') continue;

    const d = new Date(txn.date);

    if (d.getMonth() === month && d.getFullYear() === year) {
      currentExpense += txn.amount;
    }

    if (d.getMonth() === prevMonth && d.getFullYear() === prevYear) {
      previousExpense += txn.amount;
    }
  }

  const difference = currentExpense - previousExpense;

  return {
    currentExpense,
    previousExpense,
    difference
  };
}

export function getLargestExpense(transactions: Transaction[], referenceDate: Date = new Date()) {
  const month = referenceDate.getMonth();
  const year = referenceDate.getFullYear();

  let largest: Transaction | null = null;

  for (const txn of transactions) {
    if (txn.type !== 'expense') continue;

    const d = new Date(txn.date);

    if (d.getMonth() !== month || d.getFullYear() !== year) continue;

    if (!largest || txn.amount > largest.amount) {
      largest = txn;
    }
  }

  return largest;
}
