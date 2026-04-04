import { create } from 'zustand';

interface DateStore {
  date: Date;
}

export const useDateStore = create<DateStore>(() => ({
  date: new Date()
}));
