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

export type MonthlyTotals = {
  income: number;
  expense: number;
};

export type MonthlyBalance = {
  year: number;
  month: number;
  balance: number;
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

export type Filters = {
  type: ('income' | 'expense')[];
  categories: string[];
};
