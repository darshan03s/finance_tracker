'use client';

import { useFinanceStore } from '@/stores/finance-store';
import { Switch } from '../ui/switch';

const MockDataToggle = () => {
  function handleChange(checked: boolean) {
    useFinanceStore.setState({ isMockEnabled: checked });
  }

  return <Switch onCheckedChange={handleChange} title="Toggle mock data" />;
};

export default MockDataToggle;
