'use client';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { HoverTooltip } from '../wrappers';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useFinanceStore } from '@/stores/finance-store';
import { formatCurrency } from '@/lib/utils';

const BalanceCard = ({ balance }: { balance: number }) => {
  const [balanceInput, setBalanceInput] = useState('');

  const updateBalance = useFinanceStore((s) => s.updateBalance);

  function handleBalanceInput(value: string) {
    if (/^\d*\.?\d*$/.test(value)) {
      setBalanceInput(value);
    }
  }

  function handleAddBalance() {
    if (!balanceInput) return;
    updateBalance(Number(balanceInput));
    setBalanceInput('');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md sm:text-lg">Balance</CardTitle>
        <CardDescription className="text-xs sm:text-md">Your total balance</CardDescription>
        <CardAction>
          <div className="flex items-center gap-1">
            <Input
              value={balanceInput}
              placeholder="Add balance"
              onChange={(e) => handleBalanceInput(e.target.value)}
              inputMode="decimal"
              className="h-6 p-1 px-2 text-xs placeholder:text-xs w-30"
            />
            <HoverTooltip message="Add balance">
              <Button
                asChild
                size={'icon-xs'}
                className="text-xs p-1"
                variant={'outline'}
                onClick={handleAddBalance}
              >
                <Plus />
              </Button>
            </HoverTooltip>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl h-full w-full">
        <span>{formatCurrency(balance)}</span>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
