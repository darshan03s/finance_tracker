import { LOCALSTORAGE_KEY } from '@/lib/constants';
import { ExpenseCategory, IncomeCategory, MonthlyBalance, Transaction } from '@/types';
import { create } from 'zustand';

export type FinanceData = {
  balance: number;
  categories: {
    income: IncomeCategory[];
    expense: ExpenseCategory[];
  };
  transactions: Transaction[];
  monthlyBalances: MonthlyBalance[];
};

type FinanceStore = FinanceData & {
  updateBalance: (newBalance: number) => void;
  addTransaction: (txn: Transaction) => void;
};

export const defaultFinanceData: FinanceData = {
  balance: 0,
  categories: {
    expense: ['food', 'rent', 'misc'],
    income: ['salaray', 'freelance']
  },
  transactions: [],
  monthlyBalances: []
};

export const useFinanceStore = create<FinanceStore>((set) => ({
  ...defaultFinanceData,
  updateBalance: (amount: number) => {
    set((state) => {
      const newBalance = state.balance + amount;

      const parsed = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)!) as FinanceData;

      parsed.balance = newBalance;

      const now = new Date();
      const month = now.getMonth();
      const year = now.getFullYear();

      if (!parsed.monthlyBalances) parsed.monthlyBalances = [];

      const existingIndex = parsed.monthlyBalances.findIndex(
        (m) => m.month === month && m.year === year
      );

      if (existingIndex !== -1) {
        parsed.monthlyBalances[existingIndex].balance = newBalance;
      } else {
        parsed.monthlyBalances.push({
          month,
          year,
          balance: newBalance
        });
      }

      const newTransaction: Transaction = {
        id: crypto.randomUUID(),
        name: 'Balance Update',
        date: new Date().toISOString(),
        type: 'balance',
        category: 'balance',
        amount,
        note: ''
      };

      parsed.transactions = [newTransaction, ...parsed.transactions];

      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(parsed));

      return {
        balance: newBalance,
        transactions: [newTransaction, ...state.transactions],
        monthlyBalances: parsed.monthlyBalances
      };
    });
  },
  addTransaction: (txn: Transaction) => {
    set((state) => {
      const updatedTransactions = [txn, ...state.transactions];

      const parsed = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)!) as FinanceData;

      let newBalance = state.balance;

      parsed.transactions = updatedTransactions;
      if (txn.type === 'income') {
        parsed.balance = parsed.balance + txn.amount;
        newBalance = newBalance + txn.amount;
      } else if (txn.type === 'expense') {
        parsed.balance = parsed.balance - txn.amount;
        newBalance = newBalance - txn.amount;
      }

      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(parsed));

      return {
        transactions: updatedTransactions,
        balance: newBalance
      };
    });
  }
}));
