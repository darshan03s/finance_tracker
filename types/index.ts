export type Transaction = {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: Category | string;
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
