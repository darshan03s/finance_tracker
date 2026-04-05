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

const AddTransaction = ({
  open,
  setOpen,
  type
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  type: 'income' | 'expense';
}) => {
  const categories = useFinanceStore((s) => s.categories);
  const addTransaction = useFinanceStore((s) => s.addTransaction);
  const selectCategories = type === 'income' ? categories.income : categories.expense;
  const [transaction, setTransaction] = useState<Transaction>({
    id: '',
    name: '',
    date: new Date().toISOString(),
    type: type,
    category: '',
    amount: 0,
    note: ''
  });
  const defaultErrorState = {
    name: false,
    amount: false,
    category: false
  };
  const [error, setError] = useState(defaultErrorState);

  const handleChange = (field: keyof Transaction, value: string | number) => {
    setError(defaultErrorState);
    setTransaction((prev) => ({
      ...prev,
      [field]: typeof value === 'string' ? value.trim() : value
    }));
  };

  const handleSubmit = () => {
    if (
      transaction.name.trim().length === 0 ||
      transaction.category.trim().length === 0 ||
      transaction.amount === 0
    ) {
      if (!transaction.name) {
        setError((e) => {
          return {
            ...e,
            name: true
          };
        });
      }
      if (!transaction.category) {
        setError((e) => {
          return {
            ...e,
            category: true
          };
        });
      }
      if (!transaction.amount) {
        setError((e) => {
          return {
            ...e,
            amount: true
          };
        });
      }
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
      type: type,
      category: '',
      amount: 0,
      note: ''
    });
    useFinanceStore.setState({ categoryBreakdownChartType: type });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add {type}</DialogTitle>
          <DialogDescription>Add new {type} transaction</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div>
            <span className={`text-destructive text-xs ${error.name ? 'inline' : 'hidden'}`}>
              Required
            </span>
            <Input
              className="text-xs sm:text-sm"
              type="text"
              placeholder="Name"
              value={transaction.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          <div>
            <span className={`text-destructive text-xs ${error.amount ? 'inline' : 'hidden'}`}>
              Required
            </span>
            <Input
              type="number"
              className="text-xs sm:text-sm"
              placeholder="Amount"
              value={transaction.amount || ''}
              onChange={(e) => handleChange('amount', Number(e.target.value))}
            />
          </div>

          <div>
            <span className={`text-destructive text-xs ${error.category ? 'inline' : 'hidden'}`}>
              Required
            </span>
            <Select
              value={transaction.category}
              onValueChange={(val) => handleChange('category', val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectCategories.map((cat) => (
                    <SelectItem value={cat} key={cat}>
                      {cat.slice(0, 1).toUpperCase().concat(cat.slice(1))}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Input
            className="text-xs sm:text-sm"
            placeholder="Note (optional)"
            value={transaction.note}
            onChange={(e) => handleChange('note', e.target.value)}
          />

          <Button className="w-full mt-2" onClick={handleSubmit}>
            Add {type}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransaction;
