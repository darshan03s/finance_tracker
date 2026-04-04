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
import { HoverTooltip } from '../wrappers';
import { CalendarDays, CalendarRange } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const ExpenseCard = ({
  expenseThisMonth,
  expenseToday
}: {
  expenseThisMonth: number;
  expenseToday: number;
}) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<'month' | 'day'>('month');

  const cardDescription = filter === 'month' ? `This month's expense` : `Today's expense`;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-md sm:text-lg">Expense</CardTitle>
          <CardDescription className="text-xs sm:text-md">{cardDescription}</CardDescription>
          <CardAction>
            <div className="flex items-center gap-2">
              <HoverTooltip message="Today's expense">
                <Button
                  size={'icon-xs'}
                  onClick={() => setFilter('day')}
                  variant={filter === 'day' ? 'default' : 'outline'}
                >
                  <CalendarDays />
                </Button>
              </HoverTooltip>
              <HoverTooltip message="This month's expense">
                <Button
                  size={'icon-xs'}
                  onClick={() => setFilter('month')}
                  variant={filter === 'month' ? 'default' : 'outline'}
                >
                  <CalendarRange />
                </Button>
              </HoverTooltip>
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
          <p>
            {filter === 'month' ? formatCurrency(expenseThisMonth) : formatCurrency(expenseToday)}
          </p>
        </CardContent>
      </Card>
      <AddExpenseDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default ExpenseCard;
