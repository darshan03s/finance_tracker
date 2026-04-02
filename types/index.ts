export type Transaction = {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  note: string;
};

export type Category = 'food' | 'rent' | 'entertainment';
