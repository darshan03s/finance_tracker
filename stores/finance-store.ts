import { LOCALSTORAGE_KEY } from '@/lib/constants';
import { Category, Transaction } from '@/types';
import { create } from 'zustand';

export type FinanceData = {
  balance: number;
  categories: Category[];
  transactions: Transaction[];
};

type FinanceStore = {
  balance: number;
  categories: Category[];
  transactions: Transaction[];
  updateBalance: (newBalance: number) => void;
};

export const defaultFinanceData: FinanceData = {
  balance: 0,
  categories: ['food', 'rent', 'entertainment'],
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
  }
}));
