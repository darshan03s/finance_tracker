export type Transaction = {
  id: string;
  name: string;
  date: string;
  type: 'income' | 'expense' | 'balance';
  category: Category | string | 'balance';
  amount: number;
  note: string;
};

export type ExpenseCategory = 'food' | 'rent' | 'misc';

export type IncomeCategory = 'salary' | 'freelance';

export type Category = IncomeCategory | ExpenseCategory;

export type HexColor = IncomeCategory | ExpenseCategory | 'balance' | 'income' | 'expense';

export type MonthlyTotals = {
  income: number;
  expense: number;
};

export type MonthlyChartData = {
  month: string;
  income: number;
  expense: number;
};

export type DailyChartData = {
  day: string;
  income: number;
  expense: number;
};

export type TransactionTableFilters = {
  type: ('income' | 'expense')[];
  categories: string[];
};
