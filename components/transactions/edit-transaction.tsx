'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { IncomeCategory, Transaction } from '@/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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

const EditTransactionDialog = ({
  open,
  setOpen,
  txn
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  txn: Transaction;
}) => {
  const categories = useFinanceStore((s) => s.categories);
  const updateTransaction = useFinanceStore((s) => s.updateTransaction);
  const allCategories = [...categories.income, ...categories.expense];
  const [transaction, setTransaction] = useState<Transaction>(txn);
  const defaultErrorState = {
    name: false,
    amount: false,
    category: false
  };
  const [error, setError] = useState(defaultErrorState);

  useEffect(() => {
    setTransaction(txn);
  }, [txn]);

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
      ...transaction
    };

    updateTransaction(newTransaction);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit transaction</DialogTitle>
          <DialogDescription>Update transaction details</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div>
            <span className={`text-destructive text-xs ${error.name ? 'inline' : 'hidden'}`}>
              Required
            </span>
            <Input
              type="text"
              placeholder="Name"
              value={transaction.name}
              className="text-xs sm:text-sm"
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          <div>
            <span className={`text-destructive text-xs ${error.amount ? 'inline' : 'hidden'}`}>
              Required
            </span>
            <Input
              type="number"
              placeholder="Amount"
              className="text-xs sm:text-sm"
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
              onValueChange={(val) => {
                const isIncome = categories.income.includes(val as IncomeCategory);

                setTransaction((prev) => ({
                  ...prev,
                  category: val,
                  type: isIncome ? 'income' : 'expense'
                }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {allCategories.map((cat) => (
                    <SelectItem value={cat} key={cat}>
                      {capitalize(cat)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Input
            placeholder="Note (optional)"
            className="text-xs sm:text-sm"
            value={transaction.note}
            onChange={(e) => handleChange('note', e.target.value)}
          />

          <Button className="w-full mt-2" onClick={handleSubmit}>
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTransactionDialog;
