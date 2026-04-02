import { Category, Transaction } from '@/types';
import { create } from 'zustand';

type FinanceStore = {
  balance: number;
  categories: Category[];
  transactions: Transaction[];
};

export const defaultFinanceStore: FinanceStore = {
  balance: 0,
  categories: ['food', 'rent', 'entertainment'],
  transactions: []
};

export const useFinanceStore = create<FinanceStore>(() => ({
  ...defaultFinanceStore
}));
