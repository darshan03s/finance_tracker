export type Transaction = {
  id: string;
  name: string;
  date: string;
  type: 'income' | 'expense' | 'balance';
  category: Category | string | 'balance';
  amount: number;
  note: string;
};

export type ExpenseCategory = 'food' | 'rent' | 'entertainment';

export type IncomeCategory = 'salaray' | 'freelance';

export type Category = IncomeCategory | ExpenseCategory;

export type MonthlyTotals = {
  income: number;
  expense: number;
};

export type MonthlyBalance = {
  year: number;
  month: number;
  balance: number;
};

export type ChartData = {
  month: string;
  income: number;
  expense: number;
};
