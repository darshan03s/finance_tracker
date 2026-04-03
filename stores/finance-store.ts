import { LOCALSTORAGE_KEY } from '@/lib/constants';
import { ExpenseCategory, IncomeCategory, Transaction } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FinanceData = {
  balance: number;
  categories: {
    income: IncomeCategory[];
    expense: ExpenseCategory[];
  };
  transactions: Transaction[];
};

type FinanceStore = FinanceData & {
  updateBalance: (newBalance: number) => void;
  addTransaction: (txn: Transaction) => void;
  updateTransaction: (txn: Transaction) => void;
  deleteTransaction: (txn: Transaction) => void;
  resetData: () => void;
};

export const defaultFinanceData: FinanceData = {
  balance: 0,
  categories: {
    expense: ['food', 'rent', 'misc'],
    income: ['salary', 'freelance']
  },
  transactions: []
};

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set) => ({
      ...defaultFinanceData,

      updateBalance: (amount: number) => {
        set((state) => {
          const newBalance = state.balance + amount;

          const newTransaction: Transaction = {
            id: crypto.randomUUID(),
            name: 'Balance Update',
            date: new Date().toISOString(),
            type: 'balance',
            category: 'balance',
            amount,
            note: ''
          };

          return {
            balance: newBalance,
            transactions: [newTransaction, ...state.transactions]
          };
        });
      },

      addTransaction: (txn: Transaction) => {
        set((state) => {
          const updatedTransactions = [txn, ...state.transactions];

          let newBalance = state.balance;

          if (txn.type === 'income') newBalance += txn.amount;
          else if (txn.type === 'expense') newBalance -= txn.amount;

          return {
            transactions: updatedTransactions,
            balance: newBalance
          };
        });
      },

      updateTransaction: (updatedTxn: Transaction) => {
        set((state) => {
          const index = state.transactions.findIndex((t) => t.id === updatedTxn.id);
          if (index === -1) return state;

          const oldTxn = state.transactions[index];
          let newBalance = state.balance;

          if (oldTxn.type === 'income') newBalance -= oldTxn.amount;
          else if (oldTxn.type === 'expense') newBalance += oldTxn.amount;

          if (updatedTxn.type === 'income') newBalance += updatedTxn.amount;
          else if (updatedTxn.type === 'expense') newBalance -= updatedTxn.amount;

          const updatedTransactions = [...state.transactions];
          updatedTransactions[index] = updatedTxn;

          return {
            transactions: updatedTransactions,
            balance: newBalance
          };
        });
      },

      deleteTransaction: (txn: Transaction) => {
        set((state) => {
          if (txn.type === 'balance') return state;

          let newBalance = state.balance;

          if (txn.type === 'income') newBalance -= txn.amount;
          else if (txn.type === 'expense') newBalance += txn.amount;

          return {
            transactions: state.transactions.filter((t) => t.id !== txn.id),
            balance: newBalance
          };
        });
      },

      resetData: () => set(() => defaultFinanceData)
    }),
    {
      name: LOCALSTORAGE_KEY
    }
  )
);
