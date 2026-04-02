'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Transaction } from '@/types';
import { Dispatch, SetStateAction, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useFinanceStore } from '@/stores/finance-store';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { capitalize } from '@/lib/utils';

const AddIncomeDialog = ({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const categories = useFinanceStore((s) => s.categories);
  const addTransaction = useFinanceStore((s) => s.addTransaction);
  const [transaction, setTransaction] = useState<Transaction>({
    id: '',
    name: '',
    date: new Date().toISOString(),
    type: 'income',
    category: '',
    amount: 0,
    note: ''
  });

  const handleChange = (field: keyof Transaction, value: string | number) => {
    setTransaction((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!transaction.amount || !transaction.category) {
      return;
    }

    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID()
    };

    addTransaction(newTransaction);
    setOpen(false);
    setTransaction({
      id: '',
      name: '',
      date: new Date().toISOString(),
      type: 'income',
      category: '',
      amount: 0,
      note: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add income</DialogTitle>
          <DialogDescription>Add new income transaction</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <Input
            type="text"
            placeholder="Name"
            value={transaction.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />

          <Input
            type="number"
            placeholder="Amount"
            value={transaction.amount || ''}
            onChange={(e) => handleChange('amount', Number(e.target.value))}
          />

          <Select
            value={transaction.category}
            onValueChange={(val) => handleChange('category', val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.income.map((cat) => (
                  <SelectItem value={cat} key={cat}>
                    {capitalize(cat)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            placeholder="Note (optional)"
            value={transaction.note}
            onChange={(e) => handleChange('note', e.target.value)}
          />

          <Button className="w-full mt-2" onClick={handleSubmit}>
            Add Income
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddIncomeDialog;
