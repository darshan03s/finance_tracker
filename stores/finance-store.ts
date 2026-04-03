import { LocalStorage } from '@/lib/local-storage-utils';
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

export const useFinanceStore = create<FinanceStore>((set) => ({
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

      LocalStorage.updateBalance(newBalance, newTransaction);

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

      if (txn.type === 'income') {
        newBalance = newBalance + txn.amount;
      } else if (txn.type === 'expense') {
        newBalance = newBalance - txn.amount;
      }

      LocalStorage.updateTransactions(newBalance, updatedTransactions);

      return {
        transactions: updatedTransactions,
        balance: newBalance
      };
    });
  },
  updateTransaction: (updatedTxn: Transaction) => {
    set((state) => {
      const existingIndex = state.transactions.findIndex((t) => t.id === updatedTxn.id);
      if (existingIndex === -1) return state;

      const oldTxn = state.transactions[existingIndex];

      let newBalance = state.balance;

      if (oldTxn.type === 'income') {
        newBalance -= oldTxn.amount;
      } else if (oldTxn.type === 'expense') {
        newBalance += oldTxn.amount;
      }

      if (updatedTxn.type === 'income') {
        newBalance += updatedTxn.amount;
      } else if (updatedTxn.type === 'expense') {
        newBalance -= updatedTxn.amount;
      }

      const updatedTransactions = [...state.transactions];
      updatedTransactions[existingIndex] = updatedTxn;

      LocalStorage.updateTransactions(newBalance, updatedTransactions);

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

      if (txn.type === 'income') {
        newBalance -= txn.amount;
      } else if (txn.type === 'expense') {
        newBalance += txn.amount;
      }

      const updatedTransactions = state.transactions.filter((t) => t.id !== txn.id);

      LocalStorage.updateTransactions(newBalance, updatedTransactions);

      return {
        transactions: updatedTransactions,
        balance: newBalance
      };
    });
  },
  resetData: () => {
    set(() => {
      return {
        balance: defaultFinanceData.balance,
        transactions: defaultFinanceData.transactions,
        categories: defaultFinanceData.categories
      };
    });
    LocalStorage.reset();
  }
}));
