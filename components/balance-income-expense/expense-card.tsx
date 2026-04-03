import { useState } from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '../ui/button';
import AddExpenseDialog from './add-expense-dialog';

const ExpenseCard = ({ expense }: { expense: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-md sm:text-lg">Expense</CardTitle>
          <CardDescription className="text-xs sm:text-md">This {"month's"} expense</CardDescription>
          <CardAction>
            <div>
              <Button
                size={'xs'}
                className="text-xs"
                variant={'outline'}
                onClick={() => setOpen(true)}
              >
                Add expense
              </Button>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl h-full w-full">
          <p>${expense}</p>
        </CardContent>
      </Card>
      <AddExpenseDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default ExpenseCard;
