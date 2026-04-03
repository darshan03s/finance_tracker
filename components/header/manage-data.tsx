'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { FileBraces } from 'lucide-react';
import { FinanceData, useFinanceStore } from '@/stores/finance-store';
import { LOCALSTORAGE_KEY } from '@/lib/constants';
import { useRef } from 'react';

const ManageData = () => {
  const resetData = useFinanceStore((s) => s.resetData);
  const importRef = useRef<HTMLInputElement | null>(null);

  function handleResetData() {
    resetData();
  }

  function handleExportData() {
    const data = localStorage.getItem(LOCALSTORAGE_KEY);

    const blob = new Blob([data!], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `finance_tracker_data_${new Date().toISOString()}`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleImportData() {
    importRef.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as FinanceData;

      localStorage.setItem(LOCALSTORAGE_KEY, text);

      useFinanceStore.setState({
        balance: parsed.balance,
        transactions: parsed.transactions,
        categories: parsed.categories
      });
    } catch (err) {
      console.error('Invalid JSON file', err);
    }

    e.target.value = '';
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={'icon-sm'}>
          <FileBraces />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportData}>Export data</DropdownMenuItem>
        <DropdownMenuItem onClick={handleImportData}>Import data</DropdownMenuItem>
        <DropdownMenuItem onClick={handleResetData}>Reset data</DropdownMenuItem>
      </DropdownMenuContent>
      <input
        type="file"
        accept="application/json"
        ref={importRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </DropdownMenu>
  );
};

export default ManageData;
