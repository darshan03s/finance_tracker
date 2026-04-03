import { defaultFinanceData, FinanceData } from '@/stores/finance-store';
import { LOCALSTORAGE_KEY } from './constants';
import { Transaction } from '@/types';

export class LocalStorage {
  static updateBalance(newBalance: number, newTxn: Transaction) {
    const parsed = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)!) as FinanceData;
    parsed.balance = newBalance;
    parsed.transactions = [newTxn, ...parsed.transactions];
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(parsed));
  }

  static updateTransactions(newBalance: number, txns: Transaction[]) {
    const parsed = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)!) as FinanceData;
    parsed.balance = newBalance;
    parsed.transactions = txns;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(parsed));
  }

  static reset() {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(defaultFinanceData));
  }

  static getData() {
    return localStorage.getItem(LOCALSTORAGE_KEY);
  }

  static setData(data: string) {
    return localStorage.setItem(LOCALSTORAGE_KEY, data);
  }
}
