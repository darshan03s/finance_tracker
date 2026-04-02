import { LOCALSTORAGE_KEY } from '@/lib/constants';
import { ExpenseCategory, IncomeCategory, Transaction } from '@/types';
import { create } from 'zustand';

export type FinanceData = {
  balance: number;
  categories: {
    income: IncomeCategory[];
    expense: ExpenseCategory[];
  };
  transactions: Transaction[];
};

type FinanceStore = {
  balance: number;
  categories: {
    income: IncomeCategory[];
    expense: ExpenseCategory[];
  };
  transactions: Transaction[];
  updateBalance: (newBalance: number) => void;
  addTransaction: (txn: Transaction) => void;
};

export const defaultFinanceData: FinanceData = {
  balance: 0,
  categories: {
    expense: ['food', 'rent', 'entertainment'],
    income: ['salaray', 'freelance']
  },
  transactions: []
};

export const useFinanceStore = create<FinanceStore>((set) => ({
  ...defaultFinanceData,
  updateBalance: (amount: number) => {
    set((state) => {
      const newBalance = state.balance + amount;

      const parsed = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)!) as FinanceData;

      parsed.balance = newBalance;

      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(parsed));

      return { balance: newBalance };
    });
  },
  addTransaction: (txn: Transaction) => {
    set((state) => {
      const updatedTransactions = [...state.transactions, txn];

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
