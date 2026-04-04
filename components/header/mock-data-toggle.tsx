'use client';

import { FinanceData, useFinanceStore } from '@/stores/finance-store';
import { Switch } from '../ui/switch';
import { useRef } from 'react';

const MockDataToggle = ({ mockData }: { mockData: FinanceData }) => {
  const prevRef = useRef<FinanceData | null>(null);

  function handleChange(checked: boolean) {
    if (checked) {
      const current = useFinanceStore.getState();

      prevRef.current = {
        balance: current.balance,
        transactions: current.transactions,
        categories: current.categories
      };

      useFinanceStore.setState((state) => ({
        ...state,
        ...mockData
      }));
    } else {
      if (!prevRef.current) return;

      useFinanceStore.setState({
        balance: prevRef.current.balance,
        transactions: prevRef.current.transactions,
        categories: prevRef.current.categories
      });
    }
  }

  return <Switch onCheckedChange={handleChange} title="Toggle mock data" />;
};

export default MockDataToggle;
